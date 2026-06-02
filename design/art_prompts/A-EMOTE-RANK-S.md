# A-EMOTE-RANK-S — 绩效评级章 S

**类别**：装饰贴 / 表情贴（绩效评级章 系列）
**来源**：`design/art_asset_list.md` v1.1 §5.8 装饰贴（新增）+ `design/narrative.md` v1.3 T05 绩效备忘录红章
**引用场景**：A-UI-RESULT 波次结算面板绩效评级槽位的最高档评级章；与 A-EMOTE-CEO-STAMP 共属"红章"家族，但语义不同：CEO-STAMP = 总评通知章，RANK-* = 单波绩效档位章

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256（06c post-process 自 Gemini 1024×1024 中央裁 1:1 后下采样 + color-to-alpha） |
| 宽高比 | 1:1 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张装饰贴，直接用；06c 后处理纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/emotes/A-EMOTE-RANK-S.png` |
| pivot 位置 | Center（印章中心，便于 UI 旋转倾斜叠在结算面板上） |

## 风格锚点（继承自 art_style_guide v1.0）

- **系列共同点（与 RANK-A/B/C/D 一致）**：圆形 / 略不规则圆形磨损边橡皮章；中央留一个"档位字符"占位；纸面纹理可见但不喧宾夺主；与 A-EMOTE-CEO-STAMP 同一橡皮章设计语言但语义为"档位评级"
- **本档（S）独有点**：最高档，**主色为辅 4 黄铜金 `#D4A574`**（区别于 RANK-A/B/C/D 的 4 种色阶），章内字符为「S」形几何剪影（不可读拉丁字母，按 CEO-STAMP 同款 "abstract glyph placeholder" 原则）
- 情绪词：deadpan 公文式年度优秀员工荣誉感、克制但有自豪感
- 色盘偏重：**辅 4 黄铜金 `#D4A574`（S 档主色）** + 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）+ 辅 1 描边深炭灰 `#3D3A36`（章内极少量阴影点缀）
- 特殊注意：
  - 中央"S"字符以**抽象几何蛇形曲线 silhouette**呈现，绝不能是真实可读的拉丁字母 S（参考 A-EMOTE-CEO-STAMP 审核教训：可读字母会被判 🟡）
  - 章外圈可有"★★★★★ 五颗小星几何剪影"环绕作为 S 档识别锚点（占位符号化，不可写真实字符）
  - 磨损通过边缘破损与极少量同色相暗块表达
  - 不要传统中式印章篆刻、日式 hanko 复杂汉字、金箔烫印、繁复花边

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

a single decorative office performance grading stamp seal mark for the highest rank tier S, round to slightly irregular circular shape with authentic uneven worn rubber-stamp pressed-edge imperfections simulating uneven ink imprint, solid brass-gold #D4A574 as the dominant fill (highest rank color tier), centered composition with a single large abstract serpentine S-curve silhouette in the middle as the rank glyph placeholder, the S-curve is drawn as a stylized geometric ribbon shape never readable Latin letter S, surrounded by five tiny abstract star-like geometric silhouettes evenly arranged around the inner perimeter of the stamp ring as a visual cue of top-tier honor, text shapes are abstract glyph placeholders, no readable letters, no readable numbers, faint subtle paper-fiber texture visible underneath but kept minimal so it never overpowers the brass-gold imprint, ink imprint texture, slightly uneven edges, flat 2D vector style, centered composition, clean isolated stamp on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, deadpan corporate top-tier honor mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photorealistic stamp, gold foil shiny metallic, ornate borders, complex calligraphy, traditional Chinese seal, Japanese hanko intricate kanji, characters, portraits, blood spatter, readable letters, real text, crisp readable letter S, clearly legible Latin alphabet, sharp typeset "S" wordmark, "RANK S" text, embossed metallic finish, decorative filigree, multiple stamps overlapping, gradient ink, glossy reflection, 3D bevel, drop shadow under stamp, framed border decoration, brick red color, mint green color, terracotta orange color
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》"已批准"公文体扁平印章贴
- 《Papers, Please》护照审核印章的磨损橡皮章质感（形态参考）
- Corporate Memphis 风格的扁平企业绩效奖励印章（克制版）

## 切图与落位建议

- **切图方式详解**：单张直接用，06c post-process 从 Gemini 1024×1024 中央裁 1:1 → 双线性下采样到 256×256；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：印章主体上下左右各 ≥16px 透明安全边；磨损边缘视为印章一部分，不可被裁掉
- **资源导入建议**（Atoms）：
  - 命名：`A-EMOTE-RANK-S.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与 RANK-A/B/C/D + CEO-STAMP 共打 `emotes_atlas`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：圆形磨损边黄铜金印章 + 中央抽象 S 几何剪影 + 五颗小星点缀
- [ ] 未出现反向 prompt 禁忌：无金箔光泽、无可读拉丁字母 S、无其他档位色（砖红/绿/橘等）
- [ ] 主色为黄铜金 `#D4A574`（区别于 RANK-A/B/C/D 的色阶）
- [ ] 尺寸落盘 256×256（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/emotes/A-EMOTE-RANK-S.png` 保存
- [ ] 与 RANK-A/B/C/D 同一橡皮章设计语言，仅色 + 字符差异化
- [ ] 与 CEO-STAMP 不混淆：CEO-STAMP 砖红 + 恶魔角剪影；RANK-S 黄铜金 + S 曲线 + 五星

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/emotes/A-EMOTE-RANK-S__v1__flash.png`
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
