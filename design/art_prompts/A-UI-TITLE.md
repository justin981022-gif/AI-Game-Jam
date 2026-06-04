# A-UI-TITLE — 游戏标题画面（封面入口）

**类别**：UI 框（启动 splash 全屏背景）
**来源**：`design/art_asset_list.md` v1.1 §5.4 UI 框（新增）+ `design/concept.md` 核心情绪词
**引用场景**：游戏启动 splash 主画面，承载魔王城 LOGO + 副标题 + Start CTA 留位（CTA 按钮文本由代码叠加，不烧入图）

---

## 元数据

| 字段 | 值 |
|------|----|
| 尺寸目标 | 1920×1080（R6 起：aiart 1024×1024 → sharp resize 1080×1080 → extend 左右各 420px，**padding 颜色由 4 角色调采样中位数计算**，不再硬填 `#B8B5A8`，根除 R3 接缝；不 cover-crop 保留全部内容） |
| 宽高比 | 16:9 |
| 背景要求 | 全屏铺底，不透明（保留 LOGO 与场景底色），非抠图素材 |
| 切图方式 | 单张全屏背景，不切片 |
| atoms 落位路径 | `atoms/assets/art/ui/A-UI-TITLE.png` |
| pivot 位置 | Center |

## 风格锚点（继承自 art_style_guide v1.0）

- 情绪词：deadpan office-comedy 入场、企业宣发海报式克制、一丝荒诞、温吞但有期待感
- 色盘偏重：主 1 莫兰迪雾灰米 `#B8B5A8`（全局底）+ 辅 2 米白 `#E8E2D5`（副标题底栏 / HR 衬衫）+ 辅 1 描边深炭灰 `#3D3A36`（CEO 西装 / 通用描边）+ 辅 4 黄铜金 `#D4A574`（CEO 巨角 / 副标题底栏点缀 / 工牌挂绳）+ 主 2 陶土橘 `#C97B5C`（领带 / Start CTA 圆角矩形占位）+ 辅 3 雾薄荷绿 `#8FA89B`（员工怪物办公装）
- 特殊注意（R6 起，废弃 R5 双人欺负方案，改单 HR 忙碌 + 明确 UI 留白位）：
  - **唯一角色**：HR 总监单人 chibi 忙碌桥段（玩家代入），手忙脚乱处理怪物简历堆 / 飞舞的 paperwork / 头顶 sweat drop / 强撑 deadpan 微笑，画风**严格按 A-CHR-HR.md 现有 canonical**（疲劳眼底色块 + 强撑职业微笑 + 工牌歪戴 + 米西装 + 陶土橘领带松垮）
  - **构图分区**（明确给 atoms 留位）：HR 仅占画面**左侧 1/3**；中间 + 右侧大片留白纯背景给代码层叠加内容；顶部跨画面横条留 banner 位（在 1024 原图 y=22-33%，cover-crop 后 ≈ 1920×1080 的顶部 12%）；右下方留 Start 钮位（1024 原图右下 x=66-92% × y=63-75%）
  - **不画第二个角色 / 不画 CEO / 不画建筑 / 不画桌椅地板线**
  - 全幅单色背景（aiart 自然生成的 #B8B5A8 同色调），不再硬填补色边带
  - 整体 deadpan 办公喜剧 + chibi 夸张 + 可爱不阴暗

## 正向 Prompt（可直接拷贝到 Gemini）

