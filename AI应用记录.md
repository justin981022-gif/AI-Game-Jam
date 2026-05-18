# AI 应用记录 · AI Game Jam

> 用途：记录本项目在 AI Game Jam 过程中对 AI 工具的实际应用过程，用于飞书「AI 应用报告」云文档归档。
> 记录粒度：只记录大致的阶段性行为与关键决策；琐碎的小改动（单行修改、拼写订正等）不记录。

## 工具栈

| 工具 | 用途 |
|------|------|
| Claude Code (Opus 4.7) | 主力 AI 编程 / 工作流编排 / 文档生成 |
| Claude Code Subagents | 分饰策划、美术、Unity 开发、QA 等角色 |
| Gemini 图像 Gem | 美术资产生成（用户侧操作） |
| Unity 2022.3.62f2c1 | 游戏工程本体 |

## 工作流总览

本项目采用自定义 skill：`agents/skill/`（Producer + 8 阶段串行流水线），让 Claude 扮演主策划 / 叙事 / 关卡 / 数值 / 策划总监 / 美术风格规范师 / 美术提示词工程师 / Unity 开发 / QA 八个角色闭环产出可玩原型。详见 `agents/skill/README.md`。

---

## 开发日志

### 2026-04-18 · 项目初始化
- 行为：GitLab 仓库初始化，生成基础 README。
- AI 介入：无（纯手动 git init / 模板 README）。
- 产物：`README.md`、`.gitignore`。

### 2026-04-19 · Unity 工程创建
- 行为：创建 Unity 2022.3.62f2c1 工程，确立目录基线 `GameJam/Assets`、`ProjectSettings`、`UserSettings`。
- AI 介入：无（Unity Hub 新建工程）。
- 产物：`GameJam/` 目录。

### 2026-04-20 · Agents 文件夹搭建
- 行为：在仓库中新增 `agents/` 目录作为 AI 角色与 skill 的承载位置，预留 `agents/skill/` 子目录。
- AI 介入：结构规划由 Claude Code 协助确认，文件落位由人工执行。
- 产物：`agents/skill/` 骨架目录。

### 2026-04-21 · AI 开发 Skill 构建
- 行为：用 Claude Code 产出 AI Game Jam 专用 skill，覆盖 Producer 编排 + 9 个 subagent prompt + 10 个产物模板。
- 关键设计决策：
  - 叙事→关卡→数值 强依赖链，严格串行
  - 美术拆两段：风格规范（6·A）可与中游策划并行；资产提示词（6·B）须在策划评审后统一生成
  - 设置「美术回填阻塞节点」🟠：等用户把 Gemini 出图放入 `GameJam/Assets/Art/` 后再继续
  - Producer 在回溯前必须量化影响范围（例如：改叙事 = N 条美术提示词重做）
  - 状态文件增加「创意决策列」与「Jam 指标区块（剩余时间 / MVP 星级）」
- AI 介入：Claude Code 生成全部 prompt / 模板 / README 框架，人工审校。
- 产物：
  - `agents/skill/SKILL.md`（Producer 入口）
  - `agents/skill/README.md`
  - `agents/skill/prompts/01-08*.md` 共 9 个角色 prompt
  - `agents/skill/templates/*.md` 共 10 个产物模板

### 2026-04-21 · 自动出图闭环设计（6·B.4 / 6·B.5）
- 行为：将原先「06b 生成提示词 → 用户手动贴 Gemini → 手动下图 → 阶段七·3 🟠 等用户回填」的人工流程，改造为自动闭环：06c 调 Gemini API 出图 + 06d 用 Claude 视觉审核 + 自动升级模型重试。阶段七·3 从「等用户回填 🟠」改为「资产完整性扫描」，仅扫描失败才标 🟠。
- 关键设计决策：
  - **升级阶梯**：`Flash×2 → Pro×1 → 🟠 人工`。默认 `gemini-2.5-flash-image`（$0.039/张），失败升级 `gemini-3-pro-image-preview`（$0.134/张）。单资产最大成本 ~$0.21
  - **批次验收**：沿用 06b 的 A~E 批次分法（场景/立绘/敌人/UI/特效），一批完成后 Producer 一次性汇报；全 🟢 一行汇报，有 🟡/🟠 展开
  - **成本硬顶**：$10/jam，超过 Producer 暂停询问用户
  - **压力测试后补入的防护**：API key ping / SAFETY 独立跳 🟠 / transient 指数退避不消耗升级额度 / 版本化落盘保留 A/B 证据 / 串行 200ms 间隔避开 429 / 修正建议沙箱化（只改特有描述段）/ 熔断（批内 Flash 通过率 <50% 自动停）/ 06d 低 Confidence 不触发重试 / Pro 轮审核降级为硬指标
  - **阶段结构权衡**：初版拟新增独立阶段 6·C / 6·D，最终改为 6·B 子步骤 4/5 和 5/5，以降低 SKILL.md / 状态模板 / README 的同步维护成本
