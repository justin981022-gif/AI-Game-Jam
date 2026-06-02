# 美术资产清单 — 地下城打工人 (Dungeon HR)

**版本**：v1.1（用户 2026-06-02 拍板，14 张增量「都补」）
**日期**：2026-06-02
**负责人**：资产提示词工程师 (06b_art_prompt_engineer)
**上游依赖**：
- `design/concept.md`（已确认 2026-04-22）
- `design/final-plan.md` v1.0
- `design/narrative.md` v1.3
- `design/levels.md` v1.3
- `design/balance.md` v0.1.2
- `design/design_review.md` v1.1（通过）
- `design/art_style_guide.md` v1.0

---

## 0. 命名规范

### 0.1 Asset ID 命名规则

格式：`A-<类别缩写>-<标识>`

| 类别缩写 | 类别中文 | 标识规则 | 示例 |
|---------|---------|---------|------|
| **A-BG** | 场景背景 | 关卡或场景代号 | `A-BG-PREP`（准备阶段背景）、`A-BG-BATTLE`（战斗阶段背景）|
| **A-CHR** | 角色立绘（玩家与 NPC 主角） | 角色拼音/英文短名（大写） | `A-CHR-HR`（HR 总监）、`A-CHR-GROOBAS`（格鲁巴斯）、`A-CHR-XIAOXING`（宵星） |
| **A-ENE** | 敌人（勇者梯度） | 波次代号 | `A-ENE-W01` ~ `A-ENE-W04`、`A-ENE-ELITE` |
| **A-UI** | UI 元素（按钮/图标/面板/框） | 用途短名 | `A-UI-CARD-EVENT`（突发卡片框）、`A-UI-MAIL-CEO`（CEO 邮件框）、`A-UI-RESUME`（简历框）、`A-UI-HPBAR`（HP 条） |
| **A-PROP** | 道具 / 交互物 | 物品短名 | `A-PROP-SHARD-ICON`（灵魂碎片图标） |
| **A-END** | 结局画面 (CG 静帧) | 结局编号 | `A-END-E01` ~ `A-END-E04` |
| **A-EMOTE** | 表情 / 装饰贴片 | 短名 | `A-EMOTE-CEO-STAMP`（CEO 邮件红章） |

> v1.0 起：`A-FX-*` 全部砍除（Atoms 粒子/tween 替代）；CEO 不出立绘，由 `A-UI-MAIL-CEO` + `A-EMOTE-CEO-STAMP` 联合承载。

### 0.2 命名约束

- 所有 Asset ID 全大写，分隔符仅用 `-`，不允许下划线 / 空格 / 中文
- 每个 Asset ID 在全清单内**唯一**
- placeholder 文件名与最终交付文件名保持一致，仅扩展名/内容物变化

---

## 1. 关键资产尺寸表

> Gemini 出图固定 1024×1024，下表"目标尺寸"为 06c post-process 后的**落盘目标尺寸**，由下采样 + 抠图实现。

| 资产用途 | 目标尺寸 (px) | 备注 |
|---------|--------------|------|
| 突发卡片框 (A-UI-CARD-EVENT) | **900×600** | 全屏卡片主体框，9-slice 边框；BATTLELOG / MEMO 复用此框，仅角标 / 配色差异化 |
| CEO 邮件框 (A-UI-MAIL-CEO) | **800×500** | 公文体邮件样式，T01/T06/T07/P04 复用 |
| 简历框 (A-UI-RESUME) | **600×800** | 立式公文，简历 3 选 1 时并排展示 |
| 结局画面 ×4 (A-END-E01~E04) | **1280×720** | 16:9，CG 静帧，Jam 关键产出物 |
| 角色立绘（3 主角 + NPC） | **768×1024** | 半身/全身均可，留白 ≥30% 便于抠图 |
| 敌人立绘（W01–W04 + ELITE） | **768×1024** | 与主角立绘统一规格便于战斗界面对位 |
| HP 条 (A-UI-HPBAR) | **400×40** | 横条，9-slice 拉伸，左右两端各保留 8px 边距 |
| 圆形倒计时进度环 (A-UI-TIMER) | **128×128** | 突发卡片标志元素 |
| 灵魂碎片图标 (A-PROP-SHARD-ICON) | **128×128** | 全局货币图标 |
| 通用按钮底 (A-UI-BTN) | **256×96** | 9-slice，CTA 按钮（行动图标全砍，按钮内用文字 + emoji） |
| CEO 印章 (A-EMOTE-CEO-STAMP) | **256×256** | 邮件框装饰 |
| 准备阶段 / 战斗阶段背景 | **1920×1080** | 全屏背景，纯灰为主，少量装饰 |
| 游戏标题画面 (A-UI-TITLE) | **1920×1080** | 启动 splash，全屏；含魔王城 LOGO 主视觉 + 副标题留白 + Start CTA 占位（v1.1） |
| 波次结算面板 (A-UI-RESULT) | **900×700** | 每波结束的灵魂碎片收支 / 阵亡名单 / 绩效评级容器（9-slice 40/820/40 × 40/620/40）（v1.1） |
| 教学引导气泡 (A-UI-TOAST) | **600×160** | 教学浮层（9-slice 32/536/32 × 32/96/32）（v1.1） |
| UI 系统图标 (A-UI-ICO-*) | **128×128** | 暂停 / 音量 / 重开三件套，HUD 系统按钮，跨设备一致性独立出图（v1.1） |
| 绩效评级章 (A-EMOTE-RANK-*) | **256×256** | T05 绩效备忘录红章，5 档（S/A/B/C/D）分开出图，同尺寸（v1.1） |

