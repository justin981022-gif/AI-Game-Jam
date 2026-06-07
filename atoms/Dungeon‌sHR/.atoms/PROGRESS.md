---
last_updated: 2026-06-02T05:50:21Z
---

# Requirements & Progress

## Requirements Overview

## User Stories

## Task Breakdown
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

