# A-ENE-BUST-W01 — 新手勇者（半身像）

**类别**：勇者半身像
**来源**：与 `design/art_prompts/A-ENE-W01.md` 同 canonical
**引用场景**：战斗 HUD 头像 / 下波勇者预告卡片

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-BUST-W01.png` |
| pivot 位置 | Center |

## 风格锚点

- **canonical 同步**：与 `A-ENE-W01.md` 立绘版粗布工装 + 实习袖章 + 实习工牌 + 兴奋紧张表情描述一致
- 半身像特殊注意：
  - 头 + 颈 + 上胸 + 胸前小工牌 + 工装无袖肩部可见
  - 木棒/锅盖盾/新手指南都已在裁切下方不可见
  - 实习袖章可见在肩头
  - 表情：眼睛瞪大兴奋 + 一滴小汗珠 + 嘴角微张深呼吸

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of a rookie novice adventurer (Hero W01), a chibi young human boy upper torso, wearing a sleeveless coarse warm cream #E8E2D5 work-tunic with rolled-up shoulder edges, no real armor at all just a humble dusty mint green #8FA89B intern armband on the upper arm visible at the shoulder, a small white intern name-tag on a thin string around the neck, oversized round eyes wide open and shining with nervous excitement, mouth slightly parted in a deep breath, a single tiny sweat drop on the temple, posture stiff and a little off-balance like someone who has never done this before and has no idea he is being sent in as a KPI canary, no malicious or villain expression at all, completely earnest workplace-newbie vibe, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, neck and upper torso with no wooden stick and no pot-lid shield and no handbook visible below the shoulders, no legs visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, legs, feet, walking pose, weapons in hand, raised stick, gore, blood, decapitation, dark horror style, realistic violence, anime hero shounen pose, plate armor, chainmail, full metal helmet, ornate fantasy hero outfit, glowing magical sword, oversized broadsword, two-handed greatsword, evil grin, menacing villain glare, muscular adult body, action combat stance, dramatic running pose, magical aura, fire effects, blood splatter on weapon, cape, shoulder pauldrons, badge of glory, dungeon background, second figure, confident heroic smirk
```

## 切图与落位

- aiart 1024×1024 → rmbg → sharp resize 256×256 → atoms/assets/art/enemies/A-ENE-BUST-W01.png
- pivot：Center
- atlas：`enemies_bust_atlas`

## Checklist

- [ ] 头胸构图，腿/武器/盾/手册不可见
- [ ] 米白工装 + 实习袖章 + 实习工牌 + 兴奋紧张表情命中
- [ ] 256×256 透明 PNG 落盘