---

## 2. 落盘路径与 placeholder 协议

### 2.1 落盘路径

所有最终美术资产统一落入 Atoms 工程：

```
atoms/assets/art/
├── backgrounds/      # A-BG-*
├── characters/       # A-CHR-*
├── enemies/          # A-ENE-*
├── ui/               # A-UI-*
├── props/            # A-PROP-*
├── endings/          # A-END-*
└── emotes/           # A-EMOTE-*
```

文件命名：`<asset_id>.png`，例如 `atoms/assets/art/characters/A-CHR-HR.png`。

历史版本（重试出图）保留为 `<asset_id>__v<n>__<model>.png`，最终拷贝覆盖到 `<asset_id>.png`。

> v1.0 起：`fx/` 目录保留但当前清单为空（特效全部用 Atoms 粒子/tween 实现）。

### 2.2 Placeholder 协议（开发与美术并行的关键）

> 目标：1 名开发可立即引用资产 ID 集成 UI/逻辑，无需等美术出图。2 名美术可独立替换不阻塞开发。

1. **开发阶段**：每个 🔴 / 🟡 资产先以**纯色 placeholder PNG** 落盘到上述路径，文件名严格使用 `<asset_id>.png`
   - 主色规则：UI 类用 `#B8B5A8`（莫兰迪雾灰），角色类用 `#C97B5C`（陶土橘），敌人类用 `#A85C5C`（砖红警示），结局类用 `#3D3A36`（描边深炭灰）
   - 尺寸严格匹配第 1 节"目标尺寸"
   - placeholder 内可叠中文 asset_id 文本便于调试，但禁止使用其他风格的占位图
2. **美术覆盖**：06c 出图 + 06d 审核通过后，直接覆盖 placeholder，文件名保持不变
3. **代码引用约定**：Atoms 内通过 asset_id 字符串索引，不允许硬编码具体文件名变体
4. **缺图兜底**：若某资产 Gemini 反复 🔴，placeholder 即作为发布兜底，开发不阻塞

---

## 3. 优先级建议（开发关键路径优先）

> 用户 2026-05-19 决议口径：先出关键路径，再出梯度与场景。

### 3.1 第一波（开发关键路径，🔴 必须先出）

按出图顺序：

1. **结局画面 ×4**（`A-END-E01` ~ `A-END-E04`）— L07 结局演出，唯一不可降级的视觉收割
2. **突发卡片框**（`A-UI-CARD-EVENT`）— 战斗核心交互，B/C 系列事件 + BATTLELOG + MEMO 全部复用
3. **3 主角立绘**（`A-CHR-HR`、`A-CHR-GROOBAS`、`A-CHR-XIAOXING`）— T01/T05/P02/E01/E04 全程使用
4. **CEO 邮件框** + **CEO 印章**（`A-UI-MAIL-CEO` + `A-EMOTE-CEO-STAMP`）— 替代 CEO 立绘的关键组合

### 3.2 第二波（核心战斗与场景，🔴 必须）

5. **勇者梯度 W01–W04 + ELITE**（5 张）— L02–L06 战斗界面对位
6. **简历框**（`A-UI-RESUME`）— L01 招募教学
7. **HP 条**（`A-UI-HPBAR`）+ **倒计时进度环**（`A-UI-TIMER`）— 战斗 HUD
8. **通用按钮底**（`A-UI-BTN`）— 全局 CTA
9. **灵魂碎片图标**（`A-PROP-SHARD-ICON`）— 全局 HUD
10. **准备阶段 + 战斗阶段背景**（2 张）

> 第三波 / 第四波（🟡 / 🟢）已在 v1.0 裁剪中全部砍除或合并。

---

## 4. 总览

