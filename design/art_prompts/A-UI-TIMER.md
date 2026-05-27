# A-UI-TIMER — 圆形倒计时进度环

**类别**：UI HUD
**来源**：`design/concept.md`（突发事件 UI）+ `design/narrative.md` v1.3 T04（10s 倒计时超时选不利）
**引用场景**：L02–L06 突发事件卡片右上 / 中上倒计时元素

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 128×128（06c post-process 从 Gemini 1024×1024 等比裁切 + 下采样） |
| 宽高比 | 1:1 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（环外周留白便于 alpha 抠图） |
| 切图方式 | 单张直接用（不切片），中心 fillAmount 由代码遮罩 |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-TIMER.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：企业仪表盘进度环、克制扁平、突发倒计时的一丝紧迫感
- 色盘偏重：辅 2 米白 `#E8E2D5`（环底）+ 辅 5 砖红警示 `#A85C5C`（进度环活动色，但本资产仅画完整环 — 由代码做 fillAmount）+ 辅 1 描边深炭灰 `#3D3A36`（外圈描边）
- 特殊注意：
  - **圆形进度环**外圈 + 内圈双层描边，环宽 12px，外径 120px，内径约 96px
  - **中心留白**：直径 80px 的中心圆区留空（淡米白 `#E8E2D5` 填充），后期由代码叠加倒计时数字 / icon
  - **企业仪表盘风**，克制扁平，**禁游戏化魔法粒子 / 火焰 / 闪电**
  - 资产本身画**完整环**（满进度态，色为砖红警示 `#A85C5C`），由代码用径向 Image fillAmount 做倒计时遮罩

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D UI element, corporate paperwork aesthetic, centered composition, a circular countdown progress ring icon at 1:1 ratio, the ring sits perfectly centered with an outer diameter of about 120 px and an inner diameter of about 96 px, the ring band is filled with a flat brick-red warning #A85C5C tone representing a fully drawn 100 percent progress state, the ring is bordered on its outer and inner edges by a uniform 5px charcoal #3D3A36 outline producing a clean double-stroke gauge look, the very center inside the ring is an empty circular area approximately 80px in diameter filled with warm cream #E8E2D5 leaving room for a number or icon to be composited later, no numbers or icons drawn inside, the ring band itself is a single flat tone with no segmentation, no tick marks, no gradient, no glow, no animated trail, restrained corporate-dashboard gauge aesthetic, no fantasy magical particles, no fire flames, no lightning bolts, no sparkles, just a clean industrial dial face, clean isolated UI on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, no perspective
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits, magical glowing rune circle, fantasy magic sparkles, fire trail, lightning bolts, energy particles, animated motion lines, clock hands, analog watch face, roman numerals, segmented tick marks, percentage label, numeric digits drawn inside, second markers, glowing aura, holographic ring, gradient ring fill
```

## 参考艺术家 / 作品（可选）

- Material Design 圆形 CircularProgressIndicator
- 《Two Point Hospital》机器加载圆环（克制扁平）
- 现代企业 BI 仪表盘进度环（无修饰、无粒子）

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；运行时由代码用 Unity Image 组件 + Filled Type + Radial 360 + Origin Top 实现倒计时回退动画
- **边距要求**：上下左右各预留 4px 透明安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-TIMER.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 UI atlas）
  - Image Type：Filled / Method：Radial 360 / Origin：Top / Clockwise=false（顺时针回退）
  - 中心数字 / icon 由独立子 sprite 叠加

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：圆形进度环 + 双描边 + 中心留白 + 砖红主色
- [ ] 未出现反向 prompt 禁忌：无魔法粒子、无指针、无数字、无渐变
- [ ] 尺寸落盘 128×128（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-TIMER.png` 保存
- [ ] Image Filled Radial 倒计时遮罩动画测试通过
- [ ] 中心叠加数字 / icon 显示正常

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-TIMER__v1__flash.png`
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
- 文件：atoms/assets/art/ui/A-UI-TIMER.png
- 结论：🟢（Confidence：高）
- 评分：
  - 风格一致性：🟢 — 砖红警示 #A85C5C 环 + 米白中心 + 雾灰描边，企业仪表盘风。
  - 主体正确：🟢 — 圆形进度环（满进度态）+ 双描边 + 中心留白圆，符合 spec。
  - 构图尺寸：🟢 — 1:1 居中、外径接近规格、4px 透明安全区充足。
  - 无禁忌元素：🟢 — 无指针、无数字、无魔法粒子、无渐变、无刻度。
  - 可用性：🟢 — 适配 Unity Image Filled Radial 360 + Origin Top 倒计时遮罩；中心可叠数字。
- 修正建议：（无）
