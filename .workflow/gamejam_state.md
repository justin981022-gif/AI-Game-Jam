# AI Game Jam 工作流状态文件

> 此文件由 Producer 自动维护，请勿手动修改。

## 基本信息

- **项目名称**：地下城打工人（Dungeon HR）
- **Jam 主题/灵感**：你是魔王城 HR 总监，招募怪物、管理薪酬、抵御勇者突袭
- **流程类型**：整套七阶段（原八阶段，已删除 Unity 开发阶段，程序由团队用 Atoms 实现）
- **启动时间**：2026-04-22
- **最后更新**：2026-05-20
- **项目路径**：E:/SH01/aigamejam/

## Jam 指标

- **总预期时长**：1 个月（每天少量时间）
- **已用时间**：—
- **剩余时间**：—
- **当前 MVP 可玩性评估**：⭐☆☆☆☆（0 星：纯文档阶段）
- **API 成本累计**：
  - aiart 任务数：0（内部服务，不计费）
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
| 六·B | 美术资产提示词 + 自动出图 + 审核 | 🟡 进行中（B.1 资产清单 v0.1 待用户裁剪） | — |
| 七 | 测试用例验收 | ⏳ 待执行 | — |

## 产物路径

- **主策划文档**：E:/SH01/aigamejam/design/concept.md
- **融合方案**：design/final-plan.md v1.0（主策划 + PD 联合签署，2026-04-27）
- **叙事文档**：design/narrative.md v1.3（2026-05-09 chuwen-huang 修订完成）；三人草稿保留在 design/drafts/{zhiyu-qi,chuwen-huang,xiaolong-zhuo}/
- **关卡文档**：design/levels.md **v1.3**（2026-05-19 按 design_review 🟡#1/#2 修订：T06 唯一归属 L07 起点、P04 前置到 L04 末）；三人草稿保留在 design/drafts/{zhiyu-qi,chuwen-huang,xiaolong-zhuo}/
- **数值文档**：design/balance.md **v0.1.2**（2026-05-19 按 design_review 🟡#3 修订：宵星「省钱攒学费」隐藏词条数值定义）
- **策划评审报告**：design/design_review.md **v1.1**（2026-05-19 通过，无 🔴；4 条 🟡 中 #1/#2/#3 已修订落地，#4 入 Playtest 观察清单 KI-01）
- **美术风格规范**：design/art_style_guide.md **v1.0**（2026-05-19 定稿；样品 tmp/style_sample/sample_hr_director.jpg + sample_xiaoxing_skull_mage.jpg 验证风格一致性通过）
- **资产清单**：design/art_asset_list.md **v0.1**（2026-05-20 由 06b 交付 1/3，38 条；待用户裁剪后定稿）
- **资产提示词目录**：—
- **切图/落位建议**：—
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

- **当前阶段**：阶段六·B.1（资产清单审查）🟡 进行中——v0.1 已交付，待用户裁剪后定稿
- **阶段状态**：art_asset_list.md v0.1（38 条；🔴 21 / 🟡 11 / 🟢 6）；atoms/ 工程骨架已建立（落盘约定：`atoms/assets/art/<category>/<asset_id>.png`）
- **下一步**：
  - **第一动作**：用户对 art_asset_list.md 第 7 节"待裁剪建议"做 6 项明确判断（接受/驳回），主策划落锤后定稿为 v1.0；然后启动 06b 进入【交付 2/3：批量 prompt】（按场景 → 立绘 → 敌人 → UI → 特效分批出 prompt 文件到 design/art_prompts/）
  - **三人并行分工**（用户已确认，2026-05-19 决议）：
    - **1 人开发（Atoms）**：依据 balance v0.1.2 + levels v1.3 实现：战斗状态机 / 配置资源（ScriptableObject 等价物）/ EventRollService 3 槽抽签 / B07 OnFirstHeroCrit hook / L03 必死阈值 + 兜底 / L06 行动点参数化；用纯色 placeholder 占位，按 asset_id 命名引用，等美术覆盖
    - **2 人美术**：跑 6·B.2 prompt → 6·B.3 切图建议 → 6·B.4 aiart 自动出图 → 6·B.5 审核；落盘 `atoms/assets/art/<category>/<asset_id>.png`
  - **6·B.1 强制对齐项已落地**：Asset ID 命名规范（A-BG/CHR/ENE/UI/FX/PROP/END/EMOTE）/ 关键尺寸表（结局 1280×720、立绘 768×1024、突发卡片 900×600、CEO 邮件 800×500、简历 600×800、HP 条 400×40）/ 落盘路径与 placeholder 协议（4 色规则）/ 四波优先级
  - 后续 6·B.2~6·B.5 流程 + 阶段七测试用例验收（待 Atoms 程序实现完成后由任意成员触发）
- **今日进度（2026-05-20）**：
  - 阶段五/六·A 关闭成果提交（commit fb25723）
  - 阶段六·B.1 资产清单 v0.1 由 06b 交付 1/3（38 条草案，含 6 项裁剪建议待用户决策）
  - **去 Unity 化**：用户决定不用 Unity 改用 Atoms；创建 atoms/ 工程根目录骨架；落盘约定确定为 `atoms/assets/art/<category>/<asset_id>.png`；art_asset_list.md / gamejam_state.md 路径替换完成（06b skill 文档及其它模板文件待后续清理）
- **昨日进度（2026-05-19）**：
  - 阶段五 design_review v1.1 通过（🟡#1/#2/#3 修订落地为 levels v1.3 + balance v0.1.2，🟡#4 入 KI-01 Playtest 观察）
  - 阶段六·A art_style_guide v1.0 定稿（莫兰迪扁平企业风 + 主色盘 #B8B5A8/#C97B5C/#8FA89B；4 参考锚点：Reigns / Two Point Hospital / BoJack Horseman / 克制版 Corporate Memphis；英文正反向 prompt 前缀已落地）
  - aiart 出 2 张验证样品（HR 总监 + 宵星骷髅法师），风格一致性 ✅
  - 三人并行分工方案确认
- **最后更新**：2026-05-20