```
flat corporate illustration style with muted Morandi palette of foggy-beige #B8B5A8, terracotta-orange #C97B5C, charcoal #3D3A36 and warm cream #E8E2D5, chibi 2.5-head proportion characters with oversized round eyes, thick uniform 5px charcoal outline, pure flat color fills with no gradients, deadpan office-comedy mood inspired by Two Point Hospital, clean vector-flat finish suitable for H5 WebGL game UI

a 16:9 game title splash for the workplace-comedy dungeon management game Dungeon HR, square 1024x1024 canvas with deliberate composition zones, uniform flat foggy-beige #B8B5A8 background filling the ENTIRE canvas edge-to-edge with one solid uniform color (no seams no gradient no vignette no darker patches),

ONLY ONE CHARACTER in the entire scene — placed strictly within the LEFT THIRD of the canvas (columns x=5% to x=42%) and the central vertical band (rows y=25% to y=85%): the chibi female HR Director matching canonical A-CHR-HR — a cute cartoon WOMAN in chibi 2.5-head proportion with big round head and small soft body, wearing a FOGGY-BEIGE #B8B5A8 OVERSIZED loose-fit business blazer with sleeves slightly rolled up (BEIGE color, NOT charcoal NOT black NOT navy) over warm cream #E8E2D5 collared shirt with terracotta-orange #C97B5C necktie slightly loosened, DUSTY MINT-GREEN #8FA89B trousers (NOT beige pants, NOT black), two small matte black devil horns poking out from messy dark hair styled in a SMALL SIDE BUN at the back-right of her head with a few loose strands framing her face (the bun shape clearly visible behind her head, NOT long flowing hair), brass-gold #D4A574 lanyard with a CLEARLY VISIBLE rectangular ID badge hanging crooked off-center on her chest (a small bright rectangle on a thin gold cord), HALF-LIDDED SLEEPY TIRED EYES with upper eyelids drooping partially closed showing fatigue (NOT wide-open big round eyes, NOT bright sparkly eyes — eyelids clearly cover the top half), white sclera and small black pupils still visible behind drooping lids with tiny highlight, faint purple-grey shadow blocks under the eyes for tired-office-lady look, FLUSTERED AWKWARD small wobbly mouth like a sideways "ω" or wavy tilde showing embarrassed exasperation (NOT a wide grin, NOT teeth showing), soft feminine cute face with rounded chin and small button nose, slight shoulder slump conveying weary office-lady energy, NOT a man NO masculine jawline NO beard, flat-chested cute chibi silhouette,

HR is in a busy multitasking chibi office-comedy gag pose: one tiny hand holds a clipboard stack of monster resumes, the other tiny hand juggles two more monster-resume folders mid-air, three or four extra resume papers swirl around her with chibi motion lines, a single big anime sweat drop floats beside her temple, body slightly tilted with comedic frantic energy, no real distress just deadpan workplace-comedy gag,

within the UPPER region of the canvas (rows y=8% to y=22%, well above HR's head, spanning the FULL canvas width with horizontal centering) place a horizontal subtitle banner of width roughly 80 percent of canvas centered, banner height roughly 10 percent of canvas height, warm cream #E8E2D5 fill with thin brass-gold #D4A574 hairline borders top and bottom, banner interior COMPLETELY EMPTY plain cream surface,

within the RIGHT-LOWER region of the canvas (columns x=60% to x=92%, rows y=58% to y=72%) place a substantial terracotta-orange #C97B5C rounded rectangular Start button placeholder with 5px charcoal outline, button width roughly 30 percent of canvas width, height roughly 12 percent of canvas height, button interior COMPLETELY EMPTY no text,

THE MIDDLE-RIGHT REGION of the canvas (columns x=42% to x=92%, rows y=22% to y=58% and rows y=72% to y=92%) MUST BE DELIBERATELY EMPTY — only uniform foggy-beige #B8B5A8 background, no characters no objects no resume papers no decorations, this empty area is reserved for code-layer text overlay,

NO Demon CEO, NO monster employees, NO bystanders, NO second character, NO third character, NO tower, NO castle, NO buildings, NO walls, NO furniture, NO desks, NO floor lines, NO scenery, just HR alone in the left third with the subtitle banner above and the Start button in the right-lower quadrant, all on a uniform foggy-beige #B8B5A8 background
```

## 反向 Prompt / 禁忌