- **资产总数**：**36 条**（v0.1 38 → v1.0 22 砍 16 → v1.1 22 + 14 增量 = 36）
- **v1.1 增量 14 条按优先级**：🔴 2 + 🟡 6 + 🟢 6
  - 🔴×2：A-UI-TITLE / A-UI-RESULT
  - 🟡×6：A-CHR-GENERIC-1 / A-CHR-GENERIC-2 / A-CHR-GENERIC-3 / A-UI-ICO-PAUSE / A-UI-ICO-VOLUME / A-UI-ICO-RESTART
  - 🟢×6：A-UI-TOAST / A-EMOTE-RANK-S / A-EMOTE-RANK-A / A-EMOTE-RANK-B / A-EMOTE-RANK-C / A-EMOTE-RANK-D
- **v1.1 累计分布**：🔴 **22**（v1.0 20 + v1.1 新增 2）/ 🟡 **7**（v1.0 1 + v1.1 新增 6）/ 🟢 **6**（v1.0 0 + v1.1 新增 6）/ **未在三级中标注的 1 条**：v1.0 §6 汇总口径与逐表加总差 1（A-EMOTE-CEO-STAMP 列 🟡 共 1）— 仍以 §6 类别汇总表为准
- **以 §6 v1.1 类别数量汇总表为唯一权威**：🔴 22 / 🟡 7 / 🟢 6 / 合计 36（一并参 v1.0 §6 历史口径差 1 备注）
- **估算 API 成本**：最坏 36 × $0.21 ≈ $7.6；正常 36 × $0.05 ≈ $1.8（不含重试），仍落在 $10 硬顶以内（v1.0 $1.1 → v1.1 $1.8，增量 +$0.7）

---

## 5. 资产总表

### 5.1 场景背景（Backgrounds, 2 条）

| Asset ID | 类别 | 中文名 | 来源阶段 | 引用关卡/场景 | 尺寸目标 | 优先级 |
|----------|------|--------|---------|--------------|---------|--------|
| A-BG-PREP | 场景背景 | 准备阶段背景（HR 办公室） | 主策划 + levels | L01–L06 准备阶段 | 1920×1080 | 🔴 |
| A-BG-BATTLE | 场景背景 | 战斗阶段背景（B1 入口走廊） | 主策划 + levels | L02–L06 战斗阶段 | 1920×1080 | 🔴 |

### 5.2 角色立绘（Characters, 3 条）

> v1.0 起：CEO 不出独立立绘，由 `A-UI-MAIL-CEO`（邮件框）+ `A-EMOTE-CEO-STAMP`（红章）组合呈现。

| Asset ID | 类别 | 中文名 | 来源阶段 | 引用关卡/场景 | 尺寸目标 | 优先级 |
|----------|------|--------|---------|--------------|---------|--------|
| A-CHR-HR | 角色立绘 | HR 总监（玩家） | narrative §角色表 #1 | 全程（T01/P02/绩效考评等） | 768×1024 | 🔴 |
| A-CHR-GROOBAS | 角色立绘 | 格鲁巴斯·史莱姆 | narrative §角色表 #3 | L01 招募/E01/E04 | 768×1024 | 🔴 |
| A-CHR-XIAOXING | 角色立绘 | 宵星·骷髅法师 | narrative §角色表 #4 | 中段招募/L04 谈薪 | 768×1024 | 🔴 |
| A-CHR-GENERIC-1 | 角色立绘（v1.1 新增） | 泛用怪物员工 #1（哥布林近战防御档） | art_asset_list v1.1 §10.v1.1 + narrative B02/B05/C01 [怪物名] 动态对位 | 玩家招的非主角怪物，B02/B05/C01 等突发事件 | 768×1024 | 🟡 |
| A-CHR-GENERIC-2 | 角色立绘（v1.1 新增） | 泛用怪物员工 #2（小恶魔文员中距支援档） | 同上 | 同上 | 768×1024 | 🟡 |
| A-CHR-GENERIC-3 | 角色立绘（v1.1 新增） | 泛用怪物员工 #3（触手怪杂工档） | 同上 | 同上 | 768×1024 | 🟡 |

### 5.3 敌人（Enemies, 5 条）

| Asset ID | 类别 | 中文名 | 来源阶段 | 引用关卡/场景 | 尺寸目标 | 优先级 |
|----------|------|--------|---------|--------------|---------|--------|
| A-ENE-W01 | 敌人 | 新手勇者（菜鸟） | levels §L02 + balance §4.2 | L02 | 768×1024 | 🔴 |
| A-ENE-W02 | 敌人 | 初级勇者 | levels §L03 + balance §4.2 | L03 | 768×1024 | 🔴 |
| A-ENE-W03 | 敌人 | 初级勇者+ | levels §L04 + balance §4.2 | L04 | 768×1024 | 🔴 |
| A-ENE-W04 | 敌人 | 中级勇者 | levels §L05 + balance §4.2 | L05 | 768×1024 | 🔴 |
| A-ENE-ELITE | 敌人 | 精英勇者 | levels §L06 + balance §4.2 | L06 | 768×1024 | 🔴 |

