# A-ENE-BUST-W02 — 初级勇者（半身像）

**类别**：勇者半身像
**来源**：与 `design/art_prompts/A-ENE-W02.md` 同 canonical
**引用场景**：战斗 HUD 头像 / 下波勇者预告卡片

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-BUST-W02.png` |
| pivot 位置 | Center |

## 风格锚点

- **canonical 同步**：与 `A-ENE-W02.md` 立绘版灰薄荷绿皮甲背心 + 米白长袖衬 + 黄铜框转正工卡描述一致
- 半身像特殊注意：
  - 头 + 颈 + 胸口皮甲背心 + 衬衫领 + 转正工卡可见
  - 短剑/腰带/笔记夹已在裁切下方不可见
  - 表情：刚转正的实习生气场、青涩自信、嘴角微微上扬

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of a junior adventurer (Hero W02), a chibi young human upper torso, wearing a simple dusty mint green #8FA89B leather vest layered over a warm cream #E8E2D5 long-sleeved shirt with a small folded collar visible at the neck, a freshly issued formal employee ID card with a small brass-gold #D4A574 framed border pinned to the chest as a tongue-in-cheek probation-to-fulltime promotion gag, oversized round eyes showing modest growing self-confidence, mouth corners faintly turned up in a small reserved proud smile but still with a hint of youthful greenness, posture upright and tidy without any swagger, completely earnest junior-employee workplace vibe rather than a fantasy hero pose, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, neck and upper torso with no sword and no notepad and no arms below the shoulders, no legs visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, legs, feet, walking pose, sword in hand, gore, blood, anime hero shounen pose, plate armor, chainmail, full metal helmet, glowing magical sword, evil grin, menacing villain glare, muscular adult body, action combat stance, magical aura, fire effects, cape, shoulder pauldrons, dungeon background, second figure
```

## 切图与落位

- aiart 1024×1024 → rmbg → sharp resize 256×256 → atoms/assets/art/enemies/A-ENE-BUST-W02.png
- pivot：Center
- atlas：`enemies_bust_atlas`

## Checklist

- [ ] 头胸构图，腿/剑/笔记夹不可见
- [ ] 灰薄荷绿皮甲 + 米白长袖衬 + 黄铜框转正工卡命中
- [ ] 表情自信但不张扬
- [ ] 256×256 透明 PNG 落盘
