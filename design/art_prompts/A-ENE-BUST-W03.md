# A-ENE-BUST-W03 — 初级勇者+（半身像）

**类别**：勇者半身像
**来源**：与 `design/art_prompts/A-ENE-W03.md` 同 canonical
**引用场景**：战斗 HUD 头像 / 下波勇者预告卡片

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-BUST-W03.png` |
| pivot 位置 | Center |

## 风格锚点

- **canonical 同步**：与 `A-ENE-W03.md` 立绘版强化皮甲 + 深炭铆钉肩护 + 米白长袖衬 + 雾紫小护身符描述一致
- 半身像特殊注意：
  - 头 + 颈 + 上胸口皮甲 + 铆钉肩护 + 长袖衬领 + 雾紫护身符可见
  - 短剑、副匕首、业绩本已在裁切下方不可见
  - 表情：成熟自信、嘴角微笑、眼神略有"老油条"光

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of a senior junior adventurer (Hero W03), a chibi human character upper torso, wearing a reinforced dusty mint green #8FA89B leather chest armor with small charcoal-grey #3D3A36 metal-rivet shoulder caps visible at the shoulders, a warm cream #E8E2D5 long-sleeved undershirt visible at the collar, a simplified geometric dusty purple #7A6E8A guild-issued protective amulet hanging on a thin cord on the chest like a slightly superstitious good-luck charm, oversized round eyes showing maturing confidence with a faint mildly seasoned glint that is sly but never villainous, mouth relaxed in a small composed smile of someone who has closed a few quests already, completely workplace mid-junior-employee feel rather than a heroic fantasy stance, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, neck and upper torso with no sword and no dagger and no performance log book and no arms below the shoulders, no legs visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, legs, feet, walking pose, sword in hand, dagger drawn, gore, blood, plate armor, chainmail, full metal helmet, glowing magical sword, evil grin, action combat stance, magical aura, cape, dungeon background, second figure
```

## 切图与落位

- aiart 1024×1024 → rmbg → sharp resize 256×256 → atoms/assets/art/enemies/A-ENE-BUST-W03.png
- pivot：Center
- atlas：`enemies_bust_atlas`

## Checklist

- [ ] 头胸构图，腿/剑/匕首/业绩本不可见
- [ ] 强化皮甲 + 铆钉肩护 + 长袖衬领 + 雾紫护身符命中
- [ ] 表情自信带"老油条"
- [ ] 256×256 透明 PNG 落盘