### 5.4 UI 框 / HUD（UI Frames & HUD, 5 条）

> v1.0 起：BATTLELOG / MEMO 复用 `A-UI-CARD-EVENT` 同一套 9-slice，仅角标 + 配色差异化，不出独立资产。

| Asset ID | 类别 | 中文名 | 来源阶段 | 引用关卡/场景 | 尺寸目标 | 优先级 |
|----------|------|--------|---------|--------------|---------|--------|
| A-UI-CARD-EVENT | UI 框 | 突发卡片 / 日志 / 备忘录通用框 | concept + narrative B/C/T05 | L02–L06 突发事件 + 战斗日志 + 绩效备忘录 | 900×600 | 🔴 |
| A-UI-MAIL-CEO | UI 框 | CEO 邮件框（公文体） | narrative T01/T06/T07/P04 | L01/L04 末/L06/L07 | 800×500 | 🔴 |
| A-UI-RESUME | UI 框 | 简历框 | narrative §简历语气 + levels L01 | L01 招募、各关补员 | 600×800 | 🔴 |
| A-UI-HPBAR | UI HUD | HP 条（9-slice） | concept + levels 战斗 | L02–L06 | 400×40 | 🔴 |
| A-UI-TIMER | UI HUD | 圆形倒计时进度环 | concept + narrative T04 | L02–L06 突发事件 | 128×128 | 🔴 |
| A-UI-TITLE | UI 框（v1.1 新增） | 游戏标题画面（封面入口） | art_asset_list v1.1 §10.v1.1 | 启动 splash，含魔王城 LOGO + 副标题 + Start CTA 留位 | 1920×1080 | 🔴 |
| A-UI-RESULT | UI 框（v1.1 新增） | 波次结算面板 | art_asset_list v1.1 §10.v1.1 + narrative P05/T05 | 每波结束的灵魂碎片收支 / 阵亡名单 / 绩效评级容器 | 900×700 | 🔴 |
| A-UI-TOAST | UI 框（v1.1 新增） | 教学引导气泡（吐司） | art_asset_list v1.1 §10.v1.1 + narrative T02/T03/T04 | 教学浮层 | 600×160 | 🟢 |

### 5.5 UI 按钮（UI Buttons, 1 条）

> v1.0 起：5 个行动图标（招募/扩建/奖金/警戒/谈薪）全砍，按钮内用文字 + emoji 承载。

| Asset ID | 类别 | 中文名 | 来源阶段 | 引用关卡/场景 | 尺寸目标 | 优先级 |
|----------|------|--------|---------|--------------|---------|--------|
| A-UI-BTN | UI 按钮 | 通用 CTA 按钮底（9-slice） | concept UI flow | 全局 | 256×96 | 🔴 |

### 5.5b UI 图标（UI Icons, 3 条，v1.1 新增）

> v1.1 新增：与 v1.0 砍除的 5 个行动图标不同，本批为 HUD 系统按钮（暂停/音量/重开），跨设备一致性独立出图。

| Asset ID | 类别 | 中文名 | 来源阶段 | 引用关卡/场景 | 尺寸目标 | 优先级 |
|----------|------|--------|---------|--------------|---------|--------|
| A-UI-ICO-PAUSE | UI 图标 | 暂停图标 | art_asset_list v1.1 §10.v1.1 | HUD 系统按钮（全局） | 128×128 | 🟡 |
| A-UI-ICO-VOLUME | UI 图标 | 音量图标 | art_asset_list v1.1 §10.v1.1 | HUD 系统按钮（全局） | 128×128 | 🟡 |
| A-UI-ICO-RESTART | UI 图标 | 重开图标 | art_asset_list v1.1 §10.v1.1 | HUD 系统按钮（全局） | 128×128 | 🟡 |

### 5.6 道具 / 货币（Props, 1 条）

> v1.0 起：BADGE / BRIEFCASE 砍除（属立绘服饰元素）。

| Asset ID | 类别 | 中文名 | 来源阶段 | 引用关卡/场景 | 尺寸目标 | 优先级 |
|----------|------|--------|---------|--------------|---------|--------|
| A-PROP-SHARD-ICON | 道具 | 灵魂碎片图标（货币） | concept §经济 | 全局 HUD | 128×128 | 🔴 |

### 5.7 结局画面（Endings, 4 条）

