# A-CHR-BUST-GROOBAS — 格鲁巴斯·史莱姆（半身像）

**类别**：角色半身像
**来源**：与 `design/art_prompts/A-CHR-GROOBAS.md` 同 canonical
**引用场景**：招募简历头像槽 / 战斗 HUD 头像 / 对话条头像

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| 宽高比 | 1:1 |
| 背景要求 | `#B8B5A8` 纯灰底 + rmbg |
| 切图方式 | 单张半身像，不切片 |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-BUST-GROOBAS.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- **canonical 同步**：与 `A-CHR-GROOBAS.md` 立绘版灰薄荷绿果冻黏液 + 西装领 + 工牌挂绳描述一致
- 情绪词：腼腆讨喜、治愈反差萌、稳重老员工的勤恳感
- 色盘偏重：灰薄荷绿 `#8FA89B`（黏液主体）+ 描边深炭 `#3D3A36` + 黄铜金 `#D4A574`（工牌）+ 米白 `#E8E2D5`（衬衫领）
- 半身像特殊注意：
  - 史莱姆没有真正的"头胸界限"——整个 chibi 圆球身体的**上半部**作为头胸像构图
  - 西装领 + 衬衫领 + 工牌挂绳必须可见
  - 公文包/夹文件夹（手抱物）已在裁切下方，不可见

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of Groobas the Slime, a wholesome roly-poly jelly-bodied office worker monster, the upper half of his rounded dusty-mint-green #8FA89B blob body visible as a soft jelly head and chest, oversized round friendly eyes with a small bashful upward smile that radiates harmless reassurance, semi-transparent jelly look conveyed through one or two hard-edged darker mint color blocks (no gradients), wearing a tiny tailored charcoal-grey #3D3A36 suit jacket fitted over the upper bulge of his slime body with a warm cream #E8E2D5 dress shirt collar peeking out and a slightly crooked solid-color office necktie, a brass-gold #D4A574 lanyard with a small white-cream #E8E2D5 employee ID badge labeled with a stylized B1 stamp resting on his chest, head tilted very slightly downward in a polite veteran-employee greeting, expression humble and timid yet steady, wholesome heartwarming reversal of the usual fantasy slime trope, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head and upper torso with no folder and no arms visible below the shoulders, no legs and no slime base visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, slime base visible, feet, walking pose, aggressive monster, sharp fangs, sharp teeth, menacing snarl, angry expression, gore, dripping acid, corrosive melt effect, dark horror style, creepy uncanny eyes, slasher monster, traditional fantasy ooze with skulls inside, swallowing prey, dissolving bones visible inside body, neon toxic green, oversaturated lime, glowing radioactive aura, scary villain pose, weapons, armor plates, multiple slime minions in scene, second figure
```

## 切图与落位建议

- aiart 1024×1024 → rmbg → sharp resize 256×256 contain → atoms/assets/art/characters/A-CHR-BUST-GROOBAS.png
- pivot：Center
- atlas：`characters_bust_atlas`

## 回填验收 Checklist

- [ ] 头胸构图，下半身/黏液底盘完全不可见
- [ ] 灰薄荷绿黏液 + 西装领 + 衬衫领 + 工牌挂绳全部命中
- [ ] 表情腼腆温和、绝无尖牙凶相
- [ ] 256×256 透明 PNG 落盘

## 审核结论

> 留待 06c 出图后填写。
