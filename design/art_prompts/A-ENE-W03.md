# A-ENE-W03 — 初级勇者+

**类别**：敌人
**来源**：`design/levels.md` v1.3 §L04 + `design/balance.md` v0.1.2 §4.2（HERO_W03：HP 70 / ATK 13 / CRIT 0.04，谈薪关）
**引用场景**：L04 怪物谈薪（B1 入口走廊战斗界面右侧）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 768×1024（06c post-process 自 Gemini 1024×1024 等比裁切下采样） |
| 宽高比 | 3:4 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张立绘，直接用；06c 后处理时纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-W03.png` |
| pivot 位置 | Bottom Center（脚底中点，与角色立绘统一对位） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：开始独当一面的二级员工、有点经验主义的小油气、对绩效充满期待
- 色盘偏重：主 3 灰薄荷绿 `#8FA89B`（强化版皮甲，带肩部小护肩）+ 辅 3 雾紫 `#7A6E8A`（小护身符）+ 辅 2 米白 `#E8E2D5`（衬衣）+ 辅 1 描边深炭 `#3D3A36`（描边+主剑鞘）+ 辅 4 黄铜金 `#D4A574`（业绩本金边、小铆钉）
- 特殊注意：
  - **装备明显升级**：灰薄荷皮甲 **+ 小金属护肩铆钉 + 皮带武装带 + 主短剑 + 副匕首**（腰后或大腿外侧第二把武器）
  - **小护身符挂胸前**：一个雾紫色简化几何护身符（祖传 / 工会发的小奖状徽章），暗示开始迷信"绩效玄学"
  - **职场视角反差萌道具**：腰间挂一本"业绩记录本"（黄铜金边小账册，封面有勾选符号），暗讽冒险者把每次击杀当 KPI 记录
  - 表情：自信成熟一档，眼神带一点点"老油条"小狡黠，但**仍非反派**；嘴角放松，像知道流程的二级员工
  - 姿态：一手按主剑柄一手叉腰或扶副匕首，站姿带一点"我已经做过几单了"的小气场

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of a senior junior adventurer (Hero W03), a chibi 2.5-head proportion human character standing facing forward in a self-assured semi-experienced pose with one hand resting on the main sword hilt and the other tucked at the waist near a secondary dagger, wearing a reinforced dusty mint green #8FA89B leather chest armor with small charcoal-grey #3D3A36 metal-rivet shoulder caps, a warm cream #E8E2D5 long-sleeved undershirt visible at the cuffs and collar, plain foggy-beige #B8B5A8 trousers, a leather utility belt across the hip carrying a primary short sword in a dark sheath plus a small backup dagger sheathed behind, a simplified geometric dusty purple #7A6E8A guild-issued protective amulet hanging on a thin cord on the chest like a slightly superstitious good-luck charm, a small brass-gold #D4A574 trimmed performance log book clipped at the side of the belt with a tiny visible checkmark on its cover as a deadpan KPI ledger gag, oversized round eyes showing maturing confidence with a faint mildly seasoned glint that is sly but never villainous, mouth relaxed in a small composed smile of someone who has closed a few quests already, posture grounded with a touch of low-key swagger, completely workplace mid-junior-employee feel rather than a heroic fantasy stance, centered composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, hard-edged tiny shadow ellipse beneath the feet, no other props or scenery, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, blood, decapitation, dark horror style, realistic violence, anime hero shounen pose, full plate armor, heavy chainmail, full metal helmet, ornate fantasy hero outfit, glowing magical sword, oversized broadsword, two-handed greatsword, evil grin, menacing villain glare, muscular adult body, action combat stance, dramatic running pose, magical aura, fire effects, blood splatter on weapon, large flowing cape, demonic talisman with skulls, smug villain smirk, dungeon background, second figure
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》二级正式员工的"开始独当一面"造型
- 《Reigns: Her Majesty》纯灰底单卡角色构图
- BoJack Horseman 中"略带油气的中层小员工"的扁平莫兰迪塑造

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方至少 80px、下方至少 60px、左右各至少 100px 透明安全区（因副武器横向略宽，构图需收紧）
- **资源导入建议**（Atoms）：
  - 命名：`A-ENE-W03.png`
  - pivot / anchor：Bottom Center（脚底中点）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与其他 `A-ENE-*` 共打 `enemies_atlas`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：强化皮甲 + 铆钉护肩 + 主短剑 + 副匕首 + 雾紫小护身符 + 业绩本
- [ ] 未出现反向 prompt 禁忌：无重型板甲、无奇幻反派造型、无血腥、无 anime 热血姿态
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/enemies/A-ENE-W03.png` 保存
- [ ] 资源导入设置：Bilinear 采样、Bottom Center pivot、可进 enemies_atlas
- [ ] 在 L04 战斗界面实际显示正常：与 W02 并排可见"开始挂副武器与小道具"的递进感

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/enemies/A-ENE-W03__v1__flash.png`
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