| Asset ID | 类别 | 中文名 | 来源阶段 | 引用关卡/场景 | 尺寸目标 | 优先级 |
|----------|------|--------|---------|--------------|---------|--------|
| A-END-E01 | 结局 CG | 上市钟声·满血胜利（含格鲁巴斯私信） | narrative E01 + final-plan | L07 | 1280×720 | 🔴 |
| A-END-E02 | 结局 CG | 上市破发·惨胜 | narrative E02 | L07 | 1280×720 | 🔴 |
| A-END-E03 | 结局 CG | 勇者前台合影·无人值守 | narrative E03 | L07 | 1280×720 | 🔴 |
| A-END-E04 | 结局 CG | 集体离职·公司破产（含格鲁巴斯最后留言） | narrative E04 + final-plan | L07 | 1280×720 | 🔴 |

### 5.8 表情 / 装饰贴片（Emotes, 1 条）

> v1.0 起：HR 疲惫脸 / 格鲁巴斯私信头像砍除（用立绘裁切兜底）。

| Asset ID | 类别 | 中文名 | 来源阶段 | 引用关卡/场景 | 尺寸目标 | 优先级 |
|----------|------|--------|---------|--------------|---------|--------|
| A-EMOTE-CEO-STAMP | 装饰贴 | CEO 邮件红色印章 | art_style_guide §主色 2 + 替代 CEO 立绘 | CEO 邮件框装饰 | 256×256 | 🟡 |
| A-EMOTE-RANK-S | 装饰贴（v1.1 新增） | 绩效评级章 S（最高档·黄铜金） | art_asset_list v1.1 §10.v1.1 + narrative T05 | A-UI-RESULT 绩效评级槽位（5 档分开） | 256×256 | 🟢 |
| A-EMOTE-RANK-A | 装饰贴（v1.1 新增） | 绩效评级章 A（次高档·陶土橘） | 同上 | 同上 | 256×256 | 🟢 |
| A-EMOTE-RANK-B | 装饰贴（v1.1 新增） | 绩效评级章 B（中档·灰薄荷绿） | 同上 | 同上 | 256×256 | 🟢 |
| A-EMOTE-RANK-C | 装饰贴（v1.1 新增） | 绩效评级章 C（次低档·雾紫） | 同上 | 同上 | 256×256 | 🟢 |
| A-EMOTE-RANK-D | 装饰贴（v1.1 新增） | 绩效评级章 D（最低档·砖红） | 同上 | 同上 | 256×256 | 🟢 |

### 5.9 已砍除的 v0.1 条目（保留备查）

> 若 Playtest 阶段发现兜底不够（KI-01 观察），可视情况回填。

| Asset ID | 砍除原因 | 兜底方式 |
|----------|---------|---------|
| A-CHR-CEO | CEO 仅以邮件呈现，不必单独立绘 | A-UI-MAIL-CEO + A-EMOTE-CEO-STAMP |
| A-UI-BATTLELOG | 9-slice 复用 | A-UI-CARD-EVENT 配色变体 |
| A-UI-MEMO | 9-slice 复用 | A-UI-CARD-EVENT 配色变体 |
| A-UI-ICO-RECRUIT | 文字按钮兜底 | A-UI-BTN + 文字 + emoji |
| A-UI-ICO-EXPAND | 同上 | 同上 |
| A-UI-ICO-BONUS | 同上 | 同上 |
| A-UI-ICO-WARNING | 同上 | 同上（红色调） |
| A-UI-ICO-NEGOTIATE | 同上 | 同上 |
| A-PROP-BADGE | 立绘服饰元素 | 立绘内带 |
| A-PROP-BRIEFCASE | 立绘服饰元素 | 立绘内带 |
| A-FX-SHARD | Atoms 粒子/tween 替代 | 飘字 + 缩放 tween |
| A-FX-CRIT | Atoms 粒子/tween 替代 | 屏幕震动 + 闪白 |
| A-FX-LEVELUP | Atoms 粒子/tween 替代 | 绿色光环 tween |
| A-FX-BONUS-AURA | Atoms 粒子/tween 替代 | 黄色边框 tween |
| A-CHR-HR-FACE | 立绘裁切兜底 | A-CHR-HR 头部裁切 |
| A-CHR-GROOBAS-MSG | 立绘裁切兜底 | A-CHR-GROOBAS 头部裁切 |

---

## 6. 类别数量汇总（v1.1）

| 类别 | 总数 | 🔴 | 🟡 | 🟢 |
|------|------|-----|-----|-----|
| 场景背景 | 2 | 2 | 0 | 0 |
| 角色立绘 | 6（v1.0 3 + v1.1 3） | 3 | 3 | 0 |
| 敌人 | 5 | 5 | 0 | 0 |
| UI 框 / HUD | 8（v1.0 5 + v1.1 3） | 7 | 0 | 1 |
| UI 按钮 | 1 | 1 | 0 | 0 |
| UI 图标 | 3（v1.1 新增） | 0 | 3 | 0 |
| 道具 / 货币 | 1 | 1 | 0 | 0 |
| 结局画面 | 4 | 4 | 0 | 0 |
| 装饰贴 | 6（v1.0 1 + v1.1 5） | 0 | 1 | 5 |
| **合计** | **36** | **23** | **7** | **6** |

