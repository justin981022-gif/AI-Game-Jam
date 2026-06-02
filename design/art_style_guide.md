# 美术风格规范 — 地下城打工人 (Dungeon HR)

**日期**：2026-05-19
**负责人**：美术风格规范师（AI subagent）
**上游依赖**：`design/concept.md`（核心情绪词：黑色幽默 / 职场荒诞 / 治愈反差萌）
**版本**：v1.0（首版草稿，待 Producer / 主策划确认）

---

## 风格一句话

> **莫兰迪低饱和扁平企业风 2D 插画 —— 大头圆眼怪物穿着西装打领带，粗描边、纯灰背景、冷光均匀打光，像一份"魔王城内部 HR 培训手册"里的卡通插图。**

## 风格参考锚点

| 参考源 | 借鉴维度 |
|-------|---------|
| 《Reigns: Her Majesty》（卡牌叙事游戏） | 极简扁平剪影 + 粗描边 + 单一纯色背景的"卡片化"角色构图 |
| 《Two Point Hospital》（双点医院） | 职场题材 Q 版人物比例、办公室场景中的荒诞反差萌、UI 公文体语感 |
| 动画《马男波杰克 (BoJack Horseman)》 | 莫兰迪低饱和大色块 + 平涂 + 角色穿西装的"人模狗样"职场荒诞气质 |
| Adobe Illustrator 现代企业插画风（Corporate Memphis 之克制版） | 几何化的扁平人物造型、统一描边权重、商务场景图标化语言 |

## 主色盘

> 主色盘组成画面 80% 色彩。以"莫兰迪雾灰 + 暖陶土 + 灰薄荷"三角配色构建"职场温吞 + 一丝压抑 + 偶尔回血"的视觉情绪。

| 色号 | HEX | 情绪注解 | 使用场景 |
|------|-----|---------|---------|
| 主 1 | `#B8B5A8` | 莫兰迪雾灰米 — 中性、冷静、企业感、像一份没什么生气的会议室墙面 | 全局背景默认色（纯灰抠图底）、UI 面板底色、文档纸张色 |
| 主 2 | `#C97B5C` | 陶土橘 — 暖中带钝，"打工人脸上勉强挤出的笑"，是全画面的情绪锚点 | 主角 HR 总监主体配色、关键 CTA 按钮、CEO 邮件印章红 |
| 主 3 | `#8FA89B` | 灰薄荷绿 — 微凉的薄荷，象征"灵魂碎片"经济资源与治愈感 | 灵魂碎片图标、HP 增益、奖金特效、格鲁巴斯·史莱姆主体色 |

## 辅色盘

| 色号 | HEX | 用途 |
|------|-----|------|
| 辅 1 | `#3D3A36` | 描边深炭灰（替代纯黑） — 所有角色与 UI 描边、正文字体 |
| 辅 2 | `#E8E2D5` | 米白 — 纸面高光、UI 高亮、文档/简历底色 |
| 辅 3 | `#7A6E8A` | 雾紫 — 宵星·骷髅法师法师袍主色、夜晚/魔法系勇者点缀 |
| 辅 4 | `#D4A574` | 黄铜金 — 工牌挂绳/财报金额/魔王 CEO 巨角金属感、E01 敲钟结局点缀 |
| 辅 5 | `#A85C5C` | 砖红警示 — 突发卡片倒计时、绩效不达标提示、E04 离职仲裁结局氛围 |

## 视觉档位

| 维度 | 档位 | 描述 |
|------|------|------|
| 饱和度 | **低** | 全局莫兰迪基调，最饱和的陶土橘也压在 50% 饱和以下 |
| 对比度 | **中等** | 描边与平涂提供形体对比，但不靠强光暗营造戏剧性 |
| 明度基调 | **中灰偏明亮** | 整体偏明亮（适合 H5 长时间观看不累眼），主背景明度 70~75 |
| 线条 | **粗描边** | 统一 4~6px 等宽描边（基于 1080p 画布），描边色 `#3D3A36`，不使用纯黑 |
| 质感 | **扁平** | 纯平涂为主，仅在金属/玻璃质感处使用 1~2 层硬边色块模拟高光，禁用渐变与笔刷纹理 |

## 构图语言

- **镜头距离**：以**中景半身**为主（角色卡、简历、CEO 邮件配图）；**全身正面站姿**用于必出角色定妆照；**特写大头**用于战斗文字旁的反应表情贴
- **视角**：2D 正面平视为主，无透视；UI 文档采用平面排版（无伪 3D 倾斜）
- **比例**：Q 版**2.5~3 头身**，大头圆眼，手脚简化为圆角几何；史莱姆/骷髅等异形角色仍保留"大圆眼+小四肢"统一辨识度
- **留白习惯**：**大量留白**，纯灰背景占角色周围至少 30% 安全区，便于 Unity 端抠图与 UI 排版叠加

## 光照语言

