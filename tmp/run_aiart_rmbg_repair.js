// Repair pass for the 4 failures in run_aiart_rmbg.js:
//   A-CHR-HR, A-EMOTE-CEO-STAMP: server returned .png (script wrongly rejected as 'bad jpeg magic')
//   A-ENE-W02, A-UI-RESUME: aiart poll timeout (transient) → retry
// Accepts both PNG (89 50 4E 47) and JPEG (FF D8) magic bytes.

const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const KEY = process.env.AIART_API_KEY;
if (!KEY || !KEY.startsWith('st-')) { console.error('NO_KEY'); process.exit(99); }

const ROOT = 'E:/SH01/aigamejam';
const PROMPT_DIR = path.join(ROOT, 'design/art_prompts');
const ART_DIR = path.join(ROOT, 'atoms/assets/art');
const TMPDIR = path.join(ROOT, 'tmp/aiart_run_v3');
fs.mkdirSync(TMPDIR, { recursive: true });

const HOST = 'aiart.happyelements.com';
const PATH_GEN = '/api/v1/ai-fusion-openapi/images/generations';
const PATH_RMBG = '/api/v1/ai-fusion-openapi/images/remove-backgrounds';

const REPAIR = [
  { id: 'A-CHR-HR',           cat: 'characters', tw: 768, th: 1024 },
  { id: 'A-EMOTE-CEO-STAMP',  cat: 'emotes',     tw: 256, th: 256  },
  { id: 'A-ENE-W02',          cat: 'enemies',    tw: 768, th: 1024 },
  { id: 'A-UI-RESUME',        cat: 'ui',         tw: 600, th: 800  },
];

function readPrompt(id) {
  const md = fs.readFileSync(path.join(PROMPT_DIR, id + '.md'), 'utf8');
  const lines = md.split(/\r?\n/);
  const blocks = []; let curSection = null, inFence = false, buf = [];
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

function download(url, dst) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https.get({ hostname: u.hostname, path: u.pathname + u.search }, res => {
      if (res.statusCode !== 200) return reject(new Error('dl ' + res.statusCode));
      const f = fs.createWriteStream(dst); res.pipe(f);
      f.on('finish', () => f.close(() => resolve(fs.statSync(dst).size)));
      f.on('error', reject);
    }).on('error', reject);
  });
}

async function submitGen(p, n) {
  const body = JSON.stringify({ positivePrompt: p, negativePrompt: n, width: 1024, height: 1024 });
  const res = await req({
    method: 'POST', hostname: HOST, path: PATH_GEN,
    headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  }, body);
  if (res.status !== 200) throw new Error('submitGen ' + res.status + ' ' + res.body.toString().slice(0, 200));
  return JSON.parse(res.body.toString()).data.info.taskId;
}

async function pollTask(p, taskId, maxSec = 360) {
  const tries = Math.ceil(maxSec / 5);
  for (let i = 0; i < tries; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const res = await req({
      method: 'GET', hostname: HOST, path: p + '/' + taskId,
      headers: { 'Authorization': 'Bearer ' + KEY },
    });
    if (res.status !== 200) continue;
    let j; try { j = JSON.parse(res.body.toString()); } catch { continue; }
    const st = j.data && j.data.info && j.data.info.status;
    if (st === 'completed') return j.data.info.result[0];
    if (st === 'failed') throw new Error(p + ' failed');
  }
  throw new Error('poll timeout ' + p);
}

async function submitRmbg(imageURL) {
  const body = JSON.stringify({ imageURL });
  const res = await req({
    method: 'POST', hostname: HOST, path: PATH_RMBG,
    headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  }, body);
  if (res.status !== 200) throw new Error('submitRmbg ' + res.status + ' ' + res.body.toString().slice(0, 200));
  return JSON.parse(res.body.toString()).data.info.taskId;
}

function detectImageExt(buf) {
  if (buf[0] === 0xFF && buf[1] === 0xD8) return 'jpg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return 'png';
  return null;
}

async function runOne(asset) {
  const log = (m) => console.log(`[${asset.id}] ${m}`);
  const p = readPrompt(asset.id);
  log('gen submit...');
  const genTid = await submitGen(p.positive, p.negative);
  log('gen task=' + genTid);
  const rawURL = await pollTask(PATH_GEN, genTid, 360);
  log('gen completed');

  // Choose ext based on URL hint, but verify by magic after download
  const urlExt = rawURL.toLowerCase().includes('.png') ? 'png' : 'jpg';
  const rawDst = path.join(ART_DIR, asset.cat, asset.id + '__v3__aiart.' + urlExt);
  fs.mkdirSync(path.dirname(rawDst), { recursive: true });
  await download(rawURL, rawDst);
  const ext = detectImageExt(fs.readFileSync(rawDst).slice(0, 8));
  if (!ext) throw new Error('unknown image magic');
  if (ext !== urlExt) {
    // rename to actual ext
    const fixed = rawDst.replace(/\.(jpg|png)$/i, '.' + ext);
    fs.renameSync(rawDst, fixed);
  }
  log('raw saved as .' + ext + ' (' + fs.statSync(rawDst.replace(/\.(jpg|png)$/i, '.' + ext)).size + 'B)');

  log('rmbg submit...');
  const rmbgTid = await submitRmbg(rawURL);
  log('rmbg task=' + rmbgTid);
  const outURL = await pollTask(PATH_RMBG, rmbgTid, 180);
  log('rmbg completed');

  const rmbgRaw = path.join(TMPDIR, asset.id + '__rmbg.png');
  await download(outURL, rmbgRaw);

  const dst = path.join(ART_DIR, asset.cat, asset.id + '.png');
  await sharp(rmbgRaw)
    .resize(asset.tw, asset.th, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(dst);
  log('final → ' + path.basename(dst) + ' (' + fs.statSync(dst).size + 'B)');
  return { id: asset.id, finalDst: path.relative(ROOT, dst), finalBytes: fs.statSync(dst).size };
}

(async () => {
  const t0 = Date.now();
  const results = [];
  // run all 4 in parallel
  const settled = await Promise.allSettled(REPAIR.map(runOne));
  settled.forEach((s, i) => {
    if (s.status === 'fulfilled') results.push({ ok: true, ...s.value });
    else results.push({ ok: false, id: REPAIR[i].id, error: s.reason.message });
  });
  console.log('\n--- DONE ---');
  console.log('elapsed=' + Math.round((Date.now() - t0) / 1000) + 's');
  for (const r of results) console.log(r.ok ? '  OK ' + r.id : '  FAIL ' + r.id + ' :: ' + r.error);
  fs.writeFileSync(path.join(ROOT, 'tmp/run_aiart_rmbg_repair_summary.json'), JSON.stringify(results, null, 2));
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
