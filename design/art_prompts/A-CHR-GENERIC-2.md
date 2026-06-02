# A-CHR-GENERIC-2 — 泛用怪物员工 #2（中距支援档·小恶魔文员）

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
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-GENERIC-2.png` |
| pivot 位置 | Bottom Center（立绘脚底中线） |

## 风格锚点（继承自 art_style_guide v1.0）

- **区分点（与 GROOBAS / XIAOXING / GENERIC-1 / GENERIC-3）**：本立绘为**小恶魔**种族 + **中距支援档 / 行政文员气质**职能定位，明显区别于 GROOBAS（蓝史莱姆 / B1 驻守）、XIAOXING（骷髅法师 / 远程）、GENERIC-1（哥布林近战）、GENERIC-3（触手怪杂工）
- 情绪词：deadpan 行政内勤式精明、像 HR 副手 / 项目协调员、一丝小聪明感
- 色盘偏重：辅 5 砖红警示 `#A85C5C`（小恶魔皮肤主色，与 GENERIC-1 哥布林绿明显区分）+ 辅 1 描边深炭灰 `#3D3A36`（西装外套 + 描边）+ 辅 2 米白 `#E8E2D5`（衬衫）+ 主 2 陶土橘 `#C97B5C`（领结）+ 辅 4 黄铜金 `#D4A574`（工牌挂绳 / 文件夹金属扣） + 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）
- 特殊注意：
  - chibi 2.5 头身、大头圆眼；**头顶两只小恶魔角（比 HR 总监稍大但克制）+ 背后一对小蝙蝠翅膀（折叠收拢状，象征办公室不展开）**
  - 穿**短袖白衬衫 + 深炭灰马甲背心 + 陶土橘小领结**（行政文员制服气质）
  - 一手抱着**克拉夫文件夹 / 项目进度板**，一手拿着一支羽毛笔（无墨水滴落）
  - 表情**得意但克制**，嘴角轻微上扬如同"这事我有解决方案"
  - 不画尾巴（避免奇幻反派联想）；不画战斗法术效果

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of a chibi cartoon small imp office clerk drawn as a slender 2.5-head-proportion creature with muted brick-red #A85C5C skin tone, big round eyes with a confident slightly smug expression, two small low-key matte black devil horns protruding from the top of the head slightly larger than the HR director's horns but still restrained, a pair of small folded bat-like wings tucked neatly behind the back in a closed resting position, wearing a warm cream #E8E2D5 short-sleeve collared shirt under a charcoal #3D3A36 office vest with a small terracotta orange #C97B5C bow tie at the collar, a brass-gold #D4A574 corporate ID badge on a lanyard worn slightly crooked off-center, holding a clipboard project tracker in one arm and a quill pen in the other hand with no dripping ink, posture upright and proud but contained like an administrative assistant who knows the answer, deadpan slightly smug office-comedy expression, no tail, no battle magic effects, no flames, standing front-facing in a neutral confident pose, hard-edged tiny shadow ellipse beneath the feet, centered front-facing full-body composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

evil demon villain, oversized menacing horns, glowing red eyes, monstrous fangs, fire breath, hellfire, pentagram, demonic ritual, ripped muscular demon, half-naked, devil tail, pitchfork, trident, succubus, sexy pose, sexualized, large breasts, cleavage, skeleton bones, goblin green skin, slime body, tentacle limbs, female character or any explicit gender presentation, robes, magical staff
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》行政经理角色（白领西装小动物）
- BoJack Horseman 中 Princess Carolyn 的扁平莫兰迪行政造型
- Corporate Memphis 风格的扁平小恶魔卡通（克制 + 商务）

## 切图与落位建议

- **切图方式详解**：单张直接用，06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方 ≥80px、下方 ≥60px、左右各 ≥100px 透明安全区；翅膀折叠收拢，不可超出左右安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-CHR-GENERIC-2.png`
  - pivot / anchor：Bottom Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与 GENERIC-1/-3 共打 `characters_generic_atlas`（或归入 `characters_atlas` 扩展位）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：小恶魔砖红皮肤 + 小角 + 折叠翅膀 + 行政文员制服 + 文件夹羽毛笔
- [ ] 未出现反向 prompt 禁忌：无邪恶反派、无大角、无火焰、无性别强化、无尾巴
- [ ] 与 GROOBAS / XIAOXING / GENERIC-1 / GENERIC-3 种族 + 职能差异清晰
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/characters/A-CHR-GENERIC-2.png` 保存

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/characters/A-CHR-GENERIC-2__v1__flash.png`
- 结论：🟢 / 🟡 / 🔴
- Confidence：高 / 中 / 低（仅 🔴 必填）
- 评分：
  - 风格一致性：🟢/🟡/🔴
  - 主体正确：🟢/🟡/🔴
  - 构图尺寸：🟢/🟡/🔴
  - 无禁忌元素：🟢/🟡/🔴
  - 可用性：🟢/🟡/🔴
- 修正建议（🔴/🟡 时必填，仅可改特有描述段）：
  > ...