```
photorealistic, 3D render, realistic human portrait, anime big sparkly eyes, manga style, watercolor wash, oil painting brush strokes, crayon scribble, pixel art, cyberpunk neon, oversaturated colors, high contrast dramatic lighting, rim light, volumetric god rays, gradient fills, soft airbrush shading, blood, gore, wounds, severed limbs, weapons piercing flesh, traditional fantasy orcs with tusks, muscular barbarians, half-naked warriors, sharp fangs, scary horror faces, cluttered dungeon background, stone walls, torches, fire pits, complex scenery, modern brand logos, real-world tech products, smartphones, cars, text, watermark, signature, low quality, blurry, jpeg artifacts, anatomically incorrect, extra limbs, deformed hands, NSFW

epic fantasy castle, medieval stone fortress, ornate gothic spires, dark stormy sky, lightning, fire effects, magical glow, dragon flying, glowing runes, demon castle building, tower castle, any tower, any architectural structure, any walls, any furniture, any desks, any floor lines, any LOGO badge, large readable wordmark, "DUNGEON HR" text, "Dungeon HR" text, sharp typography, ANY TEXT, ANY LETTERS, ANY GLYPHS, ANY WORDS, lorem ipsum, LOREM IPSUM, dummy text, placeholder text, latin words, chinese characters, faux text, scribbled writing, grey horizontal text bars on banner, button text "START", button text "PLAY", uneven background color, two-tone background with visible vertical seam, gradient background, vignette darkening at edges, color banding across the canvas, paper-thin subtitle strip, postage-stamp-sized start button, second character, two characters, multiple figures, Demon CEO, demon boss, monster employees, peeking heads from below, bystanders, crowd, sidekicks, group composition, side-by-side standing pose, HR centered in canvas, HR positioned in middle of canvas, HR taking up the whole canvas width, HR character on the right side, character on the right side, character in the middle, full-width character, male HR character, masculine HR jawline, beard on HR, suit-and-tie businessman as HR, charcoal blazer on HR, black blazer on HR, dark grey blazer on HR, charcoal-coloured suit on HR, black suit on HR, dark suit on HR, navy suit on HR, sharp tailored slim-fit blazer, long flowing hair on HR, long straight hair on HR, shoulder-length straight hair, hair down on shoulders, no bun visible, hair completely loose, wide open cheerful grin, big toothy smile, happy excited grin, mouth wide open showing teeth, wide-open big round bright eyes, sparkly eyes, big anime eyes fully open, energetic alert expression, solid black filled eyes, pupil-less eyes, eyeless face, dark eye holes, eye sockets, blob eyes, no iris no sclera no white in eye, no eye highlights, missing eyeballs, beige trousers, light tan pants, white pants, black pants, no ID badge, missing lanyard, hidden badge, badge fully tucked away
```

## 参考艺术家 / 作品（可选）

- 《Two Point Hospital》游戏主菜单标题画面（克制扁平 + 公司气质）
- 《Reigns: Her Majesty》启动 splash（极简剪影 + 大留白）
- 现代 IPO 招股说明书封面排版（A4 公文 + 黄铜金细边）

## 切图与落位建议

- **切图方式详解**：单张全屏背景，不切片；R6 起 aiart 1024×1024 → sharp resize 1080×1080（fit:fill 微调）→ extend 左右各 420px 至 1920×1080，**padding 颜色采样自 4 角中位数**（不再硬填 #B8B5A8）；不抠图、不 cover-crop（保留所有内容）
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

