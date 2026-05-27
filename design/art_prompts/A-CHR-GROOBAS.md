# A-CHR-GROOBAS — 格鲁巴斯·史莱姆

**类别**：角色立绘
**来源**：`design/narrative.md` v1.3 §角色表 #3（格鲁巴斯·史莱姆，老员工代表，治愈系反差萌锚点）
**引用场景**：L01 招募 / E01 结局私信「谢谢你没有把我末位淘汰」/ E04 结局留言「这次我不是被淘汰的」

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 768×1024（06c post-process 自 Gemini 1024×1024 等比裁切下采样） |
| 宽高比 | 3:4 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张立绘，直接用；06c 后处理时纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-GROOBAS.png` |
| pivot 位置 | Bottom Center（黏液底盘中点，便于战斗界面与对话槽位对位） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：腼腆讨喜、治愈反差萌、稳重老员工的勤恳感、绝不吓人
- 色盘偏重：主 3 灰薄荷绿 `#8FA89B`（黏液主体色，与「灵魂碎片/治愈」意象呼应；narrative 写作"蓝色史莱姆"，但 art_style_guide 已明确主 3 灰薄荷为格鲁巴斯主体色，按风格规范优先）+ 辅 1 描边深炭 `#3D3A36`（统一描边）+ 辅 4 黄铜金 `#D4A574`（工牌挂绳/扣件）+ 辅 2 米白 `#E8E2D5`（衬衫领） + 主 1 莫兰迪雾灰米 `#B8B5A8`（纯灰底）
- 特殊注意：
  - **治愈反差萌**是核心：圆润果冻状黏液身躯 + 西装领带 + 工牌的"老员工"反差，一定要可爱讨喜，**绝不能恐怖**
  - 神情**腼腆**：略微低头、嘴角轻轻上扬的小微笑，眼神温和不锋利
  - **不要尖牙、不要凶相**；身体半透明黏液质感用 1~2 层硬边色块色阶模拟（禁渐变）
  - 须背小公文包/夹文件夹（narrative：8 年驻守、3 财年零离职 → 视觉上突出"勤恳老员工"）

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of Groobas the Slime, a wholesome roly-poly jelly-bodied office worker monster standing facing forward in a shy gentle pose, body shaped like a soft rounded dusty-mint-green #8FA89B blob about 2.5 heads tall with two short stubby little arms and a flat slime base instead of feet, oversized round friendly eyes with a small bashful upward smile that radiates harmless reassurance, semi-transparent jelly look conveyed only through one or two hard-edged darker mint color blocks (no gradients), wearing a tiny tailored charcoal-grey #3D3A36 suit jacket fitted over the upper bulge of his slime body with a warm cream #E8E2D5 dress shirt collar peeking out and a slightly crooked solid-color office necktie, a brass-gold #D4A574 lanyard with a small white-cream #E8E2D5 employee ID badge labeled with a stylized B1 stamp resting on his chest, holding a small office manila folder tucked under one stubby arm, head tilted very slightly downward in a polite veteran-employee greeting, posture humble and timid yet steady, wholesome heartwarming reversal of the usual fantasy slime trope, centered composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, hard-edged tiny shadow ellipse beneath the slime base, no other props or scenery, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

aggressive monster, sharp fangs, sharp teeth, menacing snarl, angry expression, gore, dripping acid, corrosive melt effect, dark horror style, creepy uncanny eyes, slasher monster, traditional fantasy ooze with skulls inside, swallowing prey, dissolving bones visible inside body, neon toxic green, oversaturated lime, glowing radioactive aura, scary villain pose, weapons, armor plates, multiple slime minions in scene, second figure
```

## 参考艺术家 / 作品（可选）

- 《Slime Rancher》圆润治愈系史莱姆造型（去其饱和卡通光泽，回到莫兰迪扁平）
- 《Two Point Hospital》Q 版员工角色的"职场服饰套在非人体型上"反差感
- 《Reigns: Her Majesty》纯灰底单卡角色构图

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024（保持主体居中、底部黏液与画面下边缘 ≥ 60px 距离）；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方至少 100px、下方至少 60px、左右各至少 120px 透明安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-CHR-GROOBAS.png`（与目录约定一致）
  - pivot / anchor：Bottom Center（黏液底盘中线）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与 `A-CHR-HR` / `A-CHR-XIAOXING` 共打 `characters_atlas`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：圆润灰薄荷绿黏液 + 西装工牌 + 腼腆讨喜微笑
- [ ] 未出现反向 prompt 禁忌：无尖牙、无凶相、无血腥、无恐怖元素、无霓虹饱和绿
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/characters/A-CHR-GROOBAS.png` 保存
- [ ] 资源导入设置：Bilinear 采样、Bottom Center pivot、可进 characters_atlas
- [ ] 在 L01 招募 / E01 / E04 实际显示正常：治愈反差萌效果可被玩家直观感知

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/characters/A-CHR-GROOBAS__v1__flash.png`
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
- 文件：atoms/assets/art/characters/A-CHR-GROOBAS.png
- 结论：🟢（Confidence：高）
- 评分：
  - 风格一致性：🟢 — 灰薄荷绿主色 + 莫兰迪扁平 + 粗描边 + 硬边色块阴影模拟果冻质感，无渐变污染
  - 主体正确：🟢 — 圆润果冻黏液身躯 + 西装领带 + 衬衫领 + B1 工牌 + 公文包，腼腆讨喜微笑到位
  - 构图尺寸：🟢 — 居中构图，黏液底盘下方留白足，符合 768×1024 边距要求
  - 无禁忌元素：🟢 — 无尖牙、无凶相、无霓虹饱和绿、无恐怖元素
  - 可用性：🟢 — 主体抠图完整，无切边，治愈反差萌效果可直观传达
- 修正建议：（🟢 无）
