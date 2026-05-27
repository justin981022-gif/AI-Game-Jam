# A-BG-PREP — 准备阶段背景（HR 办公室）

**类别**：场景背景
**来源**：主策划 + `design/levels.md` v1.3（L01–L06 准备阶段）
**引用场景**：L01 入职第一天 / L02–L06 每日准备阶段（招募 / 扩建 / 奖金界面共用底图）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 1920×1080（06c post-process 下采样自 Gemini 1024×1024） |
| 宽高比 | 16:9 |
| 背景要求 | 带场景背景（非透明）；主背景明度 70~75，以莫兰迪雾灰 `#B8B5A8` 为底色基调 |
| 切图方式 | 单张全屏背景，直接铺底，不分层（无视差） |
| atoms 落位路径 | `atoms/assets/art/backgrounds/A-BG-PREP.png` |
| pivot 位置 | Center（全屏铺底无 pivot 依赖） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：温吞、一丝倦怠、办公室日光灯、deadpan office-comedy
- 色盘偏重：主 1 莫兰迪雾灰米 `#B8B5A8`（占位 60%+）+ 辅 2 米白 `#E8E2D5`（文档/纸张）+ 主 2 陶土橘 `#C97B5C`（极少量装饰锚点）+ 辅 4 黄铜金 `#D4A574`（工牌挂绳/金属件极少点缀）
- 特殊注意：
  - **画面中央与右下区域必须留白**，留给后续 UI 叠加（招募 3 选 1 简历框、行动点 HUD、CTA 按钮）
  - **不画任何角色**（HR 总监立绘由 `A-CHR-HR` 单独叠加）
  - 公文体小元素（文件夹、便签、马克杯、绿萝、台历）作为氛围点缀，但不能喧宾夺主

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

centered horizontal composition over-the-shoulder view of an empty HR office desk, fixed scene background plate for a 16:9 game stage, no characters present, ample empty space in the center and lower-right area reserved for UI overlay (recruitment resumes, action point HUD, CTA buttons), Morandi foggy-beige #B8B5A8 wall takes up roughly 60 percent of the upper area, a wide cream-white #E8E2D5 wooden desk runs across the lower third with shallow horizontal perspective, on the desk a few flat-colored office props arranged loosely along the edges: a closed manila folder labeled "RESUME" in stylized stamp typography, a stapled stack of dungeon staff payroll documents, a small terracotta-orange #C97B5C ceramic mug printed with a tiny soul-shard motif, a dusty-mint #8FA89B potted plant in the far corner, a brass-gold #D4A574 employee ID lanyard draped over a desk organizer, a paper desk calendar showing "DAY 01", on the back wall a framed corporate poster reading "DUNGEON HR" with a chibi devil-horn logo and a smaller framed motivational sign saying "TEAMWORK MAKES THE DREAMWORK" in tongue-in-cheek office-memo lettering, soft uniform overhead fluorescent daylight with no directional shadows, hard-edged tiny shadow blocks under each prop, deadpan corporate-comedy mood, clean vector-flat finish, generous empty negative space in the middle of the composition, no character figures of any kind
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

characters, human or monster figures, foreground actors, silhouettes of people, hands, faces, text overlays covering the center, busy cluttered desk, paperwork piled high blocking center space, real-world brand logos like Apple or Microsoft, photographic office reference, deep perspective vanishing point, dramatic window light, exterior view, dungeon stone walls, torches, fantasy castle interior, medieval tapestry, blood stains, weapons on the desk
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》接待区背景插画（扁平办公场景 + 公文体海报）
- 《Reigns: Her Majesty》纯色卡牌背景（主体留白 + 极简装饰）
- BoJack Horseman 官方艺术——Princess Carolyn 经纪人办公室空镜（莫兰迪低饱和 + 平涂办公室）

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切 + 双线性下采样到 1920×1080（左右补齐莫兰迪雾灰边带 `#B8B5A8`，必要时取边缘像素延伸而非硬裁）
- **边距要求**：上下各预留 80px 安全区，避免关键装饰元素被 UI 顶部状态栏 / 底部行动点 HUD 遮挡
- **资源导入建议**（Atoms）：
  - 命名：`A-BG-PREP.png`（与目录约定一致）
  - pivot / anchor：Center（全屏铺底）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：否（背景图不进 UI atlas，独立加载）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：HR 办公桌视角、扁平企业风、留白充足
- [ ] 未出现反向 prompt 禁忌：无角色、无地下城石墙、无血腥、无现代真实品牌
- [ ] 尺寸落盘 1920×1080（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/backgrounds/A-BG-PREP.png` 保存
- [ ] 资源导入设置：Bilinear 采样、不进 atlas
- [ ] 在 L01 准备阶段场景中实际显示正常：UI 叠加区域留白足够、色调与 `#B8B5A8` 全局背景色一致

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/backgrounds/A-BG-PREP__v1__flash.png`
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
- 文件：atoms/assets/art/backgrounds/A-BG-PREP.png
- 结论：🟢（Confidence：高）
- 评分：
  - 风格一致性：🟢 — 莫兰迪雾灰 + 陶土橘 + 灰薄荷绿/米白配色精准命中，粗描边平涂、无渐变，质感与 style_guide 完全对齐
  - 主体正确：🟢 — HR 办公桌中景半身视角，桌面散布 RESUME 文件夹/纸堆/陶土橘马克杯/工牌挂绳/绿萝/DAY 01 台历，墙面 HR 小恶魔头像海报 + "TEAMWORK MAKES THE DREAMWORK" 标语全部命中 prompt 要求
  - 构图尺寸：🟢 — 16:9 横构图，中央与右下方留白充足，便于招募 3 选 1 与 HUD 叠加；上下安全区合理
  - 无禁忌元素：🟢 — 无角色、无地下城石墙/火把/血腥、无真实品牌；prompt 明确要求的 RESUME/HR/TEAMWORK/DAY 01 短词为公文体海报锚点，不属反向禁忌
  - 可用性：🟢 — 边缘清晰、无 artifacts，纯灰墙便于 chroma key 与 UI 叠加
- 修正建议：（无，🟢 通过入库）
