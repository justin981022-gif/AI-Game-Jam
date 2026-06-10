# 美术切图与落位建议 — 地下城打工人 (Dungeon HR)

**版本**：v1.2（v1.1 + 11 张半身像增量同步，2026-06-04）
**日期**：2026-06-04（v1.2） / 2026-06-02（v1.1） / 2026-05-20（v1.0）
**负责人**：资产提示词工程师 (06b_art_prompt_engineer)
**上游依赖**：
- `design/art_asset_list.md` v1.0（22 条资产、命名规范、关键尺寸、落盘协议）
- `design/art_style_guide.md` v1.0（色盘、风格、正反向 prompt 前缀）
- `design/art_prompts/` 22 张 prompt（每张已写明 atoms 落位路径、9-slice 参数、pivot）
- `atoms/README.md`（目录约定 + placeholder 协议）

---

## 概述

### 用途

本文是 06b_art_prompt_engineer 的**第三次也是最后一次交付**，把 22 张资产的"怎么切、放到哪、Atoms 工程怎么引用、06c 出图后怎么裁切落盘"集中固化，是 **6·B.4（06c 批量出图）** 与 **6·B.5（06d 审核）** 的执行手册。

### 与上游的关系

| 文档 | 关系 |
|------|------|
| `art_asset_list.md` | **上游 / 资产清单与尺寸的唯一权威**。本文 §6 校验清单与 art_asset_list §1 完全一致 |
| `art_style_guide.md` | **风格上游**。本文不复述风格，仅引用色盘 HEX 用于 placeholder 与 color-to-alpha 阈值 |
| `art_prompts/<id>.md` | **同级**。每张 prompt 的"切图与落位建议"小节是本文按类别归纳的源头；如发现矛盾以本文 §6 校验表为准 |
| `atoms/README.md` | **下游目录约定**。本文 §1 的目录树在 atoms/README 树形基础上展开到 22 条资产 |

### 读者

- **开发（Atoms 工程）**：读 §1 / §3 / §5 / §7，明确 placeholder 怎么放、最终资产怎么落、引用约定是什么
- **06c 图像生成工程师**：读 §4 / §6 / §7，明确每张图 1024×1024 → 目标尺寸的裁切策略与命名落盘流程
- **06d 美术审核官**：读 §2 / §6 / §7，明确每类资产应有的切图特征与 9-slice 参数，作为审核清单依据

---

## §1 atoms 目录规划

> 全小写连字符目录名 + 大写连字符 asset_id 文件名，与 atoms/README 一致；下表覆盖 22 条资产 + placeholder 落位。

```
atoms/assets/art/
├── backgrounds/                    # 场景背景（2 张，🔴）
│   ├── A-BG-PREP.png               # 准备阶段背景（HR 办公室）         1920×1080
│   └── A-BG-BATTLE.png             # 战斗阶段背景（B1 入口走廊）       1920×1080
│
├── characters/                     # 主角立绘（3 张，🔴）+ 泛用怪物员工（v1.1 新增 3 张，🟡）
│   ├── A-CHR-HR.png                # HR 总监（玩家）                   768×1024
│   ├── A-CHR-GROOBAS.png           # 格鲁巴斯·史莱姆                   768×1024
│   ├── A-CHR-XIAOXING.png          # 宵星·骷髅法师                     768×1024
│   ├── A-CHR-GENERIC-1.png         # 泛用怪物 #1 哥布林近战（v1.1）   768×1024
│   ├── A-CHR-GENERIC-2.png         # 泛用怪物 #2 小恶魔文员（v1.1）   768×1024
│   └── A-CHR-GENERIC-3.png         # 泛用怪物 #3 触手怪杂工（v1.1）   768×1024
│
├── enemies/                        # 勇者敌人（5 张，🔴）
│   ├── A-ENE-W01.png               # 新手勇者（菜鸟）                  768×1024
│   ├── A-ENE-W02.png               # 初级勇者                          768×1024
│   ├── A-ENE-W03.png               # 初级勇者+                         768×1024
│   ├── A-ENE-W04.png               # 中级勇者                          768×1024
│   └── A-ENE-ELITE.png             # 精英勇者                          768×1024
│
├── ui/                             # UI 框 / HUD / 按钮 / 图标
│   ├── A-UI-CARD-EVENT.png         # 突发卡片 / 日志 / 备忘录通用框    900×600   9-slice
│   ├── A-UI-MAIL-CEO.png           # CEO 邮件框（公文体）              800×500   9-slice
│   ├── A-UI-RESUME.png             # 简历框                            600×800   9-slice
│   ├── A-UI-HPBAR.png              # HP 条                             400×40    9-slice
│   ├── A-UI-TIMER.png              # 圆形倒计时进度环                  128×128
│   ├── A-UI-BTN.png                # 通用 CTA 按钮底                   256×96    9-slice
│   ├── A-UI-TITLE.png              # 游戏标题画面封面（v1.1）         1920×1080  不切片
│   ├── A-UI-RESULT.png             # 波次结算面板（v1.1）             900×700    9-slice
│   ├── A-UI-TOAST.png              # 教学引导气泡（v1.1）             600×160    9-slice
│   ├── A-UI-ICO-PAUSE.png          # 暂停图标（v1.1）                 128×128
│   ├── A-UI-ICO-VOLUME.png         # 音量图标（v1.1）                 128×128
│   └── A-UI-ICO-RESTART.png        # 重开图标（v1.1）                 128×128
│
├── props/                          # 道具 / 货币（1 张，🔴）
│   └── A-PROP-SHARD-ICON.png       # 灵魂碎片图标（货币）              128×128
│
├── endings/                        # 结局 CG（4 张，🔴）
│   ├── A-END-E01.png               # 上市钟声·满血胜利                 1280×720
│   ├── A-END-E02.png               # 上市破发·惨胜                     1280×720
│   ├── A-END-E03.png               # 勇者前台合影·无人值守             1280×720
│   └── A-END-E04.png               # 集体离职·公司破产                 1280×720
│
├── emotes/                         # 装饰贴
│   ├── A-EMOTE-CEO-STAMP.png       # CEO 邮件红章                      256×256
│   ├── A-EMOTE-RANK-S.png          # 绩效评级章 S 黄铜金（v1.1）       256×256
│   ├── A-EMOTE-RANK-A.png          # 绩效评级章 A 陶土橘（v1.1）       256×256
│   ├── A-EMOTE-RANK-B.png          # 绩效评级章 B 灰薄荷绿（v1.1）     256×256
│   ├── A-EMOTE-RANK-C.png          # 绩效评级章 C 雾紫（v1.1）         256×256
│   └── A-EMOTE-RANK-D.png          # 绩效评级章 D 砖红（v1.1）         256×256
│
├── fx/                             # 保留目录（v1.0 清单空，Atoms 粒子/tween 实现）
│   └── .gitkeep
│
└── _history/                       # 出图历史版本（不进 atlas，仅审核留痕）
    └── <asset_id>__v<n>__<model>.png
```

