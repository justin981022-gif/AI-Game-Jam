# A-EMOTE-CEO-STAMP — CEO 邮件红色印章

**类别**：装饰贴 / 表情贴
**来源**：`design/art_asset_list.md` v1.0 §5.8 装饰贴
**引用场景**：CEO 邮件框（高冷无情但克制的魔王 CEO 不出立绘，改用印章 + 邮件框承载，见 `design/narrative.md` v1.3 §角色表 — CEO 形象气质）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256（06c post-process 自 Gemini 1024×1024 等比下采样） |
| 宽高比 | 1:1 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张装饰贴，直接用；06c 后处理纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/emotes/A-EMOTE-CEO-STAMP.png` |
| pivot 位置 | Center（印章中心，便于 UI 旋转倾斜叠在邮件框上） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：高冷无情但克制、deadpan 公文式压迫感、一击盖章定生死的职场威严
- 色盘偏重：辅 5 砖红警示 `#A85C5C`（印章主色，按 art_style_guide §主色 2 的"砖红警示 — 突发卡片倒计时 / 绩效不达标提示 / E04 离职仲裁结局氛围"语义指派给 CEO 邮件印章红）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（纯灰底）
- 特殊注意：
  - 形状为**圆形 / 略不规则圆形**，模拟橡皮章按压不均匀的真实公文印章式磨损边缘
  - 中央**留出 emoji-style 小恶魔角剪影 + "CEO" 占位字符**或几何象征图形作为辨识锚点（与 art_style_guide 的 chibi devil-horn 公司 logo 呼应）
  - **不要**真实可读文字 — text shapes 仅作 abstract glyph placeholders，禁止任何可识别字母、汉字、印章篆刻
  - 纸面纹理可见但不喧宾夺主，砖红主色保持平涂为主，磨损通过边缘破损与极少量同色相暗块表达
  - 不要传统中式印章篆刻、日式 hanko 复杂汉字、金箔烫印、繁复花边

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

a single decorative office mail stamp seal mark for the Demon Lord CEO, round to slightly irregular circular shape with authentic uneven worn rubber-stamp pressed-edge imperfections simulating uneven ink imprint, solid brick-red warning color #A85C5C as the dominant fill (per art_style_guide accent 5 reassigned to CEO mail stamp red), centered composition with a small flat emoji-style chibi devil-horn silhouette icon in the middle paired with abstract glyph placeholder shapes resembling the letters "CEO" rendered as simple geometric symbolic marks, text shapes are abstract glyph placeholders, no readable letters, faint subtle paper-fiber texture visible underneath but kept minimal so it never overpowers the brick-red imprint, ink imprint texture, slightly uneven edges, flat 2D vector style, centered composition, clean isolated stamp on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, deadpan corporate authority mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photorealistic stamp, gold foil, ornate borders, complex calligraphy, traditional Chinese seal, Japanese hanko intricate kanji, characters, portraits, blood spatter, readable letters, real text, embossed metallic finish, decorative filigree, multiple stamps, overlapping seals, gradient ink, glossy reflection, 3D bevel, drop shadow under stamp, framed border decoration
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》UI 中"已驳回 / 已批准"公文体扁平印章贴
- 《Papers, Please》护照审核印章的磨损橡皮章质感（形态参考，非配色）
- Corporate Memphis 风格的扁平企业印章插画（克制版）

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比下采样到 256×256；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：印章主体上下左右各预留至少 16px 透明安全边，避免在 UI 邮件框上贴边裁切；磨损边缘视为印章一部分，不可被边距裁掉
- **资源导入建议**（Atoms）：
  - 命名：`A-EMOTE-CEO-STAMP.png`（与目录约定一致）
  - pivot / anchor：Center（印章几何中心，便于 UI 端做 ±5°~15° 倾斜旋转盖章动效）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与其他 `A-EMOTE-*` 装饰/表情贴可共打 `emotes_atlas`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：圆形磨损边砖红印章 + 中央小恶魔角剪影 + 抽象 "CEO" 占位符号
- [ ] 未出现反向 prompt 禁忌：无金箔、无传统中式篆刻、无日式 hanko 汉字、无可读真实文字、无血迹
- [ ] 主色为砖红警示 `#A85C5C`（按 art_style_guide §辅色盘 5 / CEO 邮件印章红语义）
- [ ] 尺寸落盘 256×256（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/emotes/A-EMOTE-CEO-STAMP.png` 保存
- [ ] 资源导入设置：Bilinear 采样、Center pivot、可进 emotes_atlas
- [ ] 在 CEO 邮件框 UI 实际显示正常：可旋转倾斜盖章、与邮件纸底色对比清晰

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/emotes/A-EMOTE-CEO-STAMP__v1__flash.png`
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
- 文件：atoms/assets/art/emotes/A-EMOTE-CEO-STAMP.png
- 结论：🟡（Confidence：高）
- 评分：
  - 风格一致性：🟢 — 砖红 #A85C5C + 磨损橡皮章感 + 中央 chibi 小恶魔角剪影，deadpan 公文威严到位。
  - 主体正确：🟢 — 略不规则圆形 + 中心恶魔头剪影 + 抽象环绕字符，命中 spec。
  - 构图尺寸：🟢 — 1:1 居中、磨损边缘未被裁切、安全区充足。
  - 无禁忌元素：🟡 — 中央与下方各出现一组形似 "CEO" 的清晰可读拉丁字母（spec 与 reviewer reminder 均要求字符仅作 abstract glyph placeholder，CEO 文字以"text-as-shape" 方式呈现 OK，但当前看起来已接近真实可读字母而非纯几何符号）。
  - 可用性：🟢 — Center pivot 适合做 ±5°~15° 倾斜盖章动效；色对比足以贴在 #E8E2D5 邮件纸面。
- 修正建议：
  > 在特有描述段把"abstract glyph placeholder shapes resembling the letters 'CEO'"改写为"three abstract geometric badge symbols (a small triangle, a circle and a square) arranged around the devil-horn silhouette, evocative of the letters C-E-O ONLY as silhouettes, never as readable Latin characters"，并在反向 prompt 追加 `crisp readable letters C E O, clearly legible Latin alphabet, sharp typeset 'CEO' wordmark`。reminder 明确"如出现真实可读中文则 🟡"，本资产因可读拉丁字母同样按 🟡 处置。
