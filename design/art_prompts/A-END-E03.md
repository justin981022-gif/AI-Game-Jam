# A-END-E03 — 勇者前台合影·无人值守

**类别**：结局 CG 静帧
**来源**：`design/narrative.md` v1.3 §结局表 E03 / `design/final-plan.md` 四结局收割点
**引用场景**：结局 E03（勇者攻入：地下城前台被勇者占领自拍打卡，HR 工位空空）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 1280×720（06c post-process 从 Gemini 1024×1024 裁切到 16:9） |
| 宽高比 | 16:9 |
| 背景要求 | 带场景背景（非透明）；雾灰冷调基调，明度 65~70 |
| 切图方式 | 单张全屏 CG，直接铺底，不分层 |
| atoms 落位路径 | `atoms/assets/art/endings/A-END-E03.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：荒诞冷幽默、无人值守的失落、勇者占领前台的喧闹反讽、deadpan office-comedy 高浓度
- 色盘偏重：主 1 莫兰迪雾灰 `#B8B5A8`（前台空间主调）+ 辅 1 深炭灰 `#3D3A36`（描边）+ 辅 3 雾紫 `#7A6E8A`（勇者袍点缀）+ 辅 2 米白 `#E8E2D5`（前台台面）+ 主 2 陶土橘 `#C97B5C`（凉咖啡马克杯极少点缀）
- 特殊注意：
  - **勇者们背对镜头**自拍打卡（不画正脸，仅背影/侧影 + 举起的方形相机/打卡牌剪影）
  - **HR 办公桌空空**作为情绪锚点：半杯凉咖啡 + 翻倒的"DAY 30"台历 + 散落简历
  - 打卡牌、台历、简历**仅出空白形状或 lorem 占位**
  - 底部预留字幕条空间

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

cinematic 16:9 game ending CG illustration, centered storytelling composition, clean isolated illustration on a flat neutral background, ample empty space for UI overlay along the bottom subtitle band, the Demon Castle HR reception lobby has been overrun by adventurer heroes, in the mid-ground three to four chibi adventurer figures (knight in dusty-mint-green #8FA89B armor, mage in foggy-purple #7A6E8A robe, archer in cream tunic, all from behind no faces shown only back-of-head silhouettes) crowd around the cream-white #E8E2D5 reception counter taking selfies with raised flat geometric square cameras and slapping blank stamp-cards onto the wall behind the counter, the wall is plastered with several blank rectangular tourist-style commemorative cards in lorem placeholder shapes, in the foreground left an empty HR office desk sits abandoned and silent: a half-full terracotta-orange #C97B5C ceramic coffee mug going cold with no steam, a knocked-over flip-style desk calendar with the page reading only blank stylized DAY-thirty placeholder shapes lying on its side, scattered blank resume papers fanning across the desk surface, an empty office swivel chair pushed back at an angle, no HR character figure present at the desk, the heroes' chatter contrasts with the silent abandoned desk creating absurd cold-humor tension, soft even diffuse fluorescent overhead lighting, palette dominated by Morandi foggy-beige walls and dusty-mint and foggy-purple hero accents against cream counter, mood is wry deadpan absurd office-comedy with a tinge of melancholy abandonment, signs and stamp-cards and calendar and resume papers show only blank shapes or LOREM IPSUM placeholder bars, NO readable English or Chinese text anywhere, generous empty space along the bottom edge reserved for subtitle UI
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, blood, death imagery, dark horror style, photorealistic, real readable text, Asian fantasy parchment, Western fantasy ornaments, hero front-facing portrait, hero detailed faces, real iPhone or Android phone in selfie pose, real Instagram or social media UI overlays, real tourist landmark logos, weapons drawn aggressively, combat scene, slaughter imagery, dungeon stone walls, torches, dramatic action poses, anime exaggerated reactions
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》接待区被访客挤爆的扁平插画
- BoJack Horseman 名人到访经纪公司前台的背影群像
- 《Reigns: Her Majesty》宫廷被入侵但 deadpan 的卡牌结局

## 切图与落位建议

- **切图方式详解**：06c post-process 从 Gemini 1024×1024 中央裁切 16:9 区域后下采样到 1280×720；前景空 HR 桌需完整保留作为左下情绪锚点
- **边距要求**：底部 80px 预留字幕条安全区；左下空桌道具距下边缘 60~100px
- **资源导入建议**（Atoms）：
  - 命名：`A-END-E03.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：否

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：勇者背影自拍打卡 + 空 HR 桌（凉咖啡 + 翻倒台历 + 散落简历）
- [ ] 未出现反向 prompt 禁忌：无勇者正脸、无真实手机/社交 UI、无血腥战斗、无真实文字
- [ ] 尺寸落盘 1280×720（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/endings/A-END-E03.png` 保存
- [ ] 底部字幕条安全区留白充足
- [ ] 雾灰主调 + 雾紫/灰薄荷点缀，与 art_style_guide 一致

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/endings/A-END-E03__v1__flash.png`
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