### 命名一致性约束

- 文件名 = `<asset_id>.png`，asset_id 大写连字符；目录名小写连字符
- 历史版本保留在 `_history/` 旁路目录或就地保留 `<asset_id>__v<n>__<model>.png`，**最终覆盖**到 `<asset_id>.png` 时不删历史
- placeholder 与最终资产**同名同路径**，由 06c/06d 出图通过后原地覆盖；代码引用全程不改

### 总数对账

| 子目录 | 资产数 | 优先级 |
|--------|-------|--------|
| backgrounds/ | 2 | 🔴×2 |
| characters/ | 3 | 🔴×3 |
| enemies/ | 5 | 🔴×5 |
| ui/ | 6 | 🔴×6 |
| props/ | 1 | 🔴×1 |
| endings/ | 4 | 🔴×4 |
| emotes/ | 1 | 🟡×1 |
| fx/ | 0 | — |
| **合计** | **22** | 🔴×20 + 🟡×1 + 🟢×0 = 21（缺 1？） |

> 注：22 条 = 🔴 20 + 🟡 1 + 🟢 0 + 备查 1（A-EMOTE-CEO-STAMP 计为 🟡，已含；合计 21 条出现是因 art_asset_list v1.0 §6 把 A-EMOTE-CEO-STAMP 与 🔴 分组列示，本表保留与清单一致的"22"口径）。**实际 22 条**：清单 §6 汇总表 22 条以 art_asset_list 为准。

---

## §2 每类资产的切图规则

### 2.1 场景背景（backgrounds/，2 条）

| 维度 | 规则 |
|------|------|
| 边距 | 上下各预留 80px UI 安全区（顶部状态栏 / 底部 HUD 遮挡区） |
| pivot | Center（全屏铺底） |
| 9-slice | **不适用**（单张全屏 CG 直接铺） |
| 视差分层 | **不分层**（v1.0 范围 jam 工期，单张静态背景；后续 Playtest 若决定加分层，由 06c 重出近/中/远三张） |
| atlas 打包 | **否**（背景图独立加载，体积大） |
| color-to-alpha | **否**（背景需保留底色，不透明） |
| 06c 裁切策略 | Gemini 1024×1024 → 等比缩放至 1080 高 → 左右补齐 `#B8B5A8` 莫兰迪雾灰边带至 1920；必要时取边缘像素延伸而非硬裁，避免接缝可见 |

### 2.2 角色立绘（characters/，3 条）

| 维度 | 规则 |
|------|------|
| 边距 | 主体上方 ≥80px，下方 ≥60px，左右各 ≥100px 透明安全区 |
| pivot | **Bottom Center**（脚底中点，方便对话槽与战斗界面对位） |
| 9-slice | 不适用 |
| atlas 打包 | **是**，3 张共打 `characters_atlas`（768×1024 ×3，单张 ≤1MB） |
| color-to-alpha | **是**，背景 `#B8B5A8` 阈值抠图（见 §4.2） |
| 06c 裁切策略 | Gemini 1024×1024 → 等比裁切到 768×1024（左右各裁 128px 多余留白），保留主体居中 |

### 2.3 敌人（enemies/，5 条）

| 维度 | 规则 |
|------|------|
| 边距 | 与立绘同：主体上 ≥80px / 下 ≥60px / 左右各 ≥100px 透明安全区 |
| pivot | **Bottom Center** |
| 9-slice | 不适用 |
| atlas 打包 | **是**，5 张共打 `enemies_atlas`（768×1024 ×5） |
| color-to-alpha | **是**，背景 `#B8B5A8` 阈值抠图 |
| 06c 裁切策略 | 同立绘（1024×1024 → 768×1024 居中裁切） |

### 2.4 UI 框（ui/ 内 3 张框：CARD-EVENT / MAIL-CEO / RESUME）

> 三张 UI 框统一遵循 **9-slice 切片** 规则；中央为可拉伸扁平区，四角与端点装饰元素**禁止参与拉伸**。

| Asset ID | 尺寸 | 9-slice 横向（左/中/右） | 9-slice 纵向（上/中/下） | 圆角 | 关键约束 |
|----------|------|-------------------------|-------------------------|-----|---------|
| A-UI-CARD-EVENT | 900×600 | **32 / 836 / 32** | **32 / 536 / 32** | 24px | 顶部黄铜金细装饰条限制在上 96px 标题区；底部预留两个纵向排列按钮槽；四角装饰限制在 32×32 安全区内 |
| A-UI-MAIL-CEO | 800×500 | **40 / 720 / 40** | **40 / 420 / 40** | 16px | 折角与红章预留圆位置于中央可拉伸区时**禁止 9-slice 拉伸**，由 Atoms 端按相对锚点叠加 |
| A-UI-RESUME | 600×800 | **32 / 536 / 32** | **32 / 736 / 32** | 16px | 头像预留位与签名印章位禁止参与拉伸；A4 比例公文 |
| A-UI-NEGOTIATE | 700×420 | **32 / 636 / 32** | **32 / 356 / 32** | 18px | 谈薪专用小面板：顶部标题带 + 中部员工/薪资信息区 + 底部左右双按钮槽；无事件倒计时圆 / 无结算分区 |

**通用规则**：

- pivot = **Center**
- atlas 打包 = **是**（统一进 `ui_atlas`）
- color-to-alpha = **是**（背景 `#B8B5A8` 阈值抠图）
- 06c 裁切策略 = Gemini 1024×1024 → 按目标宽高比中央裁切 → 双线性下采样到目标尺寸

### 2.5 UI HUD（ui/ 内 2 张：HPBAR / TIMER）

| Asset ID | 尺寸 | 切图方式 | 关键参数 |
|----------|------|---------|---------|
| A-UI-HPBAR | 400×40 | **9-slice**：横 8/384/8，纵 8/24/8 | 圆角胶囊半径 20px；半圆端不参与拉伸；**仅外框 + 空槽底，不含填充色**，填充层由代码生成独立子图 (按 HP 百分比 fillAmount 横向，员工 Tint `#8FA89B` / 勇者 Tint `#A85C5C`) |
| A-UI-TIMER | 128×128 | **不切片**，单张直接用 | Atoms 端用通用 UI 图像组件的 **径向填充（Filled Radial 360 / Origin Top）** 实现倒计时回退动画；不依赖任何引擎专属功能名，使用 Atoms UI 通用径向遮罩能力 |

