# 地下城打工人 (Dungeon HR)

AI Game Jam 项目 — Unity WebGL H5 游戏，2GB 上限，三人团队。

## 快速导航

| 文档 | 说明 |
|------|------|
| [design/concept.md](design/concept.md) | ✅ 核心概念（已确认）— 玩法/胜负/经济/美术风格 |
| [design/narrative.md](design/narrative.md) | 叙事文档（策划 agent 生成后填入） |
| [design/levels.md](design/levels.md) | 关卡文档 |
| [design/balance.md](design/balance.md) | 数值文档 |
| [design/art_style_guide.md](design/art_style_guide.md) | 美术风格规范 |
| [agents/skill/SKILL.md](agents/skill/SKILL.md) | AI 工作流主入口 |
| [.workflow/collaboration_rules.md](.workflow/collaboration_rules.md) | AI 协作规范（文档优先原则、多人协作摘要） |

## 协作规范

三人均为程序员，轮换担任美术/策划/程序角色。

**协作模式：状态机流水线**
- 发起人提出需求 → AI 生成草稿 → commit（状态: pending）
- 开发/美术并行处理各自内容 → 各自确认（状态: confirmed）
- 任务状态文件路径：`.workflow/tasks/<feature_id>/status.json`

详见 [agents/skill/SKILL.md](agents/skill/SKILL.md) 多人协作章节。

## 技术栈

- Unity WebGL，2GB 包体上限
- 数据驱动架构，怪物/技能/勇者数据全部 JSON 载入
- 出图：公司内部 aiart（主路径），Gemini（fallback）
- 环境：Windows + git-bash + Node.js v22，无 python3
