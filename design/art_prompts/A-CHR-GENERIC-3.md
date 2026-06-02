# A-CHR-GENERIC-3 — 泛用怪物员工 #3（杂工档·触手怪保洁）

**类别**：角色立绘（泛用怪物员工）
**来源**：`design/art_asset_list.md` v1.1 §5.2 角色立绘（新增）+ `design/narrative.md` v1.3 B02/B05/C01 突发事件中 [怪物名] 动态对位
**引用场景**：玩家招募的非主角怪物之一，B02/B05/C01 等突发事件中作为「[怪物名]」动态对位的视觉之一

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 768×1024（06c post-process 自 Gemini 1024×1024 等比裁切下采样） |
| 宽高比 | 3:4 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张立绘，直接用；06c 后处理纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-GENERIC-3.png` |
| pivot 位置 | Bottom Center（立绘脚底中线） |

## 风格锚点（继承自 art_style_guide v1.0）

- **区分点（与 GROOBAS / XIAOXING / GENERIC-1 / GENERIC-2）**：本立绘为**触手怪**种族 + **杂工档 / 保洁清洁推车气质**职能定位，明显区别于 GROOBAS（蓝史莱姆，无触手）、XIAOXING（骷髅法师）、GENERIC-1（哥布林近战）、GENERIC-2（恶魔文员）
- 情绪词：deadpan 后勤大妈 / 物业保洁式踏实、像深夜清洁班长、一丝勤恳与摸鱼并存
- 色盘偏重：辅 3 雾紫 `#7A6E8A`（触手怪身体主色，与其他怪物色调拉开距离）+ 辅 2 米白 `#E8E2D5`（围裙）+ 辅 1 描边深炭灰 `#3D3A36`（描边 + 推车主体）+ 主 3 灰薄荷绿 `#8FA89B`（清洁推车桶身辅色）+ 辅 4 黄铜金 `#D4A574`（工牌挂绳 / 推车扶手金属）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）
- 特殊注意：
  - chibi 2.5 头身比例的"圆头 + 4~6 条短粗触手代替手脚"形态，**触手末端圆钝**（绝不画吸盘恐怖元素），整体造型萌而非吓人
  - 头部圆形，2 个超大圆眼 + 嘴部为小小的"O"形（temperance 拟人化）
  - 系**米白色围裙**（带一个胸前口袋），围裙上挂一个黄铜金工牌
  - 一条触手扶着一个**灰薄荷绿桶 + 深炭灰轮子的清洁推车**（推车上插一把扁平拖把杆 + 一个雾灰水桶）
  - 表情**温吞踏实**，像深夜上班的物业大妈，绝不画狰狞 / 怪诞
  - 不画奇幻克苏鲁元素 / 黏液滴落 / 吸盘特写

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of a chibi cartoon friendly tentacle creature janitor drawn as a round-headed 2.5-head-proportion being with foggy purple #7A6E8A skin, a large round head with two oversized round eyes and a tiny "O" shaped mouth giving a temperate calm look, four to six short stubby tentacle limbs with rounded blunt tips replacing arms and legs, absolutely no scary suction cups, no slime drips, no eldritch horror elements, wearing a warm cream #E8E2D5 cleaning apron with a single front chest pocket, a brass-gold #D4A574 corporate ID badge clipped to the apron pocket worn slightly crooked off-center, one tentacle gently holding the handle of a small janitor cleaning cart, the cart has a dusty mint green #8FA89B bucket body with a charcoal #3D3A36 wheels and a brass-gold metal handle, a flat charcoal mop stick and a small foggy beige water bucket are inserted on top of the cart, posture round and grounded like a kindly night-shift facility cleaner, deadpan steady gentle expression, no menacing pose, no horror tropes, standing front-facing in a neutral working pose, hard-edged tiny shadow ellipse beneath the rounded base, centered front-facing full-body composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan facility-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

cthulhu horror, eldritch monster, terrifying tentacle monster, sharp suction cups, slime drips, dripping ooze, gaping mouth with teeth, multiple terrifying eyes, gore, blood splatter, sexual tentacles, NSFW tentacles, sexy pose, scary horror movie creature, dark cosmic horror background, goblin skin, skeleton bones, demon wings, female character, woman, breasts, robes, magical staff
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》清洁工角色（围裙 + 清洁推车）
- 《史莱克》中 Q 版温吞怪物配角（憨厚反差萌）
- Corporate Memphis 风格的扁平后勤员工插画

## 切图与落位建议

- **切图方式详解**：单张直接用，06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方 ≥80px、下方 ≥60px、左右各 ≥100px 透明安全区；触手末端不可超出安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-CHR-GENERIC-3.png`
  - pivot / anchor：Bottom Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与 GENERIC-1/-2 共打 `characters_generic_atlas`（或归入 `characters_atlas` 扩展位）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：圆头触手怪 + 围裙 + 清洁推车 + 拖把 + 温吞表情
- [ ] 未出现反向 prompt 禁忌：无恐怖触手、无吸盘特写、无黏液、无克苏鲁元素
- [ ] 与 GROOBAS / XIAOXING / GENERIC-1 / GENERIC-2 种族 + 职能差异清晰
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/characters/A-CHR-GENERIC-3.png` 保存

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/characters/A-CHR-GENERIC-3__v1__flash.png`
- 结论：🟢 / 🟡 / 🔴
- Confidence：高 / 中 / 低(仅 🔴 必填)
- 评分：
  - 风格一致性：🟢/🟡/🔴
  - 主体正确：🟢/🟡/🔴
  - 构图尺寸：🟢/🟡/🔴
  - 无禁忌元素：🟢/🟡/🔴
  - 可用性：🟢/🟡/🔴
- 修正建议（🔴/🟡 时必填，仅可改特有描述段）：
  > ...