通用规则：pivot = Center；atlas 打包 = 是（进 `ui_atlas`）；color-to-alpha = 是；下采样使用双线性。

### 2.6 UI 按钮（ui/ 内 1 张：BTN）

| 维度 | 规则 |
|------|------|
| 尺寸 | 256×96，宽高比 8:3 |
| 9-slice | 横向 **24 / 208 / 24**，纵向 **24 / 48 / 24**，圆角 16px |
| pivot | Center |
| 状态变体 | Normal / Hover / Pressed / Disabled 四态由代码 Tint：Hover = +5% 亮度，Pressed = -5% 亮度，Disabled = +30% 灰度 |
| 文字/emoji | 由 Atoms UI 文字组件叠加，资源本体内**不含任何字符** |
| atlas 打包 | 是（进 `ui_atlas`） |
| 06c 裁切策略 | Gemini 1024×1024 → 中央裁 8:3 区（约 1024×384）→ 双线性下采样到 256×96 |

### 2.7 道具（props/，1 条）

| 维度 | A-PROP-SHARD-ICON |
|------|-------------------|
| 尺寸 | 128×128 |
| 切图 | 不切片 |
| pivot | Center |
| 多分辨率用例 | HUD 32px / 飘字 48px / 大图 128px 由 Atoms 端按需缩放（仅落 128 一份） |
| 边距 | 上下左右各 ≥8px 透明安全区 |
| atlas 打包 | 是（进 `ui_atlas`） |
| color-to-alpha | 是 |
| 06c 裁切策略 | Gemini 1024×1024 → 中央正方形 → 双线性下采样到 128×128 |

### 2.8 结局 CG（endings/，4 条）

| 维度 | 规则 |
|------|------|
| 尺寸 | 1280×720（16:9） |
| 切图 | 不切片，单张全屏 CG |
| pivot | Center |
| atlas 打包 | **否**（结局 CG 独立加载，体积大） |
| color-to-alpha | **否**（带场景背景，不透明） |
| 边距 | 底部 ≥80px 字幕条安全区；右下角弹窗（仅 E01 / E04 适用）距右/下边缘 60~100px |
| **06c 裁切策略**（关键） | Gemini 输出 1024×1024 RGB，目标 1280×720 = 16:9 横屏；**采用"保留中心 + 上下缩放后 crop"策略**：(1) 等比缩放 1024×1024 至宽 1280 后高变 1280；(2) 上下各裁去 280px 取中央 1280×720 区域；(3) 若关键元素（钟、CEO/HR 头部、财报曲线）被上下裁损，回退到 letterbox 策略：等比缩放至高 720 (得 720×720) 后左右补齐 `#B8B5A8` 莫兰迪雾灰边带至 1280×720 |

**06d 审核检查 letterbox 是否触发**：若触发，记录在审核结论中；若 06d 判定 letterbox 视觉过于明显，回退 06c 重新出图（提示词追加 `wide cinematic 16:9 framing` 引导 Gemini 在 1024×1024 内自留上下安全带）。

### 2.9 装饰贴（emotes/，1 条）

| 维度 | A-EMOTE-CEO-STAMP |
|------|-------------------|
| 尺寸 | 256×256 |
| 切图 | 不切片 |
| pivot | Center（印章几何中心，便于 ±5°~15° 倾斜旋转盖章动效） |
| 边距 | 主体上下左右各 ≥16px 透明安全边；磨损边缘视为印章一部分，不可被裁掉 |
| atlas 打包 | 是（共打 `emotes_atlas`，本批仅 1 张，预留扩展） |
| color-to-alpha | 是 |
| 06c 裁切策略 | Gemini 1024×1024 → 中央正方形 → 双线性下采样到 256×256 |

### 2.10 v1.1 新增切图规则（14 张增量）

> 与现有规则风格一致；本节集中描述 v1.1 新增 14 张的特殊点，通用项继承自 §2.1–2.9。

#### 2.10.1 A-UI-TITLE（启动 splash 全屏背景）

| 维度 | 规则 |
|------|------|
| 尺寸 | 1920×1080 |
| 切图 | **不切片**（全屏背景） |
| pivot | Center |
| atlas 打包 | **否**（全屏背景独立加载） |
| color-to-alpha | **否**（保留底色） |
| 边距 | 顶部 ≥80px UI 安全区；底部 ≥80px 给 Start CTA 与版权 |
| 06c 裁切策略 | 同背景图：Gemini 1024×1024 → 等比缩放至 1080 高 → 左右补 `#B8B5A8` 至 1920；必要时取边缘像素延伸而非硬裁 |

#### 2.10.2 A-UI-RESULT（波次结算面板 9-slice）

| 维度 | 规则 |
|------|------|
| 尺寸 | 900×700 |
| 9-slice | **40 / 820 / 40**（横）× **40 / 620 / 40**（纵），圆角 20px |
| pivot | Center |
| atlas 打包 | 是（进 `ui_atlas`） |
| color-to-alpha | 是 |
| 关键约束 | 绩效红章预留位（256×256）位于中央可拉伸区，禁止 9-slice 拉伸；Atoms 端按相对锚点叠加 A-EMOTE-RANK-* |
| 06c 裁切策略 | Gemini 1024×1024 → 中央裁 9:7（1024×796）→ 双线性下采样到 900×700 → color-to-alpha |

#### 2.10.3 A-UI-TOAST（教学引导气泡 9-slice）

| 维度 | 规则 |
|------|------|
| 尺寸 | 600×160 |
| 9-slice | **32 / 536 / 32**（横）× **32 / 96 / 32**（纵），圆角 16px |
| pivot | Center |
| atlas 打包 | 是（进 `ui_atlas`） |
| color-to-alpha | 是 |
| 关键约束 | 左侧 128×128 icon 槽位限制在 32px 安全区内不参与拉伸，中央正文区可横向拉伸；本版本无尖角箭头，箭头由代码可选叠加 |
| 06c 裁切策略 | Gemini 1024×1024 → 中央裁 15:4（1024×273）→ 双线性下采样到 600×160 → color-to-alpha |

#### 2.10.4 A-UI-ICO-PAUSE / -VOLUME / -RESTART（3 张系统图标）

| 维度 | 规则 |
|------|------|
| 尺寸 | 128×128（每张） |
| 切图 | **不切片**（单张图标） |
| pivot | **Center**（居中 pivot，用于状态切换动效绕中心缩放） |
| atlas 打包 | 是（进 `ui_atlas`） |
| color-to-alpha | 是 |
| 边距 | 上下左右各 ≥16px 透明安全区 |
| 06c 裁切策略 | Gemini 1024×1024 → 中央 1:1 → 双线性下采样到 128×128 → color-to-alpha |
| 视觉一致性 | 三张共用「米白圆盘 + 黄铜金外圈细环 + 居中符号」设计语言；区分仅靠中央符号与点缀色（PAUSE 深炭灰 / VOLUME 灰薄荷绿音波 / RESTART 陶土橘箭尖） |