### aiart-R6 @ 2026-06-04（用户驳回 R5：①布局错乱 banner / button 没地方放（被 cover-crop 削掉）②HR 风格漂移与 A-CHR-HR canonical 不一致；废弃双人方案改单 HR 忙碌 + 明确 UI 留白位 + pipeline 改采样补色）
- 模型：aiart 默认 artSpec
- 文件：`atoms/assets/art/ui/A-UI-TITLE.png`（覆盖 R5；`__v6__aiart.png` 历史保留 raw 1024×1024）
- 触发：R5 双人欺负 gag 戏剧性达标但 (a) cover-crop 削掉 banner / button 致使 atoms 集成时无处放标题/按钮；(b) HR 大眼大脸蛋偏离了 A-CHR-HR.md canonical（疲劳眼底色块 + 强撑职业微笑 + 鸭嘴小鼻）
- 修订点：
  - 设计方向：废弃 R5 双人方案，改**单 HR 忙碌** chibi gag — HR 抱简历夹 + 抛接两份简历 + 飘散 paperwork + sweat drop + 强撑微笑
  - 角色描述：从 `A-CHR-HR.md` 正向 prompt 的 HR canonical 段**逐字复制**（疲劳阴影 / 强撑职业微笑 / 鸭嘴小鼻 / 鸭蛋脸 / 工牌歪戴 + 完整男性否定串），不再用 R4/R5 的 E01 简化版
  - 构图分区：HR 严格放**左 1/3**（x=5-42%），中右大区域纯背景留给代码层叠加；banner 顶部 y=8-22%，Start 钮右下 x=60-92% × y=58-72%，明确告诉 AI 哪些区域 MUST BE EMPTY
  - 反向追加：second character / two characters / Demon CEO / demon boss / HR centered in canvas / HR positioned in middle / HR taking up the whole canvas width / character on the right side / character in the middle / full-width character
  - 反向移除：与 R5 双人欺负相关的允许（如 "third character"，因现在只允许 1 人不是 2 人）
  - pipeline：废弃 cover-crop，改 **resize 1080×1080 + extend 左右采样补色** — 1024×1024 几乎原样保留所有内容，左右 420px 边带颜色由 4 角 32×32 像素采样中位数计算（与 AI 实际生成的边缘色一致），根除 R3 接缝同时不削内容
- 验收（待用户人眼复核）：
  - 仅 HR 一个角色，左 1/3 区域，无 CEO 无第二人
  - HR 风格匹配 canonical：疲劳眼底色块 / 强撑职业微笑 / 鸭嘴小鼻 / 工牌歪戴 / 米西装 / 陶土橘领带松垮
  - 顶部副标题带完整可见（未被裁切）
  - 右下 Start 钮完整可见（未被裁切）
  - 中右大区域纯背景无装饰
  - 1920×1080 全幅无接缝（左右采样色 ≈ AI 生成背景色）

### aiart-R5 @ 2026-06-04（用户驳回 R4：构图"不好看"，要求去掉 3 员工，改为 HR 被 CEO"职场欺负"的戏剧 chibi 桥段；prompt 重构）
- 模型：aiart 默认 artSpec
- 文件：`atoms/assets/art/ui/A-UI-TITLE.png`（覆盖 R4；`__v5__aiart.png` 历史保留 raw 1024×1024）
- 触发：R4 双主角 + 3 员工探头方案虽然 canonical 都命中、背景接缝问题已解决，但用户感觉构图静态、不戏剧不可爱
- 修订点：
  - 设计方向：废弃 R4"4 角色合影站位"，改为**两人戏剧 chibi 桥段** — CEO 居高临下指着 HR + 倾倒怪物简历堆，HR 抱着摇摇欲坠的简历堆 + sweat drop + 委屈水汪汪大眼
  - 角色姿势/表情（场景化收尾，canonical 5 件套保持 verbatim）：
    - HR：smaller / 抱简历堆 buckling / sweat drop / 委屈水汪汪大眼 / 微张小颤抖嘴角
    - CEO：taller looming / 一手指 HR / 一手夹财报卷 / deadpan 平直嘴 / hand-on-hip 高冷老板气场
    - 装饰：飘落的 2 份额外简历 + chibi sweat drop + motion lines + 脚下 dust puff
  - 反向追加：third character / more than two characters / additional bystanders / monster employees in scene / peeking heads from below frame / boar-head employee / squid employee / skeleton employee / sad tearful crying expression / scary mean villain face / abusive aggressive bullying / violence / raised fist / shouting yelling / dark mood / threatening atmosphere
  - 反向移除：与 R4 探头员工方案相关的允许（"only their peeking heads from below frame are allowed"）
  - pipeline：保持 R4 设置（aiart 1024×1024 → sharp lanczos cover-crop 至 1920×1080）
