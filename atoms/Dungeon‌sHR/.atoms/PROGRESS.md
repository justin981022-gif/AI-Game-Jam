---
last_updated: 2026-06-02T05:50:21Z
---

# Requirements & Progress

## Requirements Overview

## User Stories

## Task Breakdown
- [x] 修正骷髅法师图像映射（skeleton→MON_RANGE+ART.xiaoxing, goblin→MON_DPS+ART.generic1）
- [x] 生成游戏图片资产（角色/怪物/勇者/背景/UI）
- [x] types.ts 全部类型与枚举
- [x] data.ts 数据层（balance/levels/heroes/events/traits/triggers/endings/templates）
- [x] engine.ts 引擎（状态机/战斗/招募/EVAL/随机生成/词条）
- [x] useGame.ts 状态管理 hook
- [x] GameScreens.tsx 准备/战斗/EVAL 界面
- [x] Dialogs.tsx 简历/事件/邮件/谈薪/结局弹窗
- [x] Index.tsx + App.tsx 编排与路由
- [x] lint + build 校验
- [x] CheckUI 验证

## Progress Log
- v0.25 勇者机制大幅升级+精英克星词条: (1) glass词条改为「精英克星」— 面对精英勇者受伤×1.5但ATK+20%; (2) 觉醒 — HP<30%攻击翻倍2回合(一次性); (3) 友谊之力 — 20%概率暴击率翻倍1回合; (4) 不屈复活 — 精英勇者死后40%概率50%HP复活; (5) 策反 — 对消极怠工怪物30%概率使其不攻击(loyalty免疫); (6) 道具 — 每场1-2次(回血药水15%/攻击卷轴+30%/护盾减伤50%); (7) 必杀技 — HP<50%时AOE(ATK×0.6)或秒杀HP<20%最低怪物. 技能按勇者等级递进解锁(W02道具/W03友谊/W04觉醒/W05策反/ELITE全部). lint+build通过.
- v0.26 勇者机制幽默事件卡片UI: 新增MechanismEventDialog组件，当勇者触发新机制(觉醒/友谊/道具/策反/必杀技等)时弹出幽默事件卡片供玩家二选一，选项纯属娱乐不影响实际战斗效果。使用ART.cardEvent作为卡片背景，样式与战斗事件卡片一致。chooseMechanismOption关闭卡片后恢复战斗tick。lint+build通过.
- v0.24 怪物转职+新事件+勇者技能: 确认所有系统已完整实现 — 转职系统(3模板×2选项, UI对话框, AP/碎片消耗), 新战斗事件B07-B17(含tank_absorb_all/psy_war_atk等新效果), 日常事件P-E01~P-E08(含prep_team_crit/tank_hp_pct), 勇者后期技能regen/cleave/block(W05+解锁). lint+build通过.
- v0.23 职业标签优化: MonsterCard和RecruitDialog简历卡均新增职业类型标签（🛡️前排肉盾/⚔️近战输出/🏹远程输出），带彩色圆角pill样式，一眼可辨职业定位
- v0.22 第一批数值优化: (1) TANK嘲讽机制方案B — 有TANK时TANK吸收60%总伤害/其余平分40%，无TANK时按HP比例分配; (2) 打零工收益 5→8 碎片/AP; (3) 战后HP恢复50%已损失HP; (4) DPS基础暴击率 8%→12%
- v0.21 Tutorial: Added 6-page onboarding tutorial (game goal → recruit → battle → EVAL → expand/AP → economy). Shows once on first game start via localStorage flag. Reuses existing Overlay + ART.btn styling. Supports prev/next navigation, skip button, pagination dots. After closing, proceeds to normal game start flow.
- v0.21 Ending BGM: Generated 4 ending-specific BGM tracks (E01 triumph, E02 bittersweet, E03 desolate, E04 catastrophe) using lyria-3-pro-preview model. Integrated into EndingDialog with auto-play on ending display, loop enabled, volume 0.5, and proper cleanup on unmount/restart.
- v0.3 spec updates implemented: 打零工 action, 3-tier bonus, RewardOnClear formula, monster templates (TANK/DPS/RANGE with speed/crit), hero crit rates, PENSION=salary×3+5, negotiate +20%/slacker mechanics, L03 forced casualty threshold, B04/B06 costs, T06→L07/P04→L04 triggers, SHARD_INIT=55, SAFE_LINE=45, BUILD_COST 30/45/60
- v0.4→v0.6 spec updates implemented: SHARD_INIT 55→70, SURVIVE_REWARD 8→10, DPS_UNIT 25→80, differential recruit costs (TANK 6/RANGE 10/DPS 12 ±15%), hero HP ~100% up + ATK down (W01 110/5, W02 220/7, W03 330/10, W04 440/13, ELITE 600/18), L03 forced casualty script path (hero.HP<0.4×HP_MAX && ROUND≥3 → force lowest HP monster dead), EVAL fallback targets non-TANK, recruitCost field added to monster schema
- v0.7 updates implemented: recruitment reverted to FREE (1 AP only, no shard cost), removed recruitCost from Monster/ResumeCandidate/engine/data, SHARD_INIT 70→50, replaced all placeholder CDN art with local final PNG assets (backgrounds, characters, enemies, endings, emotes, props, UI), hero art now uses per-tier images (W01-W04/ELITE), title screen uses groobas/xiaoxing/HR characters
- v0.8 art integration: ALL UI art assets now applied to corresponding scenes — ART.btn as button backgrounds, ART.cardEvent for event dialogs, ART.hpbar for HP bars, ART.mailCeo for CEO emails, ART.resume for resume cards, ART.result for EVAL screen, ART.toast for toasts, ART.timer for timer display, ART.endE01-E04 for ending dialogs, ART.rankS/A/B/C/D for EVAL ratings, ART.shardIcon for shard displays, ART.icoPause/icoRestart/icoVolume for toolbar, ART.hr/groobas/xiaoxing for character avatars in UI. No AI-generated images used; all from user's art/ directory. No missing assets identified.
- v0.9 MAJOR UI REFACTOR: Removed ALL CSS-based visual decorations (gradients, borders, shadows, bg-colors for panels). Every panel/card/button/tag now uses art images as full backgrounds via inline style backgroundImage. CSS is used ONLY for layout (flex/grid/position/size/spacing). Text uses drop-shadow for readability over images. GameBtn and ShardIcon exported from GameScreens for reuse in Dialogs. Title screen now shows visible game title + art-backed start button.
- v0.10 RecruitDialog refactored per mockup (03_recruit.png): top bar with shard count left + centered title "招募候选人 — 选 1 位入职", three resume cards side-by-side using ART.resume as full 540×720 background, card layout top-to-bottom: 【name】→ position → large centered avatar → ★ stats → ✓ traits → italic flavor text → 应聘者签名, "录用 (1 AP)" button below each card.
- v0.11 RecruitDialog 3-layer card: character bust images (A-CHR-BUST-GENERIC-1/2/3) as bottom layer behind resume paper, ART.resume as middle layer, text content on top with white text-shadow for readability. Traits get bg-white/60 pill, flavor text gets bg-white/40 backdrop. All text stays within card bounds.
- v0.12 RecruitDialog layout per user feedback: simplified to flat layout — ART.resume as card backgroundImage, avatar as inline 120×120 img in normal document flow (name → position → avatar → stats → traits → flavor → signature top-to-bottom). No more z-index layering.
- v0.13 RecruitDialog layout per new wireframe: avatar (72×72) top-left with name+position to its right, middle area is intro block (stats → traits → flavor text), signature at bottom. Matches user's wireframe structure.
- v0.14 RecruitDialog aligned to A-UI-RESUME.png visual slots: top 12% = name+position (gray bars area), middle 30% = centered square avatar (black square slot), flex area = stats/traits/flavor (gray lines area), bottom 10% = signature (signature line + stamp area). Content uses percentage-based heights to match background image regions.
- v0.15 RecruitDialog refactored: resume background changed from CSS backgroundImage to absolute-positioned `<img>` element. This allows independent control of the image's top offset and size so that the gold line aligns with the name text and the black square aligns with the centered avatar. Content layer sits above (z-10) with percentage-based margins for slot alignment.
- v0.16 PrepScreen 5-item patch: (1) HR立绘容器w-320/img 480×640 bottom-center, (2) GameBtn hover:brightness-105/active:brightness-95/disabled:opacity-50+grayscale-30%, buttons h-[60px], (3) 怪物槽位面板改rgba(0,0,0,0.3)+border替代ART.cardEvent, (4) 关卡进度条32×32圆形节点+6px连线+rgba背景容器, (5) SLOT_INIT 2→3
- v0.17 Battle button + trait tooltips: (1) L01等无战斗关卡显示"结束准备→"按钮调用advanceLevel而非startBattle, 有战斗关卡正常显示"开战→", (2) 怪物词条chips添加title属性显示desc描述（cursor-help样式提示可悬停）
- v0.18 UI fixes: (1) MonsterCard添加min-h-[140px]与空卡槽统一高度，扩建第二行不再高度不一致, (2) ActionBtn文字从text-white改为text-[#3D3A36]深色，解决白底白字不可读问题
- v0.19 Button consistency: All ART.btn-backed buttons (GameBtn, Index start button) now use text-[#3D3A36] dark text without drop-shadows, consistent hover effects (brightness-110, scale-[1.02], -translate-y-[1px], shadow-md), and active:brightness-90/scale-95 press feedback
- v0.20 StartScene refactored: A-UI-TITLE.png as full-screen 16:9 contain background with #b7b1a3 edge fill, removed all old decorations (tower/placeholder/independent button), title text "地下城打工人/Dungeon HR" overlaid on top banner area (30-65% x 7-22%) in #3D3A36, transparent hit-area "开始入职" button overlaid on right-bottom terracotta slot (63-78% x 54-67%), no placeholder icons/particles/overlays
- v0.27 修正骷髅法师图像映射: (1) data.ts中skeleton从MON_DPS→MON_RANGE，goblin从MON_RANGE→MON_DPS; (2) engine.ts中发现根本原因——artUrl通过ROLE_ART随机pick导致骷髅法师50%概率显示GENERIC-2的图。修复：移除ROLE_ART随机池，改用BUST_TO_ART 1:1映射(bustKey→对应ART)，确保每个角色始终显示自己的正确立绘。lint+build通过。
- v0.28 修正怪物槽位图片错误: 根本原因——Monster类型缺少bustAsset字段，MonsterCard使用artUrl(全身art)而非bustAsset(半身像)。简历卡正确显示bustAsset，但招募入队后Monster对象丢失该字段。修复：(1) types.ts Monster接口添加bustAsset字段; (2) engine.ts resumeToMonster复制r.bustAsset到monster; (3) GameScreens.tsx MonsterCard img src改用m.bustAsset||m.artUrl。lint+build通过。
- v0.29 修正所有弹窗+绩效考评中怪物图片: (1) Dialogs.tsx中6处target.artUrl/m.artUrl全部改为bustAsset||artUrl(BonusDialog/TrainingDialog/NegotiateDialog/GrowthDialog/EvalDialog存活列表/DismissDialog); (2) useGame.ts readSave添加ART_TO_BUST迁移映射，旧存档加载时自动补全bustAsset字段。lint+build通过。
- v0.30 恢复全身像显示: 用户明确要求战斗界面/绩效考评/各种弹窗使用全身像(artUrl)而非半身像(bustAsset)。将GameScreens.tsx MonsterCard和Dialogs.tsx 6处全部从bustAsset||artUrl恢复为artUrl。仅招募简历卡(RecruitDialog)保留bustAsset半身像。lint+build通过。
- v0.31 治疗按钮: 主界面怪物槽位卡片新增"💊 治疗"按钮(绿色pill样式，与培训/转职/奖金一致)。点击消耗灵魂碎片使HP回满，不消耗行动点。费用公式 cost=max(1, round(20*(1-hp/hpMax)))，范围1~20碎片。禁用条件：满血/已死亡/碎片不足。useGame.ts添加healCost+healMonster，GameScreens.tsx MonsterCard添加onHeal/healDisabled/healCostValue props。lint+build通过。
- v0.32 修复勇者机制事件卡片不触发: 根本原因——engine.ts runRoundTick中heroMechanismTriggered仅在resurrect时赋值，awakening/friendship/item_potion/item_scroll/item_shield/sabotage/ultimate_execute/ultimate_aoe均未设置该标志。修复：在每个机制触发处添加`if (!heroMechanismTriggered) { heroMechanismTriggered = "xxx"; mechanismTargetName = ...; }`，确保第一个触发的机制会弹出幽默事件卡片。lint+build通过。
- v0.33 机制事件卡片优化: (1) 每场战斗仅弹出一次卡片——添加mechanismEventFiredRef，startBattle时重置false，首次弹出后设true，后续tick不再弹(机制本身照常生效+出日志); (2) 选项纯娱乐不影响实际效果(效果已在engine层生效，卡片仅通知玩家勇者触发了什么能力)。lint+build通过。

