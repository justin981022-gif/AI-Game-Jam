# A-UI-HPBAR — HP 条（9-slice）

**类别**：UI HUD
**来源**：`design/concept.md`（战斗 HUD）+ `design/levels.md` v1.3（L02–L06 战斗 HP 条）
**引用场景**：L02–L06 战斗界面（员工 HP / 勇者 HP 同一资产复用，填充色由代码 Tint）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 400×40（06c post-process 从 Gemini 1024×1024 等比裁切 + 下采样） |
| 宽高比 | 10:1 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（HP 条周围留白便于 alpha 抠图） |
| 切图方式 | 9-slice：横向 8/384/8，纵向 8/24/8 |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-HPBAR.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：企业仪表盘扁平指示条、克制、克制、再克制
- 色盘偏重：辅 2 米白 `#E8E2D5`（外框内底）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（空槽底）+ 辅 1 描边深炭灰 `#3D3A36`（粗描边）
- 特殊注意：
  - **仅出外框 + 空槽底**，**不含填充色**（填充层由代码上色 + Tint）
  - 9-slice 友好：横向左右各 8px 边距 + 纵向上下各 8px 边距
  - 圆角胶囊形，左右两端是半圆（半径 20px），中央是可拉伸的扁平矩形
  - 内底色比外框略深 1 档（`#B8B5A8` 雾灰），描边外不能有阴影或渐变

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D UI element, corporate paperwork aesthetic, centered composition, 9-slice border layout, an empty horizontal capsule-shaped HP bar template at 10:1 aspect ratio, fully rounded semicircular ends with a 20px corner radius, uniform 5px charcoal #3D3A36 outline forming the capsule border, the inner empty slot is filled with a single flat foggy-beige #B8B5A8 tone slightly darker than the surrounding cream backdrop, the immediate surrounding area inside the bar but outside the slot is warm cream #E8E2D5 to suggest a recessed groove, no inner gradient, no fill color, no progress fill, no liquid effect, no glossy highlight, this is an empty bar template only, the code will tint a separate fill layer on top later, completely flat shading, no drop shadow outside the capsule, no glow, no particles, the entire bar is centered horizontally on the canvas with generous empty space above, below, left and right of the bar, clean isolated UI on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, no perspective, restrained corporate-dashboard mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits, glossy plastic highlights, liquid mercury fill, glowing red HP fill, green health fill drawn inside, gradient progress fill, segmented tick marks, numeric labels, percentage text, heart icons attached, magical sparkles, energy fluid, RPG MMO game bar style with thick metal trim, ornate fantasy filigree edges, drop shadow under the bar
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》员工压力 / 心情仪表条（扁平胶囊 + 描边）
- 现代企业仪表盘 KPI 进度条（Material Design 克制扁平版）

## 切图与落位建议

- **切图方式详解**：9-slice 切片，横向 8/384/8，纵向 8/24/8；半圆端不参与拉伸
- **边距要求**：上下左右各预留 8px 安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-HPBAR.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 UI atlas）
  - Sprite Mode：Sliced，Border L=8 R=8 T=8 B=8
  - **填充层**：由代码生成独立子 sprite（同 9-slice），按 HP 百分比横向 fillAmount，颜色 Tint：员工 = 灰薄荷 `#8FA89B`，勇者 = 砖红警示 `#A85C5C`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：胶囊形 + 仅外框 + 空槽底（**无填充色**）
- [ ] 未出现反向 prompt 禁忌：无渐变、无液体、无文字、无 HP 数字
- [ ] 尺寸落盘 400×40（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-HPBAR.png` 保存
- [ ] 9-slice 设定正确，半圆端不变形
- [ ] 与代码生成填充层叠加测试通过（员工 / 勇者两种 Tint）

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-HPBAR__v1__flash.png`
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
