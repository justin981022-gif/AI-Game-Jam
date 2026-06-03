// BUST batch — 11 半身像 (6 candidate + 5 enemy) one-shot.
// All 11 use aiart gen → rmbg → sharp resize (contain) to 256×256 transparent PNG.
// Based on tmp/run_aiart_v1_1.js template.
// concurrency=10, gen poll=360s, rmbg poll=180s.

const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const KEY = process.env.AIART_API_KEY;
if (!KEY || !KEY.startsWith('st-')) { console.error('NO_KEY'); process.exit(99); }

const ROOT = 'E:/SH01/aigamejam';
const PROMPT_DIR = path.join(ROOT, 'design/art_prompts');
const ART_DIR = path.join(ROOT, 'atoms/assets/art');
const TMPDIR = path.join(ROOT, 'tmp/aiart_run_bust');
fs.mkdirSync(TMPDIR, { recursive: true });

const HOST = 'aiart.happyelements.com';
const PATH_GEN = '/api/v1/ai-fusion-openapi/images/generations';
const PATH_RMBG = '/api/v1/ai-fusion-openapi/images/remove-backgrounds';

// 11 BUST assets (all 256×256 transparent)
const ASSETS = [
  // 6 candidate bust → characters/
  { id: 'A-CHR-BUST-HR',         cat: 'characters', tw: 256, th: 256 },
  { id: 'A-CHR-BUST-GROOBAS',    cat: 'characters', tw: 256, th: 256 },
  { id: 'A-CHR-BUST-XIAOXING',   cat: 'characters', tw: 256, th: 256 },
  { id: 'A-CHR-BUST-GENERIC-1',  cat: 'characters', tw: 256, th: 256 },
  { id: 'A-CHR-BUST-GENERIC-2',  cat: 'characters', tw: 256, th: 256 },
  { id: 'A-CHR-BUST-GENERIC-3',  cat: 'characters', tw: 256, th: 256 },
  // 5 enemy bust → enemies/
  { id: 'A-ENE-BUST-W01',        cat: 'enemies',    tw: 256, th: 256 },
  { id: 'A-ENE-BUST-W02',        cat: 'enemies',    tw: 256, th: 256 },
  { id: 'A-ENE-BUST-W03',        cat: 'enemies',    tw: 256, th: 256 },
  { id: 'A-ENE-BUST-W04',        cat: 'enemies',    tw: 256, th: 256 },
  { id: 'A-ENE-BUST-ELITE',      cat: 'enemies',    tw: 256, th: 256 },
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

async function submitGen(positive, negative) {
  const body = JSON.stringify({ positivePrompt: positive, negativePrompt: negative, width: 1024, height: 1024 });
  const res = await req({
    method: 'POST', hostname: HOST, path: PATH_GEN,
    headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  }, body);
  if (res.status !== 200) throw new Error('submitGen ' + res.status + ' ' + res.body.toString().slice(0, 200));
  return JSON.parse(res.body.toString()).data.info.taskId;
}

async function pollTask(endpointPath, taskId, maxSec) {
  const tries = Math.ceil(maxSec / 5);
  for (let i = 0; i < tries; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const res = await req({
      method: 'GET', hostname: HOST, path: endpointPath + '/' + taskId,
      headers: { 'Authorization': 'Bearer ' + KEY },
    });
    if (res.status !== 200) continue;
    let j; try { j = JSON.parse(res.body.toString()); } catch { continue; }
    const st = j.data && j.data.info && j.data.info.status;
    if (st === 'completed') return j.data.info.result[0];
    if (st === 'failed') throw new Error(endpointPath + ' failed');
  }
  throw new Error('poll timeout ' + endpointPath);
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

async function runOne(asset, stats) {
  const log = (m) => console.log(`[${asset.id}] ${m}`);
  const p = readPrompt(asset.id);

  log('gen submit...');
  const genTid = await submitGen(p.positive, p.negative);
  stats.aiartGenCount++;
  log('gen task=' + genTid);
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.gen.txt'), genTid);

  const rawURL = await pollTask(PATH_GEN, genTid, 360);
  log('gen completed');
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.gen_url.txt'), rawURL);

  const urlExt = rawURL.toLowerCase().includes('.png') ? 'png' : 'jpg';
  let rawDst = path.join(ART_DIR, asset.cat, asset.id + '__v1__aiart.' + urlExt);
  fs.mkdirSync(path.dirname(rawDst), { recursive: true });
  await download(rawURL, rawDst);
  const head = fs.readFileSync(rawDst).slice(0, 8);
  const actualExt = detectImageExt(head);
  if (!actualExt) throw new Error('unknown image magic ' + head.toString('hex'));
  if (actualExt !== urlExt) {
    const fixed = rawDst.replace(/\.(jpg|png)$/i, '.' + actualExt);
    fs.renameSync(rawDst, fixed);
    rawDst = fixed;
  }
  log('raw saved .' + actualExt + ' (' + fs.statSync(rawDst).size + 'B)');

  const finalDst = path.join(ART_DIR, asset.cat, asset.id + '.png');
  fs.mkdirSync(path.dirname(finalDst), { recursive: true });

  // rmbg
  log('rmbg submit...');
  const rmbgTid = await submitRmbg(rawURL);
  stats.rmbgCount++;
  log('rmbg task=' + rmbgTid);
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.rmbg.txt'), rmbgTid);

  const outURL = await pollTask(PATH_RMBG, rmbgTid, 180);
  log('rmbg completed');
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.rmbg_url.txt'), outURL);

  const rmbgRaw = path.join(TMPDIR, asset.id + '__rmbg.png');
  await download(outURL, rmbgRaw);
  log('rmbg png ' + fs.statSync(rmbgRaw).size + 'B');

  await sharp(rmbgRaw)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
    .resize(asset.tw, asset.th, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(finalDst);
  log('final → ' + path.basename(finalDst) + ' (' + fs.statSync(finalDst).size + 'B, trim+resize)');

  return { id: asset.id, genTid, rmbgTid, opaque: false,
           rawDst: path.relative(ROOT, rawDst), finalDst: path.relative(ROOT, finalDst),
           finalBytes: fs.statSync(finalDst).size };
}

async function withLimit(items, limit, fn) {
  const out = new Array(items.length);
  let idx = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (true) {
      const i = idx++;
      if (i >= items.length) return;
      try { out[i] = { ok: true, result: await fn(items[i]) }; }
      catch (e) { out[i] = { ok: false, err: e.message }; }
    }
  });
  await Promise.all(workers);
  return out;
}

(async () => {
  const t0 = Date.now();
  const stats = { aiartGenCount: 0, rmbgCount: 0 };
  console.log(`BUST batch: ${ASSETS.length} assets, concurrency=10`);
  const results = await withLimit(ASSETS, 10, (a) => runOne(a, stats));
  const okList = [], failList = [];
  results.forEach((r, i) => {
    if (r.ok) okList.push(r.result);
    else failList.push({ id: ASSETS[i].id, err: r.err });
  });
  const summary = {
    total: ASSETS.length,
    ok: okList.length,
    failedCount: failList.length,
    failed: failList,
    aiartGenCount: stats.aiartGenCount,
    rmbgCount: stats.rmbgCount,
    elapsedSec: Math.round((Date.now() - t0) / 1000),
    ok_results: okList,
  };
  fs.writeFileSync(path.join(ROOT, 'tmp/bust_batch_log.json'), JSON.stringify(summary, null, 2));
  console.log(`\n--- DONE ---`);
  console.log(`ok=${okList.length}/${ASSETS.length}  elapsed=${summary.elapsedSec}s  aiartGen=${stats.aiartGenCount}  rmbg=${stats.rmbgCount}`);
  if (failList.length) { console.log('FAILED:'); for (const f of failList) console.log('  ' + f.id + ' :: ' + f.err); }
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
