// R4: regenerate A-UI-CARD-EVENT with wide landscape vertical option-button layout.
const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const KEY = process.env.AIART_API_KEY;
if (!KEY || !KEY.startsWith('st-')) {
  console.error('NO_KEY');
  process.exit(99);
}

const ROOT = 'E:/SH01/aigamejam';
const PROMPT_DIR = path.join(ROOT, 'design/art_prompts');
const ATOMS_ART_DIR = path.join(ROOT, 'atoms/assets/art');
const DUNGEON_DIR = fs.readdirSync(path.join(ROOT, 'atoms')).find((name) => name.includes('Dungeon'));
const FRONTEND_PUBLIC_ART_DIR = path.join(ROOT, 'atoms', DUNGEON_DIR, 'app/frontend/public/art');
const FRONTEND_ASSETS_ART_DIR = path.join(ROOT, 'atoms', DUNGEON_DIR, 'assets/art');
const HOST = 'aiart.happyelements.com';
const GEN_BASE = '/api/v1/ai-fusion-openapi/images/generations';

const TARGET = {
  id: 'A-UI-CARD-EVENT',
  cat: 'ui',
  tw: 900,
  th: 600,
  v: 4,
};

function readPrompt(id) {
  const md = fs.readFileSync(path.join(PROMPT_DIR, id + '.md'), 'utf8');
  const blocks = [];
  let curSection = null;
  let inFence = false;
  let buf = [];
  for (const line of md.split(/\r?\n/)) {
    const heading = line.match(/^## (.+)$/);
    if (heading) {
      curSection = heading[1].trim();
      continue;
    }
    if (/^```/.test(line)) {
      if (!inFence) {
        inFence = true;
        buf = [];
      } else {
        inFence = false;
        blocks.push({ section: curSection, body: buf.join('\n').trim() });
      }
      continue;
    }
    if (inFence) buf.push(line);
  }
  const pos = blocks.find((b) => /正向\s*Prompt/.test(b.section || ''));
  const neg = blocks.find((b) => /反向\s*Prompt/.test(b.section || ''));
  if (!pos) throw new Error(`missing positive prompt: ${id}`);
  return { positive: pos.body, negative: neg ? neg.body : '' };
}

function req(opts, body) {
  return new Promise((resolve, reject) => {
    const r = https.request(opts, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }));
    });
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}

async function submit(positive, negative) {
  const body = JSON.stringify({
    positivePrompt: positive,
    negativePrompt: negative,
    width: 1024,
    height: 1024,
  });
  const res = await req({
    method: 'POST',
    hostname: HOST,
    path: GEN_BASE,
    headers: {
      Authorization: 'Bearer ' + KEY,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  }, body);
  if (res.status !== 200) {
    throw new Error(`submit ${res.status} ${res.body.toString().slice(0, 300)}`);
  }
  return JSON.parse(res.body.toString()).data.info.taskId;
}

async function poll(taskId) {
  for (let i = 0; i < 72; i++) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const res = await req({
      method: 'GET',
      hostname: HOST,
      path: `${GEN_BASE}/${taskId}`,
      headers: { Authorization: 'Bearer ' + KEY },
    });
    let json;
    try {
      json = JSON.parse(res.body.toString());
    } catch {
      continue;
    }
    const status = json.data && json.data.info && json.data.info.status;
    console.log(`[${TARGET.id}] poll ${i + 1}: ${status || 'unknown'}`);
    if (status === 'completed') return json.data.info.result[0];
    if (status === 'failed') throw new Error('aiart failed');
  }
  throw new Error('poll timeout');
}

function download(url, dst) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https.get({ hostname: u.hostname, path: u.pathname + u.search }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`download ${res.statusCode}`));
        return;
      }
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      const file = fs.createWriteStream(dst);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

async function postProcess(srcPath) {
  const meta = await sharp(srcPath).metadata();
  const width = meta.width;
  const height = meta.height;
  const { data } = await sharp(srcPath).removeAlpha().raw().toBuffer({ resolveWithObject: true });

  function sampleBox(x0, y0) {
    let r = 0;
    let g = 0;
    let b = 0;
    let n = 0;
    for (let y = y0; y < y0 + 32; y++) {
      for (let x = x0; x < x0 + 32; x++) {
        const i = (y * width + x) * 3;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        n += 1;
      }
    }
    return [r / n, g / n, b / n];
  }

  const corners = [
    sampleBox(0, 0),
    sampleBox(width - 32, 0),
    sampleBox(0, height - 32),
    sampleBox(width - 32, height - 32),
  ];
  const median = (values) => {
    const sorted = [...values].sort((a, b) => a - b);
    return (sorted[1] + sorted[2]) / 2;
  };
  const keyR = median(corners.map((c) => c[0]));
  const keyG = median(corners.map((c) => c[1]));
  const keyB = median(corners.map((c) => c[2]));
  const hard = 24;
  const soft = 56;
  const out = Buffer.alloc(width * height * 4);
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const d = Math.sqrt((r - keyR) ** 2 + (g - keyG) ** 2 + (b - keyB) ** 2);
      let alpha;
      if (d <= hard) alpha = 0;
      else if (d >= soft) alpha = 255;
      else alpha = Math.round(255 * (d - hard) / (soft - hard));
      const j = (y * width + x) * 4;
      out[j] = r;
      out[j + 1] = g;
      out[j + 2] = b;
      out[j + 3] = alpha;
      if (alpha > 16) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 8;
  const bx = Math.max(0, minX - pad);
  const by = Math.max(0, minY - pad);
  const bw = Math.min(width - bx, maxX - minX + 2 * pad + 1);
  const bh = Math.min(height - by, maxY - minY + 2 * pad + 1);
  const finalBuffer = await sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left: bx, top: by, width: bw, height: bh })
    .resize(TARGET.tw, TARGET.th, { fit: 'fill' })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const outputs = [
    path.join(ATOMS_ART_DIR, TARGET.cat, TARGET.id + '.png'),
    path.join(FRONTEND_PUBLIC_ART_DIR, TARGET.cat, TARGET.id + '.png'),
    path.join(FRONTEND_ASSETS_ART_DIR, TARGET.cat, TARGET.id + '.png'),
  ];
  for (const dst of outputs) {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.writeFileSync(dst, finalBuffer);
  }
  const finalMeta = await sharp(finalBuffer).metadata();
  return { outputs, width: finalMeta.width, height: finalMeta.height, bytes: finalBuffer.length };
}

(async () => {
  const prompt = readPrompt(TARGET.id);
  console.log(`[${TARGET.id}] submit R${TARGET.v}...`);
  const taskId = await submit(prompt.positive, prompt.negative);
  console.log(`[${TARGET.id}] task=${taskId}`);
  const url = await poll(taskId);
  const raw = path.join(ATOMS_ART_DIR, TARGET.cat, `${TARGET.id}__v${TARGET.v}__aiart.jpg`);
  await download(url, raw);
  const result = await postProcess(raw);
  console.log(`[${TARGET.id}] R${TARGET.v} OUT ${result.width}x${result.height} ${result.bytes}B`);
  for (const output of result.outputs) console.log(`  ${output}`);
})().catch((error) => {
  console.error(`[${TARGET.id}] FAIL ${error.stack || error.message}`);
  process.exit(1);
});