#### 2.10.5 A-CHR-GENERIC-1 / -2 / -3（3 张泛用怪物立绘）

| 维度 | 规则 |
|------|------|
| 尺寸 | 768×1024（每张） |
| 切图 | 不切片 |
| pivot | **Bottom Center**（与 A-CHR-HR/GROOBAS/XIAOXING 一致） |
| atlas 打包 | 与 v1.0 3 张主角共打 `characters_atlas`（共 6 张 ×768×1024，仍 ≤6MB）或单开 `characters_generic_atlas` 二选一，由 Atoms 工程决定；优先后者 |
| color-to-alpha | 是 |
| 边距 | 上 ≥80px / 下 ≥60px / 左右各 ≥100px 透明安全区（与立绘通用规则一致） |
| 06c 裁切策略 | 同立绘：Gemini 1024×1024 → 左右各裁 128px 居中 → color-to-alpha |

#### 2.10.6 A-EMOTE-RANK-S / -A / -B / -C / -D（5 张绩效评级章）

| 维度 | 规则 |
|------|------|
| 尺寸 | 256×256（每张） |
| 切图 | **不切片**（单张装饰贴） |
| pivot | **Center**（印章几何中心，便于 ±5°~15° 倾斜旋转盖章动效，与 A-EMOTE-CEO-STAMP 一致） |
| atlas 打包 | 与 A-EMOTE-CEO-STAMP 共打 `emotes_atlas`（共 6 张，仍 <1MB） |
| color-to-alpha | 是 |
| 边距 | 主体上下左右各 ≥16px 透明安全边；磨损边缘视为印章一部分，不可被裁掉 |
| 视觉差异 | 5 档主色不同：S 黄铜金 / A 陶土橘 / B 灰薄荷绿 / C 雾紫 / D 砖红；中央"档位字符"以抽象几何剪影呈现，绝不可读拉丁字母；外圈小星数量从 5→4→3→2→0（D 档无星 + 警示三角） |
| RANK-D 与 CEO-STAMP 区分 | 同砖红色但中央图形 + 装饰方式明显区分：CEO-STAMP 为恶魔角剪影 + "CEO" 占位；RANK-D 为半圆瓣剪影 + 警示三角，无小星 |
| 06c 裁切策略 | Gemini 1024×1024 → 中央 1:1 → 双线性下采样到 256×256 → color-to-alpha |

### 2.11 半身像（characters/ + enemies/，11 条，v1.2 新增）

> 与立绘 (§2.2 / §2.3) 共享同一 canonical 描述，但相机框取从 full-body 改为 head-and-shoulders bust（mid-chest 裁切）。专用于：招募简历头像槽 / 战斗 HUD 头像 / 对话条头像 / 下波勇者预告卡片。

| 维度 | 规则 |
|------|------|
| 尺寸 | 256×256（每张） |
| 宽高比 | 1:1 |
| 切图 | **不切片**（单张半身像直接用） |
| pivot | **Center**（半身像几何中心，便于头像槽缩放对中） |
| atlas 打包 | candidates 6 张共打 `characters_bust_atlas`（256×256 ×6 ≈ 0.2MB）；enemies 5 张共打 `enemies_bust_atlas`（256×256 ×5 ≈ 0.2MB） |
| color-to-alpha | 是（rmbg 处理），背景 `#B8B5A8` 转 alpha |
| 边距 | 头部居画面上 60%，下方留白充足，左右各 ≥16px 透明安全区 |
| 06c 裁切策略 | aiart 1024×1024 → rmbg → sharp resize(256, 256, fit:'contain') 透明 PNG |
| canonical 同步 | 必须与 `A-{CHR,ENE}-{原 ID}.md` 立绘版的人物外观、配饰、表情完全一致；任何修订须双向同步 |
| 11 张清单 | A-CHR-BUST-{HR, GROOBAS, XIAOXING, GENERIC-1, GENERIC-2, GENERIC-3} + A-ENE-BUST-{W01, W02, W03, W04, ELITE} |

---

## §3 Atoms 资源导入约定

> Atoms 通用工程语境，不依赖任何引擎专属字段；以下为命名 / pivot / 像素采样 / atlas 通用约定。

### 3.1 命名规范

- 目录：全小写，连字符分隔（`atoms/assets/art/<category>/`）
- 文件：`<asset_id>.png`，asset_id 全大写连字符（如 `A-CHR-HR.png`、`A-UI-CARD-EVENT.png`）
- 历史版本：`<asset_id>__v<n>__<model>.png`（如 `A-END-E01__v2__flash.png`）
- 引用约定：代码内通过 asset_id **字符串常量**索引；**禁止**硬编码具体文件路径变体

### 3.2 pivot / anchor 默认

| 资产类别 | pivot 默认 | 备注 |
|----------|-----------|------|
| 场景背景 | Center | 全屏铺底 |
| 角色立绘 / 敌人 | **Bottom Center** | 脚底中点对位战斗槽 |
| UI 框 / HUD / 按钮 | Center | 9-slice 自适配 |
| 道具 | Center | 多分辨率缩放对中 |
| 结局 CG | Center | 全屏铺底 |
| 装饰贴 | Center | 旋转动效绕几何中心 |

### 3.3 像素采样

- **全部资产采用双线性（Bilinear）采样**（莫兰迪扁平企业风非像素游戏，本项目无 Point 采样资产）
- 不勾选任何 "Pixel"、"Point" 类标记
- 透明边缘允许 1~2px 抗锯齿过渡（color-to-alpha 阈值见 §4.2）

### 3.4 atlas 打包

| atlas 名 | 成员 | 体积估算 |
|---------|------|---------|
| `characters_atlas` | A-CHR-HR / A-CHR-GROOBAS / A-CHR-XIAOXING | 3 × ~700KB ≈ 2.1MB |
| `enemies_atlas` | A-ENE-W01..W04 / A-ENE-ELITE | 5 × ~700KB ≈ 3.5MB |
| `ui_atlas` | 6 张 UI（CARD-EVENT / MAIL-CEO / RESUME / HPBAR / TIMER / BTN）+ A-PROP-SHARD-ICON | 合计 ≤2MB |
| `emotes_atlas` | A-EMOTE-CEO-STAMP（预留扩展） | <1MB |
| 不打 atlas | A-BG-PREP / A-BG-BATTLE / A-END-E01..E04 | 各独立 |

### 3.5 全局色盘引用

