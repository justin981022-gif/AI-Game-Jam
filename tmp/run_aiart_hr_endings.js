// Re-roll HR (cuteness + female prompt tightened) and E01/E02 (HR description aligned to v3 female).
// HR runs through rmbg; endings skip rmbg (transparent:false) and just resize cover 16:9.

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

const HOST = 'aiart.happyelements.com';
const PATH_GEN = '/api/v1/ai-fusion-openapi/images/generations';
const PATH_RMBG = '/api/v1/ai-fusion-openapi/images/remove-backgrounds';

const ASSETS = [
  { id: 'A-CHR-HR',  cat: 'characters', tw: 768,  th: 1024, transparent: true,  versionTag: 'v4' },
  { id: 'A-END-E01', cat: 'endings',    tw: 1280, th: 720,  transparent: false, versionTag: 'v2' },
  { id: 'A-END-E02', cat: 'endings',    tw: 1280, th: 720,  transparent: false, versionTag: 'v2' },
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
      const chunks = []; res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
    });
    r.on('error', reject); if (body) r.write(body); r.end();
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
  if (res.status !== 200) throw new Error('submitGen ' + res.status);
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
  if (res.status !== 200) throw new Error('submitRmbg ' + res.status);
  return JSON.parse(res.body.toString()).data.info.taskId;
}

function detectExt(buf) {
  if (buf[0] === 0xFF && buf[1] === 0xD8) return 'jpg';
  if (buf[0] === 0x89 && buf[1] === 0x50) return 'png';
  return null;
}

async function runOne(asset) {
  const log = (m) => console.log(`[${asset.id}] ${m}`);
  const p = readPrompt(asset.id);
  log('gen submit...');
  const tid = await submitGen(p.positive, p.negative);
  log('gen task=' + tid);
  const rawURL = await pollTask(PATH_GEN, tid, 360);
  log('gen completed');

  const urlExt = rawURL.toLowerCase().includes('.png') ? 'png' : 'jpg';
  const rawDst = path.join(ART_DIR, asset.cat, asset.id + '__' + asset.versionTag + '__aiart.' + urlExt);
  fs.mkdirSync(path.dirname(rawDst), { recursive: true });
  await download(rawURL, rawDst);
  const actualExt = detectExt(fs.readFileSync(rawDst).slice(0, 8));
  let actualRaw = rawDst;
  if (actualExt && actualExt !== urlExt) {
    actualRaw = rawDst.replace(/\.(jpg|png)$/i, '.' + actualExt);
    fs.renameSync(rawDst, actualRaw);
  }
  log('raw saved as .' + (actualExt || urlExt) + ' (' + fs.statSync(actualRaw).size + 'B)');

  const finalDst = path.join(ART_DIR, asset.cat, asset.id + '.png');
  if (asset.transparent) {
    log('rmbg submit...');
    const rmbgTid = await submitRmbg(rawURL);
    log('rmbg task=' + rmbgTid);
    const outURL = await pollTask(PATH_RMBG, rmbgTid, 180);
    log('rmbg completed');
    const rmbgRaw = path.join(TMPDIR, asset.id + '__rmbg.png');
    await download(outURL, rmbgRaw);
    await sharp(rmbgRaw)
      .resize(asset.tw, asset.th, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 }).toFile(finalDst);
  } else {
    // endings: no alpha, fit cover crop to 16:9
    await sharp(actualRaw)
      .resize(asset.tw, asset.th, { fit: 'cover', position: 'centre' })
      .png({ compressionLevel: 9 }).toFile(finalDst);
  }
  log('final → ' + path.basename(finalDst) + ' (' + fs.statSync(finalDst).size + 'B)');
  return { id: asset.id, final: path.relative(ROOT, finalDst), bytes: fs.statSync(finalDst).size };
}

(async () => {
  const t0 = Date.now();
  const settled = await Promise.allSettled(ASSETS.map(runOne));
  const results = settled.map((s, i) => s.status === 'fulfilled'
    ? { ok: true, ...s.value }
    : { ok: false, id: ASSETS[i].id, error: s.reason.message });
  console.log('\n--- DONE ---');
  console.log('elapsed=' + Math.round((Date.now() - t0) / 1000) + 's');
  for (const r of results) console.log(r.ok ? '  OK ' + r.id : '  FAIL ' + r.id + ' :: ' + r.error);
  fs.writeFileSync(path.join(ROOT, 'tmp/run_aiart_hr_endings_summary.json'), JSON.stringify(results, null, 2));
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