- AI 介入：
  - Claude Code 压力测试设计方案，识别 17 个死角（API key / 并发限制 / SAFETY 拦截 / base64 在 git-bash 的坑 / prompt 漂移 / reviewer 置信度 / 成本未含审核 token 等）
  - 全量产出 06c / 06d prompt 文件 + 修改 SKILL.md / README / 06b / 07 / 3 个 template 共 9 个文件
- 产物：
  - `agents/skill/prompts/06c_art_image_generator.md`（新）— Gemini API 调用 + 升级状态机 + 熔断
  - `agents/skill/prompts/06d_art_reviewer.md`（新）— Claude 视觉审核 + 🟢🟡🔴 + Confidence + 沙箱化修正建议
  - `agents/skill/SKILL.md`（改）— 6·B 编排加 4/5 和 5/5；关键规则 7 改写；7.3 改资产完整性扫描；状态维护加成本累计
  - `agents/skill/README.md`（改）— 阶段表 / 文件结构 / 关键设计点 / 使用流程 / 依赖全面更新
  - `agents/skill/prompts/06b_art_prompt_engineer.md`（改）— 删「用户手动贴 Gemini」话术，交付完后通知 06c
  - `agents/skill/prompts/07_unity_developer.md`（改）— 7.3 从等用户回填改为自动扫描（尺寸 / 透明 / 命名）
  - `agents/skill/templates/art_asset_list_template.md`（改）— 回填跟踪表加 4 列：使用模型 / 重试次数 / 审核结论 / 生成时间
  - `agents/skill/templates/art_prompt_template.md`（改）— 追加「审核结论」段（逐轮历史）
  - `agents/skill/templates/gamejam_state_template.md`（改）— Jam 指标加 API 成本累计 + 硬顶；六·B 行加当前子步骤字段

### 2026-04-21 · 自动出图闭环 dry run（Lucy 像素图）
- 行为：绕开整套 skill，单测 06c 调 Gemini API + 06d 视觉审核闭环。用「赛博朋克 2077 Lucy + 2D 像素」为样本生成两张图（Flash#1 原始 prompt / Flash#2 带 06d 修正 prompt），产出 `tmp/test_lucy__v1__flash.png`、`tmp/test_lucy__v2__flash.png`。
- 关键发现（已回补进 skill 文档）：
  1. **网关是 OpenAI 兼容的 New API**：域名 `ai-gateway-sh01.happyelements.net`，Bearer auth。bash 环境变量可读的是 `GATEWAY_API_KEY`（值与 `GEMINI_API_KEY` 同），走 `Authorization: Bearer` 头。原 06c 假设的直连 Google（`?key=AIza...`）路径不适用于公司网关
  2. **Gemini 2.5 Flash Image 的刚性输出**：prompt 里显式要求"EXACT 512×512"和"PNG alpha channel"都被模型无视，恒返回 **1024×1024 RGB**（colorType=2，无 tRNS chunk）。结论：尺寸和透明度不能走 prompt 指令，必须由 06c 做 post-process（下采样 + color-to-alpha）
  3. **本机开发环境无 python3**：原 06c Bash 骨架写的 python3 在 Windows 上不可用。改用 `node v22`（已有）
  4. **MSYS 路径陷阱**：git-bash 的 `/tmp/foo.json` 给 node 看到的是 `E:\tmp\foo.json`，读不到。所有中间文件改用 Windows 风格绝对路径（`E:/SH01/aigamejam/tmp/`）
  5. **Flash#2 带修正 prompt 的效果有限**：v2 相较 v1 改善了靴子（thigh-high ✓），颈部 cyber jack 仅微弱改善（prompt 可引导主体细节但无法强制出细节），头发不对称几乎无变化。说明修正 prompt 的性价比有限，Pro 轮必要
