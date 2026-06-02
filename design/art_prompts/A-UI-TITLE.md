# A-UI-TITLE — 游戏标题画面（封面入口）

**类别**：UI 框（启动 splash 全屏背景）
**来源**：`design/art_asset_list.md` v1.1 §5.4 UI 框（新增）+ `design/concept.md` 核心情绪词
**引用场景**：游戏启动 splash 主画面，承载魔王城 LOGO + 副标题 + Start CTA 留位（CTA 按钮文本由代码叠加，不烧入图）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 1920×1080（06c post-process 自 Gemini 1024×1024 等比放大至 1080 高 + 左右补 `#B8B5A8` 边带至 1920） |
| 宽高比 | 16:9 |
| 背景要求 | 全屏铺底，不透明（保留 LOGO 与场景底色），非抠图素材 |
| 切图方式 | 单张全屏背景，不切片 |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-TITLE.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：deadpan office-comedy 入场、企业宣发海报式克制、一丝荒诞、温吞但有期待感
- 色盘偏重：主 1 莫兰迪雾灰米 `#B8B5A8`（全局底）+ 辅 2 米白 `#E8E2D5`（LOGO 高亮 / 副标题底）+ 辅 1 描边深炭灰 `#3D3A36`（魔王城 LOGO 主体描边 + 副标题字色块占位）+ 辅 4 黄铜金 `#D4A574`（LOGO 装饰条 / 副标题底栏点缀）+ 主 2 陶土橘 `#C97B5C`（Start CTA 留位提示色 / 圆角矩形占位）
- 特殊注意：
  - **主视觉锚点**：画面中上偏左 / 中央摆放**简化的魔王城外轮廓剪影**（一座 Q 版扁平塔楼，顶端两只小恶魔角 + 一个公司 LOGO 圆牌挂在塔身），明确传达「魔王城企业 = 上市公司」反差萌
  - 画面右下角预留 **Start CTA 占位区**（用陶土橘 #C97B5C 圆角矩形 + 浅描边表示，不画字符，约占画面 14% 宽 / 8% 高，距右/下边各 60~80px 安全区）
  - 顶部居中**副标题留白区**（横条米白底栏 + 黄铜金细线，仅留 LOREM IPSUM 占位横线，不画真实文字）
  - 整体构图克制留白，避免堆砌；不要"史诗奇幻封面"那种戏剧光效
  - 不要画 HR 总监 / 怪物 / 勇者立绘（这些用单独立绘叠加 UI，封面只出"魔王城 + 公司气质"）

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style, muted Morandi color palette dominated by foggy beige #B8B5A8, terracotta orange #C97B5C and dusty mint green #8FA89B, accent colors include charcoal outline #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes and minimalist geometric bodies, thick uniform 5px charcoal outline (never pure black), pure flat color fills with no gradients and no brush texture, hard-edged single-tone shadow blocks, soft even diffuse cool office lighting like ambient fluorescent daylight, plain neutral solid grey background for easy compositing, all monster characters wear corporate office attire (lanyards, suits, ties, briefcases, badges) blending dungeon fantasy with white-collar workplace humor, 2D front-facing portrait composition with generous negative space, inspired by Reigns: Her Majesty card art, Two Point Hospital character design, BoJack Horseman flat color animation and restrained Corporate Memphis illustration, consistent line weight and consistent flat shading across all assets, deadpan office-comedy mood, clean vector-like finish suitable for H5 WebGL game UI

a wide cinematic 16:9 game title splash screen for a workplace-comedy dungeon management game called "Dungeon HR", centered composition on a flat foggy-beige #B8B5A8 background, the main visual anchor is a simplified flat 2D silhouette of a Q-chibi corporate Demon Lord tower castle placed slightly left of center, the tower is drawn as stacked rounded rectangular floors in warm cream #E8E2D5 with charcoal #3D3A36 hand-drawn outlines, the tower top has two small low-key matte black devil horns and a tiny round company-logo badge hanging from the tower body on a brass-gold #D4A574 lanyard, the overall mood is deadpan corporate prospectus poster rather than epic fantasy castle, a slim warm cream #E8E2D5 horizontal banner across the upper-center area suggests a subtitle strip bordered by a thin brass-gold hairline, the banner contains only LOREM IPSUM placeholder horizontal bars implying subtitle text, never readable letters, the lower-right corner contains a compact terracotta-orange #C97B5C rounded rectangular call-to-action button placeholder with a 5px charcoal outline indicating a Start button slot, no readable text on the button, generous flat negative space across the rest of the canvas, no characters, no monsters, no heroes, no figures of any kind in the scene, ABSOLUTELY no chibi mascots flanking the tower, soft hard-edged single-tone shadow block beneath the tower base, clean vector-flat finish, deadpan corporate splash poster mood, plain neutral solid grey background outside the tower silhouette
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

epic fantasy castle, medieval stone fortress, ornate gothic spires, dark stormy sky, lightning, fire effects, magical glow, dragon flying, glowing runes, characters posing in front of castle, heroes, monsters, mascots flanking the tower, multiple figures, sidekicks, chibi creatures peeking from edges, large readable wordmark, "DUNGEON HR" text, sharp typography, calligraphy, neon signage, banner with full sentences, ornate baroque decoration, gilded filigree, glowing portal, gemstones embedded in tower
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》游戏主菜单标题画面（克制扁平 + 公司气质）
- 《Reigns: Her Majesty》启动 splash（极简剪影 + 大留白）
- 现代 IPO 招股说明书封面排版（A4 公文 + 黄铜金细边）

## 切图与落位建议

- **切图方式详解**：单张全屏背景，不切片；06c post-process 从 Gemini 1024×1024 等比放大至 1080 高 → 左右各补 `#B8B5A8` 边带至 1920，**不抠图**
- **边距要求**：顶部 ≥80px UI 安全区（留给后续叠加版本号 / 语言切换）；底部 ≥80px 留给 Start CTA 与版权字
- **资源导入建议**（Atoms）：
  - 命名：`A-UI-TITLE.png`
  - pivot / anchor：Center
  - 像素游戏类资产：否，使用 Bilinear 采样
  - atlas 打包：**否**（全屏背景独立加载，体积大）

## 回填验收 Checklist

- [ ] Gemini 出图符合正向 prompt：扁平 Q 版魔王城塔楼 + 顶端小恶魔角 + 公司 LOGO 圆牌 + 副标题留白栏 + 右下 CTA 占位
- [ ] 未出现反向 prompt 禁忌：无真实可读 LOGO 文字、无史诗奇幻城堡、无角色、无戏剧光效
- [ ] 尺寸落盘 1920×1080（post-process 后）
- [ ] 已按 atoms 落位路径 `atoms/assets/art/ui/A-UI-TITLE.png` 保存
- [ ] 副标题留白栏与 Start CTA 占位位置正确，叠加文字后视觉不冲突

## 审核结论（06d 逐轮追加，不覆盖历史）

### Flash#1 @ <时间戳>
- 模型：`gemini-2.5-flash-image`
- 文件：`atoms/assets/art/ui/A-UI-TITLE__v1__flash.png`
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
