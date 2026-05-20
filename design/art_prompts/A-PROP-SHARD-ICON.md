# A-PROP-SHARD-ICON — 灵魂碎片图标（货币）

**类别**：道具 / 货币
**来源**：`design/concept.md` §经济（灵魂碎片为全局货币）+ art_style_guide §主色 2（陶土橘 `#C97B5C` 情绪锚点）
**引用场景**：全局 HUD 货币显示 / 战斗结算飘字 / 奖金特效 / 招聘成本提示

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 128×128（06c post-process 从 Gemini 1024×1024 等比裁切 + 下采样） |
| 宽高比 | 1:1 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（图标周围留白便于 alpha 抠图） |
| 切图方式 | 单张直接用 |
| atoms 落位路径 | `atoms/assets/art/props/A-PROP-SHARD-ICON.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：温暖中带钝感、打工人的小确幸、扁平企业图标
- 色盘偏重：主 2 陶土橘 `#C97B5C`（主色 80%）+ 辅 2 米白 `#E8E2D5`（高光面 1 块）+ 辅 1 描边深炭灰 `#3D3A36`（粗描边）
- 特殊注意：
  - **多面切割宝石碎片造型**：4–6 个不规则多边形面块拼成立体感的"碎片"轮廓（非完整宝石）
  - **立体感来自描边而非真实光影**：每个切面交界处用粗描边 + 同色相平涂稍暗一档（无渐变 / 无高光晕染）
  - 仅 1 块顶面"高光面"用米白 `#E8E2D5` 平涂模拟反光，**禁真实光泽**
  - 主色为陶土橘 `#C97B5C`（**而非紫色 / 蓝色 / 绿色** — 与色盘 v1.0 主 2 一致，作为全画面情绪锚点）

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D currency icon, centered composition, a chunky multi-faceted gem-shard fragment in 1:1 ratio, the shard is roughly hexagonal-irregular with about five visible facets stitched together to suggest a chipped piece of soul-stone, the dominant color across all facets is a single flat terracotta orange #C97B5C, two facets in the lower portion are filled with a slightly darker same-hue terracotta tone for depth (still flat, no gradient), exactly one upper-left facet is a small flat warm cream #E8E2D5 highlight block to imply a single light hit (no airbrush, no shine streaks), every facet edge and the entire silhouette is wrapped in a uniform 5px charcoal #3D3A36 outline that gives the icon its sense of volume, the shard is rendered purely with hard-edged flat color blocks and outlines, no gradient fill, no realistic gem refraction, no inner sparkle, no glow halo, no caustic light, the icon sits centered on the canvas with generous empty space around it, clean isolated UI on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, no perspective, deadpan corporate-asset-icon mood evoking a humble office trophy
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits, realistic gem render, photorealistic crystal, sparkle effects, lens flare, glow halo, magical aura, glittering particles, blue sapphire, green emerald, purple amethyst, rainbow refraction, ice crystal, glass refraction, transparent gem with caustics, MMORPG loot icon style with metallic trim, gilded ornate setting, jewel embedded in metal ring, holographic shimmer, animated rotation
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》货币 / 奖杯图标（扁平描边 + 单色高光面）
- Material Design 扁平货币 / 钻石图标
- 《Reigns: Her Majesty》卡牌资源图标（极简扁平）

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；不同尺寸用例（HUD 32px / 飘字 48px / 大图 128px）由 Atoms 端按需缩放
- **边距要求**：上下左右各预留 8px 透明安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-PROP-SHARD-ICON.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 UI atlas）
  - 用于 HUD 货币显示、战斗结算飘字（缩放 0.5–1.0 + 上浮 tween）、奖金特效

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：陶土橘 `#C97B5C` 主色 + 多面切割 + 粗描边立体感 + 1 块米白高光面
- [ ] 未出现反向 prompt 禁忌：无写实宝石、无闪光特效、无紫蓝绿主色、无金属底座
- [ ] 尺寸落盘 128×128（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/props/A-PROP-SHARD-ICON.png` 保存
- [ ] HUD 32px 缩放下识别度仍清晰
- [ ] 飘字 tween 上浮场景中视觉与战斗 UI 协调

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/props/A-PROP-SHARD-ICON__v1__flash.png`
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
