# Atoms 美术资产替换指南

**文档日期**：2026-06-03
**配套文档**：[`game_design.md`](game_design.md) v0.7（同目录策划案 / GDD）
**目标读者**：Atoms 程序 AI（用本文档把游戏中的占位图替换为最终美术资产）
**资产基线**：`atoms/assets/art/` 共 36 张 final PNG（v1.0 22 张 + v1.1 14 张 + E01/E02 v3 修订）

---

## 0. 阅读说明

### 文档配合方式

- **[`game_design.md`](game_design.md)** = 游戏规格（何时显示什么 UI / 触发什么事件）
- **本文档** = 美术资产 → 具体使用位置（每张图替换游戏里哪一处占位）
- 两者一起使用：先读 `game_design.md` 理解游戏流程，再用本文档定位具体图片应该绑到哪个组件

### 文件命名约定（**重要**）

每个资产目录里同时存在多个文件，但**只用 canonical 文件**（无版本后缀）：

```
characters/
├── A-CHR-HR.png            ← ✅ 用这个（canonical / final）
├── A-CHR-HR__v1__aiart.jpg ← ❌ 不用（历史版本）
├── A-CHR-HR__v2__aiart.jpg ← ❌ 不用
├── A-CHR-HR__v3__aiart.jpg ← ❌ 不用
├── A-CHR-HR__v3__aiart.png ← ❌ 不用
└── A-CHR-HR__v4__aiart.jpg ← ❌ 不用
```

**规则**：`A-XXX.png` 不带 `__vN__` 后缀的就是当前生效版本。带 `__vN__` 的全部是 06c 出图历史版本（用于回溯审核），程序不引用。

### Asset ID 与路径映射

```
A-BG-*       → atoms/assets/art/backgrounds/<id>.png
A-CHR-*      → atoms/assets/art/characters/<id>.png
A-ENE-*      → atoms/assets/art/enemies/<id>.png
A-UI-*       → atoms/assets/art/ui/<id>.png
A-EMOTE-*    → atoms/assets/art/emotes/<id>.png
A-END-*      → atoms/assets/art/endings/<id>.png
A-PROP-*     → atoms/assets/art/props/<id>.png
```

代码里建议用 `art_id` 字符串字段（如 `"art_id": "A-CHR-GROOBAS"`），由 atoms 解析层映射到具体路径，避免硬编码。

---

## 1. 按场景分组：每张图用在哪里

### 1.1 启动 / 标题画面

| Asset ID | 文件路径 | 用途 | 触发位置 |
|----------|---------|------|---------|
| `A-UI-TITLE` | [`ui/A-UI-TITLE.png`](assets/art/ui/A-UI-TITLE.png) | 游戏启动封面（魔王城 LOGO + 副标题 + Start CTA 留位） | 程序入口画面 / `GAME_INIT` 状态 |

**Atoms 实现指引**：作为 splash 屏背景图，标题文字 / Start 按钮可由 atoms 在该图之上叠加渲染（图本身留有 CTA 位）。

---

### 1.2 主屏（准备阶段）— L01–L06 共用

参照 `game_design.md` §11.1。

| Asset ID | 文件路径 | 用途 | 触发位置 |
|----------|---------|------|---------|
| `A-BG-PREP` | [`backgrounds/A-BG-PREP.png`](assets/art/backgrounds/A-BG-PREP.png) | 准备阶段办公室背景图 | 状态机 `MAIN_PREP` 进入时显示 |
| `A-CHR-HR` | [`characters/A-CHR-HR.png`](assets/art/characters/A-CHR-HR.png) | HR 总监玩家立绘（叙事人物代言） | 主屏侧边 / 邮件弹窗收件人头像 / EVAL 绩效屏发言人 |
| `A-PROP-SHARD-ICON` | [`props/A-PROP-SHARD-ICON.png`](assets/art/props/A-PROP-SHARD-ICON.png) | 灵魂碎片图标（货币显示） | HUD 顶栏左上"灵魂碎片: X" 数字前缀；EVAL 屏每次扣款/入账行 |
| `A-UI-BTN` | [`ui/A-UI-BTN.png`](assets/art/ui/A-UI-BTN.png) | 通用 CTA 按钮底图（9-slice） | 招募 / 扩建 / 发奖金 / 打零工 / 开战 五个动作按钮的底框 |
| `A-UI-ICO-PAUSE` | [`ui/A-UI-ICO-PAUSE.png`](assets/art/ui/A-UI-ICO-PAUSE.png) | 暂停图标 | HUD 系统按钮（全局）|
| `A-UI-ICO-VOLUME` | [`ui/A-UI-ICO-VOLUME.png`](assets/art/ui/A-UI-ICO-VOLUME.png) | 音量图标 | HUD 系统按钮（全局）|
| `A-UI-ICO-RESTART` | [`ui/A-UI-ICO-RESTART.png`](assets/art/ui/A-UI-ICO-RESTART.png) | 重开图标 | HUD 系统按钮（全局）|

