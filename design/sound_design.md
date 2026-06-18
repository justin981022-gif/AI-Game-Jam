# 音效需求文档 - 地下城打工人（Dungeon HR）

**版本**：v1.0  
**日期**：2026-06-17  
**用途**：给音频制作、程序接入、策划对齐使用

---

## 1. 目标

本作需要一套“职场感 UI + 轻奇幻战斗”的音频系统，覆盖：

- 准备阶段的操作反馈
- 战斗中的回合、命中、暴击、阵亡、事件
- 结算、结局、剧情邮件
- 经济提示与高压警告

当前代码里没有现成音频系统，也没有音频资源，因此本需求同时定义：

1. 需要做哪些声音
2. 每个声音怎么命名
3. 什么时候触发

---

## 2. 命名规范

统一使用英文大写 + 下划线：

- `BGM_PREP_LOOP`
- `SFX_UI_BUTTON_CLICK`
- `SFX_BATTLE_HIT_MONSTER`
- `VO_T01_CEO_MAIL`

规则：

- `BGM_`：背景音乐
- `SFX_`：音效
- `VO_`：剧情语音或朗读
- `AMBI_`：环境底噪
- `STINGER_`：短促转场/强化提示

---

## 3. 必交付清单

### BGM

| ID | 名称 | 场景 | 备注 |
|---|---|---|---|
| `BGM_TITLE_LOOP` | 标题页音乐 | 首屏 | 轻松但略荒诞 |
| `BGM_PREP_LOOP` | 准备阶段循环 | L01-L10 准备页 | 职场感、稳态、带一点压力 |
| `BGM_BATTLE_LOOP` | 战斗阶段循环 | 所有战斗关 | 节奏更紧，带推进感 |
| `BGM_EVAL_LOOP` | 绩效结算循环 | EVAL | 稍冷、带报表感 |
| `BGM_ENDING_GOOD` | 好结局音乐 | E01 / E02 | 收束感，略苦涩 |
| `BGM_ENDING_BAD` | 坏结局音乐 | E03 / E04 | 冷、压抑、短促收尾 |

### 通用 UI

| ID | 名称 | 触发 |
|---|---|---|
| `SFX_UI_BUTTON_CLICK` | 普通按钮点击 | 所有可点按钮 |
| `SFX_UI_BUTTON_HOVER` | 悬停反馈 | PC 端 hover |
| `SFX_UI_PANEL_OPEN` | 面板弹出 | 招募、奖金、培训、谈薪、结局等弹窗 |
| `SFX_UI_PANEL_CLOSE` | 面板关闭 | 所有弹窗关闭 |
| `SFX_UI_TOAST` | 短提示音 | toast / 系统提示 |
| `SFX_UI_TOGGLE` | 开关切换 | 加速、音量、选项切换 |
| `SFX_UI_CONFIRM` | 确认提交 | 选简历、选事件、选成长、选方针 |
| `SFX_UI_CANCEL` | 取消返回 | 关闭弹窗/返回上层 |

### 准备阶段

| ID | 名称 | 触发 |
|---|---|---|
| `SFX_RECRUIT_OPEN` | 招募界面打开 | 点击招募 |
| `SFX_RECRUIT_PICK` | 招募确认 | 选中简历入职 |
| `SFX_RECRUIT_REFRESH` | 简历刷新 | 刷新招募池 |
| `SFX_BUILD_SUCCESS` | 扩建成功 | 槽位 +1 |
| `SFX_LABOR_GAIN` | 打零工到账 | 1 AP -> 碎片 |
| `SFX_BONUS_SMALL` | 小额奖金 | 发放小额奖金 |
| `SFX_BONUS_MEDIUM` | 中额奖金 | 发放中额奖金 |
| `SFX_BONUS_LARGE` | 大额奖金 | 发放大额奖金 |
| `SFX_TRAINING_START` | 培训开始 | 打开单独培训 |
| `SFX_TRAINING_SUCCESS` | 培训完成 | 怪物升级 |
| `SFX_POLICY_SELECT` | 方针选择 | 经营方针确认 |
| `SFX_PREP_EVENT_OPEN` | 准备事件弹出 | P-E01~P-E05 |
| `SFX_PREP_EVENT_RESOLVE` | 准备事件结算 | 选择事件选项后 |

### 战斗核心

