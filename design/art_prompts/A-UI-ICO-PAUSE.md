# A-UI-ICO-PAUSE — 暂停图标

**类别**：UI 图标
**来源**：`design/art_asset_list.md` v1.1 §5.5 UI 图标（新增）+ `design/concept.md` UI flow（HUD 系统按钮）
**引用场景**：战斗 / 准备阶段 HUD 右上角系统按钮，跨设备一致性需求独立出图

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 128×128（06c post-process 自 Gemini 1024×1024 中央裁 1:1 后下采样 + color-to-alpha） |
| 宽高比 | 1:1 |
| 背景要求 | 纯灰 `#B8B5A8` 抠图底（图标本体周围留白便于 alpha 抠图） |
| 切图方式 | 单张图标，不切片 |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-ICO-PAUSE.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：deadpan 公文式克制系统按钮、企业内部 PMS 工具栏图标气质、温吞克制
- 色盘偏重：辅 1 描边深炭灰 `#3D3A36`（图标主体描边 + 暂停双竖条主色）+ 辅 2 米白 `#E8E2D5`（圆形底）+ 辅 4 黄铜金 `#D4A574`（圆形外圈极细装饰描边） + 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）
- 特殊注意：
  - **圆角方形 / 正圆底**：96px 直径圆形 + 米白填充 + 黄铜金 1px 细外圈，居中放置
  - **暂停符号本体**：两条等宽等高的圆角竖条（约 14px 宽 × 48px 高），居中对称，间距约 16px，描边深炭灰填充
  - 不画任何阴影 / 渐变 / 发光，纯平涂
  - 不画 "PAUSE" 文字 / 任何辅助文字
  - 周围至少 16px 留白安全区

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

a single flat 2D system UI button icon for PAUSE function, centered composition, a clean round circular base disc filled with warm cream #E8E2D5 outlined by a thin uniform 5px charcoal #3D3A36 stroke and an extra 1px brass-gold #D4A574 hairline ring just outside the charcoal stroke, inside the disc centered are two identical vertical rounded bars representing the universal pause symbol, both bars colored solid charcoal #3D3A36 with no outline, the bars are equal width and height, perfectly symmetrical, separated by a balanced gap, pure flat fills with no gradients, NO chibi monsters, NO characters, NO mascots, NO text, NO letters, NO numbers, NO additional decoration beyond the two bars and the round disc, clean isolated icon on a flat neutral solid grey #B8B5A8 background, ample empty space around subject for easy cutout, vector-flat finish, deadpan corporate system-icon mood
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photograph, 3D bevel, glossy reflection, glowing button, gradient ink, drop shadow, neon glow, gemstones, decorative filigree, additional icons, multiple bars more than two, "PAUSE" wordmark, readable letters, chibi monsters, characters, mascots, asymmetric bars, hand-drawn doodle, sketchy lines, photographic button, skeuomorphic UI, embossed metallic finish
```

## 参考艺术家 / 作品（可选）

- macOS / iOS 系统媒体控制图标（扁平克制）
- Material Design 系统按钮图标库
- 《Two Point Hospital》系统暂停按钮（极简公文体）

## 切图与落位建议

- **切图方式详解**：单张图标，不切片；06c post-process 从 Gemini 1024×1024 中央裁 1:1 → 双线性下采样到 128×128；纯灰底走 color-to-alpha
- **边距要求**：上下左右各 ≥16px 透明安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-ICO-PAUSE.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：是（进 `ui_atlas`）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：圆形底 + 米白填充 + 两条等宽对称竖条暂停符
- [ ] 未出现反向 prompt 禁忌：无文字、无戏剧光效、无角色
- [ ] 尺寸落盘 128×128（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-ICO-PAUSE.png` 保存
- [ ] 与 A-UI-ICO-VOLUME / A-UI-ICO-RESTART 视觉一致（同一圆形底设计语言）

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-ICO-PAUSE__v1__flash.png`
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
