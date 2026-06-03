# A-ENE-BUST-W04 — 中级勇者（半身像）

**类别**：勇者半身像
**来源**：与 `design/art_prompts/A-ENE-W04.md` 同 canonical
**引用场景**：战斗 HUD 头像 / 下波勇者预告卡片

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-BUST-W04.png` |
| pivot 位置 | Center |

## 风格锚点

- **canonical 同步**：与 `A-ENE-W04.md` 立绘版深炭链甲 + 米白长袖内衬 + 灰薄荷绿队臂章（砖红警示边）描述一致
- 半身像特殊注意：
  - 头 + 颈 + 胸口链甲 + 内衬领 + 左肩队臂章可见
  - 长剑、盾、考勤打卡器已在裁切下方不可见
  - 表情：成熟专业、严肃但不冷酷、像审 KPI 表的项目经理

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of a mid-tier adventurer (Hero W04), a chibi human character upper torso, wearing a charcoal-grey #3D3A36 sleeveless chainmail vest stylized as flat repeating ring pattern with simple hard-edged single-tone shadow blocks for depth (no realistic metallic reflection), a warm cream #E8E2D5 long-sleeved underlayer visible at neck and at the upper arms, a dusty mint green #8FA89B squad armband on the upper left arm framed by a thin brick-red #A85C5C warning border indicating squad-leader status as a tongue-in-cheek workplace seniority gag, oversized round eyes calm sharp and professional, brows slightly furrowed as if mentally reviewing a KPI sheet, mouth a flat composed straight line, expression strict but not cruel evoking a seasoned project-manager vibe, posture grounded and trained without any threatening menace, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, neck and upper torso with no sword and no shield and no time-clock device and no arms below the shoulders, no legs visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, legs, feet, sword raised, gore, blood, realistic metallic chainmail with mirror reflections, full plate armor knight, ornate fantasy hero outfit, glowing magical sword, evil grin, action combat stance, magical aura, fire effects, cape flowing dramatically, dungeon background, second figure
```

## 切图与落位

- aiart 1024×1024 → rmbg → sharp resize 256×256 → atoms/assets/art/enemies/A-ENE-BUST-W04.png
- pivot：Center
- atlas：`enemies_bust_atlas`

## Checklist

- [ ] 头胸构图，腿/剑/盾/打卡器不可见
- [ ] 深炭链甲（扁平环纹）+ 米白长袖内衬 + 队臂章（灰薄荷绿+砖红边）命中
- [ ] 表情严肃但不凶狠
- [ ] 256×256 透明 PNG 落盘
