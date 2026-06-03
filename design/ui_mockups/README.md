# UI Mockup 示意图集

**版本**：v1.0（2026-06-03）
**用途**：给 atoms 实现端看，明确每张 UI 资产的**位置 / 尺寸 / 文本叠加内容 / 触发时机**。
**生成方式**：`tmp/run_ui_mockups.js`（sharp + SVG overlay，可重跑）。
**注意**：mockup 是"用现有素材拼出的示意图"，不是最终游戏画面；亮黄色虚线框 + 标签是**给程序员看的注释**，不会出现在游戏里。

---

## 阅读约定

- **黄色虚线框 + 标签**：标识一张资产在该场景的位置、尺寸、9-slice 参数。代码里把这张 PNG 放到这个区域即可。
- **蓝色虚线框**：代码层组件（不是单独的资产，是 sprite 组合 / sub-region）。
- **黄底黑字小标签**：代码层叠加的文本/图标的位置说明。
- **场景顶部黑色横条**：mockup 元信息（场景名 + narrative/levels 锚点），不在游戏里出现。
- **右下角图例**：每张 mockup 都有，方便孤立查看。

---

## 9 张 mockup 一览

| # | 文件 | 场景 | 触发点 / narrative 锚点 | 关键资产 |
|---|------|------|------------------------|----------|
| 01 | `01_title.png` | TitleScene 启动画面 | 游戏启动 splash | A-UI-TITLE / A-UI-BTN |
| 02 | `02_main_screen.png` | PrepPhaseScene HR 办公室主屏 | L01–L06 准备阶段全程 | A-BG-PREP / A-CHR-HR / A-CHR-* / A-UI-BTN ×5 / A-UI-HPBAR / A-PROP-SHARD-ICON / A-UI-ICO-PAUSE/-VOLUME |
| 03 | `03_recruit.png` | ResumeCardPanel 招募 3 选 1 | L01 招募 / 各关补员 | A-UI-RESUME ×3 / A-CHR-* (头像槽) / A-UI-BTN |
| 04 | `04_battle.png` | BattlePhaseScene 战斗中 | L02–L06 战斗阶段 | A-BG-BATTLE / A-CHR-* / A-ENE-W02 / A-UI-HPBAR / A-UI-CARD-EVENT (日志框 + 预告) / A-UI-TIMER / A-UI-BTN |
| 05 | `05_event_card.png` | EventCardPanel 突发事件卡片 | B01–B07 战斗突发事件 | A-UI-CARD-EVENT / A-UI-TIMER / A-UI-BTN ×2 / A-CHR-* (说话人头像) |
| 06 | `06_ceo_mail.png` | CEOMailPanel CEO 邮件 | T01 / P04 / T06 / T07 | A-UI-MAIL-CEO / A-EMOTE-CEO-STAMP / A-UI-BTN |
| 07 | `07_wave_result.png` | WaveResultPanel 波次结算 | 每波战斗结束 | A-UI-RESULT / A-EMOTE-RANK-S/A/B/C/D / A-PROP-SHARD-ICON / A-UI-BTN |
| 08 | `08_tutorial_toast.png` | ToastTutorialView 教学引导气泡 | T02 / T03 / T04 教学浮层 | A-UI-TOAST / 主屏底图 / A-UI-BTN（被引导按钮高亮）|
| 09 | `09_ending_e01.png` | EndingCgPanel 结局 E01 | L07 撑过 N 波 + 碎片>0 + ≥1 怪物存活 | A-END-E01（E02/E03/E04 同位置同字幕条结构） |

---

## 每张 mockup 的实现要点（给 atoms 看）

### 01 TitleScene 启动画面

- **A-UI-TITLE 1920×1080**：直接铺满屏，资产已自带主标题 / 主视觉。代码层只需在底部叠"开始游戏" CTA。
- **A-UI-BTN**（开始游戏）：256×96 → 显示尺寸 360×135，居中下沿（y≈820）。代码层叠文字 "开始游戏"。
- 副标题 / 制作人滚动 / 版权信息：可选，由代码在底部留白区叠加（标题底图自带主视觉，不要再叠主标题）。

### 02 PrepPhaseScene HR 办公室主屏

