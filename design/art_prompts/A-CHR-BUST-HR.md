# A-CHR-BUST-HR — HR 总监（半身像）

**类别**：角色半身像（候选人头胸构图）
**来源**：与 `design/art_prompts/A-CHR-HR.md` 同角色 canonical
**引用场景**：招募简历头像槽 / 战斗 HUD 头像 / 对话条头像

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 256×256（aiart 1024×1024 → rmbg → resize 256×256） |
| 宽高比 | 1:1 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），rmbg 转 alpha |
| 切图方式 | 单张半身像，不切片 |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-BUST-HR.png` |
| pivot 位置 | Center（半身像几何中心） |

## 风格锚点（继承自 art_style_guide v1.0）

- **canonical 同步**：与 `A-CHR-HR.md` 立绘版女性化身、米色西装、散乱低发髻、小恶魔角、歪戴工牌、文件夹/咖啡杯描述完全一致；仅相机框取从 full-body 改为 head-and-shoulders bust
- 情绪词：疲惫但努力专业、deadpan 社畜式克制、一丝倦怠的暖意
- 色盘偏重：莫兰迪雾灰米 `#B8B5A8`（西装外套）+ 米白 `#E8E2D5`（衬衫）+ 陶土橘 `#C97B5C`（领带）+ 黄铜金 `#D4A574`（工牌挂绳）+ 描边深炭 `#3D3A36`
- 半身像特殊注意：
  - 构图为头 + 颈 + 上胸（cut at mid-chest），下半身完全不可见
  - 头部居画面上 60%，下方留白充足
  - 必须保留立绘版可见的胸口及以上配饰：领带、工牌挂绳、衬衫领、外套领；外套袖口与手上文件夹/咖啡杯**不可见**（已在裁切下方）
  - 头顶两只小恶魔角必须保留并清晰
  - 散乱低发髻 + 几缕碎发框脸保留
  - 神情、眼袋、职业微笑保留与立绘一致

## 正向 Prompt（可直接拷贝到 aiart）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

head and shoulders bust portrait of the Dungeon HR Director (player character), an adult cartoon FEMALE WOMAN white-collar worker drawn in CUTE chibi proportion with a big round head, soft feminine cartoon face with rounded chin, small button nose, oversized round eyes, gentle expression, young office lady in her late 20s, NOT a man, NOT a male, NO masculine jawline, NO beard, NO stubble, NO broad shoulders, NO emphasis on chest or waist or curves, flat-chested cute chibi silhouette, weary tired but professional expression, wearing a foggy-beige #B8B5A8 oversized business blazer collar over a warm cream #E8E2D5 collared shirt with a terracotta-orange #C97B5C necktie slightly loosened visible at the chest, two small low-key matte black devil horns poking out from her messy dark hair styled in a loose feminine low bun with a few loose strands framing her face as a subtle dungeon-meets-office reversal gag, an ID badge on a brass-gold #D4A574 lanyard worn slightly crooked off-center on the chest, faint matching-tone shadow blocks under the round oversized eyes hinting at fatigue while the mouth maintains a small forced professional smile, deadpan exhausted glint in the eyes, head and shoulders bust portrait composition cropped tightly at mid-chest level showing only head, neck and upper torso with no arms below the shoulders, no legs and no feet visible, character framed from upper chest up looking directly forward toward the viewer, head occupying roughly the upper 60% of the canvas, generous space around the head, tiny hard-edged shadow ellipse beneath the bust silhouette, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

full body, full length, legs visible, feet visible, walking pose, standing pose with legs, weapons, sword, axe, staff, dagger, gun, fantasy warrior outfit, plate armor, chainmail, shoulder pauldrons, battle gear, gore, blood splatter, evil demon villain, oversized menacing horns, glowing red eyes, monstrous fangs, muscular hero physique, half-naked, action pose, magical aura, fire effects, dungeon stone wall background, multiple characters, sidekick, NPC behind, second figure, male character, man, boy, masculine jawline, beard, stubble, mustache, short male haircut, broad male shoulders, suit-and-tie businessman, salaryman, adam's apple, large breasts, cleavage, curvy figure, hourglass body, tight clothing, sexy pose, sexualized, mature woman, busty
```

## 切图与落位建议

- 单张半身像，不切片
- 06c post-process：aiart gen 1024×1024 → rmbg → sharp resize(256, 256, fit:'contain') 透明 PNG
- atoms 落位：`atoms/assets/art/characters/A-CHR-BUST-HR.png`
- pivot：Center
- atlas：与其他 BUST 共打 `characters_bust_atlas`（6 张 ×256×256 ≈ 0.2MB）

## 回填验收 Checklist

- [ ] 头胸构图正确，下半身完全不可见
- [ ] 性别为女性、米色西装、低发髻、两只小恶魔角、橘领带、歪戴工牌全部命中
- [ ] 与 `A-CHR-HR.png` 立绘版风格一致（描边粗细、色盘、神态）
- [ ] 256×256 透明 PNG 落盘 atoms/assets/art/characters/A-CHR-BUST-HR.png
- [ ] 头部居画面上方约 60%，留白充足

## 审核结论

> 留待 06c 出图后填写。