**Atoms 实现指引**：
- A-BG-PREP 铺满 1920×1080 主屏背景层
- A-CHR-HR 放在主屏左侧或顶部 narrator 槽位（game_design.md §11.1 mockup 中"怪物槽位区"上方）
- A-PROP-SHARD-ICON 在顶栏与"灵魂碎片"文字组合，每次刷新数值时同步显示
- 4 个 ICO 图标用作 HUD 右上角系统按钮组
- A-UI-BTN 作为 9-slice 按钮底框，所有 CTA 按钮共用此一张图

---

### 1.3 招募 / 简历界面

参照 `game_design.md` §11.4 + §10。**招募免费**（balance v0.6.0）：简历卡片不显示招募费字段。

| Asset ID | 文件路径 | 用途 | 触发位置 |
|----------|---------|------|---------|
| `A-UI-RESUME` | [`ui/A-UI-RESUME.png`](assets/art/ui/A-UI-RESUME.png) | 简历卡片底框（公文体设计） | `RECRUIT_DIALOG` 子状态：3 选 1 简历池每张卡的底图 |
| `A-CHR-BUST-GROOBAS` | [`characters/A-CHR-BUST-GROOBAS.png`](assets/art/characters/A-CHR-BUST-GROOBAS.png) | 格鲁巴斯 半身像（B1 驻守，TANK 模板） | **简历卡片头像槽**（256×256 透明）/ 战斗 HUD 头像 / 对话条 |
| `A-CHR-BUST-XIAOXING` | [`characters/A-CHR-BUST-XIAOXING.png`](assets/art/characters/A-CHR-BUST-XIAOXING.png) | 宵星 半身像（远程，RANGE 模板）| 同上 |
| `A-CHR-BUST-GENERIC-1` | [`characters/A-CHR-BUST-GENERIC-1.png`](assets/art/characters/A-CHR-BUST-GENERIC-1.png) | 哥布林近战 半身像（TANK 替补）| 同上 |
| `A-CHR-BUST-GENERIC-2` | [`characters/A-CHR-BUST-GENERIC-2.png`](assets/art/characters/A-CHR-BUST-GENERIC-2.png) | 小恶魔文员 半身像（DPS 替补）| 同上 |
| `A-CHR-BUST-GENERIC-3` | [`characters/A-CHR-BUST-GENERIC-3.png`](assets/art/characters/A-CHR-BUST-GENERIC-3.png) | 触手怪杂工 半身像（RANGE 替补）| 同上 |
| `A-CHR-BUST-HR` | [`characters/A-CHR-BUST-HR.png`](assets/art/characters/A-CHR-BUST-HR.png) | HR 总监 半身像（玩家） | 对话条头像 / CEO 邮件 sub-portrait（不出现在简历池） |
| `A-CHR-GROOBAS` 等立绘 | `characters/A-CHR-*.png` | **全身立绘**，仍用于主屏怪物槽位 / 战斗角色槽 / EVAL 屏 / E01·E04 结局信中提及时 | 非头像位 |

**Atoms 实现指引**：
- 简历池 3 张卡片：每张卡背景用 A-UI-RESUME，**头像槽位贴对应 A-CHR-BUST-* 半身像**（不再用立绘头胸裁切；v1.2 起的标准做法）
- 简历池随机生成时，按怪物模板（TANK/DPS/RANGE）从对应集合抽：
  - TANK 抽 [GROOBAS, GENERIC-1] → 头像用 A-CHR-BUST-{GROOBAS, GENERIC-1}；立绘用 A-CHR-{GROOBAS, GENERIC-1}
  - DPS 抽 [GENERIC-2] → A-CHR-BUST-GENERIC-2 / A-CHR-GENERIC-2
  - RANGE 抽 [XIAOXING, GENERIC-3] → A-CHR-BUST-{XIAOXING, GENERIC-3} / A-CHR-{XIAOXING, GENERIC-3}
- 玩家招募成功后，怪物 schema 同时绑定 `art_id`（立绘）和 `bust_id`（半身像）两个字段，主屏/战斗用立绘，HUD 头像/对话条用 bust
- 兜底：BUST 出图失败时降级用立绘 768×1024 中央 512×512 区域裁切 → resize 256×256，不阻塞

---