- **A-BG-PREP 1920×1080**：全屏铺底，图本身已包含办公室场景（桌椅/简历/灯/植物）。
- **A-CHR-HR 768×1024**：左侧立绘，pivot=Bottom Center（脚底中点对齐 y≈1000）。**注意**：A-BG-PREP 已自带 HR 角色画面元素，运行时叠加的 A-CHR-HR 是用于 P02/P03 等触发对话槽的"贴纸版"。如果不想重复出现，可让主屏不叠 HR 立绘（仅在事件触发时叠）。
- **怪物槽位（BattleSlotView）**：`A-CHR-GROOBAS / A-CHR-XIAOXING / A-CHR-GENERIC-1/2/3` 按 monster 配置选图，每个槽 240×320，pivot=Bottom Center；HP 条 `A-UI-HPBAR` 在脚下方。
- **顶栏 HUD**：左 `A-PROP-SHARD-ICON` 56×56 + "× 70 灵魂碎片" 文本；中 "AP: 3/3"；右 "关卡: L02"。
- **顶栏右上 系统按钮**：`A-UI-ICO-VOLUME` + `A-UI-ICO-PAUSE`，各 80×80。
- **右侧动作按钮列（CtaButton）**：5 个 `A-UI-BTN`（256×96，9-slice 24/208/24 × 24/48/24），从上到下：招募 / 扩建 / 发奖金 / 打零工 / 开战。**资产本体不含字符**，按钮文本由代码 UI 文字组件叠加。Tint 公式见 `art_layout.md §2.6`。
- 关卡进度条：本 mockup 暂未画，按 §11.1 文字版可以放在底部；当前可砍 P2 不阻塞 MVP。

### 03 ResumeCardPanel 招募 3 选 1

- **背景**：主屏底图 + dim 0.5 黑色半透层（modal 标准做法）。
- **A-UI-RESUME 600×800**：3 张并排，9-slice 32/536/32 × 32/736/32。本 mockup 缩到 540×720（90%）。
- **头像槽位**：每张 resume 中央偏上的白方框（卡内 x≈202 / y≈234 / 尺寸 ≈135×126），运行时按候选怪物的 `art_id` 选 `A-CHR-BUST-{GROOBAS, GENERIC-1/2/3, XIAOXING}` 半身像（256×256 透明 PNG，v1.2 新增）落入。**v1.2 起改用专门的 BUST 资产，不再用立绘头胸裁切**。
- **简历正文**（代码层叠加）：姓名 / 应聘岗位 / HP/ATK/日薪 / 词条 / 内心泄露句。生成规则见 `narrative.md §简历语气规范 §随机生成规则`。
- **每张 resume 底部"选这位" 按钮**：`A-UI-BTN`（220×80）。
- **额外备注**：跳过/重抽功能可用一个公共"全部跳过"按钮（mockup 暂未画），按 game_design §11.4。

### 04 BattlePhaseScene 战斗中

- **A-BG-BATTLE 1920×1080**：全屏铺底（B1 入口走廊）。
- **A-UI-CARD-EVENT 拉伸成战斗日志框**：左侧 700×640，9-slice 拉中央可拉伸区。代码逐条 append 战斗日志条目（自动滚动）。
- **怪物方** 中央偏右：每个怪物 220×293（按 schema `art_id` 选图），pivot=Bottom Center；头顶上方 200×22 `A-UI-HPBAR`，Tint=`#8FA89B` 灰薄荷绿（员工绿）。
- **勇者方** 最右：`A-ENE-W01..ELITE` 240×320，pivot=Bottom Center；头顶 220×24 `A-UI-HPBAR`，Tint=`#A85C5C` 砖红。
- **突发事件预告**（右上）：`A-UI-CARD-EVENT` 缩到 360×240，右上角叠 64×64 `A-UI-TIMER` 倒计时径向填充（Filled Radial 360→0）。
- **底部 [点击加速]**：`A-UI-BTN` 320×110 居中。
- **战斗日志文案** 来自 narrative 战斗事件表 + 自动生成的伤害/命中条目（"> {actor} 命中，造成 {dmg} 伤害"）。

### 05 EventCardPanel 突发事件卡片

- **背景**：战斗底图 + dim 0.55（半 modal）。
- **A-UI-CARD-EVENT 全屏中央**：900×600 → mockup 中拉到 1100×740 演示 9-slice 拉伸效果。运行时按设备分辨率自适配。
- **A-UI-TIMER 128×128**：卡顶右上角，10s 倒计时径向填充。**超时按"不利选项"自动选择**（默认右选项）。
- **说话人头像**：卡顶左侧 120×160，按事件触发的怪物 `art_id` 选图（mockup 用 GROOBAS 示例）。
- **正文**：标题（事件 ID + 简称） / 主体描述（来自 narrative B01-B07） / 怪物状态行。
- **双选项按钮**：2 张 `A-UI-BTN` 360×120，左右并排在卡内底部；按钮文本 = 选项标题 + 效果摘要（2 行）。

### 06 CEOMailPanel CEO 邮件

- **背景**：主屏底图 + dim 0.55。
- **A-UI-MAIL-CEO 800×500**：居中，9-slice 40/720/40 × 40/420/40。
- **A-EMOTE-CEO-STAMP 256×256**：右下角 200×200，pivot=Center 倾斜 ±5°~15°（盖章动效）。**每封 CEO 邮件都贴**。
- **邮件正文**：From / Subject / 分割线 / 公文体内容。文案来自 narrative T01/P04/T06/T07。
- **底部 "继续 →" 按钮**：`A-UI-BTN` 280×96。

### 07 WaveResultPanel 波次结算