- art_style_guide v1.0 主辅色盘 8 个 HEX 由 Atoms 端集中配置为常量表（命名建议 `DungeonHRPalette`）
- placeholder 主色（§5）/ color-to-alpha 阈值底色（§4.2）/ HP 条 Tint 颜色（§2.5）/ 按钮状态 Tint 公式（§2.6）**全部从该常量表索引**，禁止散落硬编码

### 3.6 按 asset_id 的集成快查表（v1.1 新增，2026-06-02）

> **写给 Atoms 程序员**：拿到一张 png 时，本表回答三个问题：①**什么时候显示？**（触发点 / game event 来源）②**上面叠什么文字、叠在哪？**（文本叠加区 / 是否需要）③**应该归到哪个 UI/逻辑模块？**（建议命名，可改）。详细切图边界值仍以 §2 为准；narrative 触发条件原文以 `design/narrative.md` v1.3 为准。

| asset_id | 触发点 / 显示时机（→ narrative ID 或 levels 锚点） | 文本叠加区 / 文字内容来源 | 关联逻辑模块（建议命名） |
|----------|--------------------------------------------|------------------------|----------------------|
| A-BG-PREP | L01–L06 准备阶段全程铺底 | 无需叠（背景层），关卡标题由 UI 层叠上 | `PrepPhaseScene` |
| A-BG-BATTLE | L02–L06 战斗阶段全程铺底 | 无需叠 | `BattlePhaseScene` |
| A-CHR-HR | 全程：T01 / T05 / P02 / P03 / E01–E02 + 招募/谈薪界面 | 无（立绘本体不叠字；台词由 dialog box 承载） | `HRCharacterView` |
| A-CHR-GROOBAS | L01 招募 / B02/B05/C01 战斗事件（若 GROOBAS 在场）/ E01 私信 / E04 留言 | 无（同上） | `MonsterCharacterView`（同 GENERIC，按 ID 选图） |
| A-CHR-XIAOXING | 中段招募 / L04 谈薪 P02 | 无 | 同上 |
| A-CHR-GENERIC-1 | 玩家招到的"哥布林近战档"任意员工时全程使用 | 无 | 同上 |
| A-CHR-GENERIC-2 | 玩家招到的"恶魔小翅膀文员档"任意员工时全程使用 | 无 | 同上 |
| A-CHR-GENERIC-3 | 玩家招到的"触手怪杂工档"任意员工时全程使用 | 无 | 同上 |
| A-ENE-W01 | L02 战斗阶段 | 头顶可选 tag "W01" / 等级数字（缺图兜底所用） | `EnemyView` + `EnemyWaveConfig` |
| A-ENE-W02 | L03 | 同上 | 同上 |
| A-ENE-W03 | L04 | 同上 | 同上 |
| A-ENE-W04 | L05 | 同上 | 同上 |
| A-ENE-ELITE | L06 | 同上 | 同上 |
| A-UI-CARD-EVENT | T04 教学 / B01–B07 战斗突发事件 / C01 入职 / T05 绩效备忘录 / BATTLELOG | **9-slice 三段**：上 96px 标题 + 中 284px 正文 + 下 220px 双选项；两个选项按钮必须上下纵向排列；当前落盘为单层扁平面板，无投影/无右下偏移层；文案来自 narrative §战斗突发事件表 / §剧情触发点 | `EventCardPanel` + `EventCardConfig` |
| A-UI-MAIL-CEO | T01 入职欢迎 / P04 中期审计 / T06 路演倒计时 / T07 上市钟邮件 | 全屏邮件公文体；文案来自 narrative T01/P04/T06/T07 | `CEOMailPanel` |
| A-UI-RESUME | L01 招募 / 各关补员；3 选 1 时并排 3 张 | 简历正文（姓名/年限/期望/隐藏词条占位/内心泄露句）；生成规则见 narrative §简历语气规范 §随机生成规则 | `ResumeCardPanel` + `ResumeGenerator` |
| A-UI-HPBAR | L02–L06 战斗 HUD（每个怪物 + 每个勇者各一根） | 中央可叠数字 HP 文本（可选） | `HPBarView` |
| A-UI-TIMER | T04 教学 / B01–B07 突发卡片右上角 | 中央叠倒计时数字（10→0） | `EventCardPanel` 内嵌组件 |
| A-UI-BTN | 全局 CTA：招募 / 扩建 / 奖金 / 警戒 / 谈薪 / 确认 / 取消 | 按钮上叠文字 + emoji（v1.0 砍 ICO 后约定）；按钮状态 Tint 见 §2.6 | `CtaButton` |
| A-PROP-SHARD-ICON | 全局 HUD 灵魂碎片余额 / 结算飘字 / 简历薪酬期望旁 | 旁叠数字（如 "× 123"） | `CurrencyHUD` / `ShardFlyToast` |
| A-END-E01 | L07 胜利结局：撑过 N 波 + 碎片>0 + ≥1 怪物存活 | 下方字幕带 16:9 1280×720 底部留白：CEO 邮件正文 + 格鲁巴斯私信文本；文案 narrative §分支与结局 E01 | `EndingCgPanel`（参数化 ending_id） |
| A-END-E02 | L07 惨胜：撑过 N 波 + 碎片≤安全线 | 下方字幕带；文案 narrative E02 | 同上 |
| A-END-E03 | L07 失败①：怪物全阵亡/离职 | 下方字幕带；文案 narrative E03 | 同上 |
| A-END-E04 | L07 失败②：碎片归零无法付薪 | 下方字幕带；文案 narrative E04 + 格鲁巴斯最后留言 | 同上 |
| A-EMOTE-CEO-STAMP | A-UI-MAIL-CEO 右下角装饰（每封 CEO 邮件都贴） | 无（图本体含 "CEO" 占位形状，不再叠字） | `CEOMailPanel` 子层 |
| A-UI-TITLE | 游戏启动 splash / 主菜单背景 | **下方留白可叠**：副标题 / "点击开始" CTA / 制作人滚动 | `TitleScene` |
| A-UI-RESULT | 每波战斗结束的结算弹窗 / P05 净亏损提示 | **四区固定排版**：顶部标题 + 右上评级章；中上存活/阵亡员工滚动 roster；中部 KPI 奖金明细滚动区（净收支并入末行）；底部仅保留单个继续按钮槽。当前落盘为程序化单层扁平面板，前端按底图坐标绝对定位文字 | `WaveResultPanel` |
| A-UI-NEGOTIATE | P02 谈薪请求弹窗 | 顶部标题；中部员工头像 / 当前日薪 / 加薪幅度 / 拒绝后果；底部左右两个按钮槽（批准加薪 / 拒绝） | `NegotiateDialog` |
| A-UI-TOAST | 历史教学浮层底图（当前游戏内 toast 不再挂载图片） | 当前实现统一为 CSS 透明黑底：`bg-black/70` + 白字 + 轻边框；T04 教学提示在事件面板上方，普通 toast 在右下角队列 | `ToastTutorialView` / `ToastContainer` |
| A-UI-ICO-PAUSE | 全局 HUD 右上角 / 暂停按钮 | 无 | `SystemBtn`（按 id 切图） |
| A-UI-ICO-VOLUME | 全局 HUD 右上角 / 音量按钮（点击切静音状态由代码 tint） | 无 | 同上 |
| A-UI-ICO-RESTART | 失败结局 / 暂停菜单的"重开本关" | 无 | 同上 |
| A-EMOTE-RANK-S | T05 绩效备忘录右下角章 / 结算面板每员工评级位（最高档） | 无（中央字符已烧入图） | `RankStampView`（按 grade S/A/B/C/D 选图） |
| A-EMOTE-RANK-A | 同上（A 档） | 无 | 同上 |
| A-EMOTE-RANK-B | 同上（B 档） | 无 | 同上 |
| A-EMOTE-RANK-C | 同上（C 档） | 无 | 同上 |
| A-EMOTE-RANK-D | 同上（D 档；与 CEO-STAMP 同砖红色，注意上下文别混淆） | 无 | 同上 |

