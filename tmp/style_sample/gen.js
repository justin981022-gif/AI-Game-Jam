const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = process.env.AIART_API_KEY;
if (!KEY || !KEY.startsWith('st-')) { console.error('NO_KEY'); process.exit(99); }

const STYLE = `flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI`;

const ASSETS = [
  { id: 'sample_hr_director', desc: `single character portrait of "HR Director", weary cartoon female human in beige business blazer over white shirt, crooked employee badge lanyard reading "HR", messy dark hair tied in a bun, holding a clipboard stack of monster resumes, slight dark circles under round oversized eyes, deadpan tired expression, centered front-facing bust shot, plain neutral grey background, no other characters` },
  { id: 'sample_xiaoxing_skull_mage', desc: `single character portrait of "Xiaoxing the Skeleton Mage", a friendly cartoon skeleton with simple round eye sockets and chibi proportions, wearing oversized dusty purple wizard robes with a loose office necktie around the neck vertebrae, an employee badge clipped to robe collar, hardcover spellbook half-stuffed into a leather corporate satchel briefcase slung over shoulder, slight resigned office slouch, centered front-facing bust shot, plain neutral grey background, no other characters, monster character in white-collar workplace attire` }
];

const NEG = `photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, gradient fills, soft airbrush shading, blood, gore, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, modern brand logos, smartphones, text, watermark, signature, low quality, blurry, anatomically incorrect, extra limbs, deformed hands, NSFW`;

function req(opts, body) {
  return new Promise((resolve, reject) => {
    const r = https.request(opts, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve({ status: res.statusCode, body: d, headers: res.headers }));
    });
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}

async function submit(prompt) {
  const body = JSON.stringify({ positivePrompt: prompt, negativePrompt: NEG, width: 1024, height: 1024 });
  const res = await req({
    method: 'POST', hostname: 'aiart.happyelements.com', path: '/api/v1/ai-fusion-openapi/images/generations',
    headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, body);
  if (res.status !== 200) throw new Error('submit ' + res.status + ' ' + res.body.slice(0,300));
  const j = JSON.parse(res.body);
  return j.data.info.taskId;
}
async function poll(taskId) {
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const res = await req({
      method: 'GET', hostname: 'aiart.happyelements.com', path: '/api/v1/ai-fusion-openapi/images/generations/' + taskId,
      headers: { 'Authorization': 'Bearer ' + KEY }
    });
    const j = JSON.parse(res.body);
    const st = j.data.info.status;
    if (st === 'completed') return j.data.info.result[0];
    if (st === 'failed') throw new Error('failed: ' + JSON.stringify(j));
  }
  throw new Error('poll timeout');
}
function download(url, dst) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https.get({ hostname: u.hostname, path: u.pathname + u.search }, res => {
      if (res.statusCode !== 200) return reject(new Error('dl ' + res.statusCode));
      const f = fs.createWriteStream(dst); res.pipe(f); f.on('finish', () => f.close(resolve));
    }).on('error', reject);
  });
}

(async () => {
  const results = [];
  for (const a of ASSETS) {
    const prompt = STYLE + ', ' + a.desc;
    console.log('[' + a.id + '] submitting...');
    const tid = await submit(prompt);
    console.log('[' + a.id + '] task=' + tid);
    const url = await poll(tid);
    console.log('[' + a.id + '] url=' + url);
    const dst = path.join('E:/SH01/aigamejam/tmp/style_sample', a.id + '.jpg');
    await download(url, dst);
    const stat = fs.statSync(dst);
    console.log('[' + a.id + '] saved ' + dst + ' (' + stat.size + ' bytes)');
    results.push({ id: a.id, file: dst, url });
  }
  fs.writeFileSync('E:/SH01/aigamejam/tmp/style_sample/results.json', JSON.stringify(results, null, 2));
  console.log('DONE');
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
