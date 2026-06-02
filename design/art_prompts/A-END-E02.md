# A-END-E02 — 上市破发·惨胜

**类别**：结局 CG 静帧
**来源**：`design/narrative.md` v1.3 §结局表 E02 / `design/final-plan.md` 四结局收割点
**引用场景**：结局 E02（惨胜：上市但破发，赢了仗输了钱的黑色幽默）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 1280×720（06c post-process 从 Gemini 1024×1024 裁切到 16:9） |
| 宽高比 | 16:9 |
| 背景要求 | 带场景背景（非透明）；暗灰冷峻基调，明度 55~65 |
| 切图方式 | 单张全屏 CG，直接铺底，不分层 |
| atoms 落位路径 | `atoms/assets/art/endings/A-END-E02.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：黑色幽默、扯松领带的疲惫、"赢了仗输了钱"的冷峻反讽、deadpan office-comedy 阴面
- 色盘偏重：主 1 莫兰迪雾灰 `#B8B5A8`（暗化版）+ 辅 1 描边深炭灰 `#3D3A36`（阴影更重）+ 辅 5 砖红警示 `#A85C5C`（破发曲线 + CEO 邮件印章）+ 主 2 陶土橘 `#C97B5C`（HR 疲惫主体色）+ 辅 4 黄铜金 `#D4A574`（钟体哑光）
- 特殊注意：
  - 与 E01 共用"上市仪式"视觉锚点（黄铜金钟 + 站台），但**配色与气氛全部反转**
  - **财报曲线明显下行**（左上到右下），曲线末端用砖红色警示
  - HR 总监**扯松领带、肩膀下塌**，CEO 邮件框斜插前景作为压力暗示
  - 记者剪影围堵站台前方，举着**空白话筒**（仅几何矩形）
  - 底部预留字幕条空间

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

cinematic 16:9 game ending CG illustration, centered storytelling composition, clean isolated illustration on a flat neutral background, ample empty space for UI overlay along the bottom subtitle band, same Demon Castle IPO bell-ringing ceremony stage as the triumphant ending but with reversed mood, a large brass-gold #D4A574 ceremonial bell hangs at upper-center now rendered with desaturated muted tone, the chibi female HR Director player character (a cute cartoon WOMAN in chibi 2.5-head proportion with big round head and small soft body, wearing foggy-beige #B8B5A8 oversized business blazer over warm cream #E8E2D5 collared shirt with terracotta-orange #C97B5C necktie loosened askew, two small matte black devil horns poking out from messy dark hair in a loose feminine low bun, brass-gold #D4A574 ID lanyard worn slightly crooked, oversized round droopy tired eyes, soft feminine cute face looking utterly exhausted, NOT a man, NO masculine features, NO beard) stands on the cream-white podium with shoulders slumped, the chibi Demon CEO beside her (taller silhouette in chibi 2.5-head proportion, massive curved brass-gold #D4A574 demon horns sweeping back from forehead, charcoal #3D3A36 sharp-tailored business suit with crisp white collar and terracotta-orange #C97B5C silk necktie, wearing matte black aviator sunglasses covering eyes, holding a rolled blank financial report scroll in one hand) crosses arms with a stern flat expression, a giant stock-chart panel on the back wall now shows a clearly downward-trending line falling from upper-left to lower-right with the end-segment painted in alarm brick-red #A85C5C and a small jagged crash mark, in the foreground a row of chibi reporter-monster silhouettes crowd the front of the podium holding up blank rectangular microphones (geometric shapes only, no logos no text), one reporter waves a folded blank newspaper, a large CEO email-window panel diagonally tilted in the front-left foreground showing a brick-red wax-seal stamp and three blank lorem placeholder lines, overall palette is dim grey foggy-beige walls with heavy charcoal #3D3A36 shadows and brick-red warning accents, lighting still soft and uniform but cooler and dimmer, mood is bitter dry corporate dark humor "won the war lost the money", signs and papers and stock chart and microphones and email show only blank shapes or LOREM IPSUM placeholder bars, NO readable English or Chinese text anywhere, generous empty space along the bottom edge reserved for subtitle UI
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, blood, death imagery, dark horror style, photorealistic, real readable text, Asian fantasy parchment, Western fantasy ornaments, real news network logos like CNN BBC Bloomberg, real stock ticker symbols, readable Chinese headlines, readable English headlines, real currency symbols and numbers, suicide imagery, jumping off buildings, dramatic crying tears streams, slapstick exaggeration, anime sweat-drop oversize, religious iconography, fireworks, confetti celebration, upward-trending chart, HR director as a man, male HR director, masculine HR character, orange suit-and-tie businessman as protagonist, beard on HR, mustache on HR
```

## 参考艺术家 / 作品（可选）

- BoJack Horseman 公司丑闻新闻发布会镜头（扁平 + 记者剪影 + 莫兰迪暗灰）
- 《Two Point Hospital》医院低评分破产剧情插画
- 《Reigns: Her Majesty》负向结局卡牌（暗化配色 + 紧迫红警示色）

## 切图与落位建议

- **切图方式详解**：06c post-process 从 Gemini 1024×1024 中央裁切 16:9 区域后下采样到 1280×720；前景 CEO 邮件框需保留完整不被裁损
- **边距要求**：底部 80px 预留字幕条安全区；左下前景邮件框距下边缘 60~100px
- **资源导入建议**（Atoms）：
  - 命名：`A-END-E02.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：否

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：上市钟仪式（哑光） + 下行曲线 + 记者围堵 + HR 疲惫 + CEO 邮件框
- [ ] 未出现反向 prompt 禁忌：无血腥、无真实媒体 logo、无真实文字、无上扬曲线
- [ ] 尺寸落盘 1280×720（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/endings/A-END-E02.png` 保存
- [ ] 底部字幕条安全区留白充足
- [ ] 配色暗灰主调 + 砖红警示点缀，与 E01 形成镜像对比

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/endings/A-END-E02__v1__flash.png`
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
- 文件：atoms/assets/art/endings/A-END-E02.png
- 结论：🟢（Confidence：中）
- 评分：
  - 风格一致性：🟢 — 暗化莫兰迪雾灰 + 重描边 + 砖红警示 + 哑光黄铜钟，气氛与 E01 形成镜像反差，扁平平涂一致
  - 主体正确：🟢 — 哑光钟悬于上方中央，HR 总监（陶土橘西装、肩膀下塌、神情疲惫）+ CEO（双臂交叉冷漠）站于站台；下行股价曲线左上至右下、末段砖红色 + 锯齿暴跌符号；前景记者剪影持空白话筒围堵 + 折叠空白报纸 + 前景左侧 CEO 邮件框带砖红蜡印 + lorem 横线
  - 构图尺寸：🟢 — 16:9，底部字幕安全区充足；前景邮件框未被裁损
  - 无禁忌元素：🟢 — 无血腥/真实文字/真实媒体 logo/写实摄影；话筒/报纸/邮件均为空白几何或 lorem 占位；无上扬曲线
  - 可用性：🟢 — 边缘清晰，无 artifacts；色彩饱和度低但对比清晰可读
- 修正建议：（无，🟢 通过入库；Confidence 中是因「HR 疲惫」"扯松领带"细节肉眼难精确分辨，但整体疲态明显已达成 prompt 意图）