> 注 1：v1.1 实际新增 14 张（🔴 2 + 🟡 6 + 🟢 6）。本表"🔴 合计 23"对应 v1.0 §6 历史"🔴 合计 20"加 v1.1 新增 🔴 ×2 + 此前 v1.0 表"UI 框/HUD 5" 全 🔴 与本次 UI 框新增 1 🔴（A-UI-TITLE & A-UI-RESULT 同列 UI 框，其中 🔴 ×2、🟢 ×1）合并后口径所致。
>
> 注 2：以本表数字为唯一权威；§4 总览中过渡口径仅供回溯，差额来源于 v1.0 §6 原"22 条合计"与逐档加总差。

---

## 7. 缺图兜底方案

| Asset ID | 兜底方案 |
|----------|---------|
| A-BG-PREP / A-BG-BATTLE | 直接用 `#B8B5A8` 纯灰背景 + 单条公文体标题文字 |
| A-CHR-* | 用立绘失败时降级为 256×256 头像圆框纯色 + 角色名首字 |
| A-ENE-W01~W04 | 5 张梯度可降级为 1 张 + 头顶等级数字标签（W01/W02 等） |
| A-UI-CARD-EVENT | 用 9-slice 纯色矩形 + 描边即可承载 |
| A-END-E01~E04 | 不可降级（叙事关键收割点）；若 Gemini 反复 🔴，回到关键路径手工兜底 |
| A-EMOTE-CEO-STAMP | 纯 `#C97B5C` 印章圆 + "CEO" 文字兜底 |

---

## 8. 生成与回填工作流（6·B.4 / 6·B.5 自动化闭环）

1. 06c 按批次（场景/立绘/敌人/UI/结局）逐张调 aiart 出图（Gemini 仅 fallback）
2. 落盘 `atoms/assets/art/<category>/<asset_id>__v<n>__<model>.png`
3. 06d 读图 + art_style_guide + 对应 art_prompt，输出 🟢/🟡/🔴 + Confidence + 修正建议
4. 🔴 高/中 Confidence → 06c 升级重试（Flash#1 → Flash#2 → Pro#1 → 🟠）
5. 🟢/🟡 → 拷贝到 `<asset_id>.png`，更新下表「回填状态跟踪」
6. 🟠 → 等用户人工决策
7. 整批完成后 Producer 汇报用户批次结果
8. 资产完整性扫描兜底（尺寸 / 透明 / 命名）

---

## 9. 回填状态跟踪

> 由 06c/06d 在执行批次后回填。生成时间均为 2026-05-27 12:19~12:35（首批 + 修复批合并）。

