# A-UI-MAIL-CEO — CEO 邮件框（公文体）

**类别**：UI 框
**来源**：`design/narrative.md` v1.3（CEO 邮件公文体语感，T01/T06/T07/P04）+ art_style_guide §主色 2 替代 CEO 立绘约定
**引用场景**：L01 入职欢迎邮件 / L04 末警告邮件 / L06 巡查通告 / L07 上市与结局触发邮件

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 800×500（06c post-process 从 Gemini 1024×1024 等比裁切 + 下采样） |
| 宽高比 | 8:5 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（邮件主体周围留白便于 alpha 抠图） |
| 切图方式 | 9-slice：横向 40/720/40，纵向 40/420/40 |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-MAIL-CEO.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：企业公文体、官腔、压迫感（CEO 高位 → 玩家）、deadpan 黑色幽默
- 色盘偏重：辅 2 米白 `#E8E2D5`（信纸主体）+ 辅 4 黄铜金 `#D4A574`（公司抬头横线 / 折角金属感）+ 主 2 陶土橘 `#C97B5C`（红章预留圆位极淡描边）+ 辅 1 描边深炭灰 `#3D3A36`
- 特殊注意：
  - **公文体抬头**：顶部"FROM: CEO"占位栏（仅 LOREM IPSUM 占位灰条，不出真实文字）+ 黄铜金水平分隔线
  - **右下角红章预留圆位**：留一个半透明圆形浅印记区（直径约 200px，淡陶土橘 5% 不透明）— 后期由 06c 在 Atoms 端叠加 `A-EMOTE-CEO-STAMP`，本资产**不画完整红章**，仅留位
  - **左上折角信封感**：左上角约 80×80px 三角折角，雾灰阴影暗示信封翻开
  - 其余区域是抬头 / 正文 / 落款三段式，全部用浅灰横条占位

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D UI element, corporate paperwork aesthetic, centered composition, 9-slice border layout, an empty corporate inter-office memo email frame in 8:5 ratio, warm cream #E8E2D5 letter-paper fill across the body, uniform 5px charcoal #3D3A36 outline with very lightly rounded 16px corners, an upper letterhead band approximately 90px tall is COMPLETELY EMPTY plain cream surface (no grey bars, no horizontal lines suggesting "FROM"/"TO" header text — that text will be overlaid by code), separated from the body by a horizontal brass-gold #D4A574 hairline divider, the upper-left corner shows an 80x80 px folded envelope-corner triangle in a slightly darker cream tone with a hard-edged charcoal shadow line suggesting the letter has been opened, the body interior is COMPLETELY EMPTY plain cream surface (no grey bars, no horizontal lines, no faux text indicators, no placeholder rectangles, no rows suggesting paragraphs, just pure flat cream texture ready for code-side text overlay of the email body), the lower-right area reserves a soft circular reservation zone roughly 200 px in diameter rendered as a very faint pale terracotta #C97B5C circle outline at low opacity to mark the future seal placement (do not draw a stamp inside, leave the circle area mostly empty), a small brass-gold corporate logo monogram placeholder in the top-right header corner shown only as a tiny diamond shape, ABSOLUTELY NO TEXT of any kind anywhere on the memo, NO Latin letters, NO Chinese characters, NO lorem ipsum, NO placeholder words, NO readable glyphs, NO writing whatsoever, NO grey horizontal bars implying text, clean isolated UI on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, no perspective, deadpan official corporate-memo mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits, real readable letters, full sentences, calligraphy, royal seals, dragon insignia, wax seal already stamped, ribbon banners, gold leaf filigree, baroque flourishes, holographic effects, finished red CEO stamp drawn inside the reservation circle, signature in handwritten ink, ANY TEXT, ANY LETTERS, ANY GLYPHS, ANY WORDS, lorem ipsum, LOREM IPSUM, dummy text, placeholder text, latin words, chinese characters, faux text, scribbled writing, grey horizontal text bars, grey placeholder bars, lines suggesting paragraphs, typography of any sort, "FROM" header text, "TO" header text, subject line text
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》上司邮件弹窗（公文 + 折角信封 + 公司抬头）
- 现代企业内部 OA 邮件 UI（顶部抬头 + 黄铜金细线分隔）
- 《Papers, Please》公文模板的克制扁平化简版

## 切图与落位建议

- **切图方式详解**：9-slice 切片，横向 40/720/40，纵向 40/420/40；折角与红章预留圆位置于中央可拉伸区，**禁止 9-slice 拉伸折角与圆位**（必要时改为定位锚点）
- **边距要求**：上下左右各预留 40px 安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-MAIL-CEO.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 UI atlas）
  - Sprite Mode：Sliced，Border L=40 R=40 T=40 B=40
  - **运行时合成**：右下圆位由 Atoms 端叠加 `A-EMOTE-CEO-STAMP` Sprite，定位锚点为右下相对偏移 (-120, +120)

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：8:5 邮件 + 抬头 + 折角 + 红章预留圆位（**未画红章**）
- [ ] 未出现反向 prompt 禁忌：无真实文字、无完整红章、无中世纪羊皮卷
- [ ] 尺寸落盘 800×500（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-MAIL-CEO.png` 保存
- [ ] 9-slice 切片设定正确，红章预留圆位 + 折角不被拉伸
- [ ] 与 `A-EMOTE-CEO-STAMP` 叠加测试通过

## 审核结论（06d 逐轮追加，不覆盖历史）

### aiart-R2 @ 2026-06-04（用户驳回 v1：抬头 2 条 + body 4 条共 6 条 LOREM IPSUM 灰横条；prompt 修订 + 重出）
- 模型：aiart 默认 artSpec
- 文件：`atoms/assets/art/ui/A-UI-MAIL-CEO.png`（覆盖 v1；__v2__aiart.png 历史保留）
- 触发：与 TOAST 同次扫描；v1 中 6 条灰横条最严重，atoms 端叠 CEO 邮件正文时几乎全屏文字打架
- 修订点：
  - 正向：抬头改"COMPLETELY EMPTY plain cream surface"，body 改"COMPLETELY EMPTY ready for code-side text overlay"；保留信封折角、brass 横线、右下 terracotta 圆章位、右上 brass 钻形 logo 位
  - 反向：追加 LOREM IPSUM / dummy text / "FROM" header text / "TO" header text / subject line text 等强禁忌
- 验收：图本体完全无文字 + 无灰条；左上信件折角 + brass 顶分隔 + 右上 brass 钻形 logo + 右下浅 terracotta 圆章位 + 米白干净 body 全部命中

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-MAIL-CEO__v1__flash.png`
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
- 文件：atoms/assets/art/ui/A-UI-MAIL-CEO.png
- 结论：🟢（Confidence：高）
- 评分：
  - 风格一致性：🟢 — 米白信纸 + 雾灰描边 + 黄铜金细线分隔、deadpan 公文体到位。
  - 主体正确：🟢 — 8:5 邮件框 + 顶部抬头 + 左上折角 + 右下淡陶土橘红章预留圆，全部命中 spec。
  - 构图尺寸：🟢 — 横向居中、留白充足、四角圆角克制，9-slice 安全区无装饰侵入。
  - 无禁忌元素：🟢 — 红章预留位仅画浅色空圆，未画完整印章；无真实可读文字、无华丽花纹。
  - 可用性：🟢 — 折角与红章预留圆都在中央可拉伸区外侧但仍属定位锚点处理范围；与 A-EMOTE-CEO-STAMP 叠加位置一致。
- 修正建议：（无）
