# A-CHR-HR — HR 总监（玩家）

**类别**：角色立绘
**来源**：`design/narrative.md` v1.3 §角色表 #1（玩家·HR 总监）
**引用场景**：全程（T01 入职/P02 招募/绩效考评/E01·E04 结局私信等）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 768×1024（06c post-process 自 Gemini 1024×1024 等比裁切下采样） |
| 宽高比 | 3:4 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张立绘，直接用；06c 后处理时纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/characters/A-CHR-HR.png` |
| pivot 位置 | Bottom Center（立绘脚底中线，便于战斗界面与对话槽位对位） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：疲惫但努力专业、deadpan 社畜式克制、一丝倦怠的暖意
- 色盘偏重：主 2 陶土橘 `#C97B5C`（领带或西装内衬，作为主角情绪锚点）+ 辅 1 描边深炭 `#3D3A36`（西装外套主色）+ 辅 2 米白 `#E8E2D5`（衬衫）+ 辅 4 黄铜金 `#D4A574`（工牌挂绳/扣件）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（纯灰底）
- 特殊注意：
  - 「白领西装 + 小恶魔角」的反差萌锚点 — 头顶**两只小巧低调的恶魔角**（与 art_style_guide 正向前缀提到的 chibi devil-horn 公司 logo 呼应），不能画成奇幻反派恶魔
  - 工牌**歪戴**（narrative 角色表关键词），细节体现"今天没有人辞职就算胜利"的疲惫感
  - 神情**疲惫但努力维持职业微笑**，眼下淡淡阴影，眼袋为同色相暗 1 档色块（不渐变）
  - 不画武器、不画战斗装备、不画奇幻铠甲

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of the Dungeon HR Director (player character), a chibi 2.5-head proportion adult white-collar worker standing facing forward in a tired but professional neutral pose, wearing a charcoal-grey #3D3A36 office suit jacket over a warm cream #E8E2D5 collared shirt with a terracotta-orange #C97B5C necktie slightly loosened, two small low-key matte black devil horns poking out from the top of a tidy short hairstyle as a subtle dungeon-meets-office reversal gag, an ID badge on a brass-gold #D4A574 lanyard worn slightly crooked off-center on the chest, holding a closed manila folder of resumes in one hand and a paper coffee cup with a tiny soul-shard motif in the other, posture slightly slumped with shoulders gently drooping, faint matching-tone shadow blocks under the eyes hinting at fatigue while the mouth maintains a small forced professional smile, oversized round eyes with a deadpan exhausted glint, centered composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, hard-edged tiny shadow ellipse beneath the feet, no other props or scenery, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

weapons, sword, axe, staff, dagger, gun, fantasy warrior outfit, plate armor, chainmail, shoulder pauldrons, battle gear, gore, blood splatter, evil demon villain, oversized menacing horns, glowing red eyes, monstrous fangs, muscular hero physique, half-naked, action pose, crouching combat stance, magical aura, fire effects, dungeon stone wall background, multiple characters, sidekick, NPC behind, second figure
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》接待员/经理角色卡（Q 版职场西装 + 工牌挂绳）
- BoJack Horseman 中 Princess Carolyn 的扁平莫兰迪西装造型
- 《Reigns: Her Majesty》臣子卡牌的纯灰底单人剪影构图

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024（裁掉左右各约 128px 多余留白边带，保留主体居中）；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方至少 80px、下方至少 60px、左右各至少 100px 透明安全区，避免战斗界面槽位贴边
- **资源导入建议**（Atoms）：
  - 命名：`A-CHR-HR.png`（与目录约定一致）
  - pivot / anchor：Bottom Center（立绘脚底中点，方便对话槽与战斗界面对位）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与其他 `A-CHR-*` 角色立绘可共打 `characters_atlas`（768×1024 ×3 张，单张 ≤ 1MB）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：HR 西装 + 小恶魔角反差 + 工牌歪戴 + 疲惫职业微笑
- [ ] 未出现反向 prompt 禁忌：无武器、无奇幻铠甲、无血腥、无邪恶反派表现
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/characters/A-CHR-HR.png` 保存
- [ ] 资源导入设置：Bilinear 采样、Bottom Center pivot、可进 characters_atlas
- [ ] 在 T01/P02/E01 实际显示正常：色调与 art_style_guide 主色盘一致、留白足够 UI 叠加

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/characters/A-CHR-HR__v1__flash.png`
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
