# A-UI-ICO-RESTART — 重开图标

**类别**：UI 图标
**来源**：`design/art_asset_list.md` v1.1 §5.5 UI 图标（新增）+ `design/concept.md` UI flow（HUD 系统按钮）
**引用场景**：战斗失败界面 / 系统菜单"重新开始本波"按钮，跨设备一致性需求独立出图

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 128×128（06c post-process 自 Gemini 1024×1024 中央裁 1:1 后下采样 + color-to-alpha） |
| 宽高比 | 1:1 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（图标本体周围留白便于 alpha 抠图） |
| 切图方式 | 单张图标，不切片 |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-ICO-RESTART.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：deadpan 公文式克制系统按钮、与 PAUSE / VOLUME 同一套设计语言、一丝"再来一次"的温吞鼓励
- 色盘偏重：辅 1 描边深炭灰 `#3D3A36`（圆形箭头主体）+ 辅 2 米白 `#E8E2D5`（圆形底）+ 辅 4 黄铜金 `#D4A574`（外圈细装饰）+ 主 2 陶土橘 `#C97B5C`（箭头尖端点缀色，区别 PAUSE/VOLUME） + 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）
- 特殊注意：
  - **圆角方形 / 正圆底**：与 PAUSE / VOLUME 同款 96px 直径圆形底，米白填充 + 黄铜金 1px 细外圈
  - **重开符号本体**：顺时针 270° 圆形回环箭头（深炭灰，约 6~8px 粗），开口在右上，箭头尖端为陶土橘小三角
  - 不画 "RESTART / RESET" 文字
  - 周围至少 16px 留白安全区

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

a single flat 2D system UI button icon for RESTART function, centered composition, a clean round circular base disc filled with warm cream #E8E2D5 outlined by a thin uniform 5px charcoal #3D3A36 stroke and an extra 1px brass-gold #D4A574 hairline ring just outside the charcoal stroke, inside the disc centered is a single circular-loop refresh arrow drawn as a 6 to 8 pixel wide solid charcoal #3D3A36 stroke forming an open ring that sweeps about 270 degrees clockwise with a gap in the upper-right area, the arrowhead at the end of the stroke is a small filled triangle in terracotta orange #C97B5C pointing tangentially along the stroke direction, the loop is perfectly centered within the disc, pure flat fills with no gradients, NO chibi monsters, NO characters, NO mascots, NO text, NO letters, NO numbers, NO additional decoration beyond the loop arrow, clean isolated icon on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, deadpan corporate system-icon mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D bevel, glossy reflection, glowing button, gradient ink, drop shadow, neon glow, gemstones, decorative filigree, "RESTART" wordmark, "RESET" text, readable letters, chibi monsters, characters, mascots, photographic refresh icon, skeuomorphic UI, embossed metallic finish, hourglass, clock face, multiple arrows, double loop, full closed ring without arrowhead
```

## 参考艺术家 / 作品（可选）

- macOS / iOS 系统刷新箭头（扁平克制）
- Material Design refresh / replay 图标
- 《Two Point Hospital》系统重开按钮（极简公文体）

## 切图与落位建议

- **切图方式详解**：单张图标，不切片；06c post-process 从 Gemini 1024×1024 中央裁 1:1 → 双线性下采样到 128×128；纯灰底走 color-to-alpha
- **边距要求**：上下左右各 ≥16px 透明安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-ICO-RESTART.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 `ui_atlas`）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：圆形底 + 270° 回环箭头 + 陶土橘箭头尖
- [ ] 未出现反向 prompt 禁忌：无文字、无沙漏、无角色
- [ ] 尺寸落盘 128×128（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-ICO-RESTART.png` 保存
- [ ] 与 A-UI-ICO-PAUSE / A-UI-ICO-VOLUME 视觉一致（同一圆形底设计语言）

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-ICO-RESTART__v1__flash.png`
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
