// UI Mockup 合成脚本
// 用 sharp 把 atoms/assets/art/ 下的真实资产拼成 9 个场景示意图，每个资产带 asset_id 标签
// 输出到 design/ui_mockups/<scene>.png，1920×1080 PNG。
//
// 用途：让 atoms 实现端理解每张 UI 图的使用方式（位置、尺寸、文本叠加内容）

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ART = path.join(ROOT, 'atoms', 'assets', 'art');
const OUT = path.join(ROOT, 'design', 'ui_mockups');
fs.mkdirSync(OUT, { recursive: true });

const W = 1920, H = 1080;
const FONT = 'Microsoft YaHei, SimHei, PingFang SC, sans-serif';
const PALETTE = {
  bg: '#B8B5A8',          // 莫兰迪雾灰
  ink: '#3D3A36',         // 描边深炭灰
  paper: '#E8E2D5',       // 米白
  brass: '#C7A968',       // 黄铜金
  brick: '#A85C5C',       // 砖红
  mint: '#8FA89B',        // 灰薄荷
  terra: '#C97B5C',       // 陶土橘
};

function escape(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function asset(category, id) {
  return path.join(ART, category, `${id}.png`);
}

async function loadResized(p, w, h) {
  return await sharp(p).resize(w, h, { fit: 'fill' }).png().toBuffer();
}

async function loadResizedContain(p, w, h) {
  return await sharp(p).resize(w, h, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

// 从 768×1024 角色立绘里裁出"头胸方块"用于简历头像槽
// 取中央 512×512（避开 Bottom Center 立绘下半身的腿/脚）
async function loadBustAvatar(p, w, h) {
  return await sharp(p)
    .extract({ left: 128, top: 60, width: 512, height: 512 })
    .resize(w, h, { fit: 'fill' })
    .png()
    .toBuffer();
}

// --- SVG primitives ---
function svgWrap(inner, w = W, h = H) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`
  );
}

function rect(x, y, w, h, color = '#FFD700', dash = '10,6', strokeW = 3) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-width="${strokeW}" stroke-dasharray="${dash}"/>`;
}

function solidRect(x, y, w, h, fill, opacity = 1, stroke = 'none', strokeW = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" opacity="${opacity}" stroke="${stroke}" stroke-width="${strokeW}"/>`;
}

// label 黄底黑字小标签，紧贴 rect 上沿
function tag(x, y, label, bg = '#FFEB3B') {
  const padding = 6;
  const fontSize = 16;
  const w = label.length * 11 + padding * 2;
  const h = fontSize + padding * 2;
  // place above (y - h - 2). If y < h, place below
  const ty = y < h + 4 ? y + 4 : y - h - 2;
  return `<rect x="${x}" y="${ty}" width="${w}" height="${h}" fill="${bg}" stroke="black" stroke-width="1"/>
<text x="${x + padding}" y="${ty + fontSize + padding - 4}" font-family="${FONT}" font-size="${fontSize}" fill="black">${escape(label)}</text>`;
}

// 框 + 标签
function box(x, y, w, h, label, color = '#FFD700') {
  return rect(x, y, w, h, color) + tag(x, y, label, '#FFEB3B');
}

function txt(x, y, content, opts = {}) {
  const { size = 18, color = '#3D3A36', anchor = 'start', weight = 'normal' } = opts;
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="${anchor}">${escape(content)}</text>`;
}

// 多行文本（自己换行）
function multiText(x, y, lines, opts = {}) {
  const { size = 18, lineH = 26, color = '#3D3A36', weight = 'normal' } = opts;
  return lines.map((ln, i) =>
    txt(x, y + i * lineH, ln, { size, color, weight })
  ).join('');
}

function dim(opacity = 0.5) {
  return solidRect(0, 0, W, H, 'black', opacity);
}

function header(title, sub = '') {
  return `
    <rect x="0" y="0" width="${W}" height="48" fill="#3D3A36" opacity="0.85"/>
    <text x="20" y="32" font-family="${FONT}" font-size="22" fill="white" font-weight="bold">[Mockup] ${escape(title)}</text>
    ${sub ? `<text x="${W - 20}" y="32" font-family="${FONT}" font-size="16" fill="#FFEB3B" text-anchor="end">${escape(sub)}</text>` : ''}
  `;
}

function legend(y = H - 90) {
  return `
    <rect x="${W - 360}" y="${y}" width="340" height="80" fill="white" opacity="0.92" stroke="#3D3A36" stroke-width="1"/>
    <text x="${W - 350}" y="${y + 22}" font-family="${FONT}" font-size="14" fill="#3D3A36" font-weight="bold">图例</text>
    <line x1="${W - 350}" y1="${y + 36}" x2="${W - 320}" y2="${y + 36}" stroke="#FFD700" stroke-width="3" stroke-dasharray="10,6"/>
    <text x="${W - 314}" y="${y + 41}" font-family="${FONT}" font-size="13" fill="#3D3A36">资产边界 (asset_id 标签)</text>
    <rect x="${W - 350}" y="${y + 50}" width="30" height="14" fill="#FFEB3B" stroke="black" stroke-width="1"/>
    <text x="${W - 314}" y="${y + 61}" font-family="${FONT}" font-size="13" fill="#3D3A36">代码层叠加文本/图标的位置</text>
  `;
}

// --- Scene builder ---
async function buildScene(filename, builder) {
  // base canvas (莫兰迪底色)
  const base = sharp({
    create: { width: W, height: H, channels: 4, background: { r: 184, g: 181, b: 168, alpha: 1 } }
  });

  const ctx = { layers: [], svgPieces: [], dimAfterIndex: -1, dimOpacity: 0 };
  await builder(ctx);

  // composite image layers first
  let img = base;
  if (ctx.layers.length > 0) {
    img = img.composite(ctx.layers);
  }
  let buf = await img.png().toBuffer();

  // then composite the SVG overlay
  if (ctx.svgPieces.length > 0) {
    const overlay = svgWrap(ctx.svgPieces.join('\n'));
    buf = await sharp(buf).composite([{ input: overlay, top: 0, left: 0 }]).png().toBuffer();
  }

  const out = path.join(OUT, filename);
  fs.writeFileSync(out, buf);
  console.log('wrote', filename);
}

// =========================================================
// Scene 01 — Title 启动画面
// =========================================================
async function scene01() {
  await buildScene('01_title.png', async (ctx) => {
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-TITLE'), 1920, 1080), top: 0, left: 0 });

    // 开始按钮 A-UI-BTN
    const btnW = 360, btnH = 135, btnX = (W - btnW) / 2, btnY = 820;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-BTN'), btnW, btnH), top: btnY, left: btnX });

    ctx.svgPieces.push(
      header('TitleScene · 启动画面 / 主菜单', 'narrative: 启动 splash'),
      box(0, 48, W, H - 48, 'A-UI-TITLE  1920×1080  全屏背景  不切片', '#FFD700'),
      box(btnX, btnY, btnW, btnH, 'A-UI-BTN  256×96 → 缩 360×135  Tint=Normal', '#FFD700'),
      // 按钮上的文字（代码层叠加示意）
      txt(W / 2, btnY + btnH / 2 + 12, '开始游戏', { size: 36, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),
      // 副标题（标题图自带，但若代码再叠就用此区域）
      tag(420, 720, '可选：副标题/版权由代码叠（标题底图自带主标题）'),
      legend(),
    );
  });
}

// =========================================================
// Scene 02 — HR Office 主屏（准备阶段）
// =========================================================
async function scene02() {
  await buildScene('02_main_screen.png', async (ctx) => {
    ctx.layers.push({ input: await loadResized(asset('backgrounds', 'A-BG-PREP'), 1920, 1080), top: 0, left: 0 });

    // 主角 HR 立绘（左侧）
    const hrW = 480, hrH = 640, hrX = 60, hrY = 360;
    ctx.layers.push({ input: await loadResized(asset('characters', 'A-CHR-HR'), hrW, hrH), top: hrY, left: hrX });

    // 怪物槽位 ×2（中央偏左）
    const slotW = 240, slotH = 320, slotY = 520;
    ctx.layers.push({ input: await loadResized(asset('characters', 'A-CHR-GROOBAS'), slotW, slotH), top: slotY, left: 700 });
    ctx.layers.push({ input: await loadResized(asset('characters', 'A-CHR-GENERIC-1'), slotW, slotH), top: slotY, left: 980 });

    // 各槽位下方 HP 条
    const hpW = 220, hpH = 22, hpY = slotY + slotH + 10;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-HPBAR'), hpW, hpH), top: hpY, left: 710 });
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-HPBAR'), hpW, hpH), top: hpY, left: 990 });

    // 顶栏 灵魂碎片图标
    ctx.layers.push({ input: await loadResized(asset('props', 'A-PROP-SHARD-ICON'), 56, 56), top: 70, left: 60 });

    // 顶栏右上 系统按钮 ×2
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-ICO-PAUSE'), 80, 80), top: 60, left: 1820 });
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-ICO-VOLUME'), 80, 80), top: 60, left: 1720 });

    // 右侧动作按钮 ×5（A-UI-BTN）
    const actBtns = ['招募 (1 AP, 免费)', '扩建 (1 AP, 30 碎片)', '发奖金 (1 AP, 8/15/25)', '打零工 (1 AP, +4 碎片)', '开战 →'];
    const aBW = 360, aBH = 100, aBX = 1480;
    let aBY = 200;
    for (let i = 0; i < actBtns.length; i++) {
      ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-BTN'), aBW, aBH), top: aBY, left: aBX });
      aBY += 130;
    }

    // ---- SVG overlay ----
    ctx.svgPieces.push(
      header('PrepPhaseScene · HR 办公室主屏', 'level: L01-L06 准备阶段'),

      // 顶栏 HUD
      solidRect(0, 48, W, 88, 'black', 0.35),
      box(0, 48, W, 88, 'CurrencyHUD 区（代码层）', '#FFD700'),
      box(60, 70, 56, 56, 'A-PROP-SHARD-ICON 128×128→56×56', '#FFD700'),
      txt(130, 110, '× 70', { size: 32, color: 'white', weight: 'bold' }),
      txt(220, 110, '灵魂碎片', { size: 22, color: 'white' }),
      txt(420, 110, 'AP: 3/3', { size: 26, color: 'white', weight: 'bold' }),
      txt(620, 110, '关卡: L02', { size: 26, color: 'white', weight: 'bold' }),

      // 系统图标
      box(1720, 60, 80, 80, 'A-UI-ICO-VOLUME', '#FFD700'),
      box(1820, 60, 80, 80, 'A-UI-ICO-PAUSE', '#FFD700'),

      // HR 立绘
      box(60, 360, 480, 640, 'A-CHR-HR  768×1024  pivot=Bottom Center', '#FFD700'),

      // 怪物槽位
      box(680, 500, 540, 360, '怪物槽位区（代码：BattleSlotView）', '#00BFFF'),
      box(700, 520, 240, 320, 'A-CHR-GROOBAS  768×1024', '#FFD700'),
      box(980, 520, 240, 320, 'A-CHR-GENERIC-1  768×1024', '#FFD700'),
      box(710, 850, 220, 22, 'A-UI-HPBAR 9-slice 8/384/8 × 8/24/8', '#FFD700'),
      box(990, 850, 220, 22, 'A-UI-HPBAR  Tint #8FA89B（员工绿）', '#FFD700'),
      // 模拟 HP 数值文本（代码层）
      txt(820, 905, 'HP 75/75', { size: 16, color: PALETTE.ink, anchor: 'middle' }),
      txt(1100, 905, 'HP 45/45', { size: 16, color: PALETTE.ink, anchor: 'middle' }),

      // 右侧动作按钮
      box(1480, 200, 360, 100, 'A-UI-BTN 256×96→缩 360×100', '#FFD700'),
      txt(1660, 260, '招募 (1 AP, 免费)', { size: 22, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),
      box(1480, 330, 360, 100, 'A-UI-BTN  同上', '#FFD700'),
      txt(1660, 390, '扩建 (1 AP, 30 碎片)', { size: 22, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),
      box(1480, 460, 360, 100, 'A-UI-BTN  同上', '#FFD700'),
      txt(1660, 520, '发奖金 (1 AP, 8/15/25)', { size: 22, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),
      box(1480, 590, 360, 100, 'A-UI-BTN  同上', '#FFD700'),
      txt(1660, 650, '打零工 (1 AP, +4 碎片)', { size: 22, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),
      box(1480, 720, 360, 100, 'A-UI-BTN  Tint=enabled (Disabled if AP=0)', '#FFD700'),
      txt(1660, 780, '开战 →', { size: 28, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),

      legend(),
    );
  });
}

// =========================================================
// Scene 03 — 招募面板（Modal）
// =========================================================
async function scene03() {
  await buildScene('03_recruit.png', async (ctx) => {
    // 主屏背景作为 modal 背景
    ctx.layers.push({ input: await loadResized(asset('backgrounds', 'A-BG-PREP'), 1920, 1080), top: 0, left: 0 });

    // 三张简历框 600×800 → 缩到 540×720（90%，足够大让头像和文字都落得下）
    const rW = 540, rH = 720, rY = 200;
    const xs = [90, 690, 1290];

    // A-UI-RESUME 实际可视区域比例（从 600×800 资产实测，再乘 0.9 映射到 540×720）：
    //   姓名带（header）：y 130~235 (orig) → y 117~211 (scaled)
    //   头像槽（白方框）：x 225~375 / y 260~400 (orig) → x 202~337 / y 234~360 (scaled)
    //   正文文字带：     x 80~520  / y 430~580 (orig) → x 72~468  / y 387~522 (scaled)
    //   签名带：         y 640~680 (orig) → y 576~612 (scaled)

    // 头像槽（卡内坐标，scaled）
    const avInCardX = 202, avInCardY = 234, avW = 135, avH = 126;

    for (const x of xs) {
      ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-RESUME'), rW, rH), top: rY, left: x });
    }

    // 头像（直接使用 A-CHR-BUST-* 半身像，无需裁切）
    const candidateBusts = ['A-CHR-BUST-GROOBAS', 'A-CHR-BUST-GENERIC-2', 'A-CHR-BUST-XIAOXING'];
    for (let i = 0; i < xs.length; i++) {
      ctx.layers.push({
        input: await loadResized(asset('characters', candidateBusts[i]), avW, avH),
        top: rY + avInCardY,
        left: xs[i] + avInCardX,
      });
    }

    // 每张简历底部一个"选这位" BTN
    const btnW = 220, btnH = 80;
    for (const x of xs) {
      ctx.layers.push({
        input: await loadResized(asset('ui', 'A-UI-BTN'), btnW, btnH),
        top: rY + rH + 30,
        left: x + (rW - btnW) / 2,
      });
    }

    // 灵魂碎片图标（顶栏）
    ctx.layers.push({ input: await loadResized(asset('props', 'A-PROP-SHARD-ICON'), 48, 48), top: 90, left: 60 });

    // ---- overlay ----
    // 三个候选档位 + canonical 描述（与 art_layout §3.6 / narrative 简历语气规范对齐）
    const resumes = [
      {
        name: '【格鲁巴斯·史莱姆】',
        post: '应聘岗位：B1 驻守',
        stats: '★ HP 75   ATK 10   日薪 8',
        traits: '✓ 吃苦耐劳    ✓ 团队协作',
        hidden: '隐藏词条：待入职后激活',
        quote1: '"具有 8 年地下城驻守经验……',
        quote2: ' 注：本人不接受绩效末位淘汰。"',
      },
      {
        name: '【克劳德·小恶魔文员】',
        post: '应聘岗位：B2 文员',
        stats: '★ HP 50   ATK 14   日薪 12',
        traits: '✓ 数字敏感    ✓ 抗压',
        hidden: '隐藏词条：?????',
        quote1: '"上一份工作做了三年……',
        quote2: ' 希望这次能有签字权。"',
      },
      {
        name: '【宵星·骷髅法师】',
        post: '应聘岗位：B3 远程',
        stats: '★ HP 45   ATK 16   日薪 10',
        traits: '✓ 远程输出    ✓ 嘴碎',
        hidden: '隐藏词条：?????',
        quote1: '"听说你们 KPI 看得严，我能扛，',
        quote2: ' 但别让我加班。"',
      },
    ];

    ctx.svgPieces.push(
      header('ResumeCardPanel · 招募 3 选 1', 'narrative: L01 招募 / 各关补员'),
      dim(0.5),

      // 顶栏标题
      solidRect(0, 48, W, 130, 'black', 0.5),
      txt(W / 2, 130, '招募候选人 — 选 1 位入职', { size: 36, color: 'white', anchor: 'middle', weight: 'bold' }),
      box(60, 90, 48, 48, 'A-PROP-SHARD-ICON', '#FFD700'),
      txt(120, 125, '× 70 灵魂碎片', { size: 22, color: 'white' }),
    );

    for (let i = 0; i < xs.length; i++) {
      const x = xs[i];
      const r = resumes[i];

      // 卡内 anchor 计算（基于实测 600×800 资产关键位 × 0.9 缩放）
      const headerX = x + 60;       // 姓名带左 padding
      const headerY1 = rY + 145;    // 第 1 横条 ~y 160 orig × 0.9
      const headerY2 = rY + 193;    // 第 2 横条 ~y 215 orig × 0.9
      const bodyX = x + 75;         // 正文左 padding (80 orig × 0.9 取整)
      const bodyY = rY + 395;       // 正文带顶 (~y 440 orig × 0.9)
      const sigY = rY + 600;        // 签名带 (y 660 orig × 0.9)

      ctx.svgPieces.push(
        // 卡片整体框
        box(x, rY, rW, rH, `A-UI-RESUME 600×800→540×720  9-slice 32/536/32 × 32/736/32`, '#FFD700'),

        // 头像槽位
        box(x + avInCardX, rY + avInCardY, avW, avH, `头像槽位 (BUST 256×256 直接落入)`, '#00BFFF'),
        tag(x + avInCardX, rY + avInCardY + avH + 8, candidateBusts[i]),

        // 姓名带（卡顶灰色横条区）
        txt(headerX, headerY1, r.name, { size: 22, color: PALETTE.ink, weight: 'bold' }),
        txt(headerX, headerY2, r.post, { size: 18, color: PALETTE.ink }),

        // 数值行不再单独占位 — 收入正文带第 1 行（红字粗体）
        // multiText 不支持单独样式行，所以用单独 txt 叠在 body band 起点

        // 正文带：5 行（数值 / 词条 / 隐藏 / 引言1 / 引言2）
        txt(bodyX, bodyY, r.stats, { size: 17, color: PALETTE.brick, weight: 'bold' }),
        multiText(bodyX, bodyY + 28, [
          r.traits,
          r.hidden,
          r.quote1,
          r.quote2,
        ], { size: 16, lineH: 26, color: PALETTE.ink }),

        // 内心泄露句标记
        tag(bodyX, bodyY + 28 + 26 * 2 - 6, '内心泄露句（隐藏词条提示）'),

        // 签名位（底部签名横线）
        txt(x + 90, sigY, '应聘者签名 _____________', { size: 13, color: '#888' }),

        // 底部按钮
        box(x + (rW - btnW) / 2, rY + rH + 30, btnW, btnH, 'A-UI-BTN  Tint=Normal', '#FFD700'),
        txt(x + rW / 2, rY + rH + 30 + btnH / 2 + 10, '选这位', { size: 26, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),
      );
    }

    ctx.svgPieces.push(legend());
  });
}

// =========================================================
// Scene 04 — 战斗界面
// =========================================================
async function scene04() {
  await buildScene('04_battle.png', async (ctx) => {
    ctx.layers.push({ input: await loadResized(asset('backgrounds', 'A-BG-BATTLE'), 1920, 1080), top: 0, left: 0 });

    // 左侧战斗日志框（用 A-UI-CARD-EVENT 9-slice 拉伸到 700×640）
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-CARD-EVENT'), 700, 640), top: 220, left: 60 });

    // 怪物方 ×2（中央偏右）
    const monW = 220, monH = 293, monY = 480;
    ctx.layers.push({ input: await loadResized(asset('characters', 'A-CHR-GROOBAS'), monW, monH), top: monY, left: 880 });
    ctx.layers.push({ input: await loadResized(asset('characters', 'A-CHR-XIAOXING'), monW, monH), top: monY, left: 1130 });

    // 勇者方 ×1（最右）
    ctx.layers.push({ input: await loadResized(asset('enemies', 'A-ENE-W02'), 240, 320), top: 460, left: 1480 });

    // 三根 HP 条
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-HPBAR'), 200, 22), top: 450, left: 890 });
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-HPBAR'), 200, 22), top: 450, left: 1140 });
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-HPBAR'), 220, 24), top: 430, left: 1490 });

    // 突发卡片预告（缩小，置于右上）
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-CARD-EVENT'), 360, 240), top: 100, left: 1480 });

    // 圆形倒计时（突发卡上）
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-TIMER'), 64, 64), top: 110, left: 1780 });

    // 底部 [点击加速] 按钮
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-BTN'), 320, 110), top: 940, left: (W - 320) / 2 });

    ctx.svgPieces.push(
      header('BattlePhaseScene · 战斗中', 'level: L02-L06 战斗阶段'),

      // 战斗日志框
      box(60, 220, 700, 640, 'A-UI-CARD-EVENT 9-slice 拉伸 → 战斗日志框', '#FFD700'),
      multiText(90, 280, [
        '> 突袭警报！B1 驻守岗已就位…',
        '> 勇者挥剑而下，格鲁巴斯抬手格挡…',
        '> 宵星 反击命中，造成 12 伤害',
        '> 格鲁巴斯 命中，造成 8 伤害',
        '> 勇者攻击，对格鲁巴斯造成 15 伤害',
        '> ROUND_TICK 5/13',
        '> ......',
      ], { size: 20, lineH: 36 }),

      // 怪物方 / 勇者方
      txt(990, 460, '怪物方', { size: 22, anchor: 'middle', color: 'white', weight: 'bold' }),
      txt(1600, 440, '勇者方', { size: 22, anchor: 'middle', color: 'white', weight: 'bold' }),

      box(880, 480, 220, 293, 'A-CHR-GROOBAS', '#FFD700'),
      box(1130, 480, 220, 293, 'A-CHR-XIAOXING', '#FFD700'),
      box(1480, 460, 240, 320, 'A-ENE-W02', '#FF6347'),

      box(890, 450, 200, 22, 'A-UI-HPBAR Tint=#8FA89B 员工绿', '#FFD700'),
      box(1140, 450, 200, 22, 'A-UI-HPBAR Tint=#8FA89B', '#FFD700'),
      box(1490, 430, 220, 24, 'A-UI-HPBAR Tint=#A85C5C 砖红', '#FFD700'),

      // 突发卡片预告
      box(1480, 100, 360, 240, 'A-UI-CARD-EVENT 缩 → 突发卡片占位', '#FFD700'),
      box(1780, 110, 64, 64, 'A-UI-TIMER 倒计时径向填充 360→0', '#FFD700'),
      txt(1660, 220, '突发事件预告\n（B01-B07 触发）', { size: 18, anchor: 'middle', color: PALETTE.ink }),

      // 加速按钮
      box((W - 320) / 2, 940, 320, 110, 'A-UI-BTN  [点击加速]', '#FFD700'),
      txt(W / 2, 1010, '点击加速', { size: 32, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),

      legend(),
    );
  });
}

// =========================================================
// Scene 05 — 突发事件卡片（Modal）
// =========================================================
async function scene05() {
  await buildScene('05_event_card.png', async (ctx) => {
    ctx.layers.push({ input: await loadResized(asset('backgrounds', 'A-BG-BATTLE'), 1920, 1080), top: 0, left: 0 });

    // 中央卡片
    const cW = 1100, cH = 740, cX = (W - cW) / 2, cY = 180;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-CARD-EVENT'), cW, cH), top: cY, left: cX });

    // 倒计时（卡顶端右上）
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-TIMER'), 128, 128), top: cY + 30, left: cX + cW - 160 });

    // 双选项按钮（卡内底部）
    const optW = 360, optH = 120;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-BTN'), optW, optH), top: cY + cH - 200, left: cX + 100 });
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-BTN'), optW, optH), top: cY + cH - 200, left: cX + cW - 100 - optW });

    // 卡顶左侧贴一个怪物头像（说话人）
    ctx.layers.push({ input: await loadResized(asset('characters', 'A-CHR-GROOBAS'), 120, 160), top: cY + 30, left: cX + 60 });

    ctx.svgPieces.push(
      header('EventCardPanel · 突发事件卡片', 'narrative: B01-B07 战斗突发'),
      dim(0.55),

      box(cX, cY, cW, cH, 'A-UI-CARD-EVENT 900×600→1100×740  9-slice 32/836/32 × 32/536/32', '#FFD700'),
      box(cX + cW - 160, cY + 30, 128, 128, 'A-UI-TIMER 128×128 径向填充 10s→0', '#FFD700'),
      box(cX + 60, cY + 30, 120, 160, 'A-CHR-GROOBAS 头像（说话人）', '#FFD700'),

      // 标题区（卡顶 ≤80px）
      txt(cX + cW / 2, cY + 100, 'B04 · 加薪挽留请求', { size: 32, anchor: 'middle', color: PALETTE.brick, weight: 'bold' }),

      // 正文（中部）
      multiText(cX + 80, cY + 260, [
        '「格鲁巴斯·史莱姆 拖着残躯发来内网消息：',
        ' 『我还能打，但我需要绩效承诺。』」',
        '',
        '剩余 HP: 18/75    本场已击杀: 1',
        '若不响应，本场战斗结束后将提交离职申请。',
      ], { size: 24, lineH: 42 }),

      // 双选项 BTN
      box(cX + 100, cY + cH - 200, optW, optH, 'A-UI-BTN', '#FFD700'),
      multiText(cX + 100 + optW / 2 - 130, cY + cH - 150, ['承诺本场绩效 S', 'ATK ×1.5'], { size: 22, lineH: 32, weight: 'bold' }),

      box(cX + cW - 100 - optW, cY + cH - 200, optW, optH, 'A-UI-BTN', '#FFD700'),
      multiText(cX + cW - 100 - optW + optW / 2 - 100, cY + cH - 150, ['稳住先活着', 'HP +5%'], { size: 22, lineH: 32, weight: 'bold' }),

      legend(),
    );
  });
}

// =========================================================
// Scene 06 — CEO 邮件
// =========================================================
async function scene06() {
  await buildScene('06_ceo_mail.png', async (ctx) => {
    ctx.layers.push({ input: await loadResized(asset('backgrounds', 'A-BG-PREP'), 1920, 1080), top: 0, left: 0 });

    const mW = 1000, mH = 625, mX = (W - mW) / 2, mY = 220;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-MAIL-CEO'), mW, mH), top: mY, left: mX });

    // CEO 红章（右下）
    ctx.layers.push({ input: await loadResized(asset('emotes', 'A-EMOTE-CEO-STAMP'), 200, 200), top: mY + mH - 220, left: mX + mW - 240 });

    // 继续按钮
    const bW = 280, bH = 96;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-BTN'), bW, bH), top: mY + mH + 30, left: (W - bW) / 2 });

    ctx.svgPieces.push(
      header('CEOMailPanel · CEO 邮件', 'narrative: T01 / P04 / T06 / T07'),
      dim(0.55),

      box(mX, mY, mW, mH, 'A-UI-MAIL-CEO 800×500→1000×625  9-slice 40/720/40 × 40/420/40', '#FFD700'),
      box(mX + mW - 240, mY + mH - 220, 200, 200, 'A-EMOTE-CEO-STAMP 256×256→200×200  pivot=Center 倾斜 10°', '#FFD700'),

      // 邮件内容（代码层叠加）
      multiText(mX + 70, mY + 90, [
        'From: CEO@魔王城.corp',
        'Subject: 入职第一天',
        '──────────────────────────────────',
      ], { size: 24, lineH: 42, color: PALETTE.ink, weight: 'bold' }),

      multiText(mX + 70, mY + 250, [
        '亲爱的 HR 总监：',
        '',
        '前任 HR 离职原因：不适合。',
        '请确保你更适合。',
        '',
        'IPO 路演倒计时 7 天。',
      ], { size: 26, lineH: 44, color: PALETTE.ink }),

      box((W - bW) / 2, mY + mH + 30, bW, bH, 'A-UI-BTN', '#FFD700'),
      txt(W / 2, mY + mH + 30 + bH / 2 + 12, '继续 →', { size: 32, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),

      legend(),
    );
  });
}

// =========================================================
// Scene 07 — 波次结算 EVAL
// =========================================================
async function scene07() {
  await buildScene('07_wave_result.png', async (ctx) => {
    ctx.layers.push({ input: await loadResized(asset('backgrounds', 'A-BG-PREP'), 1920, 1080), top: 0, left: 0 });

    const rW = 1080, rH = 840, rX = (W - rW) / 2, rY = 110;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-RESULT'), rW, rH), top: rY, left: rX });

    // 三档评级章（员工列右侧）
    const stampSize = 96;
    ctx.layers.push({ input: await loadResized(asset('emotes', 'A-EMOTE-RANK-S'), stampSize, stampSize), top: rY + 360, left: rX + rW - 200 });
    ctx.layers.push({ input: await loadResized(asset('emotes', 'A-EMOTE-RANK-A'), stampSize, stampSize), top: rY + 470, left: rX + rW - 200 });
    ctx.layers.push({ input: await loadResized(asset('emotes', 'A-EMOTE-RANK-B'), stampSize, stampSize), top: rY + 580, left: rX + rW - 200 });

    // 灵魂碎片图标（合计行）
    ctx.layers.push({ input: await loadResized(asset('props', 'A-PROP-SHARD-ICON'), 48, 48), top: rY + 720, left: rX + 380 });

    // 继续按钮
    const bW = 280, bH = 96;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-BTN'), bW, bH), top: rY + rH - 130, left: (W - bW) / 2 });

    ctx.svgPieces.push(
      header('WaveResultPanel · 波次结算', 'narrative: 每波战斗结束触发'),
      dim(0.55),

      box(rX, rY, rW, rH, 'A-UI-RESULT 900×700→1080×840  9-slice 40/820/40 × 40/620/40', '#FFD700'),

      // 标题
      txt(W / 2, rY + 80, '第 2 波 · 战斗结算', { size: 38, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),

      // 收支表
      multiText(rX + 80, rY + 160, [
        '存活: 2 / 2',
        '阵亡: —',
        '──────────────────────────',
        '通关保底     +8 碎片',
        '存活分 (2 活) +20 碎片',
        '业绩分 (220 伤) +6 碎片',
        '──────────────────────────',
      ], { size: 26, lineH: 44 }),

      // 合计
      txt(rX + 320, rY + 750, '合计 +34 碎片', { size: 32, color: PALETTE.brass, weight: 'bold' }),
      box(rX + 380, rY + 720, 48, 48, 'A-PROP-SHARD-ICON', '#FFD700'),

      // 员工评级表（右侧）
      txt(rX + rW - 360, rY + 200, '员工绩效评级', { size: 22, color: PALETTE.ink, weight: 'bold' }),
      multiText(rX + rW - 460, rY + 280, [
        '格鲁巴斯·史莱姆',
        'DPS 24 / 命中 92%',
      ], { size: 18, lineH: 26 }),
      box(rX + rW - 200, rY + 360, stampSize, stampSize, 'A-EMOTE-RANK-S', '#FFD700'),

      multiText(rX + rW - 460, rY + 390, [
        '宵星·骷髅法师',
        'DPS 17 / 命中 75%',
      ], { size: 18, lineH: 26 }),
      box(rX + rW - 200, rY + 470, stampSize, stampSize, 'A-EMOTE-RANK-A', '#FFD700'),

      multiText(rX + rW - 460, rY + 500, [
        '克劳德·小恶魔',
        'DPS 11 / 命中 60%',
      ], { size: 18, lineH: 26 }),
      box(rX + rW - 200, rY + 580, stampSize, stampSize, 'A-EMOTE-RANK-B', '#FFD700'),

      // 继续按钮
      box((W - bW) / 2, rY + rH - 130, bW, bH, 'A-UI-BTN', '#FFD700'),
      txt(W / 2, rY + rH - 130 + bH / 2 + 12, '继续 →', { size: 32, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),

      // RANK-D / RANK-C 演示提示
      tag(rX + 80, rY + rH - 60, '若有员工档位 C/D，绩效章换为 A-EMOTE-RANK-C/-D（同位置同尺寸）'),

      legend(),
    );
  });
}

// =========================================================
// Scene 08 — 教学 Toast
// =========================================================
async function scene08() {
  await buildScene('08_tutorial_toast.png', async (ctx) => {
    ctx.layers.push({ input: await loadResized(asset('backgrounds', 'A-BG-PREP'), 1920, 1080), top: 0, left: 0 });

    // 主屏关键元素（迷你版主屏）
    ctx.layers.push({ input: await loadResized(asset('characters', 'A-CHR-HR'), 360, 480), top: 480, left: 100 });
    ctx.layers.push({ input: await loadResized(asset('characters', 'A-CHR-GROOBAS'), 200, 267), top: 580, left: 580 });

    // 招募按钮（右侧 第一个）— Toast 指向它
    const recruitX = 1480, recruitY = 380, recruitW = 360, recruitH = 100;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-BTN'), recruitW, recruitH), top: recruitY, left: recruitX });

    // 顶栏 灵魂碎片图标
    ctx.layers.push({ input: await loadResized(asset('props', 'A-PROP-SHARD-ICON'), 56, 56), top: 70, left: 60 });

    // Toast 气泡（指向招募按钮）—— 出现在按钮上方
    const toastW = 700, toastH = 180, toastX = recruitX - 200, toastY = 180;
    ctx.layers.push({ input: await loadResized(asset('ui', 'A-UI-TOAST'), toastW, toastH), top: toastY, left: toastX });

    ctx.svgPieces.push(
      header('ToastTutorialView · 教学引导气泡', 'narrative: T02 / T03 / T04 教学浮层'),

      // 主屏元素弱化标注
      txt(20, 80, '（背景为主屏 PrepPhase 当前状态，气泡为浮层）', { size: 16, color: 'white' }),

      // 主屏 mini 元素
      box(100, 480, 360, 480, 'A-CHR-HR (主屏立绘)', '#888'),
      box(580, 580, 200, 267, 'A-CHR-GROOBAS (槽位)', '#888'),
      box(60, 70, 56, 56, 'A-PROP-SHARD-ICON', '#888'),

      // 招募按钮（被高亮指向）
      solidRect(recruitX - 10, recruitY - 10, recruitW + 20, recruitH + 20, '#FFEB3B', 0.3),
      box(recruitX, recruitY, recruitW, recruitH, 'A-UI-BTN  招募按钮（被引导高亮）', '#FF6347'),
      txt(recruitX + recruitW / 2, recruitY + recruitH / 2 + 10, '招募 (1 AP, 免费)', { size: 24, anchor: 'middle', color: PALETTE.ink, weight: 'bold' }),

      // Toast 框
      box(toastX, toastY, toastW, toastH, 'A-UI-TOAST 600×160→700×180  9-slice 32/536/32 × 32/96/32', '#FFD700'),
      // 左侧 icon 槽位
      box(toastX + 16, toastY + 26, 128, 128, 'icon 槽位（≤128×128，不参与拉伸）', '#00BFFF'),
      txt(toastX + 80, toastY + 105, '💡', { size: 64, anchor: 'middle' }),
      // 正文
      multiText(toastX + 170, toastY + 70, [
        '欢迎加入！第一步是招募你的第一位员工。',
        '点击右侧 [招募] 按钮（首次免费）。',
      ], { size: 24, lineH: 38, weight: 'bold' }),

      // 三角箭头（自绘）指向按钮
      `<polygon points="${toastX + 480},${toastY + toastH} ${toastX + 540},${toastY + toastH} ${toastX + 510},${toastY + toastH + 40}" fill="${PALETTE.paper}" stroke="${PALETTE.ink}" stroke-width="3"/>`,
      tag(toastX + 460, toastY + toastH + 50, '尖角箭头由代码绘制（资产本体不含）'),

      legend(),
    );
  });
}

// =========================================================
// Scene 09 — 结局 CG E01
// =========================================================
async function scene09() {
  await buildScene('09_ending_e01.png', async (ctx) => {
    // 结局图 1280×720 拉伸到 1920×1080（16:9 → 16:9 完美适配）
    ctx.layers.push({ input: await loadResized(asset('endings', 'A-END-E01'), 1920, 1080), top: 0, left: 0 });

    ctx.svgPieces.push(
      header('EndingCgPanel · 结局 E01 上市钟声·满血胜利', 'narrative: 撑过 N 波 + 碎片>0 + ≥1 怪物存活'),

      box(0, 48, W, H - 48, 'A-END-E01 1280×720→1920×1080  full screen  不抠图', '#FFD700'),

      // 底部字幕条
      solidRect(0, H - 200, W, 200, 'black', 0.75),
      box(0, H - 200, W, 200, '字幕条（代码绘制半透黑底，资产本体不含）', '#00BFFF'),

      // 字幕文字
      multiText(80, H - 150, [
        '【CEO 邮件】',
        '"你证明了你比前任更适合。下次见，副总裁——如果你能撑到下次的话。"',
        '',
        '【格鲁巴斯·史莱姆 私信】',
        '"老板，IPO 那天给我留点期权。我儿子上学要钱。"',
      ], { size: 22, lineH: 32, color: 'white' }),

      legend(),
    );
  });
}

// =========================================================
async function main() {
  await scene01();
  await scene02();
  await scene03();
  await scene04();
  await scene05();
  await scene06();
  await scene07();
  await scene08();
  await scene09();
  console.log('\n✅ all 9 mockups written to', OUT);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
