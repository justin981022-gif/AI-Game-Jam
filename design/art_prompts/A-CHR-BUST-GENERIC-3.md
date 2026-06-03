# A-CHR-BUST-GENERIC-3 — 触手怪杂工档（半身像）

**类别**：角色半身像
**来源**：与 `design/art_prompts/A-CHR-GENERIC-3.md` 同 canonical
**引用场景**：招募简历头像槽（玩家招到的"触手怪杂工档"任意员工）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-BUST-GENERIC-3.png` |
| pivot 位置 | Center |

## 风格锚点

- **canonical 同步**：与 `A-CHR-GENERIC-3.md` 立绘版雾紫圆头 + "O" 形小嘴 + 米白清洁围裙 + 黄铜挂绳描述一致
- 半身像特殊注意：
  - 大圆头 + 颈 + 围裙肩带和上胸口袋可见
  - 触手肢已在裁切下方不可见
  - 围裙、口袋、工牌挂绳可见
  - 表情温吞踏实、无恐怖触手元素

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of a chibi cartoon friendly tentacle creature janitor, a large round head and upper body of a being with foggy purple #7A6E8A skin, two oversized round eyes and a tiny "O" shaped mouth giving a temperate calm look, absolutely no scary suction cups, no slime drips, no eldritch horror elements, wearing a warm cream #E8E2D5 cleaning apron with a single front chest pocket and shoulder straps visible at the collar, a brass-gold #D4A574 corporate ID badge clipped to the apron pocket worn slightly crooked off-center, deadpan steady gentle expression, no menacing pose, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, neck and upper apron with no tentacles and no cleaning cart visible below the shoulders, no legs and no rounded base visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan facility-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, tentacles around body, cleaning cart visible, mop visible, walking pose, cthulhu horror, eldritch monster, terrifying tentacle monster, sharp suction cups, slime drips, dripping ooze, gaping mouth with teeth, multiple terrifying eyes, gore, blood splatter, sexual tentacles, NSFW tentacles, sexy pose, scary horror movie creature, dark cosmic horror background, goblin skin, skeleton bones, demon wings, female character, woman, breasts, robes, magical staff
```

## 切图与落位

- aiart 1024×1024 → rmbg → sharp resize 256×256 → atoms/assets/art/characters/A-CHR-BUST-GENERIC-3.png
- pivot：Center

## Checklist

- [ ] 头胸构图，触手肢/清洁推车不可见
- [ ] 雾紫大圆头 + "O" 形小嘴 + 米白围裙 + 工牌挂绳命中
- [ ] 表情温吞、无恐怖元素
- [ ] 256×256 透明 PNG 落盘