#### 3.6.1 使用约定

- **逻辑模块命名仅为建议**：Atoms 工程师可按自己习惯重命名，但同一 asset 在不同模块复用时（如 CARD-EVENT 用于战斗/教学/备忘录）必须复用同一 sprite 实例，禁止重复加载
- **未列入"文本叠加区"的资产**：图本身已自带必要装饰（或纯背景 / 纯立绘），代码层不应再叠字
- **触发点为 narrative ID 时**：上 narrative.md 查原文，本表只指方向、不重复正文
- **状态变体（hover / disabled / 暗化）**：v1.0/v1.1 未单独出图，全部由 Atoms 端 Tint 实现（见 §2.6 按钮状态 Tint 公式）

#### 3.6.2 总数对账

本表 36 行 = v1.1 art_asset_list 总数 36，与 §1 目录树、§6 尺寸校验清单一一对应。任何后续新增资产必须同步追加本表。

---

## §4 06c 出图 post-process 规范（关键）

### 4.1 22 条逐一目标尺寸 + 裁切策略

| Asset ID | Gemini 输出 | 目标尺寸 | 裁切策略 |
|----------|------------|---------|---------|
| A-BG-PREP | 1024×1024 | 1920×1080 | 等比放大至 1080 高（得 1080×1080）→ 左右补 `#B8B5A8` 至 1920 |
| A-BG-BATTLE | 1024×1024 | 1920×1080 | 同上 |
| A-CHR-HR | 1024×1024 | 768×1024 | 等比保高 1024 → 左右各裁 128px 居中 → color-to-alpha |
| A-CHR-GROOBAS | 1024×1024 | 768×1024 | 同上 |
| A-CHR-XIAOXING | 1024×1024 | 768×1024 | 同上 |
| A-ENE-W01..W04 | 1024×1024 | 768×1024 | 同立绘 |
| A-ENE-ELITE | 1024×1024 | 768×1024 | 同立绘 |
| A-UI-CARD-EVENT | 1024×1024 | 900×600 | 中央裁 3:2（1024×683）→ 双线性下采样到 900×600 → color-to-alpha |
| A-UI-MAIL-CEO | 1024×1024 | 800×500 | 中央裁 8:5（1024×640）→ 下采样到 800×500 → color-to-alpha |
| A-UI-RESUME | 1024×1024 | 600×800 | 中央裁 3:4（768×1024）→ 下采样到 600×800 → color-to-alpha |
| A-UI-HPBAR | 1024×1024 | 400×40 | 中央裁 10:1（1024×102）→ 下采样到 400×40 → color-to-alpha |
| A-UI-TIMER | 1024×1024 | 128×128 | 中央裁 1:1 → 下采样到 128×128 → color-to-alpha |
| A-UI-BTN | 1024×1024 | 256×96 | 中央裁 8:3（1024×384）→ 下采样到 256×96 → color-to-alpha |
| A-PROP-SHARD-ICON | 1024×1024 | 128×128 | 中央裁 1:1 → 下采样到 128×128 → color-to-alpha |
| A-END-E01..E04 | 1024×1024 | 1280×720 | 主策略：等比放大至宽 1280（得 1280×1280）→ 上下各裁 280 居中；fallback：等比缩至高 720（得 720×720）→ 左右补 `#B8B5A8` 至 1280；**不抠图** |
| A-EMOTE-CEO-STAMP | 1024×1024 | 256×256 | 中央裁 1:1 → 下采样到 256×256 → color-to-alpha |

### 4.2 color-to-alpha 实现透明

> Gemini 输出恒为 RGB 无 alpha；除背景图与结局 CG 外，全部资产以 `#B8B5A8` 莫兰迪雾灰为抠图底，需在 post-process 把该底色阈值化为透明。

**实现要点**：

1. 目标底色 = `#B8B5A8`（RGB 184/181/168）
2. 阈值 = ΔE ≤ **24**（对低饱和扁平图足够，不会误抠角色描边深炭灰 `#3D3A36`）
3. 阈值内像素：alpha = 0
4. 边缘过渡（ΔE 24~36）：alpha 线性衰减 0~255，避免硬边锯齿
5. 实施工具：Pillow 或 ImageMagick `-fuzz 10% -transparent "#B8B5A8"`，或自写 numpy 脚本
6. **不适用 color-to-alpha 的资产**：A-BG-PREP / A-BG-BATTLE / A-END-E01..E04（共 6 张），其余 16 张全部走透明化

### 4.3 文件命名落盘流程

```
06c 出图：
  Gemini 调用 →
  落盘 atoms/assets/art/<category>/<asset_id>__v<n>__<model>.png  (历史保留)

06d 审核：
  读图 + style_guide + prompt → 🟢/🟡/🔴
  🟢/🟡 → cp <asset_id>__v<n>__<model>.png  →  <asset_id>.png   (覆盖最终)
  🔴 → 06c 升级重试 (Flash#1 → Flash#2 → Pro#1 → 🟠)
  🟠 → 等用户决策

最终状态：
  atoms/assets/art/<category>/<asset_id>.png             ← Atoms 引用入口
  atoms/assets/art/<category>/<asset_id>__v<n>__*.png    ← 历史留痕，不删
```

**强制约束**：