### 1.4 战斗界面（L02–L06）

参照 `game_design.md` §11.2。

| Asset ID | 文件路径 | 用途 | 触发位置 |
|----------|---------|------|---------|
| `A-BG-BATTLE` | [`backgrounds/A-BG-BATTLE.png`](assets/art/backgrounds/A-BG-BATTLE.png) | 战斗阶段 B1 入口走廊背景 | 状态机 `BATTLE_START` 进入时切换为该图 |
| `A-UI-HPBAR` | [`ui/A-UI-HPBAR.png`](assets/art/ui/A-UI-HPBAR.png) | HP 条 9-slice 底图 | 战斗界面右侧每个怪物 / 勇者的 HP 条都用此图（按当前 HP 比例横向缩放）|
| `A-UI-CARD-EVENT` | [`ui/A-UI-CARD-EVENT.png`](assets/art/ui/A-UI-CARD-EVENT.png) | 通用卡片底框（突发事件 / 战斗日志 / 备忘录共用 9-slice） | 突发事件全屏卡片 / 战斗日志区滚动文本框 / EVAL 屏阵亡报告框等多处复用（CSS/atoms 配色变体区分场景）|
| `A-ENE-W01` | [`enemies/A-ENE-W01.png`](assets/art/enemies/A-ENE-W01.png) | 新手勇者（菜鸟） HP 110 / ATK 5 | L02 战斗界面右下勇者立绘 |
| `A-ENE-W02` | [`enemies/A-ENE-W02.png`](assets/art/enemies/A-ENE-W02.png) | 初级勇者 HP 220 / ATK 7 | L03 战斗界面右下勇者立绘 |
| `A-ENE-W03` | [`enemies/A-ENE-W03.png`](assets/art/enemies/A-ENE-W03.png) | 初级勇者+ HP 330 / ATK 10 | L04 战斗界面右下勇者立绘 |
| `A-ENE-W04` | [`enemies/A-ENE-W04.png`](assets/art/enemies/A-ENE-W04.png) | 中级勇者 HP 440 / ATK 13 | L05 战斗界面右下勇者立绘 |
| `A-ENE-ELITE` | [`enemies/A-ENE-ELITE.png`](assets/art/enemies/A-ENE-ELITE.png) | 精英勇者（Boss） HP 600 / ATK 18 | L06 战斗界面右下勇者立绘（Boss 战）|

**Atoms 实现指引**：
- A-BG-BATTLE 铺满战斗界面背景层
- A-UI-HPBAR 在每个角色头像下方实例化一份，用 9-slice 拉伸 + 内嵌色块按 HP/HP_MAX 显示填充
- A-UI-CARD-EVENT 是**最常复用的 9-slice 资产**，建议封装成 atoms 通用 `<Frame>` 组件，通过 prop 切色调
- 5 张敌人立绘按当前关卡 ID 切换：`heroes[currentLevel].art_id`
- 怪物方立绘（左上）用 §1.3 中的 A-CHR-* 资产

---

### 1.5 突发事件 / 战斗日志 / 倒计时

参照 `game_design.md` §11.3 + §7。

| Asset ID | 文件路径 | 用途 | 触发位置 |
|----------|---------|------|---------|
| `A-UI-CARD-EVENT` | [`ui/A-UI-CARD-EVENT.png`](assets/art/ui/A-UI-CARD-EVENT.png) | （已在 §1.4 列出，复用）| 突发事件全屏卡片底框（B01-B07 + C01 全部用此图）|
| `A-UI-TIMER` | [`ui/A-UI-TIMER.png`](assets/art/ui/A-UI-TIMER.png) | 圆环倒计时进度条 | 突发事件卡片顶部：10s 倒计时显示（按时间比例顺时针消减）|
| `A-UI-BTN` | [`ui/A-UI-BTN.png`](assets/art/ui/A-UI-BTN.png) | （已在 §1.2 列出，复用）| 突发事件卡片底部两个选项按钮的底框 |

**Atoms 实现指引**：
- 突发事件状态 `EVENT_TRIGGER`：弹出全屏 modal，layer 自上而下：
  1. 半透明遮罩
  2. A-UI-CARD-EVENT 作为卡片底
  3. A-UI-TIMER 在卡片顶部居中（按 10s 减少）
  4. 卡片中间放事件文本（来自 narrative B01-B07/C01 的 `card_text`）
  5. 卡片底部两个 A-UI-BTN（选项 A / 选项 B）

---

### 1.6 EVAL 绩效结算屏（L02-L06 战后）

参照 `game_design.md` §11.6。**战后展示通关绩效提成（balance v0.6.0 §2.9）+ 阵亡报告 + 绩效评级章**。