- AI 介入：
  - Claude Code 完成 prompt 构造、Gemini 网关调用、node 解析 PNG、视觉审核（Read 读 PNG + 5 维度评分）、回补 skill 文档
- 产物：
  - `tmp/test_lucy__v1__flash.png`、`tmp/test_lucy__v2__flash.png`（dry run 样本）
  - `agents/skill/prompts/06c_art_image_generator.md`（改）— 网关路由选择 / Bearer auth / node 版骨架 / MSYS 路径规则 / Gemini 刚性行为说明 / post-process 下采样 + chroma key
  - `agents/skill/prompts/06b_art_prompt_engineer.md`（改）— 新规则：尺寸和 alpha 不写进 prompt 正文
  - `agents/skill/prompts/06d_art_reviewer.md`（改）— 构图尺寸 / 可用性维度对 Gemini 刚性行为不扣分；加 IHDR + chunks 解析代码片段

### 2026-04-21 · Pro 轮实测（验证尺寸 + alpha 是否能解决）
- 行为：跑 `gemini-3-pro-image-preview` 生成第三版 Lucy（`tmp/test_lucy__v3__pro.png`），显式在 `generationConfig` 里加 `aspectRatio: "1:1"` 和 `sampleImageSize: "1K"`，prompt 里强调 "RGBA PNG with actual transparent pixels"。
- 核心发现：**Pro 在尺寸 / alpha / 格式问题上比 Flash 更糟，不是更好**
  1. Pro 返回 **JPEG 而非 PNG**（mimeType=image/jpeg），格式级就没 alpha 可能
  2. Pro 尺寸是 **1408×768**，既不是 1:1 也不是 1024×1024，`aspectRatio` / `sampleImageSize` config 全被忽略
  3. Pro 字面理解 "transparent background" → **把棋盘格图案画进 JPEG 像素**模拟透明
  4. 但 Pro 确实画出了 Flash 画不出的 Lucy 颈部 cyber 神经植入，主体细节有肉眼可见的提升
- 修正的 skill 设计决策：
  - **升级到 Pro 的触发条件限定为"主体 / 姿态 / 风格 / artifacts"**，不再触发"尺寸 / alpha / 格式"问题（两个模型都解决不了，只能 post-process）
  - **06c 文件扩展名按 mimeType 动态决定**（Pro 可能返 .jpg），post-process 阶段统一转成 PNG
  - 06b 关于"不要在 prompt 写尺寸和 alpha"的规则对 Pro 同样适用，且更严格（Pro 会被 "transparent" 词触发绘棋盘格的错误行为）
- AI 介入：
  - Claude Code 用 node 解析 PNG IHDR / tRNS / JPEG SOF 头，确认格式与尺寸
  - 用视觉 Read 对比三版图（Flash v1 / Flash v2 / Pro v3）的主体细节差异
- 产物：
  - `tmp/test_lucy__v3__pro.png`（实为 JPEG，1408×768）
  - `agents/skill/prompts/06c_art_image_generator.md`（改）— Pro 实测行为小节、升级触发条件限定、mimeType 决定文件扩展名
  - `agents/skill/prompts/06d_art_reviewer.md`（改）— 双模型刚性限制对照表、明确不触发升级的维度清单