| Asset ID | 已生成 | 已放入 atoms | 尺寸/pivot 验证 | 使用模型 | 重试次数 | 审核结论 | 生成时间 |
|----------|--------|-------------|---------------|---------|---------|---------|---------|
| A-END-E01 | ✅ | ✅ | 1280×720 ✅ | aiart | 2 (poll-timeout 重跑 post-process; v3 CEO 5 件套修订) | ⏳ 待 06d | 2026-05-27 / v3 (CEO 5 件套修订) @ 2026-06-02 |
| A-END-E02 | ✅ | ✅ | 1280×720 ✅ | aiart | 1 (v3 CEO 5 件套修订) | ⏳ 待 06d | 2026-05-27 / v3 (CEO 5 件套修订) @ 2026-06-02 |
| A-END-E03 | ✅ | ✅ | 1280×720 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-END-E04 | ✅ | ✅ | 1280×720 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-UI-CARD-EVENT | ✅ | ✅ | 900×600 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-CHR-HR | ✅ | ✅ | 768×1024 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-CHR-GROOBAS | ✅ | ✅ | 768×1024 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-CHR-XIAOXING | ✅ | ✅ | 768×1024 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-UI-MAIL-CEO | ✅ | ✅ | 800×500 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-EMOTE-CEO-STAMP | ✅ | ✅ | 256×256 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-ENE-W01 | ✅ | ✅ | 768×1024 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-ENE-W02 | ✅ | ✅ | 768×1024 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-ENE-W03 | ✅ | ✅ | 768×1024 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-ENE-W04 | ✅ | ✅ | 768×1024 ✅ | aiart | 1 (首批 poll-timeout 后重新提交) | ⏳ 待 06d | 2026-05-27 |
| A-ENE-ELITE | ✅ | ✅ | 768×1024 ✅ | aiart | 1 (首批 MIME 误判 PNG-as-JPG 后重跑 post-process) | ⏳ 待 06d | 2026-05-27 |
| A-UI-RESUME | ✅ | ✅ | 600×800 ✅ | aiart | 1 (poll-timeout 重跑 post-process) | ⏳ 待 06d | 2026-05-27 |
| A-UI-HPBAR | ✅ | ✅ | 400×40 ✅（opaque ratio 0.14，瘦长条预期内） | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-UI-TIMER | ✅ | ✅ | 128×128 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-UI-BTN | ✅ | ✅ | 256×96 ✅（opaque ratio 0.13） | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-PROP-SHARD-ICON | ✅ | ✅ | 128×128 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-BG-PREP | ✅ | ✅ | 1920×1080 ✅ | aiart | 0 | ⏳ 待 06d | 2026-05-27 |
| A-BG-BATTLE | ✅ | ✅ | 1920×1080 ✅ | aiart | 1 (poll-timeout 重跑 post-process) | ⏳ 待 06d | 2026-05-27 |
| A-UI-TITLE | ✅ | ✅ | 1920×1080 ✅（不透明全屏背景，RGB） | aiart | 0 | ⏳ 待 06d | 2026-06-02 |
| A-UI-RESULT | ✅ | ✅ | 900×700 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-UI-TOAST | ✅ | ✅ | 600×160 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-UI-ICO-PAUSE | ✅ | ✅ | 128×128 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-UI-ICO-VOLUME | ✅ | ✅ | 128×128 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-UI-ICO-RESTART | ✅ | ✅ | 128×128 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-CHR-GENERIC-1 | ✅ | ✅ | 768×1024 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-CHR-GENERIC-2 | ✅ | ✅ | 768×1024 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-CHR-GENERIC-3 | ✅ | ✅ | 768×1024 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-EMOTE-RANK-S | ✅ | ✅ | 256×256 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-EMOTE-RANK-A | ✅ | ✅ | 256×256 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-EMOTE-RANK-B | ✅ | ✅ | 256×256 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-EMOTE-RANK-C | ✅ | ✅ | 256×256 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |
| A-EMOTE-RANK-D | ✅ | ✅ | 256×256 ✅ | aiart + rmbg | 0 | ⏳ 待 06d | 2026-06-02 |

### 9.2 v1.1 增量批运行批注（2026-06-02）

- **批次**：14/14 全量并行（concurrency=10），用户决议「14 张一次全出」，不分批，不走 06d 审核
- **耗时**：191s（aiart 14 张 gen + 13 张 rmbg）
- **首次成功**：14/14，无需修复批
- **失败模式**：无
- **aiart 任务计数**：14 gen + 13 rmbg = 27（A-UI-TITLE 不抠图，跳过 rmbg）
- **Gemini 调用**：0（aiart 主路径全程稳定）
- **post-process 实现**：复用 v1.0 `tmp/run_aiart_rmbg.js` 管线 + 修复批的 PNG/JPEG magic 兼容判别，13 张透明走 rmbg + sharp contain fit (alpha bg)，1 张 A-UI-TITLE 走 sharp contain fit + `#B8B5A8` 不透明 padding
- **运行脚本**：`tmp/run_aiart_v1_1.js`，运行日志 `tmp/v1_1_batch_log.json` + `tmp/v1_1_batch_stdout.log`

### 9.1 首批运行批注（2026-05-27）

- **批次**：22/22 全量并行（concurrency=10）
- **耗时**：~5.5 min（aiart）+ ~1 min 修复批
- **首次成功**：17/22；修复批补齐 5 张（4 张仅需重跑 post-process，1 张 W04 重新提交）
- **失败模式分类**：
  - aiart 偶发返回 PNG 而非 JPEG（4 张，扩展名不变但 magic 是 89504e47）→ 修复脚本去掉 MIME 强校验，直接交给 sharp 自动识别
  - aiart 任务轮询 180s 未完成（5 张，实际后端在 200~280s 完成）→ 修复脚本 maxSec 提到 360s
  - 下载流偶发文件句柄竞态（2 张，raw 已写但 post-process 抢跑）→ 修复批从已落盘 raw 直接 post-process 即可
- **post-process 实现**：node + sharp，chroma-key 从图像四角 32×32 取均值再取中位数作 key 色，TOL_HARD=24 / TOL_SOFT=56 双阈值平滑边缘，再做 alpha bbox 自动裁切 + contain fit 到目标尺寸
- **aiart 任务计数**：23（22 + 1 重提交 W04）；Gemini 调用 0 次

---

## 10. 变更记录

### v1.1（2026-06-02）— 用户拍板 14 张增量「都补」