| Asset ID | 文件路径 | 用途 | 触发位置 |
|----------|---------|------|---------|
| `A-UI-RESULT` | [`ui/A-UI-RESULT.png`](assets/art/ui/A-UI-RESULT.png) | 波次结算面板底图 | 状态机 `EVAL` 进入时显示 |
| `A-EMOTE-RANK-S` | [`emotes/A-EMOTE-RANK-S.png`](assets/art/emotes/A-EMOTE-RANK-S.png) | 绩效评级章 S（最高档·黄铜金）| EVAL 屏存活分加权高 + 全员存活时的盖章位 |
| `A-EMOTE-RANK-A` | [`emotes/A-EMOTE-RANK-A.png`](assets/art/emotes/A-EMOTE-RANK-A.png) | 绩效评级章 A（次高档·陶土橘）| EVAL 屏：good 路径（少阵亡 + 高 DPS）|
| `A-EMOTE-RANK-B` | [`emotes/A-EMOTE-RANK-B.png`](assets/art/emotes/A-EMOTE-RANK-B.png) | 绩效评级章 B（中档·灰薄荷绿）| EVAL 屏：中位通关（默认主线 1 阵亡）|
| `A-EMOTE-RANK-C` | [`emotes/A-EMOTE-RANK-C.png`](assets/art/emotes/A-EMOTE-RANK-C.png) | 绩效评级章 C（次低档·雾紫）| EVAL 屏：苦战通关（多阵亡 / 低 DPS）|
| `A-EMOTE-RANK-D` | [`emotes/A-EMOTE-RANK-D.png`](assets/art/emotes/A-EMOTE-RANK-D.png) | 绩效评级章 D（最低档·砖红）| EVAL 屏：1 怪存活 + 极低 DPS 通关 |
| `A-CHR-*` | （怪物方所有立绘）| 存活/阵亡怪物头像 | EVAL 屏阵亡名单 + 存活怪物表现列 |
| `A-PROP-SHARD-ICON` | （已列出）| 抚恤金 / 通关绩效提成的碎片图标 | EVAL 每条 +/- 数值前缀 |

**Atoms 实现指引**：
- A-UI-RESULT 作为面板底，atoms 在其上渲染：阵亡名单 / KPI 达成奖金分项 / 存活表现 / 评级章 / 继续按钮
- 绩效评级章选择规则（建议公式）：
  - **S**：全员存活 + DPS 项 ≥ 主线期望 130%
  - **A**：全员存活 + DPS 项 ≥ 100% / 或 1 阵亡 + DPS ≥ 130%
  - **B**：主线（1 阵亡 + DPS 项接近期望）—— 默认档
  - **C**：≥ 2 阵亡 / 或 DPS 项 < 70%
  - **D**：仅 1 怪存活 + DPS 项 < 50%
- 阵亡怪物头像用半透明 + 黑白滤镜显示
- A-CHR-HR 可作为"HR 总监批阅人"贴在面板右下作为发言人头像

---

### 1.7 邮件 / CEO 弹窗（T01 / P04 / T07）

参照 `game_design.md` §11.5 + §8 T 系列。

| Asset ID | 文件路径 | 用途 | 触发位置 |
|----------|---------|------|---------|
| `A-UI-MAIL-CEO` | [`ui/A-UI-MAIL-CEO.png`](assets/art/ui/A-UI-MAIL-CEO.png) | CEO 邮件框（公文体）| **T01 入职邮件**（L01 起点）/ **P04 中期审计警告**（L04 末第 4 波结束）/ **T07 上市股权激励邮件**（L07 E01 结局）|
| `A-EMOTE-CEO-STAMP` | [`emotes/A-EMOTE-CEO-STAMP.png`](assets/art/emotes/A-EMOTE-CEO-STAMP.png) | CEO 红色印章 | A-UI-MAIL-CEO 邮件框右下角装饰，强化"CEO 已审阅"权威感 |

**Atoms 实现指引**：
- A-UI-MAIL-CEO 作为邮件 modal 底框，atoms 内嵌邮件文本（来自 narrative §T01/P04/T07）
- 邮件框右下角叠加 A-EMOTE-CEO-STAMP（带轻微旋转动画显得"刚盖章")
- **魔王 CEO 不出独立立绘**（design_review v1.1 决策：CEO 仅以邮件呈现，由 A-UI-MAIL-CEO + A-EMOTE-CEO-STAMP 替代立绘）

---

### 1.8 教学引导气泡（T02 / T04）

参照 `game_design.md` §8 T02 + T04。

