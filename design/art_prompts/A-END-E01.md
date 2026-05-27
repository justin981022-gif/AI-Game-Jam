# A-END-E01 — 上市钟声·满血胜利（含格鲁巴斯私信）

**类别**：结局 CG 静帧
**来源**：`design/narrative.md` v1.3 §结局表 E01 + 格鲁巴斯私信线 / `design/final-plan.md` 四结局收割点
**引用场景**：结局 E01（满血胜利：股价上扬 + 团队完整 + 格鲁巴斯私信祝福）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 1280×720（06c post-process 从 Gemini 1024×1024 裁切到 16:9） |
| 宽高比 | 16:9 |
| 背景要求 | 带场景背景（非透明）；明亮温暖基调，明度 75~80 |
| 切图方式 | 单张全屏 CG，直接铺底，不分层 |
| atoms 落位路径 | `atoms/assets/art/endings/A-END-E01.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：明亮、温暖、治愈反差萌的胜利、deadpan office-comedy 难得的扬眉吐气
- 色盘偏重：主 2 陶土橘 `#C97B5C` + 辅 4 黄铜金 `#D4A574`（敲钟仪式与上扬曲线主调）+ 辅 2 米白 `#E8E2D5`（站台地面）+ 主 3 灰薄荷绿 `#8FA89B`（员工列队点缀）+ 主 1 莫兰迪雾灰 `#B8B5A8`（远景墙面）
- 特殊注意：
  - **底部预留字幕条空间**（结局文案叠加）
  - **格鲁巴斯私信弹窗框**位于右下角小尺寸：仅画弹窗矩形 + 圆形头像剪影 + 三行 lorem 形状横线，**绝不出真实文字**
  - 财报曲线必须**明显上扬**（股价 K 线右上扬）作为视觉锚点
  - 黄铜金钟在画面正中偏上，HR 总监 + 魔王 CEO + 员工列队站台

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

cinematic 16:9 game ending CG illustration, centered storytelling composition, clean isolated illustration on a flat neutral background, ample empty space for UI overlay along the bottom subtitle band, IPO bell-ringing ceremony scene inside the Demon Castle dungeon corporate headquarters, a large brass-gold #D4A574 ceremonial bell hangs at upper-center as the visual anchor with a hanging rope, the chibi female HR Director player character (a cute cartoon WOMAN in chibi 2.5-head proportion with big round head and small soft body, wearing foggy-beige #B8B5A8 oversized business blazer over warm cream #E8E2D5 collared shirt with terracotta-orange #C97B5C necktie, two small matte black devil horns poking out from messy dark hair in a loose feminine low bun, brass-gold #D4A574 ID lanyard worn slightly crooked on chest, oversized round eyes with a small proud smile, soft feminine cute face, holding a small ceremonial mallet in one tiny hand, NOT a man, NO masculine jawline, NO beard, NO suit-and-tie businessman) stands proud on a low cream-white #E8E2D5 podium platform alongside the chibi Demon CEO (taller silhouette, brass-gold horns, dark suit), behind them a tidy row of five employee monsters in mint-green #8FA89B and beige office wear lined up smiling, a giant flat stock-chart panel on the back wall shows a clearly upward-trending line going from lower-left to upper-right with a few simple geometric candlesticks (no readable numbers, only abstract tick shapes), confetti pieces in cream and brass float in the upper area as flat geometric shapes, warm ambient daylight with soft uniform shading, mood is bright triumphant and gently heart-warming with the signature deadpan office-comedy charm, in the lower-right corner a small chat-popup notification frame with a circular blurred slime-shaped silhouette avatar in dusty mint green and three short horizontal lorem placeholder bars suggesting a private message blessing from Groobas the slime intern, signs and papers and stock chart show only blank shapes or LOREM IPSUM placeholder bars, NO readable English or Chinese text anywhere, generous empty space along the bottom edge reserved for subtitle UI, bright warm palette overall with terracotta orange and brass gold dominating against soft beige walls
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, blood, death imagery, dark horror style, photorealistic, real readable text, Asian fantasy parchment, Western fantasy ornaments, downward stock chart, sad faces, gloomy lighting, grey overcast palette, real corporate logos like NYSE NASDAQ Apple Microsoft, real currency symbols and numbers, readable Chinese characters on the chart, readable English headlines, news ticker text, paparazzi cameras, microphones, dramatic spotlight, fireworks explosions, religious iconography, HR director as a man, male HR director, masculine HR character, orange suit-and-tie businessman as protagonist, beard on HR, mustache on HR
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》医院达成成就的庆祝场景（扁平 + 彩纸花）
- 《Reigns: Her Majesty》正向结局卡牌（明亮配色 + 居中构图）
- BoJack Horseman S6 Princess Carolyn 经纪公司开业镜头（莫兰迪暖色 + 站台合影）

