# A-CHR-GENERIC-1 — 泛用怪物员工 #1（近战防御档·哥布林）

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
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-GENERIC-1.png` |
| pivot 位置 | Bottom Center（立绘脚底中线） |

## 风格锚点（继承自 art_style_guide v1.0）

- **区分点（与 GROOBAS / XIAOXING / GENERIC-2 / GENERIC-3）**：本立绘为**哥布林**种族 + **近战防御档 / 锤子工牌肌肉档**职能定位，明显区别于 GROOBAS（蓝史莱姆 / B1 驻守）、XIAOXING（骷髅法师 / 远程）、GENERIC-2（恶魔小翅膀文员 / 中距支援）、GENERIC-3（触手怪杂工 / 清洁推车）
- 情绪词：deadpan 蓝领工人式扎实、像物业保安老员工、一丝憨厚自豪感
- 色盘偏重：主 3 灰薄荷绿 `#8FA89B`（哥布林皮肤主色）+ 辅 2 米白 `#E8E2D5`（安全帽 / 反光背心高亮条）+ 辅 1 描边深炭灰 `#3D3A36`（描边 + 工装背带主色）+ 辅 4 黄铜金 `#D4A574`（工牌挂绳 / 锤子柄金属箍）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（抠图底）
- 特殊注意：
  - chibi 2.5 头身、大头圆眼、矮壮粗腿；尖耳朵 + 凸出的小獠牙（克制，仅 2 颗下颚小牙，不可怖）
  - 戴**米白色 + 反光条工地安全帽**（替代奇幻头盔，强化"职场打工"反差）
  - 穿**深炭灰工装背带裤 + 米白短袖**，胸前挂黄铜金工牌（歪戴）
  - 一手持**圆头大锤**（橡胶头工程锤，非战斗武器），锤柄黄铜金箍，姿态扛在肩上而非战斗持握
  - 表情严肃但温吞，像保安例行巡逻；不要狰狞 / 嗜血表情
  - 居中正面立姿，脚底椭圆硬阴影

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of a chibi cartoon goblin blue-collar facility worker drawn as a stocky 2.5-head-proportion creature with dusty mint green #8FA89B skin, big round eyes, pointed long ears, two tiny restrained lower fangs (never menacing), wearing a warm cream #E8E2D5 hard hat construction helmet with a thin charcoal #3D3A36 reflective stripe across it, a charcoal #3D3A36 utility overalls with shoulder straps over a cream short-sleeve undershirt, a brass-gold #D4A574 corporate ID badge on a lanyard worn slightly crooked off-center, holding a large rounded rubber-head maintenance hammer resting casually on one shoulder with a brass-gold metal collar at the hammer head, deadpan focused expression like a routine security guard on patrol, never aggressive, slightly slumped sturdy stance with short stubby legs, standing front-facing in a neutral working pose, hard-edged tiny shadow ellipse beneath the feet, centered front-facing full-body composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, no other props or scenery, no other characters, deadpan blue-collar-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

bloodthirsty goblin warrior, savage tribal goblin, war paint, loincloth, sharp battle axe, spiked club, war banner, glowing red eyes, drooling fangs, ferocious snarl, half-naked muscular body, fantasy dungeon backdrop, multiple goblins, slime body, skeleton bones, demon wings, tentacle limbs, female character, woman, breasts, oversized horns, magical staff, robes
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》设施维护工角色卡（蓝领工装 + 安全帽）
- Corporate Memphis 风格的扁平蓝领员工插画
- 《Reigns》臣子卡牌中工人剪影（克制扁平）

## 切图与落位建议

- **切图方式详解**：单张直接用，06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方 ≥80px、下方 ≥60px、左右各 ≥100px 透明安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-CHR-GENERIC-1.png`
  - pivot / anchor：Bottom Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与 GENERIC-2/-3 共打 `characters_generic_atlas`（或归入 `characters_atlas` 扩展位）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：哥布林皮肤 + 工地安全帽 + 工装背带 + 圆头工程锤
- [ ] 未出现反向 prompt 禁忌：无战斗武器、无狰狞表情、无奇幻部落元素
- [ ] 与 GROOBAS / XIAOXING / GENERIC-2 / GENERIC-3 种族 + 职能差异清晰
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/characters/A-CHR-GENERIC-1.png` 保存

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/characters/A-CHR-GENERIC-1__v1__flash.png`
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
