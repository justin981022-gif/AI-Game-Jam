// Repair pass: process raws that exist but have no final .png; re-submit truly missing.
const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const KEY = process.env.AIART_API_KEY;
if (!KEY || !KEY.startsWith('st-')) { console.error('NO_KEY'); process.exit(99); }

const ROOT = 'E:/SH01/aigamejam';
const ART_DIR = path.join(ROOT, 'atoms/assets/art');
const PROMPT_DIR = path.join(ROOT, 'design/art_prompts');
const HOST = 'aiart.happyelements.com';
const BASE = '/api/v1/ai-fusion-openapi/images/generations';

const TARGETS = [
  // those with raw → just post-process
  { id: 'A-BG-BATTLE',   cat: 'backgrounds', tw: 1920, th: 1080, transparent: false, action: 'pp' },
  { id: 'A-ENE-ELITE',   cat: 'enemies',     tw: 768,  th: 1024, transparent: true,  action: 'pp' },
  { id: 'A-UI-RESUME',   cat: 'ui',          tw: 600,  th: 800,  transparent: true,  action: 'pp' },
  { id: 'A-END-E01',     cat: 'endings',     tw: 1280, th: 720,  transparent: false, action: 'pp' },
  // truly missing → submit fresh
  { id: 'A-ENE-W04',     cat: 'enemies',     tw: 768,  th: 1024, transparent: true,  action: 'gen' },
];

function readPrompt(id) {
  const md = fs.readFileSync(path.join(PROMPT_DIR, id + '.md'), 'utf8');
  const lines = md.split(/\r?\n/);
  const blocks = [];
  let curSection = null, inFence = false, buf = [];
  for (const ln of lines) {
    const m = ln.match(/^## (.+)$/);
    if (m) { curSection = m[1].trim(); continue; }
    if (/^```/.test(ln)) {
      if (!inFence) { inFence = true; buf = []; }
      else { inFence = false; blocks.push({ section: curSection, body: buf.join('\n').trim() }); }
      continue;
    }
    if (inFence) buf.push(ln);
  }
  const pos = blocks.find(b => /正向\s*Prompt/.test(b.section || ''));
  const neg = blocks.find(b => /反向\s*Prompt/.test(b.section || ''));
  return { positive: pos.body, negative: neg ? neg.body : '' };
}

function req(opts, body) {
  return new Promise((resolve, reject) => {
    const r = https.request(opts, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
    });
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}

async function submit(p, n) {
  const body = JSON.stringify({ positivePrompt: p, negativePrompt: n, width: 1024, height: 1024 });
  const res = await req({
    method: 'POST', hostname: HOST, path: BASE,
    headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  }, body);
  if (res.status !== 200) throw new Error('submit ' + res.status);
  return JSON.parse(res.body.toString()).data.info.taskId;
}
async function poll(tid, maxSec = 360) {
  const tries = Math.ceil(maxSec / 5);
  for (let i = 0; i < tries; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const res = await req({ method: 'GET', hostname: HOST, path: BASE + '/' + tid, headers: { 'Authorization': 'Bearer ' + KEY } });
    let j; try { j = JSON.parse(res.body.toString()); } catch (e) { continue; }
    const st = j.data && j.data.info && j.data.info.status;
    if (st === 'completed') return j.data.info.result[0];
    if (st === 'failed') throw new Error('aiart failed');
  }
  throw new Error('poll timeout');
}
function download(url, dst) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https.get({ hostname: u.hostname, path: u.pathname + u.search }, res => {
      if (res.statusCode !== 200) return reject(new Error('dl ' + res.statusCode));
      const f = fs.createWriteStream(dst);
      res.pipe(f); f.on('finish', () => f.close(() => resolve()));
      f.on('error', reject);
    }).on('error', reject);
  });
}

async function postProcess(srcPath, asset) {
  const dst = path.join(ART_DIR, asset.cat, asset.id + '.png');
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  if (!asset.transparent) {
    await sharp(srcPath).resize(asset.tw, asset.th, { fit: 'cover', position: 'centre' }).png({ compressionLevel: 9 }).toFile(dst);
    return { dst, alpha: false, bytes: fs.statSync(dst).size };
  }
  const meta = await sharp(srcPath).metadata();
  const W = meta.width, H = meta.height;
  const { data } = await sharp(srcPath).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  function sampleBox(x0, y0) {
    let r=0,g=0,b=0,n=0;
    for (let y = y0; y < y0 + 32; y++) for (let x = x0; x < x0 + 32; x++) {
      const i = (y * W + x) * 3; r += data[i]; g += data[i+1]; b += data[i+2]; n++;
    }
    return [r/n, g/n, b/n];
  }
  const corners = [sampleBox(0,0), sampleBox(W-32,0), sampleBox(0,H-32), sampleBox(W-32,H-32)];
  const median = a => { const s=[...a].sort((a,b)=>a-b); return (s[1]+s[2])/2; };
  const keyR = median(corners.map(c=>c[0]));
  const keyG = median(corners.map(c=>c[1]));
  const keyB = median(corners.map(c=>c[2]));
  const TOL_HARD = 24, TOL_SOFT = 56;
  const out = Buffer.alloc(W * H * 4);
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    const r = data[i], g = data[i+1], b = data[i+2];
    const d = Math.sqrt((r-keyR)**2 + (g-keyG)**2 + (b-keyB)**2);
    let a;
    if (d <= TOL_HARD) a = 0;
    else if (d >= TOL_SOFT) a = 255;
    else a = Math.round(255 * (d - TOL_HARD) / (TOL_SOFT - TOL_HARD));
    const j = (y * W + x) * 4;
    out[j] = r; out[j+1] = g; out[j+2] = b; out[j+3] = a;
    if (a > 16) { if (x < minX) minX = x; if (y < minY) minY = y; if (x > maxX) maxX = x; if (y > maxY) maxY = y; }
  }
  const PAD = 8;
  const bx = Math.max(0, minX - PAD);
  const by = Math.max(0, minY - PAD);
  const bw = Math.min(W - bx, (maxX - minX) + 2 * PAD + 1);
  const bh = Math.min(H - by, (maxY - minY) + 2 * PAD + 1);
  await sharp(out, { raw: { width: W, height: H, channels: 4 } })
    .extract({ left: bx, top: by, width: bw, height: bh })
    .resize(asset.tw, asset.th, { fit: 'contain', background: { r:0, g:0, b:0, alpha:0 } })
    .png({ compressionLevel: 9 }).toFile(dst);
  return { dst, alpha: true, bytes: fs.statSync(dst).size };
}

(async () => {
  for (const t of TARGETS) {
    try {
      let raw = path.join(ART_DIR, t.cat, t.id + '__v1__aiart.jpg');
      if (t.action === 'gen') {
        const p = readPrompt(t.id);
        console.log(`[${t.id}] submit...`);
        const tid = await submit(p.positive, p.negative);
        console.log(`[${t.id}] task=${tid}`);
        const url = await poll(tid, 360);
        console.log(`[${t.id}] completed`);
        await download(url, raw);
      }
      // sharp auto-detects PNG vs JPEG; no MIME gate
      const r = await postProcess(raw, t);
      console.log(`[${t.id}] OUT ${path.basename(r.dst)} (${r.bytes}B alpha=${r.alpha})`);
    } catch (e) {
      console.error(`[${t.id}] FAIL ${e.message}`);
    }
  }
  console.log('--- repair done ---');
})();