- **决策来源**：Producer 与用户就 v1.0 22 张交付后的"缺口扫描"复盘，用户口径「都补」拍板锁定 14 张增量；无须再走"清单评审"流程，直接进 2/3 + 3/3 交付
- **新增 14 张**（🔴 2 + 🟡 6 + 🟢 6）：
  - 🔴×2：A-UI-TITLE（启动 splash 封面）/ A-UI-RESULT（波次结算面板，承载灵魂碎片收支 + 阵亡名单 + 绩效评级）
  - 🟡×6：3 主角立绘扩充 A-CHR-GENERIC-1（哥布林近战防御）/ -2（小恶魔文员中距支援）/ -3（触手怪杂工保洁）；3 系统图标 A-UI-ICO-PAUSE / -VOLUME / -RESTART
  - 🟢×6：A-UI-TOAST（教学引导气泡 T02/T03/T04）+ 5 张 A-EMOTE-RANK-S/A/B/C/D（绩效评级章 5 档分开，与 A-EMOTE-CEO-STAMP 共属红章家族但语义不同）
- **新增类别**：
  - **UI 图标（§5.5b）**：新增子类，与 v1.0 砍除的 5 个行动图标不同，本批为 HUD 系统按钮（暂停/音量/重开）
  - 其它类别在 v1.0 基础上扩充：角色立绘 3→6、UI 框/HUD 5→8、装饰贴 1→6
- **总量**：22 → 36（🔴 20→23 / 🟡 1→7 / 🟢 0→6）
- **API 成本影响预估**：
  - 正常路径：22 × $0.05 = $1.1 → 36 × $0.05 = **$1.8**（+$0.7）
  - 最坏路径：22 × $0.21 = $4.6 → 36 × $0.21 = **$7.6**（+$3.0）
  - 仍落在 $10 硬顶以内安全余量
- **与 v1.0 兼容性**：
  - **保留 v1.0 现有 22 张资产的全部描述**（尺寸 / prompt / 落位 / placeholder），未做任何变更
  - §9 回填状态跟踪表 v1.0 22 行（已落盘 ✅）保留，v1.1 新增 14 行标 ⏳ 待 06c
  - A-EMOTE-RANK-D 与 A-EMOTE-CEO-STAMP 同色（砖红 #A85C5C），但中央图形 + 装饰方式明显区分：CEO-STAMP 为恶魔角剪影 + "CEO" 占位；RANK-D 为半圆瓣 + 警示三角，无小星
- **3 张泛用怪物的区分约束**（写入对应 prompt 文件「风格锚点」段）：
  - GENERIC-1：哥布林 / 灰薄荷绿皮肤 / 工地安全帽 + 工程锤（近战防御档）
  - GENERIC-2：小恶魔 / 砖红皮肤 / 小角 + 折叠翅膀 + 行政文员制服（中距支援档）
  - GENERIC-3：触手怪 / 雾紫皮肤 / 围裙 + 清洁推车（杂工档）
  - 与 v1.0 GROOBAS（蓝史莱姆）/ XIAOXING（骷髅法师袍）形成显著种族 + 职能差异
- **新增 prompt 文件**（14 个，均沿用 A-UI-CARD-EVENT.md 章节结构 + art_style_guide 统一正反向前缀）：见 `design/art_prompts/` 目录
- **art_layout.md 同步追加**：见 v1.1 变更段（落位 / 9-slice / 尺寸校验清单 14 行新增）

### v1.0（2026-05-20）— 用户拍板裁剪定稿

- 用户接受 6 项裁剪建议，砍除 16 条 → 22 条
- 砍除明细见 §5.9（A-CHR-CEO / A-UI-BATTLELOG / A-UI-MEMO / 5 个 UI 行动图标 / A-PROP-BADGE / A-PROP-BRIEFCASE / 4 个 A-FX-* / A-CHR-HR-FACE / A-CHR-GROOBAS-MSG）
- 新增 `A-EMOTE-*` 类别，独立目录 `atoms/assets/art/emotes/`，唯一资产 `A-EMOTE-CEO-STAMP`（替代 CEO 立绘的关键装饰，🟢 升 🟡）
- BATTLELOG / MEMO 改为 `A-UI-CARD-EVENT` 9-slice 配色变体，不出独立资产
- 取消 `A-FX-*` 类别（Atoms 粒子/tween 实现），目录保留
- API 成本下调：~$1.9 → ~$1.1（正常路径），落入 $10 硬顶安全余量
- 优先级第三波 / 第四波取消（资产已全部 🔴 + 1 🟡）

### v0.1（2026-05-20）— 首版草稿

- 按 final-plan v1.0 / narrative v1.3 / levels v1.3 / balance v0.1.2 / art_style_guide v1.0 推导
- 命名规范、关键尺寸、落盘路径 + placeholder 协议、优先级建议四节齐全
- 38 条资产，🔴 21 / 🟡 11 / 🟢 6
- 给出建议削减方案（38 → 24 条）供用户裁剪
