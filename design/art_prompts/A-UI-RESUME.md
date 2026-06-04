# A-UI-RESUME — 简历框

**类别**：UI 框
**来源**：`design/narrative.md` v1.3（简历内心泄露句 / 应聘者一句话简历）+ `design/levels.md` v1.3 L01（招募教学，3 选 1 并排）
**引用场景**：L01 招募教学（3 张并排）/ 各关补员 / 主背景内的招募浮窗

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 600×800（06c post-process 从 Gemini 1024×1024 等比裁切 + 下采样） |
| 宽高比 | 3:4（立式） |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（简历主体周围留白便于 alpha 抠图） |
| 切图方式 | 9-slice：横向 32/536/32，纵向 32/736/32 |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-RESUME.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：企业 HR 立式简历表、deadpan、温吞带一丝期待感
- 色盘偏重：辅 2 米白 `#E8E2D5`（纸面）+ 辅 1 描边深炭灰 `#3D3A36` + 辅 4 黄铜金 `#D4A574`（"RESUME"标题装饰条）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（头像位灰底）
- 特殊注意：
  - **立式 A4 公文样式**：顶部约 100px"RESUME"大标题区（黄铜金细装饰条 + LOREM IPSUM 占位 — 大标题以视觉占位横条形式呈现，不出真实文字）
  - **头像位**：标题下方居中预留 200×200px 圆角方形灰底头像位（淡 `#B8B5A8` 填充 + 描边），后期由代码叠加角色 portrait
  - **履历栏**：头像下方 4–5 条横向 LOREM IPSUM 占位灰条（不同长度），暗示"姓名 / 职位 / 经历 / 技能"
  - **底部签名行**：最底部约 80px 留一条手绘签名线（细横线 + 雾灰底）+ 小印章预留圆（不画印章本体）
  - 3 选 1 时并排展示 → 资产本身只出**单张**，避免互相影响

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D UI element, corporate paperwork aesthetic, centered composition, 9-slice border layout, an empty single vertical job-application resume card frame in 3:4 portrait ratio, warm cream #E8E2D5 paper fill across the entire body, uniform 5px charcoal #3D3A36 outline with slightly rounded 16px corners, the top section approximately 100px tall hosts a title-bar zone rendered as ONE single thick brass-gold #D4A574 horizontal accent stripe ONLY (no grey placeholder bars, no horizontal text bars, just the brass stripe to separate header from body), ABSOLUTELY no Latin letters, no English words, no R-E-S-U-M-E shapes, no glyphs of any kind in the title area, immediately below the header a centered 200x200 px rounded-square portrait reservation slot filled with a flat foggy-beige #B8B5A8 tone and outlined in charcoal at 5px, leave this slot empty so a character portrait can be composited later, below the portrait slot the entire body interior is COMPLETELY EMPTY plain cream surface (no grey bars, no horizontal lines, no faux text indicators, no placeholder rectangles, no rows suggesting fields, just pure flat cream texture ready for code-side text overlay of name/role/stats/traits/quote), the bottom 80px area shows a single thin charcoal hairline underline ONLY representing where a signature would go, NO cursive word, NO "Signature" lettering, NO calligraphic handwriting of any kind, plus a small empty circular seal reservation outline (do not fill the seal), brass-gold tiny corner ornaments at lower-left and upper-right within a 32px corner safe zone, ABSOLUTELY NO TEXT of any kind anywhere on the canvas, NO Latin letters, NO Chinese characters, NO lorem ipsum, NO placeholder words, NO readable glyphs, NO writing whatsoever, NO grey horizontal bars implying text, only the brass header stripe + portrait slot outline + signature hairline + seal circle outline + corner brackets as the ONLY visual elements, clean isolated UI on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, no perspective, deadpan office-document mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits drawn inside the slot, real readable letters, full sentences, calligraphy, scrolls, wax seals already stamped, multiple resumes side by side, three resumes in one image, ribbon banners, baroque flourishes, holographic effects, real handwritten name in signature line, photo-collage feel, the word RESUME, English letters spelling RESUME, cursive Signature word, any readable Latin alphabet, any Chinese characters, any printable glyph, ANY TEXT, ANY LETTERS, ANY GLYPHS, ANY WORDS, lorem ipsum, LOREM IPSUM, dummy text, placeholder text, latin words, chinese characters, japanese kana, faux text, scribbled writing, grey horizontal text bars, grey placeholder bars, lines suggesting paragraphs, lines suggesting form fields, typography of any sort, watermark text, label text
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》员工招聘界面（立式公文 + 头像位 + 履历栏）
- 现代企业 HR Workday 简历模板（极简扁平 + 黄铜金强调色）
- 《Papers, Please》护照页排版的扁平克制简化版

