# A-ENE-BUST-ELITE — 精英勇者（半身像）

**类别**：勇者半身像（L06 BOSS）
**来源**：与 `design/art_prompts/A-ENE-ELITE.md` 同 canonical
**引用场景**：L06 战斗 HUD 头像 / 下波勇者预告卡片（精英警示）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-BUST-ELITE.png` |
| pivot 位置 | Center |

## 风格锚点

- **canonical 同步**：与 `A-ENE-ELITE.md` 立绘版深炭板甲 + 黄铜金滚边 + 砖红披风 + 头盔羽饰 + 金牌业绩奖牌描述一致
- 半身像特殊注意：
  - 头（带头盔羽饰）+ 颈 + 胸口板甲（黄铜金滚边）+ 砖红披风肩头露出 + 黄铜金奖牌（带砖红飘带）可见
  - 长枪/大剑、业绩档案夹已在裁切下方不可见
  - 头盔羽饰和奖牌作为 BOSS 视觉锚点必须清晰
  - 表情：金牌业绩老练气场、严肃但**绝非邪恶反派**

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of an elite veteran adventurer (Hero ELITE) as the L06 boss tier, a chibi seasoned human character upper torso, wearing a charcoal-grey #3D3A36 stylized flat plate-armor cuirass with brass-gold #D4A574 trim along the edges and pauldrons visible at the chest and shoulders, a brick-red warning #A85C5C cape draped behind the shoulders peeking up around the upper torso, a simple geometric flat feather plume on the helmet rim as a subtle ornament visible at the top of the head, a circular brass-gold #D4A574 top-performer achievement medallion with a brick-red ribbon pinned on the chest stamped with a tiny check-mark or hash-one symbol as a deadpan corporate award-of-the-year gag, a few simplified hard-edged battle scuffs on the armor surface rendered as same-hue one-shade-darker flat color blocks, oversized round eyes calm sharp and weary-veteran without any malice or rage, mouth a tight slightly downward composed straight line of someone who has seen everything, expression authoritative and seasoned like a senior industry veteran rather than an evil villain, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, helmet plume, neck and upper torso with no polearm and no greatsword and no dossier folder and no arms below the shoulders, no legs and no full cape visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, legs, feet, weapon raised, polearm in view, greatsword in view, gore, blood, realistic metallic plate armor with mirror reflections, ornate fantasy paladin BOSS, glowing magical sword, evil grin, menacing villain glare, action combat lunge stance, magical aura, fire effects, dramatically flowing cape with wind, dungeon throne room, second figure, dragon backdrop, halo, floating sword
```

## 切图与落位

- aiart 1024×1024 → rmbg → sharp resize 256×256 → atoms/assets/art/enemies/A-ENE-BUST-ELITE.png
- pivot：Center
- atlas：`enemies_bust_atlas`

## Checklist

- [ ] 头胸构图，腿/武器/档案夹/全披风不可见
- [ ] 深炭板甲 + 黄铜金滚边 + 砖红披风肩部 + 头盔羽饰 + 黄铜金奖牌（砖红飘带）命中
- [ ] 表情老练严肃、绝非邪恶反派
- [ ] 256×256 透明 PNG 落盘
