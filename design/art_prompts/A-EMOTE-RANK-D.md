# A-EMOTE-RANK-D — 绩效评级章 D

**类别**：装饰贴 / 表情贴（绩效评级章 系列）
**来源**：`design/art_asset_list.md` v1.1 §5.8 装饰贴（新增）+ `design/narrative.md` v1.3 T05 绩效备忘录红章
**引用场景**：A-UI-RESULT 波次结算面板绩效评级槽位的最低档评级章；与 CEO-STAMP / RANK-S/A/B/C 同属红章家族

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256（06c post-process 自 Gemini 1024×1024 中央裁 1:1 后下采样 + color-to-alpha） |
| 宽高比 | 1:1 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张装饰贴，直接用 |
| atoms 落位路径 | `atoms/assets/art/emotes/A-EMOTE-RANK-D.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- **系列共同点**：圆形磨损边橡皮章；中央抽象档位字符占位
- **本档（D）独有点**：最低档（"绩效不达标"），**主色为辅 5 砖红警示 `#A85C5C`**（与 CEO-STAMP 同色调但语义为"绩效不达标"，而非"总评"），章内字符为「D」形几何半圆瓣剪影（不可读拉丁字母）
- 情绪词：deadpan 公文式末位淘汰警告、压抑克制
- 色盘偏重：**辅 5 砖红警示 `#A85C5C`（D 档主色）** + 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）+ 辅 1 描边深炭灰 `#3D3A36`
- 特殊注意：
  - 中央"D"字符以**抽象半圆瓣 silhouette**呈现（一条竖线 + 右侧贴合的半圆），绝非可读拉丁 D
  - 章外圈**不放小星**（D 档无星，区别于上档）；可放一个细小三角"！"剪影（抽象警示符号）暗示不达标
  - **与 CEO-STAMP 区分**：CEO-STAMP 中央为小恶魔角剪影 + 抽象"CEO"占位；RANK-D 中央为半圆瓣剪影 + 警示三角；语义、构图、装饰方式不同

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

a single decorative office performance grading stamp seal mark for the lowest rank tier D (failing grade), round to slightly irregular circular shape with authentic uneven worn rubber-stamp pressed-edge imperfections, solid brick-red warning #A85C5C as the dominant fill (lowest failing-tier color), centered composition with a single large abstract semicircle-with-vertical-bar silhouette in the middle as the rank glyph placeholder, the semicircle-with-bar shape is drawn as a stylized geometric symbol never readable Latin letter D, accompanied by a small abstract upright triangular warning silhouette positioned at the upper-right of the central glyph as an alert indicator, NO star silhouettes around the inner perimeter, text shapes are abstract glyph placeholders, no readable letters, no readable numbers, faint subtle paper-fiber texture visible underneath but kept minimal so it never overpowers the brick-red imprint, ink imprint texture, slightly uneven edges, flat 2D vector style, centered composition, clean isolated stamp on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, deadpan corporate failing-grade warning mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photorealistic stamp, gold foil, ornate borders, complex calligraphy, traditional Chinese seal, Japanese hanko intricate kanji, characters, portraits, blood spatter, readable letters, real text, crisp readable letter D, clearly legible Latin alphabet, sharp typeset "D" wordmark, "RANK D" text, "REJECTED" text, embossed metallic finish, decorative filigree, multiple stamps overlapping, gradient ink, glossy reflection, 3D bevel, drop shadow under stamp, framed border decoration, brass gold color, terracotta orange color, mint green color, foggy purple color, devil horn silhouette (reserved for CEO-STAMP, not RANK-D), "CEO" placeholder glyph
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》"已驳回"公文体扁平印章贴
- 《Papers, Please》"DENIED" 红章橡皮章质感（形态参考）
- 现代企业绩效"末位淘汰"红章排版

## 切图与落位建议

- **切图方式详解**：同 RANK-S
- **边距要求**：印章主体上下左右各 ≥16px 透明安全边
- **资源导入建议**（Atoms）：
  - 命名：`A-EMOTE-RANK-D.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：`emotes_atlas`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：圆形磨损边砖红印章 + 中央抽象 D 半圆瓣剪影 + 警示三角点缀，无小星
- [ ] 未出现反向 prompt 禁忌：无可读拉丁 D、无 "REJECTED" 文字、无金箔、无恶魔角剪影（避免与 CEO-STAMP 撞图）
- [ ] 主色为砖红警示 `#A85C5C`
- [ ] 与 A-EMOTE-CEO-STAMP（同砖红色但中央为恶魔角 + CEO 占位）在中央图形 + 装饰方式上视觉清晰可区分
- [ ] 尺寸落盘 256×256
- [ ] 已按 atoms 落位路径 `atoms/assets/art/emotes/A-EMOTE-RANK-D.png` 保存

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/emotes/A-EMOTE-RANK-D__v1__flash.png`
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
