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
  - 仅出空白卡片底，**正文标题 / 正文 / 选项按钮** 由代码叠加；卡片内仅以 `LOREM IPSUM placeholder` 兜底示意分区
  - 顶部留 80px 标题区（黄铜金细装饰条）+ 中部 360px 正文区 + 底部 120px 双选项区（两个浅色矩形预留位）
  - 公文体质感：米白纸面 + 雾灰描边 + 黄铜金细线，不要羊皮卷 / 中世纪华丽花纹

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D UI element, corporate paperwork aesthetic, centered composition, 9-slice border layout, an empty rectangular event-card frame in 3:2 ratio occupying about 75 percent of the canvas centered, NO characters anywhere, NO chibi monsters, NO figures of any kind around or inside the card frame, ABSOLUTELY no mascots flanking the panel, ONLY the empty card frame itself, warm cream #E8E2D5 paper-like fill across the entire card body, surrounded by a uniform 5px charcoal #3D3A36 hand-drawn outline with gently rounded 24px corners, a thin brass-gold #D4A574 horizontal accent stripe just below the top edge separating a small title bar zone from the main body, a subtle foggy-beige #B8B5A8 hard-edged drop block on the right and bottom inner edge to suggest paper thickness without photographic shadow, the body interior is divided into three flat zones from top to bottom: a slim title strip area at top, a large central body area, and a bottom area sized for two side-by-side option buttons, all internal divisions are drawn as faint hairline charcoal rules at low opacity, decorative corner ornaments kept minimal as tiny brass-gold corporate-memo brackets in the upper-left and lower-right within a 32px corner safe zone, no real text anywhere, only LOREM IPSUM placeholder text shown as light grey horizontal bars to imply text fields, the area outside the card frame is pure flat foggy-beige #B8B5A8 grey negative space with absolutely nothing in it, clean isolated UI on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, no perspective, deadpan corporate office-document mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits, real readable letters, full sentences, calligraphy, scrolls, wax seals, leather book texture, ribbon banners, gemstones, glowing magical borders, paper tearing, bloodstains on paper, ornate baroque corners, gilded filigree, holographic effects, chibi monsters surrounding frame, characters around card, multiple figures next to UI, mascots flanking the panel, creatures peeking from behind frame, any human or monster figures in the scene
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

- [ ] Gemini 出图符合正向 prompt：3:2 卡片 + 公文体 + 三段式分区 + 9-slice 友好
- [ ] 未出现反向 prompt 禁忌：无真实文字、无华丽中世纪花纹、无角色
- [ ] 尺寸落盘 900×600（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-CARD-EVENT.png` 保存
- [ ] 9-slice 切片设定正确（边角不被拉伸变形）
- [ ] 在战斗事件卡 / BATTLELOG / MEMO 三种用途下叠加文字后显示正常

## 审核结论（06d 逐轮追加，不覆盖历史）

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