### 2026-04-21 · 公司 aiart 服务接入（主路径升级）
- 行为：探测并接入公司内部 AI 画图服务 `https://aiart.happyelements.com/api/v1/ai-fusion-openapi/*`，用 Lucy 同一 prompt 生成第四版作为 A/B 基线，决策把 aiart 设为 06c 主路径、Gemini 降级为 fallback。
- 接入过程关键发现：
  1. **前端 URL 和 API 域不同**：用户给的 `aiart-v3.happyelements.com/image-generate` 是 Next.js 前端，实际 API 在 `aiart.happyelements.com`
  2. **OpenAPI 专用命名空间**：程序化调用走 `/api/v1/ai-fusion-openapi/`（带 `-openapi` 后缀），非浏览器用的 `/api/v1/ai-fusion/`
  3. **认证方式**：`Authorization: Bearer <secret>` 其中 secret 是 `st-` 前缀的 Service Account Token（本项目用 AccessKey ID `0a65bf11-c4d4d5abe654` 配对的 secret）
  4. **异步任务 API**：`POST /images/generations` 返回 `taskId + status:"pending"`，需轮询 `GET /images/generations/{taskId}` 拿 CDN 下载 URL；30~60s 出图
  5. **aiart 刚性行为**：请求 1024×1024 返回 **2048×2048 JPEG**（系统自动放大），背景永远是纯灰（非常便于 chroma key），必须正方形（非正方形 400）
  6. **img2img 能力**：body 支持 `references: [{type: "image", url: ...}]`，对角色一致性（同角色换姿态换表情）有巨大价值，Gemini Flash/Pro 都不具备
- Lucy v4 对比三版 Gemini 结论：
  - 风格一致性：**aiart 最像素风**（16-bit 更正宗）
  - 主体：发型不对称命中 ✅（Gemini 三版都差），颈部 cyber 植入仍缺（仅 Gemini Pro 画出）
  - 背景：aiart **纯灰最易抠**，Gemini Flash 白底、Pro 画棋盘格（最糟）
  - 尺寸：aiart 2048² 稳定；Gemini Flash 1024²、Pro 1408×768 随机
- 新 skill 设计（已实装）：
  - **06c 主路径切换到 aiart**，三轮升级 `R1 → R2(带修正) → R3(带修正 + img2img 用 R1 作参考)  → 🟠`
  - **Gemini 降级为 Fallback**，**只在 aiart 服务宕机触发**（HTTP 错误 / 任务失败 / 轮询超时），不因审核不过触发
  - **成本硬顶 $10 仅对 Gemini 路径生效**，aiart 视为内部免费服务只计任务数
  - **Provider 识别按 key 值前缀**：`st-` = aiart，`sk-` = Gemini 网关，`AIza` = Google 直连
- AI 介入：
  - Claude Code 挖 Next.js chunk 定位真实 API 路径、试多种 auth scheme 锁定 Bearer、探测 endpoint body schema、轮询 taskId、下载 CDN 产物、视觉 review
- 产物：
  - `tmp/test_lucy__v4__aiart.jpg`（aiart 出的 Lucy，质量超 Gemini 三版）
  - `agents/skill/prompts/06c_art_image_generator.md`（大改）— aiart 主路径 + submit/poll/download 骨架 + 三家 provider 刚性行为对照 + Gemini 降 fallback
  - `agents/skill/prompts/06d_art_reviewer.md`（改）— 刚性行为表加 aiart 列、aiart 背景默认判 🟢 可用性
  - `agents/skill/README.md`（改）— 依赖段加 AIART_API_KEY 主、GATEWAY_API_KEY fallback；关键设计点更新 aiart 主路径
  - `agents/skill/templates/gamejam_state_template.md`（改）— API 成本累计按 provider 拆分，aiart 不计费只计任务数

### 2026-04-22 · 阶段一 · 主策划：主题选定与 Concept 确认

- 行为：运行 skill 阶段一（主策划 agent），结合 Jam 主题完成游戏 concept 选型，最终确认《地下城打工人（Dungeon HR）》并输出核心概念文档。
- 关键设计决策：
  - **一句话 Pitch**：玩家扮演魔王城 HR 总监，招募怪物、管薪酬、抵御勇者突袭，撑过 N 波让魔王城成功上市
  - **核心循环**：准备（招募 / 扩建 / 发奖金）→ 自动战斗 + 随机突发事件二选一 → 绩效考评（升级 / 抚恤 / 解雇 / 谈薪）
  - **双输条件**：怪物全灭/离职（无人值守）或灵魂碎片耗尽（公司破产）
  - **经济三轴**：薪水（日扣）/ 奖金（临时增益）/ 扩建（槽位投资）
  - **词条系统**：简历显示 1~2 个，1 个隐藏词条入职后触发，直接映射战斗属性
  - **美术风格**：扁平企业风插画，莫兰迪低饱和配色，纯灰背景，aiart 主路径出图