| Asset ID | 文件路径 | 用途 | 触发位置 |
|----------|---------|------|---------|
| `A-UI-TOAST` | [`ui/A-UI-TOAST.png`](assets/art/ui/A-UI-TOAST.png) | 教学浮层气泡底图 | **T02 招募提示**（L01 首次打开招募界面）/ **T04 突发卡片教学**（L02 首次触发突发事件，附"超时=不利"提示）/ **打零工教学引导**（L01 末，levels.md v1.4 教学表新增）|

**Atoms 实现指引**：
- 浮层 toast，从相关按钮指向气泡指针，atoms 在 A-UI-TOAST 上叠加教学文本
- T02 指向"招募"按钮；T04 指向倒计时圆环；打零工教学指向"打零工"按钮

---

### 1.9 结局演出（L07）

参照 `game_design.md` §11 / §8 E 系列。

| Asset ID | 文件路径 | 用途 | 触发条件 |
|----------|---------|------|---------|
| `A-END-E01` | [`endings/A-END-E01.png`](assets/art/endings/A-END-E01.png) | 满血上市 CG（含格鲁巴斯私信视觉锚点） | T07：撑过 N 波 + 碎片 > 安全线 45 + 至少 1 怪存活 |
| `A-END-E02` | [`endings/A-END-E02.png`](assets/art/endings/A-END-E02.png) | 上市破发 CG | T07：撑过 N 波 + 碎片 ≤ 安全线 45 |
| `A-END-E03` | [`endings/A-END-E03.png`](assets/art/endings/A-END-E03.png) | 勇者前台合影·无人值守 CG | T08：某波战斗后全员阵亡或离职 |
| `A-END-E04` | [`endings/A-END-E04.png`](assets/art/endings/A-END-E04.png) | 集体离职·公司破产 CG（含格鲁巴斯最后留言视觉锚点）| T09：碎片归零无法支付薪水 |

**Atoms 实现指引**：
- L07 状态机 `ENDING` 进入时，按 EVAL 阶段最终触发的 T07/T08/T09 结果选 1 张全屏显示
- 结局 CG 之上叠加文本框（game_design.md §11.5 邮件样式），渲染对应叙事文本：
  - E01：CEO 股权激励邮件（行权期 4 年 / Cliff 1 年）+ 格鲁巴斯私信「谢谢你没有把我末位淘汰。」
  - E02：CEO 邮件「需要您在路演材料中对本季度亏损做出合理解释。」
  - E03：失败卡片「地下城无人值守。勇者打卡。股价跌停。」
  - E04：失败卡片 + 格鲁巴斯最后留言「这次我不是被淘汰的。」
- 结局演出后 atoms 显示返回主菜单 / 重玩按钮

---

## 2. 完整资产清单（按目录速查）

### `atoms/assets/art/backgrounds/` (2 张)

| 文件 | 关联场景 |
|------|---------|
| `A-BG-PREP.png` | 准备阶段背景（L01–L06）|
| `A-BG-BATTLE.png` | 战斗阶段背景（L02–L06）|

### `atoms/assets/art/characters/` (6 张)

| 文件 | 关联角色 / 场景 |
|------|---------------|
| `A-CHR-HR.png` | HR 总监玩家（全程主角发言人）|
| `A-CHR-GROOBAS.png` | 格鲁巴斯·史莱姆（B1 驻守 TANK，narrative 钦定主角）|
| `A-CHR-XIAOXING.png` | 宵星·骷髅法师（远程 RANGE，narrative v1.3 钦定主角）|
| `A-CHR-GENERIC-1.png` | 泛用怪物 #1（TANK 替补，简历池随机）|
| `A-CHR-GENERIC-2.png` | 泛用怪物 #2（DPS 替补，简历池随机）|
| `A-CHR-GENERIC-3.png` | 泛用怪物 #3（RANGE 替补，简历池随机）|

### `atoms/assets/art/enemies/` (5 张)

| 文件 | 关联关卡 / 数值 |
|------|---------------|
| `A-ENE-W01.png` | L02 / HP 110 / ATK 5 |
| `A-ENE-W02.png` | L03 / HP 220 / ATK 7 |
| `A-ENE-W03.png` | L04 / HP 330 / ATK 10 |
| `A-ENE-W04.png` | L05 / HP 440 / ATK 13 |
| `A-ENE-ELITE.png` | L06 Boss / HP 600 / ATK 18 |

### `atoms/assets/art/ui/` (12 张)

