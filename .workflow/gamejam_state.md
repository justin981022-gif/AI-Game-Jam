# AI Game Jam 工作流状态文件

> 此文件由 Producer 自动维护，请勿手动修改。

## 基本信息

- **项目名称**：地下城打工人（Dungeon HR）
- **Jam 主题/灵感**：你是魔王城 HR 总监，招募怪物、管理薪酬、抵御勇者突袭
- **流程类型**：整套七阶段（原八阶段，已删除 Unity 开发阶段，程序由团队用 Atoms 实现）
- **启动时间**：2026-04-22
- **最后更新**：2026-06-04
- **项目路径**：E:/SH01/aigamejam/

## Jam 指标

- **总预期时长**：1 个月（每天少量时间）
- **已用时间**：—
- **剩余时间**：—
- **当前 MVP 可玩性评估**：⭐☆☆☆☆（0 星：纯文档阶段）
- **API 成本累计**：
  - aiart 任务数：83（v1.0 49 + v1.1 14 + E01/E02 v3 CEO 修订 2 + v1.2 BUST 11 + R2 CARD-EVENT/RESULT/RESUME/TOAST/MAIL-CEO/TITLE 修订 6 + R2 aiart-only 路径 TITLE 1；内部服务，不计费；注：实际 R2 共 6 次 aiart gen + 5 次 rmbg）
  - aiart /remove-backgrounds 调用：58（v1.0 21 + v1.1 13 + E01/E02 v3 不抠图 0 + v1.2 BUST 11 + R2 修订 5 张走 rmbg；内部服务，不计费）
  - Gemini Flash 调用：0 次（$0.00）
  - Gemini Pro 调用：0 次（$0.00）
  - 06d 审核 token：$0.00
  - **Gemini 部分合计**：$0.00
- **成本硬顶**：$10（仅 Gemini fallback 路径生效）

## 进度总览

| 阶段 | 名称 | 状态 | 完成时间 |
|------|------|------|----------|
| 一 | 主策划 | ✅ 已完成 | 2026-04-22 |
| 二 | 叙事策划 | ✅ 已完成（v1.4 同步 balance v0.2.0 经济收入机制重作） | 2026-06-02 |
| 三 | 关卡策划 | ✅ 已完成（v1.4 同步 balance v0.2.0 经济收入机制重作） | 2026-06-02 |
| 四 | 数值策划 | ✅ 已完成（v0.2.0 经济收入机制重作：A 固定通关奖 → B 绩效提成 + C AP 换碎片） | 2026-06-02 |
| 五 | 策划整合评审 | ✅ 已完成（design_review v1.2 通过；新增"碎片收入机制是否上下游一致"维度；11 维度全 🟢） | 2026-06-02 |
| 六·A | 美术风格规范 | ✅ 已完成（v1.0 定稿，aiart 双样品风格一致性验证通过） | 2026-05-19 |
| 六·B | 美术资产提示词 + 自动出图 + 审核 | 🟡 进行中（B.1/B.2/B.3 ✅；B.4 ✅ 22 张全量出图落盘；B.5 06d 全量审核完成 14🟢/6🟡/2🔴；R2 三张已重出待用户人眼审核；**v1.2 11 张半身像 2026-06-04 全量出图 + rmbg 落盘**） | — |
| 七 | 测试用例验收 | ⏳ 待执行 | — |

## 产物路径