## 切图与落位建议

- **切图方式详解**：9-slice 切片，横向 32/536/32，纵向 32/736/32；头像预留位与签名印章位**禁止参与拉伸**，由 Atoms 端按相对锚点叠加
- **边距要求**：上下左右各预留 32px 安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-RESUME.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 UI atlas）
  - Sprite Mode：Sliced，Border L=32 R=32 T=32 B=32
  - **3 选 1 并排展示**：由 UI 布局横向并列 3 份 sprite instance，本资产只出 1 张

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：3:4 立式 + RESUME 标题区 + 头像预留位 + 履历占位栏 + 签名行
- [ ] 未出现反向 prompt 禁忌：无真实文字、头像位为空、无多张并排
- [ ] 尺寸落盘 600×800（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-RESUME.png` 保存
- [ ] 9-slice 设定正确，头像位与签名印章位由代码叠加
- [ ] L01 招募教学场景中 3 张并排显示效果一致

## 审核结论（06d 逐轮追加，不覆盖历史）

### aiart-R2 @ 2026-06-04（用户驳回 v1：灰横条占位 + RESUME 字样烧入；prompt 修订 + 重出）
- 模型：aiart 默认 artSpec
- 文件：`atoms/assets/art/ui/A-UI-RESUME.png`（覆盖 v1；__v2__aiart.png 保留历史）
- 触发：A-UI-CARD-EVENT / A-UI-RESULT R2 修订同期，用户问"简历的 ui 是不是也需要改"。回查 v1 prompt 自身要求"五条灰横条 LOREM IPSUM 占位 + 两条头部灰带占位"，与 atoms 端代码叠加文字打架；旧版 06d 审核结论行 98 也确认 v1 顶部还泄漏过可读"RESUME"单词
- 修订点：
  - 正向 prompt：删除"TWO solid horizontal placeholder bars"+"five horizontally stacked light grey LOREM IPSUM placeholder bars"句；改为"ONE single brass-gold horizontal accent stripe ONLY"（顶部）+"body interior is COMPLETELY EMPTY plain cream surface (no grey bars, no horizontal lines, no faux text indicators)"（body）
  - 反向 prompt：在原有"the word RESUME / cursive Signature"基础上追加 LOREM IPSUM / dummy text / placeholder text / grey horizontal text bars / lines suggesting form fields / typography 等强禁忌
  - pipeline：`run_aiart_repair_v2.js`（含 trim → resize 600×800 contain）
- 验收：图本体完全无文字 + 无假灰条；brass 顶带 + 白色 200×200 头像槽 + 米白干净 body + 底部签名线 + 圆章位 + 4 角铜色装饰；用户 2026-06-04 在 mockup 03 验证通过；BUST 头像精确落入白槽

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-RESUME__v1__flash.png`
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
- 文件：atoms/assets/art/ui/A-UI-RESUME.png
- 结论：🔴（Confidence：高）
- 评分：
  - 风格一致性：🟢 — 立式 A4 公文、米白纸面、黄铜金标题条、雾灰头像位与 v1.0 一致。
  - 主体正确：🟢 — 3:4 立式 + 标题区 + 居中 200 头像位 + 履历占位条 + 底部签名行印章圆，全部命中。
  - 构图尺寸：🟢 — 单张居中、四角护角装饰克制、留白充足。
  - 无禁忌元素：🔴 — 顶部出现两次清晰可读的英文 "RESUME" 单词，底部出现可读的手写体 "Signature"；spec 与全局禁忌均要求 no real readable letters，仅允许 LOREM IPSUM 占位灰条。
  - 可用性：🟡 — 头像位居中略偏小且可读文字若不裁掉将干扰运行时叠加角色 portrait 与签名层。
- 修正建议：
  > 在特有描述段把"large LOREM IPSUM placeholder block above and below the brass-gold stripe implying a big RESUME header without drawing real letters"改写为"render the title area as TWO solid grey horizontal placeholder bars only, absolutely no Latin letters, no English words, no R-E-S-U-M-E shapes"；底部签名行同步改为"a single thin charcoal hairline ONLY, no cursive word, no 'Signature' lettering"。反向 prompt 追加 `the word RESUME, English letters spelling RESUME, cursive Signature word, any readable Latin alphabet`。
