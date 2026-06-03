# A-CHR-BUST-GENERIC-2 — 小恶魔文员档（半身像）

**类别**：角色半身像
**来源**：与 `design/art_prompts/A-CHR-GENERIC-2.md` 同 canonical
**引用场景**：招募简历头像槽（玩家招到的"恶魔小翅膀文员档"任意员工）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-BUST-GENERIC-2.png` |
| pivot 位置 | Center |

## 风格锚点

- **canonical 同步**：与 `A-CHR-GENERIC-2.md` 立绘版砖红皮肤 + 两只小恶魔角 + 折叠蝙蝠翅膀 + 米白短袖衬 + 深炭办公背心 + 陶土橘领结描述一致
- 半身像特殊注意：
  - 头 + 颈 + 胸口可见
  - 两只小恶魔角必须保留并清晰可见
  - 折叠蝙蝠翅膀露出**肩后/上半部分**（不可全收纳到裁切外）
  - 领结、办公背心 V 领、衬衫领可见
  - 工牌挂绳可见
  - 文件夹/羽毛笔已在裁切下方不可见
  - 自信微笑保留

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of a chibi cartoon small imp office clerk, head and upper torso of a slender creature with muted brick-red #A85C5C skin tone, big round eyes with a confident slightly smug expression, two small low-key matte black devil horns protruding from the top of the head slightly larger than the HR director's horns but still restrained, the top edges of small folded bat-like wings tucked neatly behind the shoulders just barely peeking up behind the upper back, wearing a warm cream #E8E2D5 short-sleeve collared shirt under a charcoal #3D3A36 office vest with a small terracotta orange #C97B5C bow tie at the collar, a brass-gold #D4A574 corporate ID badge on a lanyard worn slightly crooked off-center, deadpan slightly smug office-comedy expression, no flames, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, neck and upper torso with no clipboard and no quill and no arms below the shoulders, no legs visible, no tail visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, legs, feet, walking pose, tail visible, large open wings, evil demon villain, oversized menacing horns, glowing red eyes, monstrous fangs, fire breath, hellfire, pentagram, demonic ritual, ripped muscular demon, half-naked, devil tail, pitchfork, trident, succubus, sexy pose, sexualized, large breasts, cleavage, skeleton bones, goblin green skin, slime body, tentacle limbs, female character or any explicit gender presentation, robes, magical staff
```

## 切图与落位

- aiart 1024×1024 → rmbg → sharp resize 256×256 → atoms/assets/art/characters/A-CHR-BUST-GENERIC-2.png
- pivot：Center

## Checklist

- [ ] 头胸构图，腿/手/文件夹不可见
- [ ] 砖红皮肤 + 两只小恶魔角 + 蝙蝠翅膀肩后微露 + 领结 + 办公背心 + 衬衫领命中
- [ ] 自信表情但不邪恶
- [ ] 256×256 透明 PNG 落盘