- **主策划文档**：E:/SH01/aigamejam/design/concept.md **v1.3**（2026-06-03 再次取消招募成本，恢复招募免费）
- **融合方案**：design/final-plan.md v1.0（主策划 + PD 联合签署，2026-04-27）
- **叙事文档**：design/narrative.md **v1.6**（2026-06-03 删除 v1.5 加入的简历卡片招募费交接约定）；三人草稿保留在 design/drafts/{zhiyu-qi,chuwen-huang,xiaolong-zhuo}/
- **关卡文档**：design/levels.md v1.6（2026-06-03 v1.6 不变 — 招募是数值层）；三人草稿保留在 design/drafts/{zhiyu-qi,chuwen-huang,xiaolong-zhuo}/
- **数值文档**：design/balance.md **v0.6.0**（2026-06-03 再次取消招募成本恢复招募免费 + 启动 70→50；勇者强度曲线 / 战斗 ROUND_TICK 11-13 / DPS_UNIT 80 全部保留 v0.5.0）
- **策划评审报告**：design/design_review.md **v1.6**（2026-06-03 重审通过，11 维度全 🟢；P03 触发链稳定保留 L03 战后 42<45 裕度 3）
- **Atoms 策划案 / GDD**：atoms/game_design.md **v0.7**（2026-06-03 由 design/atoms_spec.md 重命名 + 移位到 atoms/ 目录；同步 balance v0.6.0：§3 招募 0 启动 50 / §4 schema 删除 recruit_cost / §11.1 主屏招募按钮"免费" + SHARDS 50 / §11.4 简历卡片删除"招募费 6"）
- **Atoms 美术资产替换指南**：atoms/asset_usage_guide.md **v1.0**（2026-06-03 配套 game_design.md 的资产 → 用法映射）
- **美术风格规范**：design/art_style_guide.md **v1.0**（2026-05-19 定稿；样品 tmp/style_sample/sample_hr_director.jpg + sample_xiaoxing_skull_mage.jpg 验证风格一致性通过）
- **资产清单**：design/art_asset_list.md **v1.2**（2026-06-04 用户「11 张含 5 勇者」决议，11 张半身像增量；36 → 47 条；28 🔴 / 13 🟡 / 6 🟢）
- **资产提示词目录**：design/art_prompts/（2026-06-04 47 张 prompt 全量落地：v1.0 22 张 + v1.1 增量 14 张 + v1.2 BUST 11 张）
- **切图/落位建议**：design/art_layout.md **v1.2**（2026-06-04 由 06b 在 v1.1 基础上 append §2.11 半身像规格 + 11 条尺寸/atlas/canonical 同步约束）
- **UI Mockup 示意图集**：design/ui_mockups/ v1.0（2026-06-03 9 张场景 mockup + README，基于真实资产合成；2026-06-04 03_recruit 切换到 BUST 头像）
- **Atoms 工程根**：atoms/（2026-05-20 创建骨架，落盘约定 `atoms/assets/art/<category>/<asset_id>.png`）
- **测试报告**：—

## 创意决策记录

