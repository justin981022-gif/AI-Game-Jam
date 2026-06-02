# A-EMOTE-RANK-A — 绩效评级章 A

**类别**：装饰贴 / 表情贴（绩效评级章 系列）
**来源**：`design/art_asset_list.md` v1.1 §5.8 装饰贴（新增）+ `design/narrative.md` v1.3 T05 绩效备忘录红章
**引用场景**：A-UI-RESULT 波次结算面板绩效评级槽位的次高档评级章；与 CEO-STAMP / RANK-S/B/C/D 同属红章家族

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256（06c post-process 自 Gemini 1024×1024 中央裁 1:1 后下采样 + color-to-alpha） |
| 宽高比 | 1:1 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张装饰贴，直接用；06c 后处理纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/emotes/A-EMOTE-RANK-A.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- **系列共同点**：圆形磨损边橡皮章；中央抽象档位字符占位；与 CEO-STAMP 同一橡皮章设计语言但语义为"档位评级"
- **本档（A）独有点**：次高档，**主色为主 2 陶土橘 `#C97B5C`**（暖系成绩单调），章内字符为「A」形几何三角剪影（不可读拉丁字母）
- 情绪词：deadpan 公文式优秀员工奖、克制温暖
- 色盘偏重：**主 2 陶土橘 `#C97B5C`（A 档主色）** + 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）+ 辅 1 描边深炭灰 `#3D3A36`
- 特殊注意：
  - 中央"A"字符以**抽象等边三角形 silhouette + 中央横杠剪影**呈现，绝非可读拉丁 A
  - 章外圈可有"★★★★ 四颗小星几何剪影"环绕作为 A 档识别锚点
  - 磨损通过边缘破损与极少量同色相暗块表达

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

a single decorative office performance grading stamp seal mark for the second-highest rank tier A, round to slightly irregular circular shape with authentic uneven worn rubber-stamp pressed-edge imperfections, solid terracotta orange #C97B5C as the dominant fill (second-highest rank color tier), centered composition with a single large abstract equilateral triangle silhouette with a horizontal crossbar in the middle as the rank glyph placeholder, the triangle-with-crossbar shape is drawn as a stylized geometric symbol never readable Latin letter A, surrounded by four tiny abstract star-like geometric silhouettes evenly arranged around the inner perimeter of the stamp ring as a visual cue of high-tier rank, text shapes are abstract glyph placeholders, no readable letters, no readable numbers, faint subtle paper-fiber texture visible underneath but kept minimal so it never overpowers the terracotta imprint, ink imprint texture, slightly uneven edges, flat 2D vector style, centered composition, clean isolated stamp on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, deadpan corporate high-tier rank mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

photorealistic stamp, gold foil, ornate borders, complex calligraphy, traditional Chinese seal, Japanese hanko intricate kanji, characters, portraits, blood spatter, readable letters, real text, crisp readable letter A, clearly legible Latin alphabet, sharp typeset "A" wordmark, "RANK A" text, embossed metallic finish, decorative filigree, multiple stamps overlapping, gradient ink, glossy reflection, 3D bevel, drop shadow under stamp, framed border decoration, brass gold color, brick red color, mint green color
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》"良"公文体扁平印章贴
- 现代企业季度绩效"A"等级章排版
- Corporate Memphis 扁平企业绩效奖励印章

## 切图与落位建议

- **切图方式详解**：同 RANK-S；Gemini 1024×1024 → 256×256 + color-to-alpha
- **边距要求**：印章主体上下左右各 ≥16px 透明安全边
- **资源导入建议**（Atoms）：
  - 命名：`A-EMOTE-RANK-A.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与 RANK-S/B/C/D + CEO-STAMP 共打 `emotes_atlas`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：圆形磨损边陶土橘印章 + 中央抽象 A 三角剪影 + 四颗小星点缀
- [ ] 未出现反向 prompt 禁忌：无可读拉丁 A、无金箔、无其他档位色
- [ ] 主色为陶土橘 `#C97B5C`
- [ ] 尺寸落盘 256×256
- [ ] 已按 atoms 落位路径 `atoms/assets/art/emotes/A-EMOTE-RANK-A.png` 保存
- [ ] 与 RANK-S/B/C/D 同一橡皮章设计语言，仅色 + 字符差异化

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/emotes/A-EMOTE-RANK-A__v1__flash.png`
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