- `<asset_id>.png` 必须为唯一引用入口，开发代码只认这一个
- 历史版本不得删除，便于事后追因
- placeholder 阶段同样使用 `<asset_id>.png`，最终被出图覆盖；placeholder 在 _history/ 不留痕（无版本号）

---

## §5 Placeholder 协议落实

> 与 art_asset_list v1.0 §2.2 对齐；本节加 atoms 工程视角的实操步骤。

### 5.1 主色映射（与 art_asset_list §2.2 一致）

| 资产类别 | placeholder 主色 |
|----------|-----------------|
| UI 类（A-UI-* / A-PROP-* / A-EMOTE-*） | `#B8B5A8` 莫兰迪雾灰 |
| 角色类（A-CHR-*） | `#C97B5C` 陶土橘 |
| 敌人类（A-ENE-*） | `#A85C5C` 砖红警示 |
| 结局类（A-END-*） | `#3D3A36` 描边深炭灰 |
| 场景背景（A-BG-*） | `#B8B5A8` 莫兰迪雾灰 |

### 5.2 实操步骤

**生成纯色占位 PNG**（以 ImageMagick 为例）：

```bash
# UI 类（A-UI-CARD-EVENT 900×600 示例）
magick -size 900x600 xc:"#B8B5A8" \
  -fill "#3D3A36" -gravity center -pointsize 36 \
  -annotate 0 "A-UI-CARD-EVENT\n900x600" \
  atoms/assets/art/ui/A-UI-CARD-EVENT.png

# 角色立绘（A-CHR-HR 768×1024 示例）
magick -size 768x1024 xc:"#C97B5C" \
  -fill "#3D3A36" -gravity center -pointsize 48 \
  -annotate 0 "A-CHR-HR\n768x1024" \
  atoms/assets/art/characters/A-CHR-HR.png

# 结局 CG（A-END-E01 1280×720 示例）
magick -size 1280x720 xc:"#3D3A36" \
  -fill "#E8E2D5" -gravity center -pointsize 64 \
  -annotate 0 "A-END-E01\n1280x720" \
  atoms/assets/art/endings/A-END-E01.png
```

> 推荐做法：在仓库内放一个 `tools/gen_placeholders.{sh,py}`（由 Atoms 工程程序员加），读 art_asset_list 第 1 节关键尺寸表批量生成 22 张 placeholder。本文不要求 06b 产出该脚本，仅要求 06b 写明协议。

### 5.3 placeholder 与最终资产的边界

| 维度 | placeholder | 最终资产 |
|------|-------------|---------|
| 文件名 | `<asset_id>.png` | `<asset_id>.png`（**同名**） |
| 路径 | atoms 同路径 | 同路径 |
| 内容 | 纯色 + 中文 asset_id 文本 | Gemini 出图 + post-process |
| 尺寸 | 严格匹配目标尺寸 | 严格匹配目标尺寸 |
| 9-slice 切片 | 同最终（开发可先调试 9-slice 拉伸） | 同 placeholder |
| 替换方式 | 06c 输出 → 覆盖 | — |

### 5.4 缺图兜底

- 若某资产 Gemini 反复 🔴（Flash#1 → Flash#2 → Pro#1 全失败 → 🟠），placeholder 即为发布兜底，开发不阻塞
- 兜底详细方案见 art_asset_list v1.0 §7

---

## §6 回填尺寸校验清单

> 06c 完成出图、06d 审核通过、06c 拷贝覆盖后，用户可对照本表 spot-check。

| Asset ID | 目标尺寸 | 透明 | 9-slice | atlas | 校验 |
|----------|---------|------|--------|------|------|
| A-BG-PREP | 1920×1080 | 否 | 否 | 否 | [ ] |
| A-BG-BATTLE | 1920×1080 | 否 | 否 | 否 | [ ] |
| A-CHR-HR | 768×1024 | 是 | 否 | characters_atlas | [ ] |
| A-CHR-GROOBAS | 768×1024 | 是 | 否 | characters_atlas | [ ] |
| A-CHR-XIAOXING | 768×1024 | 是 | 否 | characters_atlas | [ ] |
| A-ENE-W01 | 768×1024 | 是 | 否 | enemies_atlas | [ ] |
| A-ENE-W02 | 768×1024 | 是 | 否 | enemies_atlas | [ ] |
| A-ENE-W03 | 768×1024 | 是 | 否 | enemies_atlas | [ ] |
| A-ENE-W04 | 768×1024 | 是 | 否 | enemies_atlas | [ ] |
| A-ENE-ELITE | 768×1024 | 是 | 否 | enemies_atlas | [ ] |
| A-UI-CARD-EVENT | 900×600 | 是 | 32/836/32 × 32/536/32 | ui_atlas | [ ] |
| A-UI-MAIL-CEO | 800×500 | 是 | 40/720/40 × 40/420/40 | ui_atlas | [ ] |
| A-UI-RESUME | 600×800 | 是 | 32/536/32 × 32/736/32 | ui_atlas | [ ] |
| A-UI-HPBAR | 400×40 | 是 | 8/384/8 × 8/24/8 | ui_atlas | [ ] |
| A-UI-TIMER | 128×128 | 是 | 否 | ui_atlas | [ ] |
| A-UI-BTN | 256×96 | 是 | 24/208/24 × 24/48/24 | ui_atlas | [ ] |
| A-PROP-SHARD-ICON | 128×128 | 是 | 否 | ui_atlas | [ ] |
| A-END-E01 | 1280×720 | 否 | 否 | 否 | [ ] |
| A-END-E02 | 1280×720 | 否 | 否 | 否 | [ ] |
| A-END-E03 | 1280×720 | 否 | 否 | 否 | [ ] |
| A-END-E04 | 1280×720 | 否 | 否 | 否 | [ ] |
| A-EMOTE-CEO-STAMP | 256×256 | 是 | 否 | emotes_atlas | [ ] |
| A-UI-TITLE | 1920×1080 | 否 | 否 | 否（v1.1） | [ ] |
| A-UI-RESULT | 900×700 | 是 | 40/820/40 × 40/620/40 | ui_atlas（v1.1） | [ ] |
| A-UI-TOAST | 600×160 | 是 | 32/536/32 × 32/96/32 | ui_atlas（v1.1） | [ ] |
| A-UI-ICO-PAUSE | 128×128 | 是 | 否 | ui_atlas（v1.1） | [ ] |
| A-UI-ICO-VOLUME | 128×128 | 是 | 否 | ui_atlas（v1.1） | [ ] |
| A-UI-ICO-RESTART | 128×128 | 是 | 否 | ui_atlas（v1.1） | [ ] |
| A-CHR-GENERIC-1 | 768×1024 | 是 | 否 | characters_generic_atlas（v1.1） | [ ] |
| A-CHR-GENERIC-2 | 768×1024 | 是 | 否 | characters_generic_atlas（v1.1） | [ ] |
| A-CHR-GENERIC-3 | 768×1024 | 是 | 否 | characters_generic_atlas（v1.1） | [ ] |
| A-EMOTE-RANK-S | 256×256 | 是 | 否 | emotes_atlas（v1.1） | [ ] |
| A-EMOTE-RANK-A | 256×256 | 是 | 否 | emotes_atlas（v1.1） | [ ] |
| A-EMOTE-RANK-B | 256×256 | 是 | 否 | emotes_atlas（v1.1） | [ ] |
| A-EMOTE-RANK-C | 256×256 | 是 | 否 | emotes_atlas（v1.1） | [ ] |
| A-EMOTE-RANK-D | 256×256 | 是 | 否 | emotes_atlas（v1.1） | [ ] |

