// Probe aiart /remove-backgrounds endpoint with the existing HR v1 URL.
// Goal: see (1) is the old CDN URL still valid, (2) sync or async response,
// (3) returns URL or base64, (4) does the result really preserve interior whites.

const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = process.env.AIART_API_KEY;
if (!KEY || !KEY.startsWith('st-')) { console.error('NO_KEY'); process.exit(99); }

const HOST = 'aiart.happyelements.com';
const PATH = '/api/v1/ai-fusion-openapi/images/remove-backgrounds';

const TEST_URL = 'https://aiart-artifacts.happyelements.com/resources/images/cd/04/42/cd044284a6eb';
const OUT_DIR = 'E:/SH01/aigamejam/tmp';

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

(async () => {
  const body = JSON.stringify({ imageURL: TEST_URL });
  console.log('POST', `https://${HOST}${PATH}`);
  console.log('BODY', body);
  const res = await req({
    method: 'POST', hostname: HOST, path: PATH,
    headers: {
      'Authorization': 'Bearer ' + KEY,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  }, body);
  console.log('STATUS', res.status);
  const text = res.body.toString();
  fs.writeFileSync(path.join(OUT_DIR, 'rmbg_resp.json'), text);
  console.log('RESP_HEAD', text.slice(0, 800));

  // Try common shapes
  let j; try { j = JSON.parse(text); } catch { console.log('Not JSON, stopped.'); return; }

  // Sync: { data: { info: { result: ['url'] } } } or { imageURL: 'url' } or taskId?
  const dataInfo = j.data && j.data.info;
  if (dataInfo) {
    if (Array.isArray(dataInfo.result) && dataInfo.result[0]) {
      const url = dataInfo.result[0];
      console.log('Detected sync result url:', url);
      const dst = path.join(OUT_DIR, 'rmbg_hr_test.png');
      const bytes = await download(url, dst);
      console.log('Downloaded', dst, bytes, 'bytes');
      return;
    }
    if (dataInfo.taskId) {
      console.log('Async path detected, taskId =', dataInfo.taskId, '— extend poll later.');
      return;
    }
    if (dataInfo.status) {
      console.log('Status field present:', dataInfo.status, '— may need poll.');
    }
  }
  console.log('Unknown response shape — see tmp/rmbg_resp.json');
})();
