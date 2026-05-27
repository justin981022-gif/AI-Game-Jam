# AI Game Jam 工作流状态文件

> 此文件由 Producer 自动维护，请勿手动修改。

## 基本信息

- **项目名称**：地下城打工人（Dungeon HR）
- **Jam 主题/灵感**：你是魔王城 HR 总监，招募怪物、管理薪酬、抵御勇者突袭
- **流程类型**：整套七阶段（原八阶段，已删除 Unity 开发阶段，程序由团队用 Atoms 实现）
- **启动时间**：2026-04-22
- **最后更新**：2026-05-27
- **项目路径**：E:/SH01/aigamejam/

## Jam 指标

- **总预期时长**：1 个月（每天少量时间）
- **已用时间**：—
- **剩余时间**：—
- **当前 MVP 可玩性评估**：⭐☆☆☆☆（0 星：纯文档阶段）
- **API 成本累计**：
  - aiart 任务数：23（首批 22 + W04 重提交 1；内部服务，不计费）
  - Gemini Flash 调用：0 次（$0.00）
  - Gemini Pro 调用：0 次（$0.00）
  - 06d 审核 token：$0.00
  - **Gemini 部分合计**：$0.00
- **成本硬顶**：$10（仅 Gemini fallback 路径生效）

## 进度总览

| 阶段 | 名称 | 状态 | 完成时间 |
|------|------|------|----------|
| 一 | 主策划 | ✅ 已完成 | 2026-04-22 |
| 二 | 叙事策划 | ✅ 已完成（v1.3 由 chuwen-huang 修订落地） | 2026-05-09 |
| 三 | 关卡策划 | ✅ 已完成（v1.2 → v1.3 按 design_review 修订） | 2026-05-19 |
| 四 | 数值策划 | ✅ 已完成（v0.1.1 → v0.1.2 按 design_review 修订） | 2026-05-19 |
| 五 | 策划整合评审 | ✅ 已完成（design_review v1.1 通过；🟡#1/#2/#3 修订落地，#4 进入 Playtest 观察） | 2026-05-19 |
| 六·A | 美术风格规范 | ✅ 已完成（v1.0 定稿，aiart 双样品风格一致性验证通过） | 2026-05-19 |
| 六·B | 美术资产提示词 + 自动出图 + 审核 | 🟡 进行中（B.1/B.2/B.3 ✅；B.4 ✅ 22 张全量出图落盘；B.5 审核待启动） | — |
| 七 | 测试用例验收 | ⏳ 待执行 | — |

## 产物路径

- **主策划文档**：E:/SH01/aigamejam/design/concept.md
- **融合方案**：design/final-plan.md v1.0（主策划 + PD 联合签署，2026-04-27）
- **叙事文档**：design/narrative.md v1.3（2026-05-09 chuwen-huang 修订完成）；三人草稿保留在 design/drafts/{zhiyu-qi,chuwen-huang,xiaolong-zhuo}/
- **关卡文档**：design/levels.md **v1.3**（2026-05-19 按 design_review 🟡#1/#2 修订：T06 唯一归属 L07 起点、P04 前置到 L04 末）；三人草稿保留在 design/drafts/{zhiyu-qi,chuwen-huang,xiaolong-zhuo}/
- **数值文档**：design/balance.md **v0.1.2**（2026-05-19 按 design_review 🟡#3 修订：宵星「省钱攒学费」隐藏词条数值定义）
- **策划评审报告**：design/design_review.md **v1.1**（2026-05-19 通过，无 🔴；4 条 🟡 中 #1/#2/#3 已修订落地，#4 入 Playtest 观察清单 KI-01）
- **美术风格规范**：design/art_style_guide.md **v1.0**（2026-05-19 定稿；样品 tmp/style_sample/sample_hr_director.jpg + sample_xiaoxing_skull_mage.jpg 验证风格一致性通过）
- **资产清单**：design/art_asset_list.md **v1.0**（2026-05-20 用户拍板，6 项裁剪全接受，38 → 22 条；20 🔴 / 1 🟡 / 0 🟢）
- **资产提示词目录**：design/art_prompts/（2026-05-20 完成 22 张 prompt 全量落地）
- **切图/落位建议**：design/art_layout.md **v1.0**（2026-05-20 由 06b 交付 3/3，467 行；含目录规划 / 切图规则 / Atoms 导入约定 / 06c post-process 规范 / placeholder 协议 / 尺寸校验清单 / 6·B.4-5 交接说明）
- **Atoms 工程根**：atoms/（2026-05-20 创建骨架，落盘约定 `atoms/assets/art/<category>/<asset_id>.png`）
- **测试报告**：—