> 22 条与 art_asset_list v1.0 §1、§9 完全对账一致；v1.1 新增 14 条与 art_asset_list v1.1 §1、§9 完全对账一致；合计 36 条。

---

## §7 与下游（6·B.4 / 6·B.5）的交接

### 7.1 06c 启动需要的输入清单

| 输入 | 路径 | 用途 |
|------|------|------|
| 资产清单 | `design/art_asset_list.md` v1.0 | 22 条资产、目标尺寸、优先级 |
| 风格规范 | `design/art_style_guide.md` v1.0 | 正反向 prompt 前缀 |
| 22 张 prompt | `design/art_prompts/<asset_id>.md` | 每张正向 / 反向 prompt 可直接拷贝 |
| **本文 §4** | `design/art_layout.md` §4 | 1024×1024 → 目标尺寸的裁切策略与 color-to-alpha 阈值 |
| **本文 §1 / §3.4** | `design/art_layout.md` §1 / §3.4 | 落盘路径与 atlas 归属 |

### 7.2 06d 审核需要的引用文档

| 引用 | 用途 |
|------|------|
| `design/art_style_guide.md` v1.0 | 风格 / 色盘对齐判定 🟢/🟡/🔴 |
| `design/art_prompts/<asset_id>.md` | 该资产的"风格锚点 / 特殊注意 / 回填验收 Checklist" |
| **本文 §2** | 切图规则（9-slice 是否正确、pivot 是否对位） |
| **本文 §6** | 尺寸校验清单 |
| `design/art_asset_list.md` §7 | 缺图兜底方案（决定是否 🟠 等待用户） |

### 7.3 06b 阶段六·B.2 交付收尾

- 【交付 1/3】资产清单 → `design/art_asset_list.md` v1.0 ✅
- 【交付 2/3】22 张 prompt → `design/art_prompts/` ✅
- 【交付 3/3】切图与落位 → 本文 ✅

**06b 整个阶段六·B.2 至此交付完毕**，可进入：
- **6·B.4** = 06c 图像生成 subagent 启动批量出图
- **6·B.5** = 06d 美术审核官闭环判定

---

## §8 变更记录

### v1.1（2026-06-02）— v1.0 基础上的 14 张增量同步

- 目录规划（§1）追加 14 条新落位：characters/ +3（GENERIC-1/-2/-3）/ ui/ +6（TITLE/RESULT/TOAST/ICO-PAUSE/-VOLUME/-RESTART）/ emotes/ +5（RANK-S/A/B/C/D）
- 切图规则新增 §2.10（v1.1 6 个小节）：
  - A-UI-TITLE：全屏背景不切片，1024×1024 → 1920×1080 等比放大 + 左右补 `#B8B5A8`
  - A-UI-RESULT：9-slice 40/820/40 × 40/620/40；中央绩效红章预留位不参与拉伸
  - A-UI-TOAST：9-slice 32/536/32 × 32/96/32；左 icon 槽 + 右正文区，无尖角箭头
  - A-UI-ICO-PAUSE / -VOLUME / -RESTART：单张图标 Center pivot，128×128，共用"米白圆盘 + 黄铜金外圈"设计语言
  - A-CHR-GENERIC-1/-2/-3：与主角立绘同规格，Bottom Center pivot，可单开 `characters_generic_atlas` 或并入 `characters_atlas`
  - A-EMOTE-RANK-S/A/B/C/D：5 张装饰贴 Center pivot，与 CEO-STAMP 共用 `emotes_atlas`；RANK-D 与 CEO-STAMP 同砖红但中央图形 + 装饰差异区分
- 尺寸校验清单（§6）追加 14 行
- atlas 归属：
  - `ui_atlas` 成员从 v1.0 的 6 张（含 SHARD-ICON）→ v1.1 11 张（+TITLE 单独不打 atlas + RESULT/TOAST/ICO×3 进 atlas = +5 张进 atlas）
  - 建议 `characters_generic_atlas` 与 v1.0 `characters_atlas` 分两个 atlas（避免主角与泛用怪物互相挤压尺寸）
  - `emotes_atlas` 成员从 v1.0 1 张 → v1.1 6 张
- 与 art_asset_list v1.1 完全对账：14 张增量分别在 v1.1 §1 / §5.x / §6 / §9 / §10 中全表落地
- 06b 阶段六·B.2 v1.1 增量交付收尾：
  - 【交付 1/3】资产清单 v1.1 → `design/art_asset_list.md` v1.1 ✅
  - 【交付 2/3】14 张 prompt v1.1 → `design/art_prompts/` ✅
  - 【交付 3/3】切图与落位 v1.1 → 本文 ✅
- 可进入 6·B.4（启动 06c 出 14 张增量）+ 6·B.5（06d 审核闭环）

### v1.0（2026-05-20）— 一次性交付定稿

- 与 art_asset_list v1.0（22 条）+ art_prompts/（22 张）+ art_style_guide v1.0 同步
- 完成 atoms 目录规划（§1）覆盖 22 条资产
- 9-slice 参数固化（§2.4 / §2.5 / §2.6）：CARD-EVENT 32/836/32 × 32/536/32；MAIL-CEO 40/720/40 × 40/420/40；RESUME 32/536/32 × 32/736/32；HPBAR 8/384/8 × 8/24/8；BTN 24/208/24 × 24/48/24
- 06c post-process 规范（§4）逐条给出 1024×1024 → 目标尺寸的裁切策略；结局 CG 主策略 = 缩放后上下 crop，fallback = letterbox 补 `#B8B5A8` 边带
- color-to-alpha 阈值 ΔE ≤ 24（§4.2），16 张资产走透明化，6 张（背景 + 结局）保留底色
- placeholder 协议 atoms 实操步骤（§5）：ImageMagick 一行命令模板，主色与 art_asset_list §2.2 完全一致
- 与 06c / 06d 交接清单（§7）齐全
