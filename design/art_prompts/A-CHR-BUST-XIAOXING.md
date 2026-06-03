# A-CHR-BUST-XIAOXING — 宵星·骷髅法师（半身像）

**类别**：角色半身像
**来源**：与 `design/art_prompts/A-CHR-XIAOXING.md` 同 canonical
**引用场景**：招募简历头像槽 / 战斗 HUD 头像 / 对话条头像

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256 |
| 宽高比 | 1:1 |
| 背景要求 | `#B8B5A8` 纯灰底 + rmbg |
| 切图方式 | 单张半身像，不切片 |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-BUST-XIAOXING.png` |
| pivot 位置 | Center |

## 风格锚点

- **canonical 同步**：与 `A-CHR-XIAOXING.md` 立绘版米白骷髅头 + 雾紫法师袍 + 松开领带 + 斜挎包 + 黄铜挂绳描述一致
- 情绪词：节俭省钱的理性气场、学生书生感、低调克制
- 色盘偏重：雾紫 `#7A6E8A`（袍领）+ 米白 `#E8E2D5`（骨色）+ 描边深炭 + 黄铜金（挂绳点缀）
- 半身像特殊注意：
  - 颅骨头 + 颈骨 + 胸口袍领可见
  - 半结松开领带必须保留并清晰可见
  - 斜挎包带子横过胸口可见，但包体（带笔记本）已在裁切下方
  - 法师袍补丁/破洞细节移到袖口（已不可见），上衣保留干净简朴印象
  - 表情温和理性、空洞眼窝里小光点

## 正向 Prompt

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of Xiaoxing the Skeleton Mage, a chibi friendly skeleton character with clean cream-white #E8E2D5 simplified cartoon skull head, two oversized round soft glowing dot-eyes inside the empty eye sockets that look gentle and rational rather than menacing, wearing a plain oversized dusty-purple #7A6E8A mage robe collar visibly thrifty and well-worn, a half-loosened solid-color office necktie hanging around the bony neck above the robe collar like a tired post-graduate student after work, a simple cloth shoulder satchel strap visible across the chest, a brass-gold #D4A574 lanyard with a tiny employee ID badge as a small accent on the chest, expression composed and quietly economical conveying the bookworm vibe of someone saving every coin for tuition, friendly skeleton mage absolutely not an evil necromancer, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, neck and upper torso with no satchel body and no hands and no staff visible below the shoulders, no legs and no robe hem visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, robe hem visible, legs, walking pose, gore, decaying flesh, rotting meat on bones, blood stains on robe, evil necromancer cliche, sinister glowing green ghost flames, dark fel sorcery aura, summoned skulls floating around, soul tendrils, hooded grim reaper figure, scythe, dark horror style, menacing red eyes, jagged dripping fangs, cracked broken skull with chunks missing, edgy goth purple neon, oversaturated dark magic effects, evil villain crouching pose, raised casting hands with explosion, multiple skeleton minions in scene, undead horde behind, second figure, intimidating death lord vibe
```

## 切图与落位建议

- aiart 1024×1024 → rmbg → sharp resize 256×256 contain → atoms/assets/art/characters/A-CHR-BUST-XIAOXING.png
- pivot：Center
- atlas：`characters_bust_atlas`

## 回填验收 Checklist

- [ ] 头胸构图，腿/袍下摆/挎包体完全不可见
- [ ] 米白骷髅头 + 雾紫袍领 + 半结松领带 + 挎包带 + 黄铜挂绳命中
- [ ] 表情温和理性，空洞眼窝小光点，无邪术师威胁感
- [ ] 256×256 透明 PNG 落盘

## 审核结论

> 留待 06c 出图后填写。