| 阶段 | 决策类型 | 决策内容 | 时间 |
|------|---------|---------|------|
| 一 | 核心设定 | 地下城打工人（Dungeon HR），魔王城 HR 总监视角，扁平企业风 | 2026-04-22 |
| 一 | 机制调整 | 战斗改为分段实时演算，自动推进+点击加速，突发事件限时10s超时选不利，每场最多3个随机触发 | 2026-04-22 |
| 二 | 创意方向 | xiaolong-zhuo 草稿提出"渊净保洁服务有限公司"主题换皮方向（机制保留 concept，虚构层改为地牢保洁公司 + CL/SV/MD 三职业 + 前任经理 K. 失踪悬疑副线）。用户确认换皮路径，待融合阶段决定是否采纳 | 2026-04-24 |
| 二/三 | 融合决策 | 主策划 + PD 联合签署 final-plan.md v1.0：以 zhiyu-qi 主干为基线，融合 chuwen-huang 5 项（P03 提前 L03 / 格鲁巴斯私信 / 宵星替换奥莫斯 / C01 事件 / 简历内心泄露句）；废弃 xiaolong-zhuo 全部内容（保洁换皮/三职业/K 系列副线移入 v2 候选）；C02–C05 推迟 v2 | 2026-04-27 |
| 六·B | 资产扩展 | 用户 review v1.0 后发问"还需哪些图"，Producer 提议 14 张增量（A-UI-TITLE / A-UI-RESULT / A-CHR-GENERIC-1~3 / A-UI-ICO-{PAUSE,VOLUME,RESTART} / A-UI-TOAST / A-EMOTE-RANK-{S,A,B,C,D}），用户回"都补"全部采纳；art_asset_list 升级 v1.1（22 → 36 条），仅完成清单 + prompt 文本，**未启动 06c 出图**（等用户拍板再烧 API） | 2026-06-02 |
| 四/五 | 经济收入机制重作 | 用户发现 concept/narrative/levels 没有"碎片收入"机制描述。深查发现 balance v0.1.x §4.3 单方面隐式实施了"固定通关奖 RewardOnClear=15+5×(level-1)"+"招募成本 25"，design_review v1.1 漏检。用户拍板推翻 A 方案，改用 **B（绩效提成 8+8×活+3×⌊伤/25⌋）+ C（AP 换碎片，4 碎片/AP，称"打零工"）**；启动 120→55，安全线 40→45，招募改为免费。balance v0.2.0、concept v1.1、narrative v1.4、levels v1.4、atoms_spec v0.2、design_review v1.2 同步落地；design_review 新增"碎片收入机制是否上下游一致"维度防再发 | 2026-06-02 |
| 四/五 | 取消招募免费、恢复差异化招募成本 | 用户决策 v0.2.0 的"招募免费"规则与传统经济游戏直觉不符，改为**差异化招募成本**（TANK 6 / DPS 12 / RANGE 10，反映高产怪物市场紧缺溢价）。配套调整：启动 55→70、SURVIVE_REWARD 8→10、提成各关 19/22/33/35/48 → 21/24/37/39/54。新 P03 触发链：L02→L03 间 49 ≥ 45 不提前触发，L03 战后 44 < 45 触发（裕度 1）。balance v0.3.0、concept v1.2、narrative v1.5、atoms_spec v0.4、design_review v1.3 同步落地；levels 不变（招募是数值层不影响关卡结构） | 2026-06-02 |
| 四/五 | 勇者强度上调 + 提成 DPS_UNIT 微调 + L03 强制阵亡脚本路径 | 用户反馈 v0.3.0 数值"难度略低、勇者过弱、战斗过短"（L02-L05 仅 3-4 ROUND_TICK 即结束）。balance v0.4.0 上调勇者全表（W01:50/10/W02:80/13/W03:115/17/W04:180/22/ELITE:280/29，每关跃迁 ≥29% ATK / ≥44% HP）+ DPS_UNIT 25→30 + L03 强制阵亡改脚本主路径。新战斗 ROUND_TICK 4-9。提成总额 175→193，新 L05/L06 提成 39/54 → 46/65。balance v0.4.0、levels v1.5、atoms_spec v0.5、design_review v1.4 同步落地 | 2026-06-03 |
| 四/五 | 战斗 ROUND_TICK ≥10 硬性约束（再上调）| 用户硬性要求"每关战斗回合数不小于 10"。balance v0.5.0 上调勇者 HP ~100%（W01-ELITE 50/80/115/180/280 → 110/220/330/440/600）+ ATK 同步降低（10/13/17/22/29 → 5/7/10/13/18）保证玩家 survive 长战斗 + DPS_UNIT 30→80 让提成坡度变缓。战斗 ROUND_TICK 由 4-9 提升到 11-13 全部 ≥10 ✓。提成总额 193→187（-6 微减），P03 触发链稳定（L03 战后 44 < 45 不变）。**B04 在 L05 由"激进策略"升级为"基本盘"**——玩家未发 B04 几乎必败 L05。balance v0.5.0、levels v1.6、atoms_spec v0.6、design_review v1.5 同步落地；新增 KI-02 长战斗专注度观察项 | 2026-06-03 |
| 四/五 | 再次取消招募成本，恢复招募免费 | 用户决策再次取消差异化招募成本（v0.5.0 沿用 v0.3.0 引入的 6/12/10），恢复 v0.2.0 招募免费规则。balance v0.6.0 启动碎片 70→50（净启动资金等同：v0.5.0 70 - 招募 24 ≈ v0.6.0 50），招募成本列归零，账户曲线刷新（终值 75→79，最低点 7→11，更宽容）。P03 触发链稳定保留（L03 战后 42 < 45，裕度 3 比 v0.5.0 裕度 1 略宽）。爆发流 L01-L03 起步压力大幅缓解（v1.5"更紧"→ v1.6"中等"），均衡流变得"最稳"。balance v0.6.0、concept v1.3、narrative v1.6、atoms_spec v0.7、design_review v1.6 同步落地；levels 不变（招募是数值层）；勇者强度 / ROUND_TICK 11-13 / DPS_UNIT 80 全部 v0.5.0 保留 |
| 六·B | 11 张半身像增量（v1.2） | 用户在 03_recruit mockup 中发现简历头像槽用立绘头胸裁切效果差（构图不可控、文字超出）。Producer 提议出独立"半身像" asset，用户口径「11 张（含 5 勇者）」拍板：6 candidate (HR/GROOBAS/XIAOXING/GENERIC-1/2/3) + 5 enemy (W01-W04+ELITE)，规格统一 256×256 透明 PNG。aiart 11 + rmbg 11 全量成功（173s 一次跑通，11/11）。art_asset_list v1.1→v1.2、art_layout v1.1→v1.2 同步落地，新增 §5.10 / §2.11 章节；mockup 03_recruit 切换到 BUST 头像验证布局命中。canonical 同步约束写入 11 份 prompt 文件（与立绘版 cross-prompt 一致） | 2026-06-04 |
| 六·B | 透明资产 trim 修复（全量 40 张） | 用户反馈"atoms 中无法正确显示，是不是因为图片真实尺寸和 size 不同"。诊断：v1.0/v1.1/v1.2 batch 脚本对 rmbg 输出（1024×1024 透明 + 主体居中）直接 `resize(target, fit:'contain')`，主体只占 texture 21-47%，外围全透明 padding，Unity 等按 texture size 摆放时尺寸/对位错乱。修法：`tmp/run_trim_all.js` 对全部 40 张透明资产先 `sharp.trim({alpha:0, threshold:1})` 切除透明边再 resize。修后填充率 27%→74%（立绘）/ 45%→88%（BUST）/ 10%→90%（A-UI-BTN）/ 39-71%→98-100%（emote/icon）；canvas 尺寸不变保留 atlas 约定；同步把 trim 步骤补到 `run_aiart_v1_1.js` / `run_aiart_bust.js` 模板，避免后续出图重蹈覆辙 | 2026-06-04 |
| 六·B | CARD-EVENT + RESULT R2 重出去 LOREM IPSUM | 用户提交 atoms 主界面截图（tmp/screenshot/GameScene.jpeg），8 项问题之一：动作按钮 + 槽位贴的资产里中央"LOREM IPSUM/DREM IPSUM"占位文字泄漏到游戏 UI。溯源：v1 正向 prompt 自身要求"only LOREM IPSUM placeholder text shown as light grey horizontal bars"。修法：两份 prompt 删除该句，改为"ABSOLUTELY NO TEXT...pure flat cream surface ready for code-side text overlay"；反向加 LOREM IPSUM / placeholder text / latin words / chinese chars / grey text bars 等强禁忌。aiart 2 + rmbg 2 跑 219s 成功 2/2，trim 后填充率 84% (CARD-EVENT) / 66% (RESULT)。两份 prompt §审核结论 段已写入 R2 修订记录；__v2__aiart.png 历史保留 | 2026-06-04 |
| 六·B | RESUME R2 重出去灰横条 | 用户追问"简历的 ui 是不是也需要改"。回查 A-UI-RESUME v1 同样反模式：prompt 自身要求"五条灰横条 LOREM IPSUM 占位 + 两条头部灰带"，与代码层叠加文字打架（且旧 06d 审核曾记录"RESUME"单词泄漏）。修法同 CARD-EVENT/RESULT：正向改"ONE brass header stripe ONLY + body COMPLETELY EMPTY"，反向强禁忌全套。aiart 1 + rmbg 1 跑 79s 成功 1/1。验收：干净 RESUME 模板（brass 顶带 + 白色头像槽 + 空白 body + 签名线 + 圆章位 + 4 角铜装饰），mockup 03 三张简历验证通过 | 2026-06-04 |
| 六·B | TOAST + MAIL-CEO + TITLE R2 重出 | RESUME 修完后系统性 grep 全 prompt（`LOREM\|placeholder text\|grey bars`），扫到剩 3 张 UI 框资产同反模式：A-UI-TOAST 右侧 2 灰条；A-UI-MAIL-CEO 抬头 2+ body 4 共 6 灰条（最严重）；A-UI-TITLE 直接印可读"LOREM IPSUM"英文字（比灰条更糟）。3 份 prompt 同时修：正向改"COMPLETELY EMPTY"；反向加全套强禁忌；TITLE 显式约束"Dungeon HR is a CONCEPT, NOT to be drawn as readable text"。aiart 3 + rmbg 2（TITLE opaque 无 rmbg）= 5 调用，228s 一次成功 3/3。验收：TOAST 空白 body + 左侧 icon 槽；MAIL-CEO 空白 body + brass 分隔 + terracotta 圆章位；TITLE 副标题带空白 + 无字 Start 钮 + 魔王城塔保留 | 2026-06-04 | 2026-06-03 |

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

