# A-ENE-W02 — 初级勇者

**类别**：敌人
**来源**：`design/levels.md` v1.3 §L03 + `design/balance.md` v0.1.2 §4.2（HERO_W02：HP 55 / ATK 11 / CRIT 0.02，第一次阵亡关）
**引用场景**：L03 第一次阵亡（B1 入口走廊战斗界面右侧）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 768×1024（06c post-process 自 Gemini 1024×1024 等比裁切下采样） |
| 宽高比 | 3:4 |
| 背景要求 | 纯灰中性底（莫兰迪雾灰 `#B8B5A8`），便于 06c color-to-alpha 抠图复用 |
| 切图方式 | 单张立绘，直接用；06c 后处理时纯灰底转 alpha |
| atoms 落位路径 | `atoms/assets/art/enemies/A-ENE-W02.png` |
| pivot 位置 | Bottom Center（脚底中点，与角色立绘统一对位） |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：青涩但开始有自信、刚转正的实习生气场、还差点火候的小骄傲
- 色盘偏重：主 3 灰薄荷绿 `#8FA89B`（皮甲外披）+ 辅 2 米白 `#E8E2D5`（衬衣）+ 主 1 莫兰迪雾灰米 `#B8B5A8`（裤子+背景）+ 辅 1 描边深炭 `#3D3A36`（描边+短剑剑鞘）+ 辅 4 黄铜金 `#D4A574`（实习证转正卡边框）
- 特殊注意：
  - **装备升级到入门级**：灰薄荷色简易皮甲背心 + 米白长袖衬衣（领口有小翻领）+ 短剑（普通直剑，不长不夸张）佩在腰侧；不要重甲
  - **职场视角反差萌道具**：胸前别着一张刚换发的"正式员工证"（带黄铜金边框，narrative 暗讽"实习转正"），腰带挂一个小小笔记夹
  - 表情：眼神比 W01 自信，嘴角微微上扬有一点小骄傲，但仍有青涩感（脸还没完全长开），不要油腻不要张扬
  - 姿态：站姿端正了一些，一手按剑柄一手自然下垂，像刚上手不久但已经能独立完成任务的初级员工

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

full body portrait of a junior adventurer (Hero W02), a chibi 2.5-head proportion young human standing facing forward in a slightly more confident upright pose than a beginner, wearing a simple dusty mint green #8FA89B leather vest layered over a warm cream #E8E2D5 long-sleeved shirt with a small folded collar, plain foggy-beige #B8B5A8 cloth trousers, a basic short straight-blade sword sheathed at the left hip in a charcoal leather scabbard with one hand resting lightly on the pommel, the other hand hanging naturally at the side, a freshly issued formal employee ID card with a small brass-gold #D4A574 framed border pinned to the chest as a tongue-in-cheek probation-to-fulltime promotion gag, a tiny notepad clip hooked on the belt, oversized round eyes showing modest growing self-confidence, mouth corners faintly turned up in a small reserved proud smile but still with a hint of youthful greenness, posture upright and tidy without any swagger, completely earnest junior-employee workplace vibe rather than a fantasy hero pose, centered composition, clean isolated character on a flat neutral Morandi foggy-beige #B8B5A8 background, ample empty space around subject for easy cutout, hard-edged tiny shadow ellipse beneath the feet, no other props or scenery, deadpan corporate-comedy mood, clean vector-flat finish
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

gore, blood, decapitation, dark horror style, realistic violence, anime hero shounen pose, plate armor, chainmail, full metal helmet, ornate fantasy hero outfit, glowing magical sword, oversized broadsword, two-handed greatsword, evil grin, menacing villain glare, muscular adult body, action combat stance, dramatic running pose, magical aura, fire effects, blood splatter on weapon, cape, shoulder pauldrons, smug villain smirk, dungeon background, second figure
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》初级正式员工的扁平正装造型
- 《Reigns: Her Majesty》纯灰底单卡角色构图
- BoJack Horseman 中"刚转正小白领"的低饱和扁平塑造

## 切图与落位建议

- **切图方式详解**：单张直接用，不切片；06c post-process 从 Gemini 1024×1024 等比裁切到 768×1024（左右各约 128px 留白带）；纯灰 `#B8B5A8` 底走 color-to-alpha
- **边距要求**：主体上方至少 80px、下方至少 60px、左右各至少 100px 透明安全区
- **资源导入建议**（Atoms）：
  - 命名：`A-ENE-W02.png`（与目录约定一致）
  - pivot / anchor：Bottom Center（脚底中点）
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：与其他 `A-ENE-*` 共打 `enemies_atlas`

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：薄荷皮甲背心 + 米白衬衣 + 短剑 + 转正员工证 + 青涩自信表情
- [ ] 未出现反向 prompt 禁忌：无重甲、无 anime 热血、无邪恶反派、无血腥
- [ ] 尺寸落盘 768×1024（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/enemies/A-ENE-W02.png` 保存
- [ ] 资源导入设置：Bilinear 采样、Bottom Center pivot、可进 enemies_atlas
- [ ] 在 L03 战斗界面实际显示正常：与 W01 并排可见"装备开始系统化"的递进感

## 审核结论（06d 逐轮追加，不覆盖历史）

> 每一轮 06c 出图后由 06d 回写。保留所有历史轮次，便于 🟠 人工决策时 A/B 对比。

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/enemies/A-ENE-W02__v1__flash.png`
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