## 创意决策记录

| 阶段 | 决策类型 | 决策内容 | 时间 |
|------|---------|---------|------|
| 一 | 核心设定 | 地下城打工人（Dungeon HR），魔王城 HR 总监视角，扁平企业风 | 2026-04-22 |
| 一 | 机制调整 | 战斗改为分段实时演算，自动推进+点击加速，突发事件限时10s超时选不利，每场最多3个随机触发 | 2026-04-22 |
| 二 | 创意方向 | xiaolong-zhuo 草稿提出"渊净保洁服务有限公司"主题换皮方向（机制保留 concept，虚构层改为地牢保洁公司 + CL/SV/MD 三职业 + 前任经理 K. 失踪悬疑副线）。用户确认换皮路径，待融合阶段决定是否采纳 | 2026-04-24 |
| 二/三 | 融合决策 | 主策划 + PD 联合签署 final-plan.md v1.0：以 zhiyu-qi 主干为基线，融合 chuwen-huang 5 项（P03 提前 L03 / 格鲁巴斯私信 / 宵星替换奥莫斯 / C01 事件 / 简历内心泄露句）；废弃 xiaolong-zhuo 全部内容（保洁换皮/三职业/K 系列副线移入 v2 候选）；C02–C05 推迟 v2 | 2026-04-27 |

## 阻塞事项

| 状态 | 描述 | 记录时间 | 解决时间 |
|------|------|----------|----------|
| — | — | — | — |

## 待处理问题

| 等级 | 描述 | 记录时间 |
|------|------|----------|
| — | — | — |

## 回溯历史

| 触发阶段 | 回溯到 | 原因 | 影响范围 | 时间 |
|---------|--------|------|---------|------|
| — | — | — | — | — |

## 当前状态

- **当前阶段**：阶段六·B.1/B.2/B.3 ✅ 关闭；阶段六·B.4 ✅ 关闭（22 张全量自动出图落盘）；阶段六·B.5（06d 审核）待启动
- **阶段状态**：22 张 prompt 全量落地（design/art_prompts/）；art_layout.md v1.0；22 张 final PNG 已落盘 atoms/assets/art/<category>/<asset_id>.png（含 16 张透明抠图 + 6 张全场景）；raw 版本 `<asset_id>__v1__aiart.jpg` 同目录保留作证据
- **下一步**：
  - **第一动作**：用户对 22 张图人眼抽查 → 决策是否启动 06d 审核闭环 / 或直接进入开发
  - **三人并行分工**（用户已确认，2026-05-19 决议）：
    - **1 人开发（Atoms）**：依据 balance v0.1.2 + levels v1.3 实现：战斗状态机 / 配置资源 / EventRollService 3 槽抽签 / B07 OnFirstHeroCrit hook / L03 必死阈值 + 兜底 / L06 行动点参数化；现已可用 22 张真图替换 placeholder（按 art_layout 引用 asset_id）
    - **2 人美术**：6·B.4 已批量完成；如启动 6·B.5 由 06d 给逐张评分 + 修正建议
  - 后续：阶段七测试用例验收（待 Atoms 程序实现完成后由任意成员触发）
- **今日进度（2026-05-27）**：
  - 阶段六·B.4：22 张全量 aiart 出图，并行 concurrency=10，首批 17/22 通过 + 修复批 5/5 通过 ✅ 关闭
    - 失败模式：aiart 偶发返回 PNG（4 张，magic 为 89504e47）/ poll 180s 超时（5 张，实际 200~280s 完成）/ 文件句柄竞态（2 张）→ 修复脚本统一接受 PNG/JPEG + maxSec 360s + 从 raw 直接 post-process
    - post-process：node + sharp，chroma-key 四角中位数取 key + 双阈值平滑边缘 + alpha bbox 自动裁切 + contain fit
    - 文件清单全 ✅ 落盘 atoms/assets/art/{backgrounds,characters,enemies,ui,props,endings,emotes}/
  - art_asset_list.md §9 回填表全量 ✅，含失败模式批注
- **昨日进度（2026-05-20）**：
  - 阶段六·B.1/B.2/B.3 三步全量收口（资产清单 v1.0 / 22 张 prompt / art_layout.md v1.0）
  - 去 Unity 化决议：路径与术语 Atoms 化
- **最后更新**：2026-05-27
