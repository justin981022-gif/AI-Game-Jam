# A-UI-BTN — 通用 CTA 按钮底（9-slice）

**类别**：UI 按钮
**来源**：`design/concept.md`（UI flow CTA）+ art_asset_list v1.0 §5.5（5 个行动图标全砍，按钮内用文字 + emoji 承载）
**引用场景**：全局所有 CTA（招募 / 扩建 / 奖金 / 警戒 / 谈薪 / 突发选项 / 邮件 OK 等）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×96（06c post-process 从 Gemini 1024×1024 等比裁切 + 下采样） |
| 宽高比 | 8:3 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（按钮周围留白便于 alpha 抠图） |
| 切图方式 | 9-slice：横向 24/208/24，纵向 24/48/24 |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-BTN.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：企业 OA 操作按钮、克制、扁平、点击感来自描边而非阴影
- 色盘偏重：主 1 莫兰迪雾灰米 `#B8B5A8`（按钮主体）+ 辅 2 米白 `#E8E2D5`（描边内提亮）+ 辅 1 描边深炭灰 `#3D3A36`（粗描边）
- 特殊注意：
  - **9-slice 拉伸友好**：中央扁平、四角描边干净，圆角 16px
  - 仅出**空按钮底**，按钮内文字 / emoji 由代码叠加
  - 不使用阴影 / 渐变 / 高光，点击感来自描边粗细 + 雾灰雾灰对比
  - 顶部内侧细高光线（米白 `#E8E2D5` 1px 横向细线）暗示扁平按钮内凹质感

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

flat 2D UI element, corporate paperwork aesthetic, centered composition, 9-slice border layout, an empty horizontal CTA button base in 8:3 aspect ratio, the button body is filled with a single flat foggy-beige #B8B5A8 Morandi tone, surrounded by a uniform 5px charcoal #3D3A36 outline with rounded 16px corners, an extremely thin warm cream #E8E2D5 inner highlight hairline runs horizontally just below the top inner edge to suggest a subtle flat-pressed bevel, no real text, no icon, no emoji, no glyphs, the button interior is completely empty so that text and emoji can be composited by code later, no drop shadow, no gradient, no glow, no glossy highlight, the four corners stay tight and clean within a 24px corner safe zone for 9-slice friendly stretching, the entire button is centered horizontally on the canvas with generous empty space above, below, left and right, clean isolated UI on a flat neutral solid grey background, ample empty space around subject for easy cutout, vector-flat finish, no perspective, restrained corporate-OA action-button mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D perspective, drop shadows, neon colors, fantasy parchment, ornate medieval frames, characters, portraits, glossy plastic 3D button, beveled chrome edge, glowing aura, gradient fill, embossed metallic, web 2.0 candy-style button, real readable text inside, "OK" "CONFIRM" labels, icon glyph drawn inside, emoji drawn inside, multiple buttons stacked, button hover state with color change
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》操作按钮（扁平描边 + 雾灰填充）
- Material Design Outlined Button（克制扁平克制）
- 现代企业 OA 操作按钮（无渐变、无投影）

## 切图与落位建议

- **切图方式详解**：9-slice 切片，横向 24/208/24，纵向 24/48/24；中央扁平区可任意横向拉伸
- **边距要求**：上下左右各预留 24px 安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-BTN.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 UI atlas）
  - Sprite Mode：Sliced，Border L=24 R=24 T=24 B=24
  - **状态变体**：Normal / Hover / Pressed / Disabled 由代码 Tint：Hover = 主色 +5% 亮度，Pressed = 主色 -5% 亮度，Disabled = 主色 +30% 灰度
  - 文字 + emoji 由 TextMeshPro 子物件叠加

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：8:3 横向胶囊矩形 + 9-slice 友好 + 空按钮底
- [ ] 未出现反向 prompt 禁忌：无文字、无 emoji、无渐变、无 3D 高光
- [ ] 尺寸落盘 256×96（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-BTN.png` 保存
- [ ] 9-slice 设定正确，横向拉伸不变形（如拉到 400×96）
- [ ] 4 状态 Tint 视觉差异可分辨

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-BTN__v1__flash.png`
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