## 切图与落位建议

- **切图方式详解**：06c post-process 从 Gemini 1024×1024 中央裁切 16:9 区域后下采样到 1280×720；如顶部/底部留白被裁损则取边缘像素延伸补齐
- **边距要求**：底部 80px 预留字幕条安全区；右下角弹窗距右边缘/下边缘各 60~100px，避免被字幕条遮挡
- **资源导入建议**（Atoms）：
  - 命名：`A-END-E01.png`（大写连字符，与目录约定一致）
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：否（结局 CG 独立加载）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：黄铜金钟 + 上扬财报曲线 + HR/CEO/员工列队站台 + 右下角私信弹窗剪影
- [ ] 未出现反向 prompt 禁忌：无血腥、无真实文字、无写实摄影、无下行曲线
- [ ] 尺寸落盘 1280×720（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/endings/A-END-E01.png` 保存
- [ ] 底部字幕条安全区留白充足
- [ ] 配色明亮温暖，陶土橘 + 黄铜金为主调，与 art_style_guide 一致

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/endings/A-END-E01__v1__flash.png`
- 结论：🟢 / 🟡 / 🔴
- Confidence：高 / 中 / 低（仅 🔴 必填）
- 评分：
  - 风格一致性：🟢/🟡/🔴
  - 主体正确：🟢/🟡/🔴
  - 构图尺寸：🟢/🟡/🔴
  - 无禁忌元素：🟢/🟡/🔴
  - 可用性：🟢/🟡/🔴
- 修正建议（🔴/🟡 时必填，仅可改特有描述段）：
  > ...

### aiart-R1 @ 2026-05-27
- 模型：aiart 默认 artSpec
- 文件：atoms/assets/art/endings/A-END-E01.png
- 结论：🟡（Confidence：中）
- 评分：
  - 风格一致性：🟢 — 陶土橘 + 黄铜金 + 米白 + 灰薄荷绿员工列队主调，明亮温暖基调命中，扁平平涂粗描边
  - 主体正确：🟢 — 黄铜金钟悬于上方中央作视觉锚点 + HR 总监（陶土橘西装持小木槌）+ 魔王 CEO（高个带角）+ 员工列队 + 上扬股价图（含简化烛形 + 右上箭头）+ 彩纸花，叙事锚点全部命中
  - 构图尺寸：🟡 — 16:9 比例与底部字幕安全区基本满足，但**右下角格鲁巴斯私信弹窗框未出现**（prompt 明确要求 chat-popup + 圆形剪影头像 + lorem 横线）；其余构图正常
  - 无禁忌元素：🟢 — 无血腥/真实文字/写实摄影/下行曲线/真实媒体 logo；股价图为抽象 tick 形状无可读数字
  - 可用性：🟢 — 边缘清晰、无 artifacts、配色干净
- 修正建议：
  > 主体局部缺失：右下角格鲁巴斯私信弹窗未出现。如希望补上可在特有描述段「in the lower-right corner a small chat-popup notification frame...」一句前加强语气，例如替换为：`in the lower-right corner of the composition place a clearly visible small chat-popup notification frame outlined in charcoal #3D3A36 with a circular dusty-mint-green #8FA89B slime-shaped silhouette avatar on the left and three short horizontal lorem placeholder bars on the right suggesting a private message blessing from Groobas the slime intern, this popup must be present and not omitted`。当前缺失非硬门槛失败（主体核心+无禁忌均🟢），建议直接 🟡 入库，由用户裁定是否重出。