- 验收（待用户人眼复核）：
  - 仅 HR + CEO 两角色，无第三人无员工无怪物
  - 戏剧 chibi gag：HR 抱书堆 buckling + sweat drop + 委屈眼，CEO 指点 + dead-pan 嘴 + 财报卷 + 飘落简历
  - 双主角 5 件套 canonical 全部命中
  - 背景全幅单色无接缝
  - 顶 banner + 右下 Start 钮位置/尺寸符合规范

### aiart-R4 @ 2026-06-04（用户驳回 R3：①塔楼造型退化为细瓶状失去 stacked floors 楼层感 ②1024 contain → 1080 + 左右补 #B8B5A8 出现"中央深/边带浅"接缝；废弃塔楼方案改双主角 + 探头员工 + 原生 16:9）
- 模型：aiart 默认 artSpec
- 文件：`atoms/assets/art/ui/A-UI-TITLE.png`（覆盖 R3；`__v4__aiart.png` 历史保留 raw 1280×720）
- 触发：R3 出图后用户反馈两点：(a) 塔楼造型退化为象棋兵/化学瓶状，建议彻底换形式；(b) 画面出现明显接缝（R3 中央 1080-wide 区域是 AI 实际生成的米色，左右是 sharp 硬填的 #B8B5A8，两者色调有差异肉眼可见）
- 修订点：
  - 设计方向：彻底废弃魔王城塔楼方案，主视觉改为 **HR 总监 + 魔王 CEO Groobas 双主角** + **画面下沿 3 个怪物员工探头**（公猪 / 章鱼 / 骷髅）
  - 角色描述（cross-prompt 锚点）：HR 段 + CEO 段从 `art_style_guide §canonical` / `A-END-E01.md` 逐字复制（per memory `feedback_cross_prompt_character_consistency.md` 要求），仅在末尾微调"小骄傲欢迎笑容"+"双手垂手 deadpan"等场景化收尾
  - 反向追加：tower castle / any architectural structure / two-tone background with visible vertical seam / gradient background / color banding across the canvas / male HR / masculine HR jawline / Demon CEO without sunglasses / 等
  - 反向移除：与塔楼相关的旧禁忌（如 "tower hugging the left edge"），避免与新方案冲突
  - pipeline：opaque path（无 rmbg），aiart 原生 1280×720（16:9）→ sharp lanczos resize 至 1920×1080，**不再左右补色**
- 验收（待用户人眼复核）：
  - 画面背景全幅单一 #B8B5A8，无接缝、无两段色
  - HR + CEO 双主角并立中央，HR canonical 5 件套（米西装 / 米白衬衫 / 陶土橘领带 / 工牌歪戴 / 抱简历夹）齐全 + CEO 5 件套（巨角 / 深西装 / 陶土橘领带 / 黑墨镜 / 财报卷）齐全
  - 画面下沿 3 个员工探头（公猪 / 章鱼 / 骷髅），仅露上半头肩
  - 顶部副标题带 + 右下 Start 钮位置/尺寸符合 R3 已验收的规范
  - 无塔楼 / 无建筑 / 无 LOGO 圆牌 / 无文字

