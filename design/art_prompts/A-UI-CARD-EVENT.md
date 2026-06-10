# A-UI-CARD-EVENT — 突发卡片 / 日志 / 备忘录通用框

**类别**：UI 框
**来源**：`design/concept.md` + `design/narrative.md` v1.3（B/C 系列突发事件 + T05 备忘录）+ `design/levels.md` v1.3（战斗日志 BATTLELOG）
**引用场景**：L02–L06 突发事件卡片 / 战斗日志 / 绩效备忘录（同一 9-slice 底，仅角标 + 配色变体）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 900×600（06c post-process 从 Gemini 1024×1024 等比裁切 + 下采样） |
| 宽高比 | 3:2 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（卡片主体周围充足留白便于 alpha 抠图） |
| 切图方式 | 9-slice：横向 32/836/32，纵向 32/536/32（四角圆角 24px 保护） |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-CARD-EVENT.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：deadpan office-comedy、企业内部公文体、温吞、一丝紧绷感（突发事件用）
- 色盘偏重：辅 2 米白 `#E8E2D5`（纸面主体）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（描边外晕 / 阴影侧）+ 辅 1 描边深炭灰 `#3D3A36`（粗描边）+ 辅 4 黄铜金 `#D4A574`（角标 / 顶部装饰条极少量点缀）
- 特殊注意：
  - **9-slice 友好**：四角装饰需限制在 32×32 内不超出，中央大面积扁平米白纸面便于横纵双向拉伸
  - 仅出空白卡片底，**标题 / 正文 / 选项按钮文字** 由代码叠加；卡片内绝不出现任何文字或灰条占位
  - 顶部留 96px 标题区（标题最上方 + 右侧倒计时小槽）+ 中部 284px 正文区 + 底部 220px 双选项区（两个上下纵向排列的浅色矩形预留位）
  - 公文体质感：米白纸面 + 雾灰描边 + 黄铜金细线，不要羊皮卷 / 中世纪华丽花纹

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D UI element, corporate paperwork aesthetic, centered composition, 9-slice border layout, an empty WIDE LANDSCAPE HORIZONTAL event-card frame in exact 3:2 ratio, the card is clearly wider than tall, target output feels like 900 by 600 pixels, occupying about 78 percent of the canvas centered, NOT a portrait document, NOT a vertical resume, NO characters anywhere, NO chibi monsters, NO figures of any kind around or inside the card frame, ABSOLUTELY no mascots flanking the panel, ONLY the empty wide horizontal event-card frame itself, warm cream #E8E2D5 paper-like fill across the entire card body, surrounded by a uniform 5px charcoal #3D3A36 hand-drawn outline with gently rounded 24px corners, a subtle foggy-beige #B8B5A8 hard-edged drop block on the right and bottom inner edge to suggest paper thickness without photographic shadow, the body interior is clearly divided into three vertical zones from top to bottom inside this wide horizontal card: FIRST a top title bar zone about 16 percent of the card height, positioned at the very top across the full card width, separated by one thin brass-gold #D4A574 horizontal accent stripe, with a small empty circular timer reservation slot in the upper-right corner; SECOND a large central content zone about 47 percent of the card height, completely plain and empty for event description text; THIRD a bottom choices zone about 37 percent of the card height containing TWO vertically stacked empty rounded-rectangle button reservation slots, one above the other, each spanning most of the card width, with generous gap between them, the two button slots must NOT be side-by-side and must NOT sit on one horizontal row, all internal divisions are drawn as faint hairline charcoal rules at low opacity, decorative corner ornaments kept minimal as tiny brass-gold corporate-memo brackets in the upper-left and lower-right within a 32px corner safe zone, ABSOLUTELY NO TEXT of any kind anywhere on the card, NO Latin letters, NO Chinese characters, NO lorem ipsum, NO placeholder words, NO readable glyphs, NO calligraphy, NO writing whatsoever, the interior text zones must be COMPLETELY EMPTY with plain cream texture only (no grey bars, no lines suggesting text, just pure flat cream surface ready for code-side text overlay), the area outside the card frame is pure flat foggy-beige #B8B5A8 grey negative space with absolutely nothing in it, clean isolated UI on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, no perspective, deadpan corporate office-document mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, portrait page, portrait document, vertical resume, tall narrow sheet, A4 resume layout, mobile phone screen aspect ratio, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits, real readable letters, full sentences, calligraphy, scrolls, wax seals, leather book texture, ribbon banners, gemstones, glowing magical borders, paper tearing, bloodstains on paper, ornate baroque corners, gilded filigree, holographic effects, chibi monsters surrounding frame, characters around card, multiple figures next to UI, mascots flanking the panel, creatures peeking from behind frame, any human or monster figures in the scene, two buttons arranged side-by-side, horizontal pair of option buttons, left-right choice buttons, ANY TEXT, ANY LETTERS, ANY GLYPHS, ANY WORDS, lorem ipsum, LOREM IPSUM, dummy text, placeholder text, latin words, chinese characters, japanese kana, korean hangul, alphabet, numerals, digits, numbers, faux text, scribbled writing, grey horizontal text bars, lines suggesting paragraphs, typography of any sort, watermark text, signature text, label text
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》员工备忘录 / 政策弹窗 UI（米白公文 + 极简描边）
- 《Reigns: Her Majesty》事件卡牌底框（3:2 居中 + 留白）
- 现代企业 HR 制度通告排版（A4 公文 + 黄铜金细边）