| 文件 | 用途 |
|------|------|
| `A-UI-TITLE.png` | 启动标题画面 |
| `A-UI-CARD-EVENT.png` | **复用最广**：突发事件卡片 / 战斗日志框 / 备忘录框（9-slice）|
| `A-UI-MAIL-CEO.png` | CEO 邮件框（T01/P04/T07）|
| `A-UI-RESUME.png` | 简历卡片底（招募 3 选 1）|
| `A-UI-RESULT.png` | EVAL 绩效结算面板底 |
| `A-UI-TOAST.png` | 教学引导气泡（T02/T04/打零工）|
| `A-UI-HPBAR.png` | HP 条 9-slice |
| `A-UI-TIMER.png` | 圆环倒计时（突发事件 10s）|
| `A-UI-BTN.png` | 通用 CTA 按钮底（9-slice，复用最广）|
| `A-UI-ICO-PAUSE.png` | 暂停图标（HUD）|
| `A-UI-ICO-VOLUME.png` | 音量图标（HUD）|
| `A-UI-ICO-RESTART.png` | 重开图标（HUD）|

### `atoms/assets/art/emotes/` (6 张)

| 文件 | 用途 |
|------|------|
| `A-EMOTE-CEO-STAMP.png` | CEO 邮件红色印章（替代 CEO 立绘）|
| `A-EMOTE-RANK-S.png` | 绩效评级章 S（EVAL 屏 / 黄铜金）|
| `A-EMOTE-RANK-A.png` | 绩效评级章 A（陶土橘）|
| `A-EMOTE-RANK-B.png` | 绩效评级章 B（灰薄荷绿，主线默认）|
| `A-EMOTE-RANK-C.png` | 绩效评级章 C（雾紫）|
| `A-EMOTE-RANK-D.png` | 绩效评级章 D（砖红）|

### `atoms/assets/art/endings/` (4 张)

| 文件 | 触发结局 |
|------|---------|
| `A-END-E01.png` | E01 满血上市（含格鲁巴斯私信）|
| `A-END-E02.png` | E02 上市破发 |
| `A-END-E03.png` | E03 无人值守 |
| `A-END-E04.png` | E04 公司破产（含格鲁巴斯最后留言）|

### `atoms/assets/art/props/` (1 张)

| 文件 | 用途 |
|------|------|
| `A-PROP-SHARD-ICON.png` | 灵魂碎片图标（货币显示，全局 HUD + EVAL）|

---

## 3. game_design.md 交叉引用速查

| game_design.md 章节 | 相关资产 |
|-------------------|---------|
| §1 核心循环 / §2 状态机 | A-UI-BTN（5 个动作按钮）|
| §3 经济参数 | A-PROP-SHARD-ICON（货币图标）|
| §4 怪物 schema `art_id` | A-CHR-* (6 张) |
| §6 关卡数据 L01–L07 | A-BG-PREP / A-BG-BATTLE / A-ENE-W01-W04 / A-ENE-ELITE / A-END-E01-E04 |
| §6 L01 数值（起始 50 碎片）| A-PROP-SHARD-ICON |
| §6 L07 结局判定 | A-END-E01 / E02 / E03 / E04 |
| §7 突发事件库 B01-B07 + C01 | A-UI-CARD-EVENT + A-UI-TIMER + A-UI-BTN |
| §8 T 系列触发点 | T01/P04/T07 → A-UI-MAIL-CEO + A-EMOTE-CEO-STAMP；T02/T04 → A-UI-TOAST |
| §9 角色表 | A-CHR-HR / A-CHR-GROOBAS / A-CHR-XIAOXING |
| §10 简历系统 | A-UI-RESUME + A-CHR-* 立绘 |
| §11.1 主屏 mockup | A-BG-PREP / A-CHR-HR / A-PROP-SHARD-ICON / A-UI-BTN / 3 个 ICO |
| §11.2 战斗界面 mockup | A-BG-BATTLE / A-UI-HPBAR / A-UI-CARD-EVENT / A-CHR-* / A-ENE-* |
| §11.3 突发事件卡片 | A-UI-CARD-EVENT / A-UI-TIMER / A-UI-BTN |
| §11.4 简历卡片 | A-UI-RESUME / A-CHR-* |
| §11.5 邮件 / 弹窗 | A-UI-MAIL-CEO / A-EMOTE-CEO-STAMP |
| §11.6 EVAL 屏 | A-UI-RESULT / A-EMOTE-RANK-S/A/B/C/D / A-PROP-SHARD-ICON / A-CHR-* |

---

## 4. 替换工作流建议

### 步骤 1：建立 art_id → 路径映射常量

在 atoms 工程入口（如 `atoms/data/art.json` 或代码常量层）建立映射，所有引用走该映射避免硬编码。