- **背景**：主屏底图 + dim 0.55。
- **A-UI-RESULT 900×700**：居中，9-slice 40/820/40 × 40/620/40。
- **三段式正文**（代码层叠加）：
  - 上 100px 标题区："第 N 波 · 战斗结算"
  - 中部行项：存活 / 阵亡 / 抚恤金 / 通关保底 / 存活分 / 业绩分 / 合计
  - 底部 CTA："继续 →" `A-UI-BTN`
- **绩效评级章**：每个存活员工右侧叠一枚 `A-EMOTE-RANK-S/A/B/C/D`，96×96，pivot=Center。**不参与 9-slice 拉伸**，由代码按相对锚点叠加。
- **灵魂碎片图标**：合计行旁 `A-PROP-SHARD-ICON` 48×48 + "+34 碎片" 文本。
- **RANK-D 与 CEO-STAMP 区分**：同砖红色，但 RANK-D 中央是半圆瓣 + 警示三角，CEO-STAMP 是恶魔角剪影 + "CEO" 占位。代码层不可混用。

### 08 ToastTutorialView 教学气泡

- **背景**：主屏 PrepPhase 当前状态（不 dim，气泡是浮层）。
- **A-UI-TOAST 600×160**：9-slice 32/536/32 × 32/96/32。本 mockup 缩到 700×180 演示拉伸。
- **左侧 icon 槽位**：≤128×128，**不参与拉伸**。可放 emoji 或专用 icon。
- **正文**：单行短文本（≤20 汉字）。本 mockup 演示 2 行，注意中央可拉伸区可纵向延展。
- **指向箭头**：**资产本体不含尖角**，由代码绘制三角 polygon，指向被引导 anchor（这里是招募按钮）。
- **被引导按钮高亮**：mockup 用半透黄色 30% 描边演示 "highlight"，运行时可用 outline / pulse 动效。

### 09 EndingCgPanel 结局 CG

- **A-END-E01 1280×720 → 1920×1080**：等比放大铺满（16:9 → 16:9 完美适配）。
- **底部字幕条**：代码绘制 1920×200 半透黑底（opacity 0.75），叠白色字幕文本。
- **字幕内容**：CEO 邮件正文 + 格鲁巴斯私信文本（E01）/ 同结构其他文案（E02/E03/E04）。文案来自 narrative §分支与结局。
- **E02/E03/E04** 用同样的 EndingCgPanel 参数化，仅替换 `art_id` 与字幕文案。

---

## 已知占位 / 注意事项

| 资产 | 现状 | 备注 |
|------|------|------|
| `A-UI-CARD-EVENT.png` 和 `A-UI-RESULT.png` | 内含 "LOREM IPSUM" 占位文字 | v1.0 遗留，见 `gamejam_state.md` "v1.0 遗留收尾" 项。9-slice 中央可拉伸区时正文文字本来就由代码叠加，资产中央"LOREM IPSUM"在拉伸时会变形，**实际不影响可用性**；后续若重出图，目标是把"LOREM IPSUM"替换为纯净纹理底。 |
| `A-EMOTE-RANK-D` vs `A-EMOTE-CEO-STAMP` | 同砖红色 | 中央图形与装饰差异区分。代码层不可混用。 |
| Toast 箭头 | 资产不含 | 由代码绘制 polygon 指向 anchor。 |
| 按钮文字 | 资产不含 | 全部由代码 UI 文字组件叠加；按钮状态 Tint 见 `art_layout.md §2.6`。 |

---

## 重新生成

```bash
cd tmp
node run_ui_mockups.js
# → design/ui_mockups/01..09_*.png 全量覆盖重写
```

修改场景布局：编辑 `tmp/run_ui_mockups.js` 中对应 `scene0X` 函数即可。

---

## 下游引用

| 引用方 | 用途 |
|--------|------|
| atoms 实现端 | 拿到 png 立即知道哪张图放哪、多大、叠什么文字 |
| `atoms/asset_usage_guide.md` | 文字版 + 本 mockup 视觉版互为补充 |
| `design/art_layout.md §3.6` | 资产 → 触发点的快查表（本 mockup 是其视觉延展） |

---

## 变更记录

### v1.1 (2026-06-04)
- 03_recruit 切换到 v1.2 BUST 头像资产（A-CHR-BUST-*），不再用立绘头胸裁切；卡片放大 380×506 → 540×720，文本坐标对齐资产实际可视区。
- 同期 atoms 资产库新增 11 张半身像（6 candidate + 5 enemy，256×256 透明 PNG）。

### v1.0 (2026-06-03)
- 首次发布，9 张 mockup 覆盖：TitleScene / PrepPhase 主屏 / 招募 / 战斗 / 突发卡片 / CEO 邮件 / 波次结算 / 教学气泡 / 结局 CG E01。
- 每张 mockup 1920×1080 PNG，全部资产标注 asset_id + 尺寸 + 9-slice 参数。
- 生成脚本：`tmp/run_ui_mockups.js`（sharp + SVG overlay）。
