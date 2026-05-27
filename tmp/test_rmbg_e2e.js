// End-to-end probe: re-submit HR prompt, immediately call /remove-backgrounds,
// download whatever it returns. Goal: confirm rmbg returns a transparent PNG
// with interior whites preserved.

const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = process.env.AIART_API_KEY;
if (!KEY || !KEY.startsWith('st-')) { console.error('NO_KEY'); process.exit(99); }

const HOST = 'aiart.happyelements.com';
const PATH_GEN = '/api/v1/ai-fusion-openapi/images/generations';
const PATH_RMBG = '/api/v1/ai-fusion-openapi/images/remove-backgrounds';
const PROMPT_FILE = 'E:/SH01/aigamejam/design/art_prompts/A-CHR-HR.md';
const OUT_DIR = 'E:/SH01/aigamejam/tmp';

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

function readPrompt(file) {
  const md = fs.readFileSync(file, 'utf8');
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

async function submit(prompt, negative) {
  const body = JSON.stringify({ positivePrompt: prompt, negativePrompt: negative, width: 1024, height: 1024 });
  const res = await req({
    method: 'POST', hostname: HOST, path: PATH_GEN,
    headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  }, body);
  if (res.status !== 200) throw new Error('submit ' + res.status + ' ' + res.body.toString());
  return JSON.parse(res.body.toString()).data.info.taskId;
}

async function pollGen(taskId, maxSec = 180) {
  const tries = Math.ceil(maxSec / 5);
  for (let i = 0; i < tries; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const res = await req({
      method: 'GET', hostname: HOST, path: PATH_GEN + '/' + taskId,
      headers: { 'Authorization': 'Bearer ' + KEY },
    });
    if (res.status !== 200) continue;
    let j; try { j = JSON.parse(res.body.toString()); } catch { continue; }
    const st = j.data && j.data.info && j.data.info.status;
    if (st === 'completed') return j.data.info.result[0];
    if (st === 'failed') throw new Error('aiart failed');
  }
  throw new Error('poll timeout');
}

async function rmbg(imageURL) {
  const body = JSON.stringify({ imageURL });
  const res = await req({
    method: 'POST', hostname: HOST, path: PATH_RMBG,
    headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  }, body);
  console.log('RMBG STATUS', res.status);
  const text = res.body.toString();
  fs.writeFileSync(path.join(OUT_DIR, 'rmbg_hr_resp.json'), text);
  console.log('RMBG BODY_HEAD', text.slice(0, 600));
  return JSON.parse(text);
}

(async () => {
  console.log('[step1] read prompt');
  const p = readPrompt(PROMPT_FILE);
  console.log('[step2] submit aiart');
  const tid = await submit(p.positive, p.negative);
  console.log('  task =', tid);
  console.log('[step3] poll');
  const rawURL = await pollGen(tid);
  console.log('  rawURL =', rawURL);
  // save raw for A/B too
  const rawDst = path.join(OUT_DIR, 'rmbg_hr_e2e_raw.jpg');
  await download(rawURL, rawDst);
  console.log('  raw saved →', rawDst);

  console.log('[step4] call remove-backgrounds');
  const j = await rmbg(rawURL);

  // Try common response shapes
  const di = j.data && j.data.info;
  let outURL = null, taskId2 = null;
  if (di) {
    if (Array.isArray(di.result) && di.result[0]) outURL = di.result[0];
    else if (di.taskId) taskId2 = di.taskId;
    else if (di.status) console.log('status=', di.status);
  }
  if (taskId2) {
    console.log('[step5] async path, poll rmbg taskId =', taskId2);
    // try the same poll URL pattern on rmbg endpoint
    for (let i = 0; i < 36; i++) {
      await new Promise(r => setTimeout(r, 5000));
      const res = await req({
        method: 'GET', hostname: HOST, path: PATH_RMBG + '/' + taskId2,
        headers: { 'Authorization': 'Bearer ' + KEY },
      });
      console.log('  poll', i, 'status', res.status, 'body', res.body.toString().slice(0, 300));
      if (res.status === 200) {
        const k = JSON.parse(res.body.toString());
        const st = k.data && k.data.info && k.data.info.status;
        if (st === 'completed') { outURL = k.data.info.result[0]; break; }
        if (st === 'failed') throw new Error('rmbg failed');
      }
    }
  }

  if (!outURL) { console.log('No outURL — see rmbg_hr_resp.json'); return; }
  console.log('[step6] download transparent PNG');
  const dst = path.join(OUT_DIR, 'rmbg_hr_e2e.png');
  const bytes = await download(outURL, dst);
  console.log('  saved', dst, bytes, 'bytes');
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