### aiart-R3 @ 2026-06-04（用户驳回 R2：LOGO 圆牌烧入灰色用户头像 silhouette + 副标题带过薄过顶 + 塔偏左 + 按钮过小；prompt 修订 + 重出）
- 模型：aiart 默认 artSpec
- 文件：`atoms/assets/art/ui/A-UI-TITLE.png`（覆盖 R2；`__v3__aiart.png` 历史保留 raw 1024×1024）
- 触发：StartScene 接入后用户截图发现 LOGO 圆牌中央有清晰的"灰色 user 头像 placeholder 图标"（非 atoms 叠加，是图本身烧入），同时构图严重偏左上：副标题带贴顶且仅约 5% 高、塔偏左占 35% 高、Start 钮约 8% 宽飘在右下空白处
- 修订点：
  - 正向（仅替换第二段 scene 描述）：
    - 塔位置：明确 "HORIZONTAL CENTER ... never hugging the left edge or stuck in the upper-left quadrant"
    - 塔尺寸：明确 "approximately 45 to 55 percent of canvas height"
    - LOGO 圆牌内部：强约束 "MUST NOT contain any human silhouette, head silhouette, face icon, person avatar, user profile icon, shoulders-and-head outline ... purely abstract corporate geometry only"，举例改为 gear / monogram-like abstract / brass medallion
    - 副标题带：明确 "top margin of roughly 8 percent ... NEVER touching the top edge"、宽度 70-80%、高度 8-12%（substantial，非 paper-thin）
    - Start 钮：明确 "SUBSTANTIAL ... 14 to 18 percent of canvas width and 8 to 10 percent of canvas height"、距右/下 6-8%
    - 整体构图：明确 "balanced triangular composition that fills the canvas evenly with no large empty quadrants"
  - 反向追加：human silhouette inside logo badge / person icon in badge / user avatar icon / profile picture silhouette / head and shoulders outline / default user icon / face icon in medallion / contact-card style avatar / tower hugging the left edge / tower stuck in upper-left quadrant / paper-thin subtitle strip / postage-stamp-sized start button / button floating in vast empty space / heavy compositional imbalance / large empty quadrant / all elements crammed into upper-left / vast empty lower-right half
  - pipeline：opaque path（无 rmbg），sharp 1024×1024 → contain 至 1920×1080 + `#B8B5A8` padding（与 R2 一致）
- 验收（待用户人眼复核）：
  - 塔居中（左右对称感），高度占比 ~50%
  - LOGO 圆牌内**无任何人形 / 头像剪影**，仅抽象几何
  - 副标题带顶部留白 ≥ 8%、带高 ≥ 8%、内部空白
  - Start 钮宽 ≥ 14%、高 ≥ 8%、距右下 6-8%
  - 三元素构图均衡，画面无大片空白象限

### aiart-R2 @ 2026-06-04（用户驳回 v1：splash 直接印可读"LOREM IPSUM"字样；prompt 修订 + 重出）
- 模型：aiart 默认 artSpec
- 文件：`atoms/assets/art/ui/A-UI-TITLE.png`（覆盖 v1；__v2__aiart.png 历史保留）
- 触发：与 TOAST/MAIL-CEO 同次扫描；v1 splash 副标题带上有清晰可读的"LOREM IPSUM"英文，比单纯灰条更糟
- 修订点：
  - 正向：删除"banner contains only LOREM IPSUM placeholder horizontal bars"；改为"subtitle banner interior is COMPLETELY EMPTY plain cream surface"；显式约束 button COMPLETELY EMPTY no text inside；**明确告知"Dungeon HR is a CONCEPT, NOT to be drawn as readable text"**
  - 反向：追加 "DUNGEON HR" / "Dungeon HR" / button text "START" / button text "PLAY" + 通用 LOREM IPSUM 强禁忌
  - pipeline：opaque path（无 rmbg），sharp 1024×1024 → contain 至 1920×1080 + `#B8B5A8` padding
- 验收：副标题带完全空白（米白 brass 描边）+ Start 钮无字（terracotta 圆角矩形）+ 魔王城塔（带小恶魔角和挂绳）保留

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
