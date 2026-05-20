# A-ENE-W04 — 中级勇者

**类别**：敌人
**来源**：`design/levels.md` v1.3 §L05 + `design/balance.md` v0.1.2 §4.2（HERO_W04：HP 95 / ATK 16 / CRIT 0.08，IPO 中期警告关）
**引用场景**：L05 IPO 中期警告（B1 入口走廊战斗界面右侧）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 768×1024（06c post-process 自 Gemini 1024×1024 等比裁切下采样） |
| 宽高比 | 3:4 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张立绘，直接用；06c 后处理时纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-W04.png` |
| pivot 位置 | Bottom Center（脚底中点，与角色立绘统一对位） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：成熟专业的中层骨干、像有小队带过任务、严肃但不冷酷、专业主义
- 色盘偏重：辅 1 描边深炭 `#3D3A36`（链甲主色 + 描边）+ 主 3 灰薄荷绿 `#8FA89B`（队臂章）+ 辅 4 黄铜金 `#D4A574`（链环高光、长剑剑柄、扣件）+ 辅 2 米白 `#E8E2D5`（内衬）+ 辅 5 砖红警示 `#A85C5C`（小队臂章警示色点缀，提升威胁感）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（背景+裤）
- 特殊注意：
  - **装备升到中级**：灰深炭色**链甲背心 + 米白内衬**（链环用同色相暗一档色块表现，不要写实金属反光）+ 灰薄荷小队袖标（左臂袖章带砖红警示色边框，写"班长/小队长"暗示）+ **长直剑**（比 W03 主剑更长更正式）+ 腰侧小盾（圆形小铁盾，黄铜金边）
  - **职场视角反差萌道具**：腰间挂一个 **打卡机/出勤机（chibi 卡通考勤打卡器）** —— 设计为黄铜金外壳带小齿轮，暗讽"上班先打卡"
  - 表情：严肃专业、嘴抿一字线、眉毛微皱（像在读 KPI 表），眼神锐利但**不凶恶**，气质像专业项目经理
  - 姿态：双脚并立军姿、长剑直立按地或竖持，左手按盾或扶腰带，整体"训练有素"

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of a mid-tier adventurer (Hero W04), a chibi 2.5-head proportion human character standing facing forward in a disciplined trained-soldier upright stance with feet together, wearing a charcoal-grey #3D3A36 sleeveless chainmail vest stylized as flat repeating ring pattern with simple hard-edged single-tone shadow blocks for depth (no realistic metallic reflection), a warm cream #E8E2D5 long-sleeved underlayer visible at neck and cuffs, plain foggy-beige #B8B5A8 trousers tucked into low boots, a long straight formal sword held vertically in the right hand with the tip resting beside the foot and a brass-gold #D4A574 wrapped pommel, a small round buckler shield with brass-gold trim hanging at the left hip, a dusty mint green #8FA89B squad armband on the upper left arm framed by a thin brick-red #A85C5C warning border indicating squad-leader status as a tongue-in-cheek workplace seniority gag, a chibi cartoon brass-gold attendance time-clock punch device with tiny visible gears clipped to the belt as a deadpan office-clock-in pun, oversized round eyes calm sharp and professional, brows slightly furrowed as if mentally reviewing a KPI sheet, mouth a flat composed straight line, expression strict but not cruel evoking a seasoned project-manager vibe, posture grounded and trained without any threatening menace, centered composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, hard-edged tiny shadow ellipse beneath the feet, no other props or scenery, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, blood, decapitation, dark horror style, realistic violence, anime hero shounen pose, full plate armor with ornate engravings, oversized broadsword, two-handed greatsword, evil grin, menacing villain glare, glowing red eyes, muscular adult body builder, action combat stance, dramatic running pose, magical aura, fire effects, blood splatter on weapon, realistic metal reflection, photorealistic chainmail, dramatic war banner, large flowing battle cape, demonic insignia, smug villain smirk, dungeon stone wall background, second figure, multiple soldiers
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》中级骨干员工的"严肃但 Q 版"造型
- 《Reigns: Her Majesty》纯灰底单卡角色构图
- BoJack Horseman 中"中层管理者"的低饱和扁平塑造

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方至少 80px（长剑顶端不可贴边）、下方至少 60px、左右各至少 100px 透明安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-ENE-W04.png`
  - pivot / anchor：Bottom Center（脚底中点）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与其他 `A-ENE-*` 共打 `enemies_atlas`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：链甲背心 + 长直剑 + 小圆盾 + 小队袖章（砖红边）+ 打卡机道具 + 严肃专业表情
- [ ] 未出现反向 prompt 禁忌：无写实金属反光、无重型板甲、无邪恶反派表现、无血腥
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/enemies/A-ENE-W04.png` 保存
- [ ] 资源导入设置：Bilinear 采样、Bottom Center pivot、可进 enemies_atlas
- [ ] 在 L05 战斗界面实际显示正常：与 W03 并排可见"装备体系成熟 + 砖红警示色出现"的威胁度递进

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/enemies/A-ENE-W04__v1__flash.png`
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