- AI 介入：Claude Code 驱动主策划 agent 产出完整 concept，人工评审并确认。
- 产物：
  - `design/concept.md`（新）— 核心循环 / 胜负条件 / 战斗判定 / 经济系统 / 词条系统 / 美术风格基准文档

### 2026-05-18 · 阶段四 · 数值策划：balance.md v0.1.1 落地

- 行为：运行 skill 阶段四（数值策划 agent + 主策划 Review agent），按上游 concept / narrative v1.3 / levels v1.2 / final-plan v1.0 产出完整数值文档，覆盖属性 / 公式 / 成长曲线 / 经济循环 / 难度锚点 / 平衡矩阵，并落实 levels.md 留给数值的 5 处占位。
- 关键设计决策：
  - **顶层常量锁定**：总波数 N=7（L01–L07，L02–L06 为 5 场实战），每日行动点基线 3，启动碎片 120，P03 安全线 40，ROUND_TICK 1.3s
  - **战斗内核**：4 个属性（HP / ATK / SPEED / CRIT_RATE），伤害公式纯函数化，5% 基础 Miss、暴击 ×1.5、B07 由勇者首次暴击 hook
  - **L03 必死实现**：自然血量阈值（HP<8 且 ROUND_TICK≥4 时受击 ×1.5）+ <5% 兜底脚本，避免硬杀叙事突兀，验收指标 ≥95%
  - **P03 触发链**：L03 战后账户预期 37 < 安全线 40，裕度仅 3 碎片，稳定触发，对齐 narrative v1.3「L03 抚恤金扣款后即触发」
  - **L06 行动点 +1**：基线 3 → 4，表达「决战允许梭哈一把」
  - **5 处 levels 留白全填**：B06 X=16 / B04 Y=17 / P03=40 / L03 必死阈值 / L06 行动点 4
  - **平衡矩阵**：铁壁 / 爆发 / 均衡 3 种 build × 4 关键关，无全绿全红（铁壁栽 L06 / 爆发栽 L03 / 均衡全程紧张）
- AI 介入：
  - 数值策划 subagent（04_balance_designer）首版生成 v0.1，9 个 tool calls / ~3 分钟
  - 主策划 subagent（01_chief_designer）Review 第 1 轮：发现账户曲线漏算 L02 通关奖 +20 致 P03 触发链失效，直接改 3 处原则性问题（标 `主策划 Review 修订 2026-05-18`）+ 列 5 项非原则性修订
  - 数值策划 subagent 落 v0.1.1 增量修订（5 项均按主策划给的替代内容直接落实，标 `v0.1.1 修订 2026-05-18`）
  - 主策划 Review 第 2 轮 confirm：5 项全部 ✅，🟢 通过
- 产物：
  - `design/balance.md` v0.1.1（新）— 347 行，10 个主章节 + 变更记录
  - `.workflow/tasks/balance_v0.1/`（新）— requirement.md（任务派发书）+ status.json（双轮 Review 轨迹）
- 工作流观察：
  - 主策划 Review 是性价比极高的环节：第 1 轮就抓出账户算数错误（数值策划自检漏掉），避免该错误一路带到阶段五评审
  - "原则性问题直改 / 非原则性问题列修订"的分流规则让 Review 1 轮就完成大部分工作，第 2 轮纯 confirm，避免无限循环

---

## 后续待记录（占位）
- [ ] 阶段二 · 叙事：世界观 / 角色 / 剧情节拍
- [ ] 阶段三 · 关卡：关卡表与节奏
- [x] 阶段四 · 数值：属性 / 公式 / 成长曲线
- [ ] 阶段五 · 策划评审：一致性冲突清单
- [ ] 阶段六·A · 美术风格规范
- [ ] 阶段六·B · 美术资产提示词批量生成
- [ ] 阶段七 · Unity 开发（含美术回填）
- [ ] 阶段八 · Playtest & QA

> 每个阶段完成后，按上面「开发日志」格式追加一条：日期 · 行为 · AI 介入方式 · 关键决策 · 产物。
