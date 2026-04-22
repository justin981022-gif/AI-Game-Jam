# AI 协作规范

> 本文档约束三人团队及各自 AI 的协作行为，所有人启动 AI 前请确认已读。

## 文档优先原则

**仓库文档是唯一共享基准，本地 AI 记忆不能替代仓库文档。**

- 任何需要三人共同遵守的决策，必须写入仓库对应文档
- 本地记忆（`~/.claude/` 等）只在单个用户的 session 中生效，其他人的 AI 看不到
- 写入记忆的同时，必须同步写入仓库

适用范围：玩法方案、协作规范、技术约定、美术风格、任何拍板的设计决策。

## 多人协作模式

详见 [../agents/skill/SKILL.md](../agents/skill/SKILL.md) 的「多人协作模式」章节。

摘要：
- 发起人提出需求 → AI 生成草稿 → commit（状态: pending）
- 开发/美术并行处理 → 各自确认（状态: confirmed）
- 任务状态文件：`.workflow/tasks/<feature_id>/status.json`
- 同一 feature 同一时间只有一人认领，认领时飞书群告知

## 文档索引

| 文档 | 说明 |
|------|------|
| [../README.md](../README.md) | 项目导航入口 |
| [../design/concept.md](../design/concept.md) | 核心概念（已确认） |
| [../agents/skill/SKILL.md](../agents/skill/SKILL.md) | AI 工作流主入口 |
