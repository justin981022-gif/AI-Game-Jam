# A-ENE-ELITE — 精英勇者

**类别**：敌人
**来源**：`design/levels.md` v1.3 §L06 + `design/balance.md` v0.1.2 §4.2（HERO_ELITE：HP 140 / ATK 22 / CRIT 0.18，最终总突袭前夜 BOSS）
**引用场景**：L06 最终总突袭前夜（B1 入口走廊战斗界面右侧，BOSS 关）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 768×1024（06c post-process 自 Gemini 1024×1024 等比裁切下采样） |
| 宽高比 | 3:4 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张立绘，直接用；06c 后处理时纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-ELITE.png` |
| pivot 位置 | Bottom Center（脚底中点，与角色立绘统一对位） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：金牌业绩老练气场、行业老兵的威严、L06 BOSS 的最终关挑战感、身经百战的磨损战痕
- 色盘偏重：辅 1 描边深炭 `#3D3A36`（板甲主色 + 描边）+ 辅 4 黄铜金 `#D4A574`（板甲滚金边、金牌业绩奖牌、武器把柄）+ 辅 5 砖红警示 `#A85C5C`（披风内衬 / 羽饰 / 警示色重点）+ 辅 2 米白 `#E8E2D5`（内衬高光）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（背景）
- 特殊注意：
  - **装备最高等级**：深炭灰**板甲胸前一体甲 + 黄铜金滚边 + 砖红披风（披风内衬砖红警示色，外面深炭/雾灰）+ 头盔上一根简化羽饰**（不要复杂装饰，扁平几何感）；**大武器**（长柄战斧或加长版长剑，单手或斜挎背后均可）
  - **必须有"此前数关磨损战痕"**：板甲表面有几处简化磨损凹痕（同色相暗 1 档硬边色块）、披风边缘有几处缺口、护肩有一道刮痕 —— 表达"已经打穿前几关"的厚重感（**绝不画血污**）
  - **职场视角反差萌道具**：胸前**金牌业绩奖牌**（圆形勋章，黄铜金 + 砖红丝带，正中刻一个简化"#1"或勾选符号），暗讽"金牌冒险者 = 公司年度业绩王"；腰带挂**精装版业绩档案夹**
  - 表情：威严老练，眼神冷静锋利但**不邪恶不暴怒**，嘴抿成一字线略微下压 —— 是一个见过太多的资深员工，而非反派魔王
  - 姿态：双脚分立稳重站姿、武器单手扶地或斜立、披风自然下垂；不要张扬战斗姿势

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of an elite veteran adventurer (Hero ELITE) as the L06 boss tier, a chibi 2.5-head proportion seasoned human character standing facing forward in a calm grounded commanding stance with feet planted apart, wearing a charcoal-grey #3D3A36 stylized flat plate-armor cuirass with brass-gold #D4A574 trim along the edges and pauldrons, a brick-red warning #A85C5C cape draped behind with the inner lining showing the same brick-red and the outer side a darker charcoal-grey, a simple geometric flat feather plume on the helmet rim as a subtle ornament, holding a long polearm or extended formal greatsword resting tip-down beside the right foot with a brass-gold wrapped grip, a few simplified hard-edged battle scuffs and dents on the armor surface rendered as same-hue one-shade-darker flat color blocks plus small notches on the cape edge and a single scratch line across the pauldron showing wear from previous quests but absolutely no blood and no realistic damage, a circular brass-gold #D4A574 top-performer achievement medallion with a brick-red ribbon pinned on the chest stamped with a tiny check-mark or hash-one symbol as a deadpan corporate award-of-the-year gag, a leather-bound premium performance dossier folder clipped at the left hip with brass-gold trim, oversized round eyes calm sharp and weary-veteran without any malice or rage, mouth a tight slightly downward composed straight line of someone who has seen everything, expression authoritative and seasoned like a senior industry veteran rather than an evil villain, posture stable and weighty without any aggressive combat lunge, centered composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, hard-edged tiny shadow ellipse beneath the feet, no other props or scenery, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, blood, decapitation, dark horror style, realistic violence, anime hero shounen pose, blood splatter on armor, gaping wounds, broken bones, evil demon villain, glowing red eyes, menacing villain grin, sharp fangs, oversized ornate magical greatsword with glow effects, flaming weapon, magical aura, fire effects, lightning around weapon, photorealistic metallic reflection on plate armor, baroque ornate engraving overload, dramatic flowing wind cape with motion blur, muscular adult bodybuilder physique, action combat lunge, war scream open mouth, dungeon stone wall background, war banner army background, multiple soldiers behind, second figure, smug villain smirk, dark fantasy lord vibe
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》资深部门经理的"威严但仍 Q 版"造型
- 《Reigns: Her Majesty》纯灰底单卡王座/将领角色构图
- BoJack Horseman 中"行业老兵高管"的扁平莫兰迪塑造

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024（披风可能横向略宽，构图需收紧主体居中）；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方至少 80px（羽饰不可贴边）、下方至少 60px、左右各至少 100px 透明安全区（披风可能略外溢，左右压在 80px 内可接受）
- **资源导入建议**（Atoms）：
  - 命名：`A-ENE-ELITE.png`
  - pivot / anchor：Bottom Center（脚底中点）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与其他 `A-ENE-*` 共打 `enemies_atlas`（ELITE 体积稍大但仍在 768×1024 范围内）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：板甲 + 黄铜金边 + 砖红披风 + 羽饰 + 大武器 + 金牌业绩奖牌 + 板甲磨损战痕（无血）+ 老练威严表情
- [ ] 未出现反向 prompt 禁忌：无血污、无邪恶反派造型、无写实金属反光、无奇幻发光武器、无暴怒姿态
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/enemies/A-ENE-ELITE.png` 保存
- [ ] 资源导入设置：Bilinear 采样、Bottom Center pivot、可进 enemies_atlas
- [ ] 在 L06 战斗界面实际显示正常：与 W04 并排可见"披风+板甲+羽饰+磨损"的最终 BOSS 威慑感，与 W01 并排可见五张梯度的完整递进

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/enemies/A-ENE-ELITE__v1__flash.png`
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

### aiart-R1 @ 2026-05-27
- 模型：aiart 默认 artSpec
- 文件：atoms/assets/art/enemies/A-ENE-ELITE.png
- 结论：🟡（Confidence：中）
- 评分：
  - 风格一致性：🟢 — 莫兰迪扁平、粗描边一致；披风砖红命中辅 5。
  - 主体正确：🟡 — 板甲（深炭灰）+ 头盔 + 砖红披风 + 长直剑 + 金牌业绩奖牌（圆形勋章带砖红丝带）齐全，威严感最强；但盔顶羽饰被简化为羽毛箭一根（OK），业绩档案夹未明显出现，磨损战痕也较弱，影响"老兵"沧桑度。
  - 构图尺寸：🟢 — 居中、披风未严重外溢、剑尖未贴底边。
  - 无禁忌元素：🟢 — 无血污、无发光武器、无暴怒/邪恶眼神，符合"老练而非反派"基调。
  - 可用性：🟢 — 主体清晰，边缘干净，抠图友好。
- 修正建议：
  > 在特有描述段补强两处："add 3-4 simplified hard-edged battle-scuff notches on the cuirass and pauldron rendered as same-hue one-shade-darker flat blocks (no blood, no rust)"，以及 "a leather-bound brass-gold trimmed performance dossier folder clearly visible clipped at the LEFT hip beside the cape"，让磨损与档案夹更明确。