- **主光源类型**：**均匀漫反射冷光**（办公室日光灯隐喻），无明确方向光，避免戏剧性侧光
- **阴影处理**：**硬边色块阴影**，采用比本体色暗 1 档的同色相平涂（不羽化、不渐变）；阴影投影方向统一为正下方 5~10° 椭圆
- **氛围词**：**清透 / 温吞 / 一丝倦怠 / 偶有黑色幽默的冷峻**

## 禁忌元素

> 明确不要出现的视觉元素，反向 prompt 必须覆盖。

- **不要**血腥、伤口、骨折、断肢、红色血浆等真实暴力元素（即使是"勇者击杀怪物"也以晕字符号 / 公文体"已离职"印章替代）
- **不要**传统奇幻怪物形象（兽人尖牙、巨型獠牙、肌肉怪、半裸蛮族），所有怪物必须有"职场感"配饰（工牌 / 西装 / 领带 / 公文包 / 文件夹至少其一）
- **不要**高饱和霓虹色、赛博朋克紫粉、像素风、水彩晕染、油画笔触、蜡笔涂鸦感、3D 渲染、写实人像、日式动漫大眼睛高光（非莫兰迪扁平企业风的任何风格污染）
- **不要**复杂背景（城堡石墙、火把、地下城阴影），背景一律纯灰 `#B8B5A8` 或米白 `#E8E2D5`，便于抠图复用
- **不要**现代真实科技品牌元素（iPhone、特斯拉、可口可乐 logo），所有"现代物件"需做卡通化处理（笔记本 → 羊皮卷形手账，咖啡 → 灵魂碎片马克杯）

## Gemini 提示词前缀（可复用片段）

> 所有资产提示词的共用前缀。下游六·B 资产提示词工程师每个 prompt 必须以此开头。

### 正向 prompt 前缀

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI
```

### 反向 prompt 前缀

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW
```

## 与下游阶段的交接约定

- **给 6·B 资产提示词工程师**：每个具体资产 prompt 必须以上方"正向 prompt 前缀"开头，再追加该资产的特有描述（如"HR 总监 半身像 手持简历夹"）；反向前缀直接复用
- **给 Unity 开发**：主辅色盘 8 个 HEX 配置到全局 `ColorPalette` ScriptableObject（命名建议 `DungeonHR_Palette`），UI/场景统一引用
- **给 Playtest**：Playtest 报告的"美术观感"一节以本文档为对照基准，重点核查"莫兰迪低饱和"是否被 Gemini 跑偏

## 角色 canonical 外观（cross-prompt 锚点，2026-06-02 v1.0.1 追加）

> 同一角色在多张 prompt 中**必须用同一句完整描述**，避免 aiart 脑补出现风格漂移。资产提示词工程师写 CHR / END 类时必须复制粘贴。

### 魔王 CEO（5 件套必锁）

```
the chibi Demon CEO (taller silhouette in chibi 2.5-head proportion, massive curved brass-gold #D4A574 demon horns sweeping back from forehead, charcoal #3D3A36 sharp-tailored business suit with crisp white collar and terracotta-orange #C97B5C silk necktie, wearing matte black aviator sunglasses covering eyes, holding a rolled blank financial report scroll in one hand)
```

- 5 件套：巨角(黄铜金) / 深色西装 / 陶土橘领带 / 矿黑墨镜 / 财报卷
- 引用资产：A-END-E01 / A-END-E02（其它结局无 CEO；CARD-EVENT 等 UI 类不出 CEO 立绘，仅用 A-UI-MAIL-CEO + A-EMOTE-CEO-STAMP 替代）
- 入选原因：v1.0 round 3 E01/E02 v2 出图时仅描述"taller silhouette + brass-gold horns + dark suit"，与 narrative §角色表 #2 的「巨角、西装革履、手持财报、墨镜」差距过大，造成两张 ending 中 CEO 风格不统一

### HR 总监（已锁定，参考 E01/E02 现有 prompt 中"chibi female HR Director player character (...)"段落）

引用资产：A-CHR-HR / A-END-E01 / A-END-E02。该角色在 v1.0 round 3 已修订为女性 chibi，描述已稳定，不再列举完整句于此（以 `A-CHR-HR.md` 为基准）。

## 自检清单（9 项）

- [x] 色盘 HEX 齐全（主 3 + 辅 5，共 8 个 HEX）
- [x] 参考锚点具体到游戏/动画/插画风格名称（4 个，含借鉴维度）
- [x] 正向前缀能独立使用（去掉资产描述也可生成风格代表图）
- [x] 反向前缀已覆盖全部禁忌元素（血腥 / 传统奇幻 / 现代科技 / 复杂背景 / 风格污染）
- [x] 与主策划情绪词（黑色幽默 + 职场荒诞 + 治愈反差萌）匹配
- [x] 必出角色约束已吸收（HR 总监 / 魔王 CEO / 格鲁巴斯 / 宵星）
- [x] UI 公文体语感已在锚点（Two Point Hospital）与正向前缀（"H5 WebGL game UI"）中体现
- [x] H5/WebGL/2GB/单月工期边界已通过"扁平 + 纯色背景 + 矢量化"风格锁死，便于复用与抠图
- [x] 不产出具体资产提示词（仅前缀，资产描述留给 6·B）
