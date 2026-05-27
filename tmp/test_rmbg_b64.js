const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = process.env.AIART_API_KEY;
const HOST = 'aiart.happyelements.com';
const PATH_RMBG = '/api/v1/ai-fusion-openapi/images/remove-backgrounds';
const SRC = 'E:/SH01/aigamejam/atoms/assets/art/characters/A-CHR-HR__v2__aiart.jpg';

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

(async () => {
  const b64 = fs.readFileSync(SRC).toString('base64');
  const dataUri = 'data:image/jpeg;base64,' + b64;
  const candidates = [
    { imageURL: dataUri },
    { image: dataUri },
    { imageBase64: b64 },
  ];
  for (const c of candidates) {
    const body = JSON.stringify(c);
    const keyName = Object.keys(c)[0];
    const sample = c[keyName].slice(0, 50);
    console.log(`\n--- TRY field=${keyName} len=${c[keyName].length} sample=${sample}...`);
    const res = await req({
      method: 'POST', hostname: HOST, path: PATH_RMBG,
      headers: {
        'Authorization': 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, body);
    console.log('STATUS', res.status, 'BODY_HEAD', res.body.toString().slice(0, 400));
  }
})();
