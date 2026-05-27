# A-ENE-W01 — 新手勇者（菜鸟）

**类别**：敌人
**来源**：`design/levels.md` v1.3 §L02 + `design/balance.md` v0.1.2 §4.2（HERO_W01：HP 40 / ATK 9 / CRIT 0.00，教学关炮灰）
**引用场景**：L02 首次突袭（B1 入口走廊战斗界面右侧）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 768×1024（06c post-process 自 Gemini 1024×1024 等比裁切下采样） |
| 宽高比 | 3:4 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张立绘，直接用；06c 后处理时纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-W01.png` |
| pivot 位置 | Bottom Center（脚底中点，与角色立绘统一对位） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：兴奋紧张的职场新人、完全没意识到自己是 KPI 体检炮灰、青涩懵懂、入职第一天的笨拙憧憬
- 色盘偏重：辅 2 米白 `#E8E2D5`（粗布工装衣）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（粗布裤+背景）+ 主 3 灰薄荷绿 `#8FA89B`（实习袖章/小护腕）+ 辅 1 描边深炭 `#3D3A36`（描边）+ 辅 4 黄铜金 `#D4A574`（小本子封面金边、极少量点缀）
- 特殊注意：
  - **装备最简化**：粗布无袖工装上衣 + 粗布短裤 + 简陋木棒 + 锅盖盾（厨房铁锅当盾，盖把朝外可见），完全没有正式铠甲
  - **职场视角反差萌道具**：左手腋下夹着一本《新手冒险者入职指南》小册子（封面"DAY 1"印章），脖子挂"实习"字样小工牌
  - 表情：眼睛瞪得超大且亮亮的（兴奋），嘴角微张像在深呼吸（紧张），脸上一点小汗珠
  - 姿态略显笨拙：木棒抬得太高、锅盖盾举到错位置，像第一天到岗手忙脚乱
  - **完全无邪恶反派气质**，是个憨憨的职场新人

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of a rookie novice adventurer (Hero W01), a chibi 2.5-head proportion young human boy standing facing forward in a clumsy eager beginner pose, wearing a sleeveless coarse warm cream #E8E2D5 work-tunic with rolled-up edges and plain foggy-beige #B8B5A8 short workman pants, no real armor at all just a humble dusty mint green #8FA89B intern armband on the upper arm and a small matching wrist guard, holding a crude wooden stick as a beginner club in the right hand raised slightly too high, the left arm awkwardly holding a battered round kitchen pot-lid as an improvised shield with the handle still visible on the inside, a small white intern name-tag on a thin string around the neck, a pocket-sized rookie adventurer handbook tucked under the left armpit with a tiny brass-gold #D4A574 trim and a visible stamp marking it as day-one onboarding material, oversized round eyes wide open and shining with nervous excitement, mouth slightly parted in a deep breath, a single tiny sweat drop on the temple, posture stiff and a little off-balance like someone who has never done this before and has no idea he is being sent in as a KPI canary, no malicious or villain expression at all, completely earnest workplace-newbie vibe, centered composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, hard-edged tiny shadow ellipse beneath the feet, no other props or scenery, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, blood, decapitation, dark horror style, realistic violence, anime hero shounen pose, plate armor, chainmail, full metal helmet, ornate fantasy hero outfit, glowing magical sword, oversized broadsword, two-handed greatsword, evil grin, menacing villain glare, muscular adult body, action combat stance, dramatic running pose, magical aura, fire effects, blood splatter on weapon, cape, shoulder pauldrons, badge of glory, dungeon background, second figure, confident heroic smirk
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》初级实习员工的笨拙憨厚造型
- 《Reigns: Her Majesty》纯灰底单卡角色构图
- BoJack Horseman 中"职场新人小角色"的扁平莫兰迪塑造

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024（裁掉左右各约 128px 多余留白）；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方至少 80px、下方至少 60px、左右各至少 100px 透明安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-ENE-W01.png`（与目录约定一致）
  - pivot / anchor：Bottom Center（脚底中点）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与其他 `A-ENE-*` 共打 `enemies_atlas`（768×1024 ×5 张）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：粗布工装 + 木棒锅盖盾 + 实习袖章 + 新手指南 + 兴奋紧张表情
- [ ] 未出现反向 prompt 禁忌：无血腥、无金属重甲、无 anime 热血英雄姿态、无邪恶反派气质
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/enemies/A-ENE-W01.png` 保存
- [ ] 资源导入设置：Bilinear 采样、Bottom Center pivot、可进 enemies_atlas
- [ ] 在 L02 战斗界面实际显示正常：与 W02–ELITE 排在一起能直观看出"最菜"的梯度起点

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/enemies/A-ENE-W01__v1__flash.png`
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
- 文件：atoms/assets/art/enemies/A-ENE-W01.png
- 结论：🟢（Confidence：高）
- 评分：
  - 风格一致性：🟢 — 莫兰迪低饱和、粗描边、扁平平涂、Q 版 2.5 头身均命中。
  - 主体正确：🟢 — 木棒 + 锅盖盾 + 米白工装 + 薄荷护腕 + 实习工牌齐全，眼神瞪大显紧张。
  - 构图尺寸：🟢 — 主体居中，留白充足，符合 768×1024 比例。
  - 无禁忌元素：🟢 — 无血腥/重甲/反派表情，纯灰背景干净。
  - 可用性：🟢 — chroma key 后主体完整，边缘清晰，无 artifacts。
- 修正建议：（无）
