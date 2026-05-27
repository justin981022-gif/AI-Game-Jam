# A-BG-BATTLE — 战斗阶段背景（B1 入口走廊）

**类别**：场景背景
**来源**：主策划 + `design/levels.md` v1.3（L02–L06 战斗阶段）+ `design/concept.md` §战斗判定
**引用场景**：L02 首次突袭 / L03 第一次阵亡 / L04 怪物谈薪 / L05 IPO 中期警告 / L06 最终总突袭前夜（共用战斗底图）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 1920×1080（06c post-process 下采样自 Gemini 1024×1024） |
| 宽高比 | 16:9 |
| 背景要求 | 带场景背景（非透明）；主背景明度 65~72（略低于准备阶段，营造紧张感），以莫兰迪雾灰 `#B8B5A8` 为底色基调 |
| 切图方式 | 单张全屏背景，固定场景，不做视差分层 |
| atoms 落位路径 | `atoms/assets/art/backgrounds/A-BG-BATTLE.png` |
| pivot 位置 | Center（全屏铺底无 pivot 依赖） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：紧张但克制、公文体走廊、办公楼 ↔ 地下城混搭、deadpan office-comedy
- 色盘偏重：主 1 莫兰迪雾灰米 `#B8B5A8`（地砖/墙面 60%+）+ 辅 1 描边深炭灰 `#3D3A36`（线条与门框）+ 辅 4 黄铜金 `#D4A574`（楼层指示牌/电梯按钮）+ 主 3 灰薄荷绿 `#8FA89B`（应急灯/安全出口标识）+ 辅 5 砖红警示 `#A85C5C`（极少量警戒条带）
- 特殊注意：
  - **走廊为对称纵深视角**，左右两侧留出怪物 / 勇者立绘对位的安全区（左 25% / 右 25%）
  - **画面中央纵深**留给战斗 HP 条与突发卡片叠加
  - **不画任何角色**（敌我立绘由 `A-CHR-*` / `A-ENE-*` 叠加在场景前层）
  - 元素必须是「HR 写字楼 + 魔王城地下城」的混搭：例如石砌拱门里嵌着电梯门、楼层指示牌写"B1·勇者接待"、办公室紧急疏散图被改成"地下城疏散路线"等公文体细节

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

centered horizontal symmetrical composition of a B1 basement-floor entrance corridor that mashes up a corporate office hallway with a dungeon entryway, fixed scene background plate for a 16:9 game stage, no characters present, ample empty space in the lower-center reserved for HP bars and event cards, generous safe zones on the left 25 percent and right 25 percent for combat character overlays, Morandi foggy-beige #B8B5A8 stone-tile floor and matching beige wall panels, a flat low-perspective vanishing point reading as a long corridor, at the far end a brass-gold #D4A574 elevator door embedded inside a charcoal-outlined stone archway with a glowing floor indicator panel showing "B1" in office-memo lettering, beside the elevator a wall-mounted dungeon evacuation map drawn in the visual language of an office fire-exit diagram, on the left wall a tilted framed corporate poster saying "WELCOME ADVENTURERS - PLEASE TAKE A NUMBER", on the right wall a small dusty-mint #8FA89B emergency exit sign with a tiny chibi monster running silhouette icon, a beige reception counter on the right side with a number-ticket dispenser and a stack of "VISITOR" lanyards, a thin brick-red #A85C5C warning stripe runs along the lower wall trim, a single ceramic potted plant in the far corner, soft uniform overhead fluorescent daylight, hard-edged tiny shadow blocks under each prop, slightly cooler and slightly lower brightness than a daytime office to convey mild tension while remaining deadpan, clean vector-flat finish, no character figures of any kind, no heroes, no monsters, no silhouettes of people
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

characters, human or monster figures, foreground actors, silhouettes of people, hero adventurers in armor, weapons drawn, swords, axes, bows, combat effects, fire pit torches, dripping blood, skull piles, severed limbs on the floor, traditional dark fantasy dungeon mood, heavy chiaroscuro, dramatic torch lighting, deep perspective with photographic vanishing distortion, real-world brand logos, exit signs in real-world fonts, English ad copy with realistic typography, text overlays blocking the center
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》医院走廊俯视场景（公文体走廊 + 扁平地砖）
- 《Reigns: Her Majesty》城堡过道纯色卡背（极简对称 + 留白）
- 短片 *Don't Hug Me I'm Scared* 办公室走廊镜头（莫兰迪 + 荒诞反差）

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切 + 双线性下采样到 1920×1080（左右补齐时取墙面延伸像素或纯灰 `#B8B5A8` 边带）
- **边距要求**：上 80px / 下 120px 安全区（下方留给战斗文字滚动区与 HP 条），左右各 100px 安全区供敌我立绘对位时不贴边
- **资源导入建议**（Atoms）：
  - 命名：`A-BG-BATTLE.png`（与目录约定一致）
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：否（背景图不进 UI atlas，独立加载）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：B1 入口走廊、HR 写字楼 ↔ 地下城混搭、扁平企业风
- [ ] 未出现反向 prompt 禁忌：无角色 / 武器 / 火把 / 血腥 / 真实奇幻地牢氛围
- [ ] 尺寸落盘 1920×1080（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/backgrounds/A-BG-BATTLE.png` 保存
- [ ] 资源导入设置：Bilinear 采样、不进 atlas
- [ ] 在 L02–L06 战斗阶段场景中实际显示正常：左右 25% 立绘安全区可叠加敌我、中下方 HP 条与突发卡片不被装饰元素遮挡

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/backgrounds/A-BG-BATTLE__v1__flash.png`
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
- 文件：atoms/assets/art/backgrounds/A-BG-BATTLE.png
- 结论：🟢（Confidence：高）
- 评分：
  - 风格一致性：🟢 — 莫兰迪雾灰地砖 + 米白墙面 + 黄铜金电梯门 + 灰薄荷绿应急灯 + 砖红警示条带配色全部命中，扁平平涂粗描边一致
  - 主体正确：🟢 — B1 入口走廊对称纵深视角，电梯门嵌石砌拱门带 "B1" 楼层指示牌，左墙 "WELCOME ADVENTURERS PLEASE TAKE A NUMBER" 海报，右侧前台柜台 + 取号机 + 绿萝，下墙砖红警示条带；HR 写字楼 ↔ 地下城混搭气质命中
  - 构图尺寸：🟢 — 左右 25% 立绘安全区充足，中央纵深给 HP 条/卡片留白合理；上下安全区无关键元素压线
  - 无禁忌元素：🟢 — 无角色/武器/火把/血腥，无真实奇幻地牢；prompt 主动要求的公文体海报短词不构成禁忌
  - 可用性：🟢 — 边缘清晰、无 artifacts，纯色墙面与地砖便于立绘叠加
- 修正建议：（无，🟢 通过入库）
