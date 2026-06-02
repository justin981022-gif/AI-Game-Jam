// v3 re-roll for A-END-E01 / A-END-E02 only.
// CEO description in both prompts was revised to the canonical 5-piece set
// (massive horns / dark suit / orange tie / aviator sunglasses / rolled report scroll).
// Same pipeline as v2 (run_aiart_hr_endings.js, endings branch):
//   submit gen → poll → download raw jpg as __v3__aiart.jpg
//   → sharp.resize(1280,720, fit:cover) → overwrite <id>.png (RGB, no alpha)
// v1/v2 files are preserved.

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

const ASSETS = [
  { id: 'A-END-E01', cat: 'endings', tw: 1280, th: 720, versionTag: 'v3' },
  { id: 'A-END-E02', cat: 'endings', tw: 1280, th: 720, versionTag: 'v3' },
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
  if (!pos) throw new Error('no positive prompt for ' + id);
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

function detectExt(buf) {
  if (buf[0] === 0xFF && buf[1] === 0xD8) return 'jpg';
  if (buf[0] === 0x89 && buf[1] === 0x50) return 'png';
  return null;
}

// Exponential backoff retry: 1s, 2s, 4s. No Gemini fallback per brief.
async function withRetry(fn, label) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try { return await fn(); }
    catch (e) {
      lastErr = e;
      console.log(`[${label}] attempt ${attempt} failed: ${e.message}`);
      if (attempt < 3) {
        const delay = 1000 * Math.pow(2, attempt - 1);
        console.log(`[${label}] backoff ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  throw lastErr;
}

async function runOne(asset) {
  const log = (m) => console.log(`[${asset.id}] ${m}`);
  const p = readPrompt(asset.id);

  log('gen submit (with retry)...');
  const tid = await withRetry(() => submitGen(p.positive, p.negative), asset.id + ' submit');
  log('gen task=' + tid);

  const rawURL = await pollTask(PATH_GEN, tid, 360);
  log('gen completed');
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.v3.gen_url.txt'), rawURL);

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
  // endings: no alpha, fit cover crop to 16:9 (same as v2 pipeline)
  await sharp(actualRaw)
    .resize(asset.tw, asset.th, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 }).toFile(finalDst);
  log('final → ' + path.basename(finalDst) + ' (' + fs.statSync(finalDst).size + 'B)');
  return {
    id: asset.id,
    genTaskId: tid,
    rawDst: path.relative(ROOT, actualRaw),
    rawBytes: fs.statSync(actualRaw).size,
    finalDst: path.relative(ROOT, finalDst),
    finalBytes: fs.statSync(finalDst).size,
  };
}

(async () => {
  const t0 = Date.now();
  console.log('v3 endings re-roll: A-END-E01 + A-END-E02 (serial, no rmbg)');
  const results = [];
  for (const a of ASSETS) {
    try { results.push({ ok: true, ...await runOne(a) }); }
    catch (e) { results.push({ ok: false, id: a.id, error: e.message }); }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log('\n--- DONE ---');
  console.log('elapsed=' + Math.round((Date.now() - t0) / 1000) + 's');
  for (const r of results) console.log(r.ok ? '  OK ' + r.id + ' ' + r.finalBytes + 'B' : '  FAIL ' + r.id + ' :: ' + r.error);
  fs.writeFileSync(path.join(ROOT, 'tmp/run_aiart_endings_v3_summary.json'), JSON.stringify(results, null, 2));
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
