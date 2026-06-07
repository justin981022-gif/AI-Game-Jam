---
last_updated: 2026-06-02T05:50:21Z
---

# Architecture Design

## System Overview
《地下城打工人 (Dungeon HR)》是单机前端 Web 游戏。玩家扮演魔王城 HR 总监，经历 L01–L07 七关线性流程：准备阶段招募/扩建/发奖金，战斗阶段 ROUND_TICK 自动演算并触发突发事件，战后 EVAL 绩效考评（阵亡/抚恤金/解雇/升级/谈薪/经济警告），最终走向 E01–E04 四结局。无后端，纯前端状态机驱动。

## Tech Stack
- Vite + TypeScript + React
- shadcn/ui + Tailwind CSS
- 纯前端状态机（useReducer 风格的 useGame hook）
- 数据 JSON 化（内嵌为 TS 常量，便于策划调参）

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| 类型层 | 全部 TS 类型与枚举 | src/game/types.ts |
| 数据层 | levels/heroes/events/traits/triggers/endings/templates/balance | src/game/data.ts |
| 引擎层 | 状态机、战斗演算、招募、EVAL、随机生成、词条效果 | src/game/engine.ts |
| 状态管理 | useGame hook（驱动 UI 的核心 reducer） | src/game/useGame.ts |
| 主屏组件 | 准备/战斗/EVAL 三大界面 | src/components/GameScreens.tsx |
| 弹窗组件 | 简历/事件卡片/邮件/谈薪/结局 | src/components/Dialogs.tsx |
| 编排页 | 主入口，组合所有界面与弹窗 | src/pages/Index.tsx |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| 状态管理 | 单一 useReducer/自定义 hook | 状态机复杂，集中管理保证一致性 |
| 数值参数 | 集中 balance 常量对象 | 规格中大量 🟡 占位值需可调 |
| L03 强制阵亡 | 脚本强制 HP=0 | 规格明确选脚本强制路径 |
| 🔴 未决项 | 合理默认值实现 | 不阻塞 MVP |

## File Tree Plan
- src/game/types.ts
- src/game/data.ts
- src/game/engine.ts
- src/game/useGame.ts
- src/components/GameScreens.tsx
- src/components/Dialogs.tsx
- src/pages/Index.tsx
- src/App.tsx (minimal route change)

## Implementation Guide
1. types -> data -> engine -> useGame -> components -> Index
2. 图片资产先生成，URL 写入代码
3. lint + build 校验