| ID | 名称 | 触发 |
|---|---|---|
| `SFX_BATTLE_START` | 开战 | 点击开战 |
| `SFX_BATTLE_TICK` | 回合推进 | 每个 ROUND_TICK 开始 |
| `SFX_BATTLE_HIT_MONSTER` | 我方命中 | 怪物攻击命中勇者 |
| `SFX_BATTLE_HIT_HERO` | 敌方命中 | 勇者攻击命中我方 |
| `SFX_BATTLE_MISS` | 未命中 | 任一方 miss |
| `SFX_BATTLE_CRIT` | 暴击 | 任一方暴击 |
| `SFX_BATTLE_DEATH_MONSTER` | 我方阵亡 | 怪物死亡 |
| `SFX_BATTLE_DEATH_HERO` | 勇者受挫 | 勇者血量归零，战斗胜利瞬间 |
| `SFX_BATTLE_EVENT_PAUSE` | 事件暂停 | 突发事件弹出时 |
| `SFX_BATTLE_EVENT_CHOICE` | 事件选择 | 玩家点选 A/B |
| `SFX_BATTLE_TIMEOUT` | 事件超时 | 10 秒倒计时结束 |
| `SFX_BATTLE_ACCELERATE` | 战斗加速 | x1/x2/x4 切换 |

### 结算 / 叙事 / 结局

| ID | 名称 | 触发 |
|---|---|---|
| `SFX_EVAL_OPEN` | 绩效屏打开 | 战斗结束进入 EVAL |
| `SFX_EVAL_PENSION` | 抚恤扣款 | 阵亡结算 |
| `SFX_EVAL_REWARD` | 绩效入账 | 通关奖励到账 |
| `SFX_LEVEL_UP` | 升级成功 | 结算后成长 |
| `SFX_ECONOMY_WARN` | 经济告急 | P03 / P05 |
| `SFX_MAIL_RECEIVE` | 邮件到达 | T01 / P04 / T07 |
| `SFX_STINGER_TENSION` | 高压提示 | T03 / T06 / P03 |
| `SFX_ENDING_WIN` | 胜利结局 | E01 / E02 |
| `SFX_ENDING_LOSE` | 失败结局 | E03 / E04 |
| `SFX_ENDING_FINAL` | 最终收束 | 结局字幕淡出 |

---

## 4. 关键剧情语音 / 文本音

如果后续要做轻量配音，建议只做“系统朗读感”而非全角色表演。

| ID | 名称 | 触发 |
|---|---|---|
| `VO_T01_CEO_MAIL` | CEO 入职邮件 | T01 |
| `VO_T03_ALARM` | 突袭警报 | T03 |
| `VO_T05_MEMO` | 阵亡备忘录 | T05 |
| `VO_T06_FINAL_NOTICE` | 最终压力测试通知 | T06 |
| `VO_T07_LISTING` | 上市钟声邮件 | T07 |
| `VO_T08_FAILURE` | 无人值守失败说明 | T08 |
| `VO_T09_BANKRUPT` | 破产通知 | T09 |
| `VO_C01_PENDING` | 合同未签提示 | C01 |
| `VO_B07_FIRST_CRIT` | 首次暴击挖人提示 | B07 |

---

## 5. 建议优先级

### P0

- `BGM_PREP_LOOP`
- `BGM_BATTLE_LOOP`
- `SFX_UI_BUTTON_CLICK`
- `SFX_BATTLE_HIT_MONSTER`
- `SFX_BATTLE_HIT_HERO`
- `SFX_BATTLE_DEATH_MONSTER`
- `SFX_EVAL_OPEN`
- `SFX_ENDING_WIN`
- `SFX_ENDING_LOSE`

### P1

- 所有招募 / 奖金 / 培训 / 事件 / 经济警告音
- `BGM_TITLE_LOOP`
- `BGM_EVAL_LOOP`

### P2

- `VO_*` 轻量剧情音
- `STINGER_*`
- `AMBI_*`

---

## 6. 风格约束

- 不要做成厚重史诗风
- 不要太可爱
- UI 音要干净、短、明确
- 战斗音要有冲击，但不要写实血腥
- 结局音要保留一点苦味

---

## 7. 交付建议

建议最终交付目录按以下方式命名：

```text
audio/
  bgm/
  sfx/
  vo/
  stinger/
```

文件名直接使用上面的 ID，例如：

- `BGM_PREP_LOOP.mp3`
- `SFX_BATTLE_DEATH_MONSTER.wav`
- `VO_T01_CEO_MAIL.ogg`