## 切图与落位建议

- **切图方式详解**：9-slice 切片，横向 32/836/32，纵向 32/536/32；四角圆角受 32px 安全区保护；中央扁平区可任意拉伸
- **边距要求**：上下左右各预留 32px 安全区，禁止装饰元素侵入边缘 32px 区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-CARD-EVENT.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 UI atlas）
  - Sprite Mode：Sliced 9-slice，Border L=32 R=32 T=32 B=32

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：3:2 卡片 + 公文体 + 标题最上 / 正文中间 / 底部两个纵向按钮槽 + 9-slice 友好
- [ ] 未出现反向 prompt 禁忌：无真实文字、无华丽中世纪花纹、无角色
- [ ] 尺寸落盘 900×600（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-CARD-EVENT.png` 保存
- [ ] 9-slice 切片设定正确（边角不被拉伸变形）
- [ ] 在战斗事件卡 / BATTLELOG / MEMO 三种用途下叠加文字后显示正常

## 审核结论（06d 逐轮追加，不覆盖历史）

### aiart-R2 @ 2026-06-04（用户驳回 v1：LOREM IPSUM 占位文字烧入；prompt 修订 + 重出）
- 模型：aiart 默认 artSpec
- 文件：`atoms/assets/art/ui/A-UI-CARD-EVENT.png`（覆盖 v1；__v2__aiart.png 保留历史）
- 触发：用户在 atoms 主界面截图中发现 v1 资产中央"LOREM IPSUM"字样泄漏到游戏 UI；溯源发现 v1 正向 prompt 自身要求"only LOREM IPSUM placeholder text shown as light grey horizontal bars"
- 修订点：
  - 正向 prompt：删除"only LOREM IPSUM placeholder text"句，改为"ABSOLUTELY NO TEXT of any kind anywhere on the card... pure flat cream surface ready for code-side text overlay"
  - 反向 prompt：增加"ANY TEXT, ANY LETTERS, lorem ipsum, LOREM IPSUM, dummy text, placeholder text, latin words, chinese characters, faux text, grey horizontal text bars..."等强禁忌
  - pipeline 同步：`run_aiart_repair_v2.js` 已包含 trim 步骤（rmbg → trim → resize 900×600 contain）
- 验收：图本体完全无文字；4 角铜色装饰 + 标题带 + 中央正文区 + 底部 2 按钮位结构清晰；用户 2026-06-04 在 mockup 05 验证通过

### aiart-R3 @ 2026-06-10（用户反馈突发事件底图布局需改为纵向按钮）
- 触发：用户提交实机截图，指出理想状态为“标题最上方，中间是内容，下方两个按钮由纵向排列”。
- 修订点：
  - 正向 prompt：底部选项区从“two side-by-side option buttons”改为“TWO vertically stacked empty rounded-rectangle button reservation slots”。
  - 分区比例：顶部标题区约 16%，中部正文区约 47%，底部双选项区约 37%。
  - 反向 prompt：追加 side-by-side / horizontal pair / left-right choice buttons 禁忌。
- 验收目标：新图本体无文字；标题区在最上方；正文区完整留白；底部两个按钮槽上下排列，且与前端 `EventDialog` 的纵向按钮叠加一致。

### aiart-R4 @ 2026-06-10（R3 竖版化，强化横向 3:2 面板）
- 触发：R3 命中纵向按钮结构，但 aiart 将卡片理解为竖版简历/公文，输出接近 portrait document，不适合作为当前 3:2 横向事件弹窗。
- 修订点：
  - 正向 prompt 开头强化 `WIDE LANDSCAPE HORIZONTAL event-card frame in exact 3:2 ratio`、`card is clearly wider than tall`、`NOT a portrait document, NOT a vertical resume`。
  - 反向 prompt 追加 portrait page / portrait document / vertical resume / tall narrow sheet / A4 resume layout / mobile phone screen aspect ratio。
- 验收目标：900×600 横向固定画布；卡片横向 3:2；按钮仍为底部上下纵排。

### codegen-R5 @ 2026-06-10（去除双层感 / 阴影，改为单层扁平面板）
- 触发：用户在实机截图中反馈突发事件底图有“两层”的感觉，右下存在类似阴影/偏移板，不需要这些视觉负担。
- 修订点：
  - 不再继续消耗 aiart 迭代；直接用程序化 SVG → PNG 生成 900×600 单层扁平面板。
  - 保留三段结构：顶部标题区 / 中部正文留白 / 底部两个纵向按钮槽。
  - 明确去除：drop shadow、右下偏移层、纸张叠层、AI 纹理噪声。
- 落盘文件：
  - `atoms/assets/art/ui/A-UI-CARD-EVENT.png`
  - `atoms/Dungeon‌sHR/app/frontend/public/art/ui/A-UI-CARD-EVENT.png`
  - `atoms/Dungeon‌sHR/assets/art/ui/A-UI-CARD-EVENT.png`
- 前端同步：`EventDialog` 去掉额外圆角裁切，文字改为深色以匹配浅色单层面板；T04 教学 toast 改为 CSS 透明黑底。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-CARD-EVENT__v1__flash.png`
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
- 文件：atoms/assets/art/ui/A-UI-CARD-EVENT.png
- 结论：🔴（Confidence：高）
- 评分：
  - 风格一致性：🟢 — 莫兰迪米白纸面、雾灰描边、黄铜金角标语感与 v1.0 一致。
  - 主体正确：🔴 — 出现 6 只 chibi 怪物围绕卡片框，spec 明确"仅出空白卡片底"且禁止角色。
  - 构图尺寸：🟡 — 中央卡片本体 3:2 比例与三段式分区基本到位，但被 6 只角色挤占大量留白与四角安全区。
  - 无禁忌元素：🟢 — 无血腥/真实科技/中世纪羊皮卷；LOREM IPSUM 占位文本未出现真实可读句子。
  - 可用性：🔴 — 角色与卡框混在同一张 PNG，9-slice 拉伸时角色会被横向横切，且无法作为通用事件卡复用。
- 修正建议：
  > 在特有描述段强化 "no characters, no monsters, no chibi creatures, no figures of any kind around or inside the card frame, ONLY the empty rectangular event-card frame centered on the canvas with pure grey negative space everywhere else"，并在反向 prompt 追加 `chibi monsters surrounding frame, characters around card, multiple figures next to UI, mascots flanking the panel`，同时把"3:2 卡片居中独占画面 70% 以上面积"显式写入正向描述。
