# A-CHR-BUST-GENERIC-1 — 哥布林近战档（半身像）

**类别**：角色半身像
**来源**：与 `design/art_prompts/A-CHR-GENERIC-1.md` 同 canonical
**引用场景**：招募简历头像槽（玩家招到的"哥布林近战档"任意员工）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| 宽高比 | 1:1 |
| 背景要求 | `#B8B5A8` 纯灰底 + rmbg |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-BUST-GENERIC-1.png` |
| pivot 位置 | Center |

## 风格锚点

- **canonical 同步**：与 `A-CHR-GENERIC-1.md` 立绘版灰薄荷绿哥布林皮肤 + 米白安全帽 + 工装背带 + 黄铜挂绳描述一致
- 半身像特殊注意：
  - 安全帽 + 头部 + 颈部 + 胸口工装背带 + 衬衫领 + 工牌挂绳可见
  - 维护锤已在裁切下方不可见
  - 表情温吞专注、不要狰狞、保留两枚小下尖牙

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of a chibi cartoon goblin blue-collar facility worker, head and upper torso of a stocky creature with dusty mint green #8FA89B skin, big round eyes, pointed long ears, two tiny restrained lower fangs (never menacing), wearing a warm cream #E8E2D5 hard hat construction helmet with a thin charcoal #3D3A36 reflective stripe across it, charcoal #3D3A36 utility overalls with shoulder straps over a cream short-sleeve undershirt collar visible at the chest, a brass-gold #D4A574 corporate ID badge on a lanyard worn slightly crooked off-center, deadpan focused expression like a routine security guard on patrol, never aggressive, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, neck and upper torso with no hammer and no arms below the shoulders, no legs visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan blue-collar-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, legs, feet, walking pose, hammer in hand, weapon raised, bloodthirsty goblin warrior, savage tribal goblin, war paint, loincloth, sharp battle axe, spiked club, war banner, glowing red eyes, drooling fangs, ferocious snarl, half-naked muscular body, fantasy dungeon backdrop, multiple goblins, slime body, skeleton bones, demon wings, tentacle limbs, female character, woman, breasts, oversized horns, magical staff, robes
```

## 切图与落位

- aiart 1024×1024 → rmbg → sharp resize 256×256 → atoms/assets/art/characters/A-CHR-BUST-GENERIC-1.png
- pivot：Center

## Checklist

- [ ] 头胸构图，腿/锤/手不可见
- [ ] 灰薄荷皮肤 + 安全帽（米白带反光条）+ 工装背带 + 工牌挂绳全部命中
- [ ] 两枚小下尖牙保留、表情非狰狞
- [ ] 256×256 透明 PNG 落盘
