# A-UI-RESULT — 波次结算面板

**类别**：UI 框（9-slice）
**来源**：`design/art_asset_list.md` v1.1 §5.4 UI 框（新增）+ `design/narrative.md` v1.3 P05 / T05 结算与备忘录触发点
**引用场景**：每波战斗结束后展示「灵魂碎片收支 / 阵亡名单 / 绩效评级」三段式结算容器；与 A-EMOTE-RANK-* 红章联动呈现

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 900×700（06c post-process 自 Gemini 1024×1024 中央裁 9:7 后下采样 + color-to-alpha） |
| 宽高比 | 9:7 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（结算面板主体周围留白便于 alpha 抠图） |
| 切图方式 | 9-slice：横向 40/820/40，纵向 40/620/40（四角圆角 20px 保护） |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-RESULT.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：deadpan 季度 OKR 复盘公文体、克制凝重又一丝荒诞、HR 内部绩效备忘录调性
- 色盘偏重：辅 2 米白 `#E8E2D5`（纸面主体）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）+ 辅 1 描边深炭灰 `#3D3A36`（粗描边）+ 辅 4 黄铜金 `#D4A574`（顶部标题装饰条 + 段落分隔线）+ 主 3 灰薄荷绿 `#8FA89B`（碎片收益区域微点缀） + 辅 5 砖红警示 `#A85C5C`（阵亡名单微点缀）
- 特殊注意：
  - **三段式纵向分区**：顶部 110px 标题区（含 "QUARTERLY REVIEW / 季度复盘" 占位横条）+ 中部 460px 主体区（自上而下三个等高扁平子分区：碎片收支 / 阵亡名单 / 绩效评级红章预留位）+ 底部 130px 双选项区（确认 / 下一波 CTA 留位）
  - 子分区之间用**黄铜金细线分隔**（不超过 1px 粗）
  - **绩效评级红章预留位**：第三子分区右侧留一个 256×256 圆形虚位（淡灰描边），用于 Atoms 端叠加 A-EMOTE-RANK-* 红章
  - **9-slice 友好**：四角装饰限制在 40×40 安全区内，中央可任意拉伸
  - 公文体质感：米白纸面 + 雾灰描边 + 黄铜金细线，不要羊皮卷 / 中世纪华丽花纹 / 真实可读文字

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D UI element, corporate quarterly review panel aesthetic, centered composition, 9-slice border layout, an empty rectangular wave-result panel frame in 9:7 ratio occupying about 75 percent of the canvas centered, NO characters anywhere, NO chibi monsters, NO figures of any kind around or inside the panel frame, ABSOLUTELY no mascots flanking the panel, ONLY the empty panel frame itself, warm cream #E8E2D5 paper-like fill across the entire panel body, surrounded by a uniform 5px charcoal #3D3A36 hand-drawn outline with gently rounded 20px corners, a thin brass-gold #D4A574 horizontal accent stripe just below the top edge separating a small title bar zone from the main body, the body interior is divided into three flat horizontal sub-zones from top to bottom of equal height: a soul-shard income/expense ledger zone hinted with light dusty-mint #8FA89B square placeholder block in the upper-left corner of the zone, a casualty list zone hinted with a small brick-red #A85C5C square placeholder block in the upper-left corner of the zone, and a performance-rating zone with a clearly visible empty circular dashed-outline placeholder slot of 256x256 size on the right side reserved for a future rank stamp emblem, sub-zones are separated by faint hairline brass-gold rules at low opacity, a bottom area sized for two side-by-side option buttons, all internal divisions drawn as faint hairline charcoal rules, decorative corner ornaments kept minimal as tiny brass-gold corporate-memo brackets within a 40px corner safe zone, no real text anywhere, only LOREM IPSUM placeholder text shown as light grey horizontal bars to imply data fields, the area outside the panel frame is pure flat foggy-beige #B8B5A8 grey negative space with absolutely nothing in it, clean isolated UI on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, no perspective, deadpan corporate quarterly review mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits, real readable letters, full sentences, calligraphy, scrolls, wax seals, leather book texture, ribbon banners, gemstones, glowing magical borders, paper tearing, bloodstains on paper, ornate baroque corners, gilded filigree, holographic effects, chibi monsters surrounding panel, characters around UI, multiple figures next to panel, mascots flanking, creatures peeking from behind frame, any human or monster figures in the scene, charts with real numbers, line graphs with axis labels, bar charts with values
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》月末财报弹窗（米白公文 + 极简数据条）
- 《Football Manager》赛后季度评分面板（理性克制三段式分区）
- 现代企业季度 OKR 复盘 PPT 模板（A4 公文 + 黄铜金细边）

## 切图与落位建议

- **切图方式详解**：9-slice 切片，横向 40/820/40，纵向 40/620/40；四角圆角受 40×40 安全区保护；中央扁平区可任意拉伸
- **边距要求**：上下左右各预留 40px 安全区，禁止装饰元素侵入边缘 40px 区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-RESULT.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 `ui_atlas`）
  - Sprite Mode：Sliced 9-slice，Border L=40 R=40 T=40 B=40

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：9:7 结算面板 + 公文体三段式分区 + 绩效红章圆形预留位 + 底部双 CTA 留位
- [ ] 未出现反向 prompt 禁忌：无真实文字、无华丽中世纪花纹、无角色、无真实数据图表
- [ ] 尺寸落盘 900×700（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-RESULT.png` 保存
- [ ] 9-slice 切片设定正确（边角不被拉伸变形）
- [ ] 绩效红章预留位与 A-EMOTE-RANK-* 256×256 尺寸吻合可叠加

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-RESULT__v1__flash.png`
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
