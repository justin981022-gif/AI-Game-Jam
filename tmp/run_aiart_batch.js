// 06c batch image generation — runs all 22 assets through aiart in parallel.
// Reads design/art_prompts/<id>.md, submits, polls, downloads, post-processes.

const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const KEY = process.env.AIART_API_KEY;
if (!KEY || !KEY.startsWith('st-')) { console.error('NO_KEY'); process.exit(99); }

const ROOT = 'E:/SH01/aigamejam';
const PROMPT_DIR = path.join(ROOT, 'design/art_prompts');
const ART_DIR = path.join(ROOT, 'atoms/assets/art');
const TMPDIR = path.join(ROOT, 'tmp/aiart_run');
fs.mkdirSync(TMPDIR, { recursive: true });

const HOST = 'aiart.happyelements.com';
const BASE = '/api/v1/ai-fusion-openapi/images/generations';

// ---- 22 asset registry: id, category, target W/H, transparent (chroma-key) ----
const ASSETS = [
  // backgrounds — keep grey, no alpha, fit cover to 16:9
  { id: 'A-BG-PREP',          cat: 'backgrounds', tw: 1920, th: 1080, transparent: false },
  { id: 'A-BG-BATTLE',        cat: 'backgrounds', tw: 1920, th: 1080, transparent: false },
  // characters — chroma-key the grey, fit 768×1024
  { id: 'A-CHR-HR',           cat: 'characters',  tw: 768,  th: 1024, transparent: true  },
  { id: 'A-CHR-GROOBAS',      cat: 'characters',  tw: 768,  th: 1024, transparent: true  },
  { id: 'A-CHR-XIAOXING',     cat: 'characters',  tw: 768,  th: 1024, transparent: true  },
  // enemies — chroma-key
  { id: 'A-ENE-W01',          cat: 'enemies',     tw: 768,  th: 1024, transparent: true  },
  { id: 'A-ENE-W02',          cat: 'enemies',     tw: 768,  th: 1024, transparent: true  },
  { id: 'A-ENE-W03',          cat: 'enemies',     tw: 768,  th: 1024, transparent: true  },
  { id: 'A-ENE-W04',          cat: 'enemies',     tw: 768,  th: 1024, transparent: true  },
  { id: 'A-ENE-ELITE',        cat: 'enemies',     tw: 768,  th: 1024, transparent: true  },
  // UI — chroma-key + various aspect
  { id: 'A-UI-CARD-EVENT',    cat: 'ui',          tw: 900,  th: 600,  transparent: true  },
  { id: 'A-UI-MAIL-CEO',      cat: 'ui',          tw: 800,  th: 500,  transparent: true  },
  { id: 'A-UI-RESUME',        cat: 'ui',          tw: 600,  th: 800,  transparent: true  },
  { id: 'A-UI-HPBAR',         cat: 'ui',          tw: 400,  th: 40,   transparent: true  },
  { id: 'A-UI-TIMER',         cat: 'ui',          tw: 128,  th: 128,  transparent: true  },
  { id: 'A-UI-BTN',           cat: 'ui',          tw: 256,  th: 96,   transparent: true  },
  // props
  { id: 'A-PROP-SHARD-ICON',  cat: 'props',       tw: 128,  th: 128,  transparent: true  },
  // endings — keep scene, no alpha, fit 16:9
  { id: 'A-END-E01',          cat: 'endings',     tw: 1280, th: 720,  transparent: false },
  { id: 'A-END-E02',          cat: 'endings',     tw: 1280, th: 720,  transparent: false },
  { id: 'A-END-E03',          cat: 'endings',     tw: 1280, th: 720,  transparent: false },
  { id: 'A-END-E04',          cat: 'endings',     tw: 1280, th: 720,  transparent: false },
  // emotes
  { id: 'A-EMOTE-CEO-STAMP',  cat: 'emotes',      tw: 256,  th: 256,  transparent: true  },
];