```json
{
  "A-BG-PREP":         "assets/art/backgrounds/A-BG-PREP.png",
  "A-BG-BATTLE":       "assets/art/backgrounds/A-BG-BATTLE.png",
  "A-CHR-HR":          "assets/art/characters/A-CHR-HR.png",
  "A-CHR-GROOBAS":     "assets/art/characters/A-CHR-GROOBAS.png",
  "A-CHR-XIAOXING":    "assets/art/characters/A-CHR-XIAOXING.png",
  "A-CHR-GENERIC-1":   "assets/art/characters/A-CHR-GENERIC-1.png",
  "A-CHR-GENERIC-2":   "assets/art/characters/A-CHR-GENERIC-2.png",
  "A-CHR-GENERIC-3":   "assets/art/characters/A-CHR-GENERIC-3.png",
  "A-ENE-W01":         "assets/art/enemies/A-ENE-W01.png",
  "A-ENE-W02":         "assets/art/enemies/A-ENE-W02.png",
  "A-ENE-W03":         "assets/art/enemies/A-ENE-W03.png",
  "A-ENE-W04":         "assets/art/enemies/A-ENE-W04.png",
  "A-ENE-ELITE":       "assets/art/enemies/A-ENE-ELITE.png",
  "A-UI-TITLE":        "assets/art/ui/A-UI-TITLE.png",
  "A-UI-CARD-EVENT":   "assets/art/ui/A-UI-CARD-EVENT.png",
  "A-UI-MAIL-CEO":     "assets/art/ui/A-UI-MAIL-CEO.png",
  "A-UI-RESUME":       "assets/art/ui/A-UI-RESUME.png",
  "A-UI-RESULT":       "assets/art/ui/A-UI-RESULT.png",
  "A-UI-TOAST":        "assets/art/ui/A-UI-TOAST.png",
  "A-UI-HPBAR":        "assets/art/ui/A-UI-HPBAR.png",
  "A-UI-TIMER":        "assets/art/ui/A-UI-TIMER.png",
  "A-UI-BTN":          "assets/art/ui/A-UI-BTN.png",
  "A-UI-ICO-PAUSE":    "assets/art/ui/A-UI-ICO-PAUSE.png",
  "A-UI-ICO-VOLUME":   "assets/art/ui/A-UI-ICO-VOLUME.png",
  "A-UI-ICO-RESTART":  "assets/art/ui/A-UI-ICO-RESTART.png",
  "A-EMOTE-CEO-STAMP": "assets/art/emotes/A-EMOTE-CEO-STAMP.png",
  "A-EMOTE-RANK-S":    "assets/art/emotes/A-EMOTE-RANK-S.png",
  "A-EMOTE-RANK-A":    "assets/art/emotes/A-EMOTE-RANK-A.png",
  "A-EMOTE-RANK-B":    "assets/art/emotes/A-EMOTE-RANK-B.png",
  "A-EMOTE-RANK-C":    "assets/art/emotes/A-EMOTE-RANK-C.png",
  "A-EMOTE-RANK-D":    "assets/art/emotes/A-EMOTE-RANK-D.png",
  "A-END-E01":         "assets/art/endings/A-END-E01.png",
  "A-END-E02":         "assets/art/endings/A-END-E02.png",
  "A-END-E03":         "assets/art/endings/A-END-E03.png",
  "A-END-E04":         "assets/art/endings/A-END-E04.png",
  "A-PROP-SHARD-ICON": "assets/art/props/A-PROP-SHARD-ICON.png"
}
```

### 步骤 2：按场景顺序替换占位

建议替换顺序（从用户首次看到的顺序起）：

1. **启动**：`A-UI-TITLE`（splash 屏）
2. **L01 入职**：A-BG-PREP / A-CHR-HR / A-UI-MAIL-CEO + A-EMOTE-CEO-STAMP（T01）/ A-PROP-SHARD-ICON / A-UI-BTN / A-UI-TOAST（T02 + 打零工教学）/ A-UI-RESUME / A-CHR-GROOBAS-XIAOXING-GENERIC-* / 3 个 ICO
3. **L02 首战**：A-BG-BATTLE / A-UI-HPBAR / A-UI-CARD-EVENT（B01 + C01 + T04）/ A-UI-TIMER / A-ENE-W01
4. **L03 阵亡**：A-ENE-W02 / A-UI-RESULT / A-EMOTE-RANK-* (5 张) / 阵亡报告（A-UI-CARD-EVENT 复用）
5. **L04 谈薪**：A-ENE-W03 / A-UI-MAIL-CEO（P04，本关末第 4 波结束）
6. **L05 中期警告**：A-ENE-W04
7. **L06 决战**：A-ENE-ELITE
8. **L07 结局**：A-END-E01-E04（按触发条件四选一）+ A-UI-MAIL-CEO + A-EMOTE-CEO-STAMP（T07 股权激励信，仅 E01）

