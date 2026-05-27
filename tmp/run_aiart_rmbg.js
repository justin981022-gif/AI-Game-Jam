// 06c v3 — rmbg edition. For the 16 transparent assets, replace hand-rolled
// chroma-key with aiart's native /remove-backgrounds endpoint.
//
// Pipeline per asset:
//   submit gen → poll → download raw jpg (saved as <id>__v3__aiart.jpg)
//   → POST rmbg(rawURL) → poll rmbg → download transparent PNG
//   → sharp.resize(tw,th, fit:contain, alpha bg) → save <id>.png (overwrite final)
//
// Keeps __v1__ and __v2__ jpg history files intact for A/B.

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

// Only the 16 transparent assets — backgrounds & endings stay on old script.
const ASSETS = [
  { id: 'A-CHR-HR',           cat: 'characters',  tw: 768,  th: 1024 },
  { id: 'A-CHR-GROOBAS',      cat: 'characters',  tw: 768,  th: 1024 },
  { id: 'A-CHR-XIAOXING',     cat: 'characters',  tw: 768,  th: 1024 },
  { id: 'A-ENE-W01',          cat: 'enemies',     tw: 768,  th: 1024 },
  { id: 'A-ENE-W02',          cat: 'enemies',     tw: 768,  th: 1024 },
  { id: 'A-ENE-W03',          cat: 'enemies',     tw: 768,  th: 1024 },
  { id: 'A-ENE-W04',          cat: 'enemies',     tw: 768,  th: 1024 },
  { id: 'A-ENE-ELITE',        cat: 'enemies',     tw: 768,  th: 1024 },
  { id: 'A-UI-CARD-EVENT',    cat: 'ui',          tw: 900,  th: 600  },
  { id: 'A-UI-MAIL-CEO',      cat: 'ui',          tw: 800,  th: 500  },
  { id: 'A-UI-RESUME',        cat: 'ui',          tw: 600,  th: 800  },
  { id: 'A-UI-HPBAR',         cat: 'ui',          tw: 400,  th: 40   },
  { id: 'A-UI-TIMER',         cat: 'ui',          tw: 128,  th: 128  },
  { id: 'A-UI-BTN',           cat: 'ui',          tw: 256,  th: 96   },
  { id: 'A-PROP-SHARD-ICON',  cat: 'props',       tw: 128,  th: 128  },
  { id: 'A-EMOTE-CEO-STAMP',  cat: 'emotes',      tw: 256,  th: 256  },
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

async function pollTask(endpointPath, taskId, maxSec = 240) {
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

async function postProcess(rmbgPngPath, asset) {
  const dst = path.join(ART_DIR, asset.cat, asset.id + '.png');
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  await sharp(rmbgPngPath)
    .resize(asset.tw, asset.th, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(dst);
  return { dst, bytes: fs.statSync(dst).size };
}

async function withLimit(items, limit, fn) {
  const out = new Array(items.length);
  let idx = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (true) {
      const i = idx++;
      if (i >= items.length) return;
      try { out[i] = { ok: true, result: await fn(items[i], i) }; }
      catch (e) { out[i] = { ok: false, err: e.message }; }
    }
  });
  await Promise.all(workers);
  return out;
}

async function runOne(asset) {
  const log = (m) => console.log(`[${asset.id}] ${m}`);
  const p = readPrompt(asset.id);

  log('gen submit...');
  const genTid = await submitGen(p.positive, p.negative);
  log('gen task=' + genTid);
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.gen.txt'), genTid);

  const rawURL = await pollTask(PATH_GEN, genTid, 240);
  log('gen completed');
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.gen_url.txt'), rawURL);

  const rawDst = path.join(ART_DIR, asset.cat, asset.id + '__v3__aiart.jpg');
  fs.mkdirSync(path.dirname(rawDst), { recursive: true });
  await download(rawURL, rawDst);
  const head = fs.readFileSync(rawDst).slice(0, 4);
  if (!(head[0] === 0xff && head[1] === 0xd8)) throw new Error('bad jpeg magic');
  log('raw saved ' + fs.statSync(rawDst).size + 'B');

  log('rmbg submit...');
  const rmbgTid = await submitRmbg(rawURL);
  log('rmbg task=' + rmbgTid);
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.rmbg.txt'), rmbgTid);

  const outURL = await pollTask(PATH_RMBG, rmbgTid, 120);
  log('rmbg completed');
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.rmbg_url.txt'), outURL);

  const rmbgRaw = path.join(TMPDIR, asset.id + '__rmbg.png');
  await download(outURL, rmbgRaw);
  log('rmbg png ' + fs.statSync(rmbgRaw).size + 'B');

  const pp = await postProcess(rmbgRaw, asset);
  log('final → ' + path.basename(pp.dst) + ' (' + pp.bytes + 'B)');
  return { asset, genTid, rmbgTid, rawDst: path.relative(ROOT, rawDst), finalDst: path.relative(ROOT, pp.dst), finalBytes: pp.bytes };
}

(async () => {
  const t0 = Date.now();
  console.log(`v3 (rmbg) batch: ${ASSETS.length} assets, concurrency=8`);
  const results = await withLimit(ASSETS, 8, runOne);
  const ok = results.filter(r => r.ok).length;
  const failed = results.map((r, i) => r.ok ? null : { id: ASSETS[i].id, err: r.err }).filter(Boolean);
  const summary = {
    total: ASSETS.length,
    ok,
    failedCount: failed.length,
    failed,
    elapsedSec: Math.round((Date.now() - t0) / 1000),
    results: results.map((r, i) => r.ok ? r.result : { id: ASSETS[i].id, error: r.err }),
  };
  fs.writeFileSync(path.join(ROOT, 'tmp/run_aiart_rmbg_summary.json'), JSON.stringify(summary, null, 2));
  console.log(`\n--- DONE ---`);
  console.log(`ok=${ok}/${ASSETS.length}  elapsed=${summary.elapsedSec}s`);
  if (failed.length) { console.log('FAILED:'); for (const f of failed) console.log('  ' + f.id + ' :: ' + f.err); }
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