function readPrompt(id) {
  const md = fs.readFileSync(path.join(PROMPT_DIR, id + '.md'), 'utf8');
  const lines = md.split(/\r?\n/);
  const blocks = []; // {section, body}
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
  if (!pos) throw new Error('no positive prompt for ' + id);
  return { positive: pos.body, negative: neg ? neg.body : '' };
}

function req(opts, body) {
  return new Promise((resolve, reject) => {
    const r = https.request(opts, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks), headers: res.headers }));
    });
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}

async function submit(prompt, negative) {
  const body = JSON.stringify({
    positivePrompt: prompt,
    negativePrompt: negative,
    width: 1024,
    height: 1024,
  });
  const res = await req({
    method: 'POST', hostname: HOST, path: BASE,
    headers: {
      'Authorization': 'Bearer ' + KEY,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  }, body);
  if (res.status !== 200) throw new Error('submit ' + res.status + ' ' + res.body.toString().slice(0, 300));
  const j = JSON.parse(res.body.toString());
  return j.data.info.taskId;
}

async function poll(taskId, maxSec = 180) {
  const tries = Math.ceil(maxSec / 5);
  for (let i = 0; i < tries; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const res = await req({
      method: 'GET', hostname: HOST, path: BASE + '/' + taskId,
      headers: { 'Authorization': 'Bearer ' + KEY },
    });
    let j;
    try { j = JSON.parse(res.body.toString()); } catch (e) { continue; }
    const st = j.data && j.data.info && j.data.info.status;
    if (st === 'completed') return j.data.info.result[0];
    if (st === 'failed') throw new Error('aiart failed: ' + JSON.stringify(j).slice(0, 400));
  }
  throw new Error('aiart poll timeout for ' + taskId);
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

// ---- Post-process ----
// Approach:
//   For !transparent:  resize JPEG → fit/cover into target box, save PNG (RGB).
//   For transparent:   sample 4 corners → median grey key → tolerance-based alpha,
//                      then auto-trim, then resize to target preserving aspect.

async function postProcess(srcJpg, asset) {
  const dst = path.join(ART_DIR, asset.cat, asset.id + '.png');
  fs.mkdirSync(path.dirname(dst), { recursive: true });

  if (!asset.transparent) {
    // Cover-fit to target (crop center if aspect differs).
    await sharp(srcJpg)
      .resize(asset.tw, asset.th, { fit: 'cover', position: 'centre' })
      .png({ compressionLevel: 9 })
      .toFile(dst);
    const stat = fs.statSync(dst);
    return { dst, bytes: stat.size, alpha: false };
  }

  // Transparent path: chroma-key the grey background.
  const meta = await sharp(srcJpg).metadata();
  const W = meta.width, H = meta.height;
  const { data } = await sharp(srcJpg).raw().toBuffer({ resolveWithObject: true });
  // sample 4 corners, 32px box average
  function sampleBox(x0, y0) {
    let r=0,g=0,b=0,n=0;
    for (let y = y0; y < y0 + 32; y++) {
      for (let x = x0; x < x0 + 32; x++) {
        const i = (y * W + x) * 3;
        r += data[i]; g += data[i+1]; b += data[i+2]; n++;
      }
    }
    return [r/n, g/n, b/n];
  }
  const corners = [sampleBox(0,0), sampleBox(W-32,0), sampleBox(0,H-32), sampleBox(W-32,H-32)];
  // median per-channel
  function median(arr){ const s=[...arr].sort((a,b)=>a-b); return (s[1]+s[2])/2; }
  const keyR = median(corners.map(c=>c[0]));
  const keyG = median(corners.map(c=>c[1]));
  const keyB = median(corners.map(c=>c[2]));

  // build RGBA buffer with smooth alpha falloff
  const TOL_HARD = 24;   // ΔE inside → fully transparent
  const TOL_SOFT = 56;   // ΔE outside → fully opaque, between → linear
  const out = Buffer.alloc(W * H * 4);
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      const r = data[i], g = data[i+1], b = data[i+2];
      const d = Math.sqrt((r-keyR)**2 + (g-keyG)**2 + (b-keyB)**2);
      let a;
      if (d <= TOL_HARD) a = 0;
      else if (d >= TOL_SOFT) a = 255;
      else a = Math.round(255 * (d - TOL_HARD) / (TOL_SOFT - TOL_HARD));
      const j = (y * W + x) * 4;
      out[j] = r; out[j+1] = g; out[j+2] = b; out[j+3] = a;
      if (a > 16) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  // bounding box, with small padding
  const PAD = 8;
  const bx = Math.max(0, minX - PAD);
  const by = Math.max(0, minY - PAD);
  const bw = Math.min(W - bx, (maxX - minX) + 2 * PAD + 1);
  const bh = Math.min(H - by, (maxY - minY) + 2 * PAD + 1);

  let pipeline = sharp(out, { raw: { width: W, height: H, channels: 4 } })
    .extract({ left: bx, top: by, width: bw, height: bh });

  // Fit to target preserving aspect; pad transparent.
  pipeline = pipeline.resize(asset.tw, asset.th, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  await pipeline.png({ compressionLevel: 9 }).toFile(dst);
  const stat = fs.statSync(dst);
  return { dst, bytes: stat.size, alpha: true, key: [keyR|0, keyG|0, keyB|0], bbox: [bx, by, bw, bh] };
}

// ---- Concurrency limiter ----
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

// ---- Per-asset pipeline ----
async function runOne(asset) {
  const log = (m) => console.log(`[${asset.id}] ${m}`);
  const prompt = readPrompt(asset.id);
  log('submit...');
  const taskId = await submit(prompt.positive, prompt.negative);
  log('task=' + taskId);
  fs.writeFileSync(path.join(TMPDIR, asset.id + '.task.txt'), taskId);
  const url = await poll(taskId);
  log('completed url=' + url.slice(0, 80));
  const rawDst = path.join(ART_DIR, asset.cat, asset.id + '__v1__aiart.jpg');
  fs.mkdirSync(path.dirname(rawDst), { recursive: true });
  await download(url, rawDst);
  const rawSize = fs.statSync(rawDst).size;
  log('saved raw ' + rawSize + ' bytes');
  // verify JPEG magic
  const head = fs.readFileSync(rawDst).slice(0, 4);
  if (!(head[0] === 0xff && head[1] === 0xd8)) throw new Error('bad jpeg magic');
  const pp = await postProcess(rawDst, asset);
  log('post-process → ' + path.basename(pp.dst) + ' (' + pp.bytes + 'B, alpha=' + pp.alpha + ')');
  return { asset, taskId, url, rawDst, pp };
}

// ---- Main ----
(async () => {
  const t0 = Date.now();
  console.log(`Starting batch: ${ASSETS.length} assets, concurrency=10`);
  const results = await withLimit(ASSETS, 10, runOne);
  const ok = results.filter(r => r.ok).length;
  const failed = results.map((r, i) => r.ok ? null : { id: ASSETS[i].id, err: r.err }).filter(Boolean);
  const summary = {
    total: ASSETS.length,
    ok, failed,
    elapsedSec: Math.round((Date.now() - t0) / 1000),
    results: results.map((r, i) => r.ok ? {
      id: ASSETS[i].id, cat: ASSETS[i].cat,
      taskId: r.result.taskId, url: r.result.url,
      raw: path.relative(ROOT, r.result.rawDst),
      out: path.relative(ROOT, r.result.pp.dst),
      bytes: r.result.pp.bytes, alpha: r.result.pp.alpha,
    } : { id: ASSETS[i].id, error: r.err }),
  };
  fs.writeFileSync(path.join(ROOT, 'tmp/aiart_run/summary.json'), JSON.stringify(summary, null, 2));
  console.log('--- DONE ---');
  console.log(`ok=${ok}/${ASSETS.length}  failed=${failed.length}  elapsed=${summary.elapsedSec}s`);
  if (failed.length) {
    console.log('FAILED:');
    for (const f of failed) console.log('  ' + f.id + ' :: ' + f.err);
    process.exit(1);
  }
})().catch(e => { console.error('FATAL', e.stack || e.message); process.exit(1); });