- **当前阶段**：阶段六·B v1.1 增量落盘 ✅ + 经济收入机制重作完成 ✅（v0.2.0）+ 取消招募免费、恢复差异化招募成本完成 ✅（v0.3.0）+ 勇者强度上调 + L03 阵亡脚本路径完成 ✅（v0.4.0）+ 战斗 ROUND_TICK ≥10 硬性约束完成 ✅（v0.5.0）+ 再次取消招募成本恢复招募免费完成 ✅（v0.6.0）+ **v1.2 11 张半身像出图落盘 ✅（aiartGen 11 + rmbg 11，2026-06-04）**
- **阶段状态**：v1.0 22 张 + v1.1 14 张 + E01/E02 v3 + **v1.2 BUST 11 张 = 47 张 final PNG 落盘 atoms/assets/art/**；策划文档闭环（concept v1.3 / narrative v1.6 / levels v1.6 / balance v0.6.0 / atoms/game_design.md v0.7 / asset_usage_guide.md v1.0 / design_review v1.6）；UI mockup 9 张已用真实资产合成（design/ui_mockups/）；尚未 git commit
- **下一步**：
  - 用户回来后决策是否 commit 数值机制 5 轮重作的 7 个文档变更（balance v0.2.0→v0.3.0→v0.4.0→v0.5.0→v0.6.0 / concept v1.1→v1.2→v1.3 / narrative v1.4→v1.5→v1.6 / levels v1.4→v1.5→v1.6 / atoms_spec v0.3→v0.4→v0.5→v0.6→v0.7 / design_review v1.2→v1.3→v1.4→v1.5→v1.6 / state.md）
  - 用户回来后决策是否 commit v1.1 增量包（14 张图 + E01/E02 v3 + 4 份美术文档增量 + state 更新）
  - 后续若要建 img2img 能力：先解决图床（公司内 OSS / 公网图床合规确认）
  - v1.0 遗留收尾（**CARD-EVENT / RESULT "LOREM IPSUM" 残留已 R2 修复 2026-06-04 ✅**；13 张 v3 未逐一复核 / rmbg 流程固化进 tmp/run_aiart_batch.js）— 与新工作并轨择期处理
  - 阶段七测试用例验收（Atoms 程序实现完成后触发；本次重作不影响 atoms 骨架）
  - Playtest 期重点观察 KI-02（长战斗 11-13 ROUND_TICK 对玩家专注度的考验，必要时调 ROUND_TICK_DURATION 1.3s→1.0s）
- **今日进度（2026-06-02）**：
  - v1.0 review：用户问"还需哪些图"
  - 差距分析：跨 narrative/levels/asset_list 提议 14 张增量（2 必需 / 6 建议 / 6 可选）
  - 用户决议"都补"，全部采纳
  - 06b 一次性产出 v1.1：art_asset_list v1.0 → v1.1（22 → 36）/ art_layout v1.0 → v1.1 / 14 张新 prompt
  - 用户决议"14 张一次全出"（不分批、不走 06d）
  - 06c 一次跑通 14/14：14 张 aiart gen + 13 张 rmbg（A-UI-TITLE 不抠图）+ sharp post-process，全部落盘 atoms/assets/art/，§9 跟踪表回填完成
- **历史**：
  - 2026-05-27 第三轮：阶段六·B.4/B.5（22 张 v3 transparent + HR v4 + E01/E02 v2，全部 rmbg）
  - 2026-05-27 第二轮：阶段六·B.4/B.5 22 张首批 + 06d 全量审核 14🟢/6🟡/2🔴
  - 2026-05-20：阶段六·B.1/B.2/B.3 三步全量收口
- **今日进度（2026-05-27 第三轮）**：
  - 诊断：hand-roll 色键算法（四角采样 + 全图色距）对含内部白色的资产挖洞 — HR 眼白/衣服、RESUME 纸张、CARD-EVENT 内框全中招
  - 验证：aiart 原生有 `/api/v1/ai-fusion-openapi/images/remove-backgrounds`（异步 taskId+poll），输入 imageURL，效果显著优于 hand-roll（保留所有内部细节）
  - 限制：rmbg 仅接公开 URL，不支持 base64/upload，无 file endpoint；CDN URL 几分钟即 403，必须"生成→立即喂 rmbg"
  - 落地：`tmp/run_aiart_rmbg.js` 16 张并发跑 → 12/16 + 修复批 4/4 = 16/16 全成功
  - 反馈修订：HR 加强可爱 chibi 描述、禁忌身材曲线/胸部强调；E01/E02 HR 由"橙西装男"改写为"米色西装女主角"
  - 修订重出：HR v4 + E01/E02 v2 共 3 张 → 用户 5 张关键视觉复核全部 OK
- **历史**：
  - 2026-05-27 第二轮：阶段六·B.4/B.5（22 张全量出图 + 06d 全量审核，14🟢/6🟡/2🔴）
  - 2026-05-20：阶段六·B.1/B.2/B.3 三步全量收口
- **最后更新**：2026-06-04