### 步骤 3：验证清单

每个场景替换后在 atoms 内截图核对：
- [ ] 启动屏：A-UI-TITLE 居中 + Start 按钮位置正确
- [ ] L01 主屏：A-BG-PREP 铺满 + A-CHR-HR 在左 + 4 动作按钮 + 顶栏碎片 50（balance v0.6.0）
- [ ] T01 邮件：A-UI-MAIL-CEO + A-EMOTE-CEO-STAMP 印章右下
- [ ] T02 教学：A-UI-TOAST 指向"招募"按钮
- [ ] L01 招募：A-UI-RESUME × 3 + 头像贴 A-CHR-* 立绘
- [ ] L02 战斗：A-BG-BATTLE 铺满 + 怪物 / A-ENE-W01 双方 HP 条 + 战斗日志框（A-UI-CARD-EVENT 复用）
- [ ] B01/C01 突发：A-UI-CARD-EVENT 全屏弹出 + A-UI-TIMER 在顶 + 两个 A-UI-BTN
- [ ] L03 EVAL：A-UI-RESULT 展开 + A-EMOTE-RANK-? 评级章 + A-PROP-SHARD-ICON 抚恤金 / 提成
- [ ] L04 P02 谈薪 + P04 邮件：A-CHR-XIAOXING 谈薪发起人 + A-UI-MAIL-CEO P04
- [ ] L05/L06 战斗界面：A-ENE-W04 / A-ENE-ELITE
- [ ] L07 结局：四张 A-END-* 按条件路由

---

## 5. 兜底降级 / 缺图处理

如果某 PNG 加载失败或缺失，atoms 应有降级策略（参考 `design/art_asset_list.md` §11 资产降级备选）：

| 资产 | 降级方案 |
|------|---------|
| `A-BG-PREP` / `A-BG-BATTLE` | 直接用 `#B8B5A8` 纯灰背景 + 单条公文体标题文字 |
| `A-CHR-*` 立绘 | 256×256 头像圆框纯色 + 角色名首字 |
| `A-ENE-W01-W04` | 5 张梯度可降级为 1 张 + 头顶等级数字标签（W01/W02 等）|
| `A-UI-CARD-EVENT` | 9-slice 纯色矩形 + 描边 |
| `A-END-E01-E04` | **不可降级**（叙事关键收割点）；若加载失败建议直接 abort 并提示 |
| `A-EMOTE-CEO-STAMP` | 纯 `#C97B5C` 印章圆 + "CEO" 文字 |
| 其他 UI / 图标 | 用 atoms 默认 UI 风格代替（不影响游戏可玩性）|

---

## 6. 不需要的图片（不在 36 张 final 内的资产 ID）

为避免 atoms AI 误以为还有别的资产没生成，明确以下 asset ID **不存在 / 不出图，以代码或现有资产替代**：

| Asset ID | 替代方案 |
|----------|---------|
| `A-CHR-CEO` | 不出独立立绘 → 用 A-UI-MAIL-CEO + A-EMOTE-CEO-STAMP |
| `A-UI-BATTLELOG` | 用 A-UI-CARD-EVENT 配色变体 |
| `A-UI-MEMO` | 用 A-UI-CARD-EVENT 配色变体 |
| `A-UI-ICO-RECRUIT` / `A-UI-ICO-EXPAND` / `A-UI-ICO-BONUS` / `A-UI-ICO-WARNING` / `A-UI-ICO-NEGOTIATE` | 用 A-UI-BTN + 文字 + emoji 兜底（不出独立图标）|
| `A-PROP-BADGE` / `A-PROP-BRIEFCASE` | 立绘内已带（A-CHR-HR 自身有工牌+公文包），不另出 |
| `A-FX-SHARD` / `A-FX-CRIT` / `A-FX-LEVELUP` / `A-FX-BONUS-AURA` | atoms 用粒子 / tween 实现，不出图 |
| `A-CHR-HR-FACE` / `A-CHR-GROOBAS-MSG` | 用立绘裁切（A-CHR-HR / A-CHR-GROOBAS 头部裁切）|

---

## 文档版本记录

### v1.0（2026-06-03）— 首版

- 36 张 final 资产 → 9 个游戏场景 / UI 模块的完整映射
- 配套 `game_design.md` v0.7 / `../design/balance.md` v0.6.0
- 包含 art_id → 路径常量 / 替换顺序 / 验证清单 / 兜底降级 / 不出图资产清单
