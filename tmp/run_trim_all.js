// 修复所有透明资产的"trim 缺失"问题：
// 现状：rmbg 输出 1024×1024 透明 PNG（主体只占中心一小块），脚本直接 resize
// 到 canonical 尺寸 → 主体只占 texture 20-40%，atoms（Unity 等）按 texture
// size 摆放时尺寸/对位错乱
//
// 修法：先 sharp.trim() 切掉透明边 → 再 resize(target, fit:'contain')
//      画布最终尺寸不变（atlas 约定不变），但主体填满 max axis（典型 70-95%）。
//
// 原地覆盖 atoms/assets/art/**/<id>.png；__v1__aiart.png 历史版本不动。

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = 'E:/SH01/aigamejam';
const ART = path.join(ROOT, 'atoms/assets/art');

// Asset spec: id → [category, targetW, targetH]
// 仅含透明资产（不含 backgrounds / endings / A-UI-TITLE）
const SPEC = {
  // characters 立绘
  'A-CHR-HR':           ['characters', 768, 1024],
  'A-CHR-GROOBAS':      ['characters', 768, 1024],
  'A-CHR-XIAOXING':     ['characters', 768, 1024],
  'A-CHR-GENERIC-1':    ['characters', 768, 1024],
  'A-CHR-GENERIC-2':    ['characters', 768, 1024],
  'A-CHR-GENERIC-3':    ['characters', 768, 1024],
  // characters 半身像
  'A-CHR-BUST-HR':         ['characters', 256, 256],
  'A-CHR-BUST-GROOBAS':    ['characters', 256, 256],
  'A-CHR-BUST-XIAOXING':   ['characters', 256, 256],
  'A-CHR-BUST-GENERIC-1':  ['characters', 256, 256],
  'A-CHR-BUST-GENERIC-2':  ['characters', 256, 256],
  'A-CHR-BUST-GENERIC-3':  ['characters', 256, 256],
  // enemies 立绘
  'A-ENE-W01':    ['enemies', 768, 1024],
  'A-ENE-W02':    ['enemies', 768, 1024],
  'A-ENE-W03':    ['enemies', 768, 1024],
  'A-ENE-W04':    ['enemies', 768, 1024],
  'A-ENE-ELITE':  ['enemies', 768, 1024],
  // enemies 半身像
  'A-ENE-BUST-W01':    ['enemies', 256, 256],
  'A-ENE-BUST-W02':    ['enemies', 256, 256],
  'A-ENE-BUST-W03':    ['enemies', 256, 256],
  'A-ENE-BUST-W04':    ['enemies', 256, 256],
  'A-ENE-BUST-ELITE':  ['enemies', 256, 256],
  // UI 透明
  'A-UI-CARD-EVENT':  ['ui', 900, 600],
  'A-UI-MAIL-CEO':    ['ui', 800, 500],
  'A-UI-RESUME':      ['ui', 600, 800],
  'A-UI-HPBAR':       ['ui', 400, 40],
  'A-UI-TIMER':       ['ui', 128, 128],
  'A-UI-BTN':         ['ui', 256, 96],
  'A-UI-RESULT':      ['ui', 900, 700],
  'A-UI-TOAST':       ['ui', 600, 160],
  'A-UI-ICO-PAUSE':   ['ui', 128, 128],
  'A-UI-ICO-VOLUME':  ['ui', 128, 128],
  'A-UI-ICO-RESTART': ['ui', 128, 128],
  // props
  'A-PROP-SHARD-ICON': ['props', 128, 128],
  // emotes
  'A-EMOTE-CEO-STAMP': ['emotes', 256, 256],
  'A-EMOTE-RANK-S':    ['emotes', 256, 256],
  'A-EMOTE-RANK-A':    ['emotes', 256, 256],
  'A-EMOTE-RANK-B':    ['emotes', 256, 256],
  'A-EMOTE-RANK-C':    ['emotes', 256, 256],
  'A-EMOTE-RANK-D':    ['emotes', 256, 256],
};

(async () => {
  const stats = [];
  for (const [id, [cat, tw, th]] of Object.entries(SPEC)) {
    const src = path.join(ART, cat, id + '.png');
    if (!fs.existsSync(src)) { console.log(id, 'MISSING — skip'); continue; }

    const buf0 = await sharp(src).toBuffer();
    const m0 = await sharp(buf0).metadata();

    let buf1, m1;
    try {
      buf1 = await sharp(buf0).trim({ background: { r:0, g:0, b:0, alpha:0 }, threshold: 1 }).toBuffer();
      m1 = await sharp(buf1).metadata();
    } catch (e) {
      console.log(id, 'trim failed:', e.message);
      continue;
    }

    // 空透明检查（理论上不应出现）
    if (m1.width === 0 || m1.height === 0) {
      console.log(id, 'EMPTY after trim — skip');
      continue;
    }

    // UI 类：fit:'inside' 不加 padding，输出尺寸 = 内容缩放后尺寸（≤ tw×th）
    // 其他类：fit:'contain' + bottom，缺差按透明 padding 顶部补齐
    const resizeOpts = cat === 'ui'
      ? { fit: 'inside', background: { r:0, g:0, b:0, alpha:0 } }
      : { fit: 'contain', position: 'bottom', background: { r:0, g:0, b:0, alpha:0 } };
    const out = await sharp(buf1)
      .resize(tw, th, resizeOpts)
      .png({ compressionLevel: 9 })
      .toBuffer();
    const m2 = await sharp(out).metadata();

    // 验证：再 trim 一次，看主体在新画布占比
    const verify = await sharp(out).trim({ background: { r:0, g:0, b:0, alpha:0 }, threshold: 1 }).toBuffer();
    const mv = await sharp(verify).metadata();
    const beforeFill = ((m1.width * m1.height) / (m0.width * m0.height) * 100).toFixed(0);
    const afterFill  = ((mv.width * mv.height) / (m2.width * m2.height) * 100).toFixed(0);

    fs.writeFileSync(src, out);
    stats.push({ id, before: m0.width+'x'+m0.height, after: m2.width+'x'+m2.height,
                 bf: beforeFill+'%', af: afterFill+'%', subj: mv.width+'x'+mv.height });
  }

  console.log('\n--- DONE, processed:', stats.length, '---');
  console.log('id'.padEnd(28), 'canvas'.padEnd(12), 'subj_after'.padEnd(12), 'fill before'.padEnd(13), 'fill after');
  for (const s of stats)
    console.log(s.id.padEnd(28), s.after.padEnd(12), s.subj.padEnd(12), s.bf.padEnd(13), s.af);
})().catch(e => { console.error(e); process.exit(1); });
