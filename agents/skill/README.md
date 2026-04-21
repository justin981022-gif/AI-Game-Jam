# AI Game Jam Skill

## 概述

AI Game Jam 专用的全流程开发 skill，让 Claude Code 扮演**游戏制作人 + 四类策划 + 美术提示词工程师 + Unity 开发 + QA** 八个角色，完成从概念到可玩原型的闭环。

详见 [SKILL.md](SKILL.md)。

## 触发方式

### 整套八阶段流程

- `启动 AI Game Jam 开发，主题是：XXX`
- `走一遍 jam 流程，灵感来自 Celeste 但把跳跃换成 XXX`
- `帮我从零做一个 jam 小游戏，限时 3 分钟玩时`

### 单阶段直达

- `只跑关卡策划，需求是 5 关难度递增的迷宫`
- `帮我生成一批美术提示词，资产包括：主角/场景背景/UI`
- `再做一轮 Playtest`
- `数值调平衡，当前玩家 5 级打不过 Boss`

### 断点续跑

只需要再次触发 skill。Producer 会检测 `.workflow/gamejam_state.md` 并询问是否从断点继续。

## 八阶段总览

| 阶段 | 角色 | 产物 |
|------|------|------|
| 一 | 主策划 | `design/concept.md`（一句话 pitch + loop + UX 骨架） |
| 二 | 叙事策划 | `design/narrative.md`（世界观 + 角色 + 剧情节拍） |
| 三 | 关卡策划 | `design/levels.md`（关卡表 + 节奏 + 教学节点） |
| 四 | 数值策划 | `design/balance.md`（属性 + 公式 + 成长曲线） |
| 五 | 策划总监 | `design/design_review.md`（一致性评审 + 冲突清单） |
| 六·A | 美术风格规范师 | `design/art_style_guide.md`（色盘 + 笔触 + prompt 前缀） |
| 六·B | 资产提示词工程师 | `design/art_asset_list.md` + `design/art_prompts/*.md` + `design/art_layout.md` |
| 七 | Unity 开发 | `GameJam/Assets/` 内的代码与场景（含美术回填阻塞节点） |
| 八 | QA / Playtest | `design/playtest_report.md` |

## 文件结构

```
agents/skill/
├── SKILL.md                    # Producer 编排入口
├── README.md                   # 本文件
├── prompts/                    # 9 个 subagent prompt
│   ├── 01_chief_designer.md
│   ├── 02_narrative_designer.md
│   ├── 03_level_designer.md
│   ├── 04_balance_designer.md
│   ├── 05_design_review.md
│   ├── 06a_art_style_lead.md
│   ├── 06b_art_prompt_engineer.md
│   ├── 07_unity_developer.md
│   └── 08_playtest_qa.md
└── templates/                  # 10 个产物模板
    ├── gamejam_state_template.md
    ├── concept_template.md
    ├── narrative_template.md
    ├── levels_template.md
    ├── balance_template.md
    ├── design_review_template.md
    ├── art_style_guide_template.md
    ├── art_asset_list_template.md
    ├── art_prompt_template.md
    └── playtest_report_template.md
```

## 关键设计点

- **串行依赖**：叙事→关卡→数值 强依赖链，严格串行，避免并行互相咬合
- **美术拆两段**：风格规范（6·A）在主策划后即可启动，与叙事/关卡/数值并行；资产提示词（6·B）须等策划评审后统一批量生成
- **美术回填阻塞**：阶段七必有"等待用户把 Gemini 出图回填"的阻塞节点，状态标记 🟠
- **回溯成本预警**：Producer 在提议回溯前必须列出影响范围（改叙事 = N 条美术提示词重做）
- **创意决策记录**：状态文件专门有一列记录 jam 高发的创意拐点（主角改设定、删关卡等）
- **Jam 指标**：状态文件含"剩余时间 / 已用时间 / 当前 MVP 星级（0-5）"，Producer 在节奏判断时参考

## 使用流程（整套）

1. 用户描述主题 → Producer 判断整套流程，创建 `.workflow/gamejam_state.md`
2. 主策划 → 用户确认 → Producer 归档 concept.md
3. 叙事 → 用户确认 → 归档 narrative.md
4. 关卡 → 用户确认 → 归档 levels.md
5. 数值 → 用户确认 → 归档 balance.md
6. 整合评审 → 用户确认无 🔴 冲突 → 归档 design_review.md
7. 美术风格规范（可在主策划后提前启动，最迟此时完成）
8. 美术提示词：清单 → 用户裁剪 → 批量生成 → 用户抽查 → 切图建议
9. **用户手动把提示词贴到 Gemini 图像 Gem 生成图片，下载并按 art_layout 路径放进 `GameJam/Assets/Art/`**
10. Unity 开发：范围确认 → 用户同意 → 占位实现 → 🟠 等用户确认资产落位 → 自检 → 用户确认
11. Playtest → 归档报告 → 用户验收通过
12. 收尾：更新 memory、工作流自优化

## 依赖

- 一个支持图像生成的 Gemini Gem（用户侧）
- Unity 2022.3.62f2c1（项目已配置）

## 与 dev-workflow 的关系

本 skill 是 dev-workflow 在 Game Jam 场景下的变体：
- **沿用**：状态文件、断点续跑、问题回溯、subagent 隔离、自治学习、收尾阶段
- **新增**：创意决策列、Jam 指标区块、回溯成本预警、美术回填阻塞节点
- **移除**：飞书预读、阶段三·B 代码结构优化、阶段四独立 Code Review（Review 合并进开发自检）
