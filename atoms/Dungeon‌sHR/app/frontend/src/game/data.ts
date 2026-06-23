// 数据层：全部 JSON 化数据内嵌为常量，便于策划调参
import type {
  AdvancedClass,
  BattleLogTemplates,
  BoardPolicy,
  BonusTierDef,
  EndingDef,
  GameEvent,
  GrowthChoice,
  HeroDef,
  HeroSkill,
  HeroVariant,
  JobChangeOption,
  LevelDef,
  MonsterTemplate,
  PersonalGoal,
  PrepEvent,
  TraitDef,
  TraitId,
  TriggerText,
} from "./types";

// 图片资产（本地 final PNG — asset_usage_guide.md）
export const ART = {
  // 背景
  bgPrep: "/art/backgrounds/A-BG-PREP.png",
  bgBattle: "/art/backgrounds/A-BG-BATTLE.png",
  // 角色
  hr: "/art/characters/A-CHR-HR.png",
  groobas: "/art/characters/A-CHR-GROOBAS.png",
  xiaoxing: "/art/characters/A-CHR-XIAOXING.png",
  generic1: "/art/characters/A-CHR-GENERIC-1.png",
  generic2: "/art/characters/A-CHR-GENERIC-2.png",
  generic3: "/art/characters/A-CHR-GENERIC-3.png",
  // 勇者
  heroW01: "/art/enemies/A-ENE-W01.png",
  heroW02: "/art/enemies/A-ENE-W02.png",
  heroW03: "/art/enemies/A-ENE-W03.png",
  heroW04: "/art/enemies/A-ENE-W04.png",
  heroElite: "/art/enemies/A-ENE-ELITE.png",
  // 结局
  endE01: "/art/endings/A-END-E01.png",
  endE02: "/art/endings/A-END-E02.png",
  endE03: "/art/endings/A-END-E03.png",
  endE04: "/art/endings/A-END-E04.png",
  // UI
  title: "/art/ui/A-UI-TITLE.png",
  cardEvent: "/art/ui/A-UI-CARD-EVENT.png",
  mailCeo: "/art/ui/A-UI-MAIL-CEO.png",
  resume: "/art/ui/A-UI-RESUME.png",
  result: "/art/ui/A-UI-RESULT.png",
  negotiate: "/art/ui/A-UI-NEGOTIATE.png",
  hpbar: "/art/ui/A-UI-HPBAR.png",
  timer: "/art/ui/A-UI-TIMER.png",
  btn: "/art/ui/A-UI-BTN.png",
  icoPause: "/art/ui/A-UI-ICO-PAUSE.png",
  icoVolume: "/art/ui/A-UI-ICO-VOLUME.png",
  icoRestart: "/art/ui/A-UI-ICO-RESTART.png",
  // 表情/印章
  ceoStamp: "/art/emotes/A-EMOTE-CEO-STAMP.png",
  rankS: "/art/emotes/A-EMOTE-RANK-S.png",
  rankA: "/art/emotes/A-EMOTE-RANK-A.png",
  rankB: "/art/emotes/A-EMOTE-RANK-B.png",
  rankC: "/art/emotes/A-EMOTE-RANK-C.png",
  rankD: "/art/emotes/A-EMOTE-RANK-D.png",
  // 道具
  shardIcon: "/art/props/A-PROP-SHARD-ICON.png",
  // 结局BGM
  bgmE01: "https://mgx-backend-cdn.metadl.com/generate/audios/1305315/2026-06-22/ra4aogyaaiga/ending-e01-triumph.mp3",
  bgmE02: "https://mgx-backend-cdn.metadl.com/generate/audios/1305315/2026-06-22/ra4anhyaaihq/ending-e02-bittersweet.mp3",
  bgmE03: "https://mgx-backend-cdn.metadl.com/generate/audios/1305315/2026-06-22/ra4aglyaaiha/ending-e03-desolate.mp3",
  bgmE04: "https://mgx-backend-cdn.metadl.com/generate/audios/1305315/2026-06-22/ra4awpaaaigq/ending-e04-catastrophe.mp3",
};

// 全局数值常量（balance v0.7: 扩展轮次后补强前期经济缓冲）
export const BALANCE = {
  SHARD_INIT: 65, // 扩到 8 场战斗后，前期经济缓冲略上调
  SAFE_LINE: 45,
  BUILD_COST: { 3: 25, 4: 40, 5: 55 } as Record<number, number>,
  AP_MAX: 3,
  SLOT_INIT: 2,
  SLOT_MAX: 5,
  SALARY_TANK: 8,
  SALARY_DPS: 10,
  SALARY_RANGE: 9,
  SALARY_FLOAT: 0.2, // ±20%
  NEGOTIATE_RAISE_PCT: 0.2, // 谈薪批准 +20%
  PENSION_MULT: 3,
  PENSION_FLAT: 5, // salary × 3 + 5
  LEVELUP_MAX: 5,
  LEVELUP_HP_PER_LV: 0.15,
  LEVELUP_ATK_PER_LV: 0.12,
  LEVELUP_CRIT_PER_LV: 0.02,
  LEVELUP_CRIT_CAP: 0.50,
  NEGOTIATE_PROB: 0.6, // 升级后≥2级时60%谈薪
  TRAINING_BASE_COST: 10,
  TRAINING_COST_PER_LEVEL: 8,
  BASE_MISS_RATE: 0.05,
  CRIT_MULT: 1.5,
  MAX_EVENTS: 3,
  ROUND_TICK_MS: 1300,
  EVENT_TIMEOUT_S: 10,
  B04_COST: 17,
  B06_COST: 16,
  // 打零工（v0.8 优化：5→8）
  AP_TO_SHARD_RATE: 8,
  // 通关绩效提成（v0.4 + v0.6）
  COMPLETION_BASE: 10,
  SURVIVE_REWARD: 10, // v0.4: 8 → 10
  DPS_REWARD: 3,
  DPS_UNIT: 90,
  // L03 强制阵亡脚本路径（v0.5: hero.HP < 0.4×HP_MAX && ROUND≥3 → 强制最低HP怪物HP=0）
  FORCE_DEATH_HERO_HP_RATIO: 0.4,
  FORCE_DEATH_MIN_ROUND: 3, // v0.5: 4 → 3
  // 消极怠工
  SLACKER_THIS_BATTLE_MULT: 0.75,
  SLACKER_NEXT_BATTLE_MULT: 0.85,
  // 嘲讽机制（方案B）：TANK 吸收 60% 总伤害，其余平分 40%
  TAUNT_ABSORB_RATIO: 0.6,
  // 战后恢复：存活怪物恢复 50% 已损失 HP
  POST_BATTLE_HEAL_RATIO: 0.5,
};

// 奖金三档
export const BONUS_TIERS: Record<string, BonusTierDef> = {
  small: { cost: 8, atkMult: 1.20, label: "小额奖金" },
  medium: { cost: 15, atkMult: 1.40, label: "中额奖金" },
  large: { cost: 25, atkMult: 1.70, label: "大额奖金" },
};

export const TRAITS: Record<TraitId, TraitDef> = {
  tough: { id: "tough", name: "吃苦耐劳", type: "positive", desc: "血量上限 +20%", hidden: false },
  glass: { id: "glass", name: "精英克星", type: "neutral", desc: "面对精英级勇者（L07+）时受到伤害 ×1.5，但自身攻击 +20%", hidden: false },
  team_player: { id: "team_player", name: "团队协作", type: "positive", desc: "队伍中其他怪物攻击 +5%", hidden: false },
  cancer: { id: "cancer", name: "团队毒瘤", type: "negative", desc: "队伍中其他怪物攻击 -10%", hidden: false },
  lone_wolf: { id: "lone_wolf", name: "社恐", type: "neutral", desc: "奖金效果减半", hidden: false },
  shield_wall: { id: "shield_wall", name: "前排意识", type: "positive", desc: "承受勇者伤害 -12%", hidden: false },
  precision: { id: "precision", name: "精准打卡", type: "positive", desc: "暴击率 +5%", hidden: false },
  mentor: { id: "mentor", name: "带新人", type: "positive", desc: "队伍人数≥2 时自身攻击 +8%", hidden: false },
  overtime_ready: { id: "overtime_ready", name: "自愿加班", type: "positive", desc: "第 3 回合起攻击 +12%", hidden: false },
  compliance: { id: "compliance", name: "合规意识", type: "neutral", desc: "未领取奖金时攻击 +6%", hidden: false },
  glass_heart: { id: "glass_heart", name: "玻璃心", type: "negative", desc: "受到暴击伤害 +25%", hidden: false },
  cheap_skate: { id: "cheap_skate", name: "省钱攒学费", type: "neutral", desc: "薪水期望×0.95，不发起谈薪", hidden: true },
  loyalty: { id: "loyalty", name: "怀旧情绪", type: "positive", desc: "战斗中不接受勇者策反", hidden: true },
  nostalgic: { id: "nostalgic", name: "末位淘汰恐惧", type: "neutral", desc: "血量<30% 时攻击 +15%", hidden: true },
  night_shift: { id: "night_shift", name: "夜班熟手", type: "positive", desc: "勇者血量<50% 时攻击 +10%", hidden: true },
  battle_trance: { id: "battle_trance", name: "越打越顺", type: "positive", desc: "每次命中后本场攻击小幅提升", hidden: true },
  quiet_quitter: { id: "quiet_quitter", name: "隐性摆烂", type: "negative", desc: "连续未造成伤害后攻击 -10%", hidden: true },
  slacker: { id: "slacker", name: "消极怠工", type: "negative", desc: "本场攻击×0.75，下场攻击×0.85（1场后清除）", hidden: true },
  contract_pending: { id: "contract_pending", name: "合同未签", type: "neutral", desc: "C01 触发本场攻击 +10%", hidden: true },
};

// 勇者数据（balance v0.5.0 §4.2 — v0.6 HP ~100% 上调 + ATK 下调）
export const HEROES: Record<string, HeroDef> = {
  HERO_W01: { id: "HERO_W01", name: "勇者·初出茅庐", hp: 110, atk: 5, critRate: 0.00, skills: [] },
  HERO_W02: { id: "HERO_W02", name: "勇者·小有名气", hp: 220, atk: 7, critRate: 0.04, skills: ["item"] },
  HERO_W03: { id: "HERO_W03", name: "勇者·身经百战", hp: 330, atk: 10, critRate: 0.08, skills: ["item", "friendship"] },
  HERO_W04: { id: "HERO_W04", name: "勇者·声名远扬", hp: 440, atk: 13, critRate: 0.13, skills: ["item", "friendship", "awakening"] },
  HERO_W05: { id: "HERO_W05", name: "勇者·银牌审计员", hp: 540, atk: 15, critRate: 0.16, skills: ["regen", "item", "friendship", "awakening", "sabotage"] },
  HERO_ELITE: { id: "HERO_ELITE", name: "精英勇者", hp: 660, atk: 18, critRate: 0.22, skills: ["cleave", "regen", "item", "friendship", "awakening", "sabotage", "revive", "ultimate"] },
  HERO_ELITE_2: { id: "HERO_ELITE_2", name: "勇者·路演破坏者", hp: 780, atk: 21, critRate: 0.25, skills: ["cleave", "block", "regen", "item", "friendship", "awakening", "sabotage", "revive", "ultimate"] },
  HERO_FINAL: { id: "HERO_FINAL", name: "最终勇者·IPO 终审官", hp: 920, atk: 24, critRate: 0.28, skills: ["cleave", "block", "regen", "item", "friendship", "awakening", "sabotage", "revive", "ultimate"] },
};

export const LEVELS: LevelDef[] = [
  { id: "L01", title: "入职第一天", hasBattle: false, heroId: null, eventPool: [], difficulty: 1, apBonus: 0, forcedCasualty: false },
  { id: "L02", title: "首次突袭", hasBattle: true, heroId: "HERO_W01", eventPool: ["B01", "C01"], difficulty: 2, apBonus: 0, forcedCasualty: false },
  { id: "L03", title: "第一次阵亡", hasBattle: true, heroId: "HERO_W02", eventPool: ["B01", "B02"], difficulty: 2, apBonus: 0, forcedCasualty: true },
  { id: "L04", title: "怪物谈薪", hasBattle: true, heroId: "HERO_W03", eventPool: ["B01", "B02", "B05", "B08"], difficulty: 3, apBonus: 0, forcedCasualty: false },
  { id: "L05", title: "IPO 中期警告", hasBattle: true, heroId: "HERO_W04", eventPool: ["B01", "B02", "B03", "B04", "B05", "B06", "B08", "B09"], difficulty: 3, apBonus: 0, forcedCasualty: false },
  { id: "L06", title: "审计加压", hasBattle: true, heroId: "HERO_W05", eventPool: ["B01", "B02", "B03", "B04", "B05", "B06", "B08", "B09", "B10", "B14", "B16"], difficulty: 4, apBonus: 1, forcedCasualty: false },
  { id: "L07", title: "路演前夜", hasBattle: true, heroId: "HERO_ELITE", eventPool: ["B02", "B03", "B04", "B05", "B06", "B07", "B10", "B11", "B14", "B15", "B16"], difficulty: 4, apBonus: 1, forcedCasualty: false },
  { id: "L08", title: "媒体日突袭", hasBattle: true, heroId: "HERO_ELITE_2", eventPool: ["B02", "B03", "B04", "B05", "B06", "B07", "B10", "B11", "B12", "B14", "B15", "B16", "B17"], difficulty: 5, apBonus: 1, forcedCasualty: false },
  { id: "L09", title: "最终压力测试", hasBattle: true, heroId: "HERO_FINAL", eventPool: ["B02", "B03", "B04", "B05", "B06", "B07", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17"], difficulty: 5, apBonus: 2, forcedCasualty: false },
  { id: "L10", title: "结局·上市钟声", hasBattle: false, heroId: null, eventPool: [], difficulty: 0, apBonus: 0, forcedCasualty: false },
];

export const EVENTS: Record<string, GameEvent> = {
  B01: {
    id: "B01",
    triggerCondition: "first_round_tick_in_battle",
    triggerProbability: 1.0,
    availableLevels: ["L02", "L03", "L04", "L05", "L06"],
    cardText: "勇者拔出武器高呼：『为了正义！』",
    options: [
      { label: "全员防守，稳住阵线", sub: "我方全体血量 +10%（本回合）", effect: { team_hp_pct: 0.1 } },
      { label: "激将法，扰乱其心神", sub: "勇者本回合攻击 -20%，下回合 +10%", effect: { hero_atk_pct_this_round: -0.2, hero_atk_pct_next_round: 0.1 } },
    ],
    timeoutDefault: 1,
  },
  B02: {
    id: "B02",
    triggerCondition: "monster_hp_below_30",
    triggerProbability: 1.0,
    availableLevels: ["L03", "L04", "L05", "L06"],
    cardText: "[怪物名] 拖着残躯发来内网消息：『我还能打，但我需要绩效承诺。』",
    options: [
      { label: "承诺本场绩效 S", sub: "该怪物本回合攻击 ×1.5", effect: { monster_atk_mult: 1.5 } },
      { label: "稳住，先活着再说", sub: "该怪物血量 +5%，攻击不变", effect: { monster_hp_pct: 0.05 } },
    ],
    timeoutDefault: 1,
  },
  B03: {
    id: "B03",
    triggerCondition: "no_crit_round_random",
    triggerProbability: 0.2,
    availableLevels: ["L05", "L06"],
    cardText: "地下城配电室短路，视野急剧下降。",
    options: [
      { label: "紧急拉闸", sub: "双方各失去本回合一次攻击", effect: { both_skip: true } },
      { label: "强行续电", sub: "随机一方攻击 ×1.5，另一方 ×0.5", effect: { random_power: true } },
    ],
    timeoutDefault: 1,
  },
  B04: {
    id: "B04",
    triggerCondition: "hero_hp_above_60_round3",
    triggerProbability: 1.0,
    availableLevels: ["L05", "L06"],
    cardText: "勇者队伍传来情报：他们今天拿了双倍任务奖励，士气爆棚。",
    options: [
      { label: "紧急发放团队战斗津贴", sub: "消耗 17 碎片，我方全体攻击 +15%（本场）", effect: { cost: 17, team_atk_pct_battle: 0.15 } },
      { label: "心理战", sub: "50% 勇者攻击 -15%；50% 无效", effect: { psy_war: true } },
    ],
    timeoutDefault: 1,
  },
  B05: {
    id: "B05",
    triggerCondition: "monster_no_damage_2_rounds",
    triggerProbability: 1.0,
    availableLevels: ["L04", "L05", "L06"],
    cardText: "[怪物名]：『老板我今天状态不行，能不能让我先去厕所冷静一下。』",
    options: [
      { label: "批准休整", sub: "该怪物本回合跳过，下回合攻击 +20%", effect: { monster_skip_next_bonus: 0.2 } },
      { label: "强制上岗", sub: "本回合正常行动，但 30% 概率造成半伤", effect: { monster_force_work: true } },
    ],
    timeoutDefault: 1,
  },
  B06: {
    id: "B06",
    triggerCondition: "mid_battle_alive_2",
    triggerProbability: 1.0,
    availableLevels: ["L05", "L06"],
    cardText: "存活怪物联名提交《紧急战时补贴申请》。",
    options: [
      { label: "批准补贴", sub: "消耗 16 碎片，存活怪物血量 +20%", effect: { cost: 16, alive_hp_pct: 0.2 } },
      { label: "驳回申请", sub: "本波士气下降（若存在士气词条）", effect: { morale_down: true } },
    ],
    timeoutDefault: 1,
  },
  B07: {
    id: "B07",
    triggerCondition: "hero_first_crit",
    triggerProbability: 1.0,
    availableLevels: ["L06"],
    cardText: "勇者打出了暴击！监控室急报：『他在挖我们的人！』",
    options: [
      { label: "立刻锁定合同", sub: "阻止该怪物被策反（本场不受士气词条影响）", effect: { lock_contract: true } },
      { label: "假意谈判拖延", sub: "勇者下一个 ROUND_TICK 被迫暂停", effect: { hero_forced_skip: true } },
    ],
    timeoutDefault: 1,
  },
  B08: {
    id: "B08",
    triggerCondition: "round_2_random",
    triggerProbability: 0.8,
    availableLevels: ["L04", "L05", "L06"],
    cardText: "审计部门突然上线旁听：『请解释一下本场战斗预算的合理性。』",
    options: [
      { label: "立刻补材料", sub: "流程拖住勇者：勇者下回合攻击 -10%", effect: { hero_atk_pct_next_round: -0.1 } },
      { label: "先打完再报销", sub: "我方本场攻击 +8%，但立刻支出 6 碎片", effect: { cost: 6, team_atk_pct_battle: 0.08 } },
    ],
    timeoutDefault: 0,
  },
  B09: {
    id: "B09",
    triggerCondition: "round_4_random",
    triggerProbability: 0.7,
    availableLevels: ["L05", "L06", "L07"],
    cardText: "勇者开启直播，弹幕开始嘲笑魔王城福利待遇。",
    options: [
      { label: "切断直播信号", sub: "双方本回合各跳过一次攻击", effect: { both_skip: true } },
      { label: "反向营销", sub: "获得 5 碎片赞助，但勇者下回合攻击 +10%", effect: { shards: 5, hero_atk_pct_next_round: 0.1 } },
    ],
    timeoutDefault: 1,
  },
  B10: {
    id: "B10",
    triggerCondition: "monster_count_3_round4",
    triggerProbability: 1.0,
    availableLevels: ["L06", "L07", "L08", "L09"],
    cardText: "员工互助群刷屏：『一线同事需要紧急补给，财务批不批？』",
    options: [
      { label: "批准互助红包", sub: "消耗 10 碎片，存活怪物血量 +15%", effect: { cost: 10, alive_hp_pct: 0.15 } },
      { label: "让大家自我调节", sub: "本回合勇者攻击 -10%，但没有治疗", effect: { hero_atk_pct_this_round: -0.1 } },
    ],
    timeoutDefault: 1,
  },
  B11: {
    id: "B11",
    triggerCondition: "hero_hp_below_50",
    triggerProbability: 0.9,
    availableLevels: ["L07", "L08", "L09"],
    cardText: "CEO 在群里发送 60 秒语音：『各位，上市以后什么都会有的。』",
    options: [
      { label: "转发并置顶", sub: "我方本场攻击 +10%", effect: { team_atk_pct_battle: 0.1 } },
      { label: "别打扰一线", sub: "存活怪物血量 +10%", effect: { alive_hp_pct: 0.1 } },
    ],
    timeoutDefault: 1,
  },
  B12: {
    id: "B12",
    triggerCondition: "late_battle_random",
    triggerProbability: 0.65,
    availableLevels: ["L08", "L09"],
    cardText: "工会临检抵达前台：『听说这里存在连续作战与超时加班。』",
    options: [
      { label: "补齐加班流程", sub: "消耗 8 碎片，勇者下回合暂停", effect: { cost: 8, hero_forced_skip: true } },
      { label: "请他们先喝茶", sub: "我方全体血量 +5%，勇者下回合攻击 +10%", effect: { alive_hp_pct: 0.05, hero_atk_pct_next_round: 0.1 } },
    ],
    timeoutDefault: 1,
  },
  B13: {
    id: "B13",
    triggerCondition: "monster_hp_below_30",
    triggerProbability: 0.8,
    availableLevels: ["L09"],
    cardText: "[怪物名] 看着上市倒计时，突然认真起来：『最后一场了，对吧？』",
    options: [
      { label: "允许超常发挥", sub: "该怪物本回合攻击 ×2.0", effect: { monster_atk_mult: 2.0 } },
      { label: "稳住，活着上市", sub: "该怪物血量 +20%", effect: { monster_hp_pct: 0.2 } },
    ],
    timeoutDefault: 1,
  },
  C01: {
    id: "C01",
    triggerCondition: "monster_first_battle",
    triggerProbability: 1.0,
    availableLevels: ["L02"],
    cardText: "[怪物名] 发来内网消息：『请问这算正式上岗吗，我还没签完入职合同。』",
    options: [
      { label: "先打，手续战后补", sub: "该怪物本场攻击 +10%，合同标注已补签", effect: { monster_contract_pending: true } },
      { label: "先停，去签合同", sub: "该怪物本场跳过一回合，下场合规上岗无惩罚", effect: { monster_skip_next_bonus: 0 } },
    ],
    timeoutDefault: 0,
  },
  // ─── 新增战斗事件（v0.24） ───
  B14: {
    id: "B14",
    triggerCondition: "round_3_random",
    triggerProbability: 0.7,
    availableLevels: ["L06", "L07", "L08", "L09"],
    cardText: "勇者突然使出群攻技能！地面震波向全体怪物袭来——",
    options: [
      { label: "紧急散开阵型", sub: "全体怪物血量 -5%，但下回合攻击 +15%", effect: { alive_hp_pct: -0.05, team_atk_pct_battle: 0.15 } },
      { label: "集中防御", sub: "TANK 承受全部伤害（HP-15%），其余不受影响", effect: { tank_absorb_all: true } },
    ],
    timeoutDefault: 1,
  },
  B15: {
    id: "B15",
    triggerCondition: "hero_hp_above_60_round3",
    triggerProbability: 0.6,
    availableLevels: ["L07", "L08", "L09"],
    cardText: "勇者从背包掏出回复药水，准备恢复体力。",
    options: [
      { label: "派刺客打断", sub: "消耗 12 碎片，勇者本回合无法回血且攻击 -10%", effect: { cost: 12, hero_atk_pct_this_round: -0.1, hero_forced_skip: true } },
      { label: "趁他喝药全力输出", sub: "我方全体本回合攻击 ×1.3", effect: { team_atk_pct_battle: 0.3 } },
    ],
    timeoutDefault: 1,
  },
  B16: {
    id: "B16",
    triggerCondition: "monster_count_3_round4",
    triggerProbability: 0.75,
    availableLevels: ["L06", "L07", "L08"],
    cardText: "地下城工会代表突然出现：『根据劳动法，连续作战超过 4 回合需要支付加班费。』",
    options: [
      { label: "支付加班费", sub: "消耗 15 碎片，全员攻击 +20% 持续到战斗结束", effect: { cost: 15, team_atk_pct_battle: 0.2 } },
      { label: "申请豁免", sub: "50% 成功免费获得 +10% 攻击；50% 失败全员攻击 -5%", effect: { psy_war_atk: true } },
    ],
    timeoutDefault: 1,
  },
  B17: {
    id: "B17",
    triggerCondition: "late_battle_random",
    triggerProbability: 0.5,
    availableLevels: ["L08", "L09"],
    cardText: "勇者召唤了援军！一个小勇者加入战场，虽然弱但会分散注意力。",
    options: [
      { label: "集火小勇者", sub: "本回合全体攻击集中在小勇者（勇者本回合不受伤）", effect: { hero_forced_skip: true } },
      { label: "无视，继续打大的", sub: "勇者下回合攻击 +15%（援军鼓舞）", effect: { hero_atk_pct_next_round: 0.15 } },
    ],
    timeoutDefault: 1,
  },
};

export const PREP_EVENTS: PrepEvent[] = [
  {
    id: "P-E01",
    title: "日常突发 · 财务报销窗口",
    cardText: "财务窗口今天只开 15 分钟，HR 可以抢一笔历史报销。",
    options: [
      { label: "亲自排队", sub: "立刻获得 8 碎片", effect: { shards: 8 } },
      { label: "留在办公室排班", sub: "本关行动点 +1", effect: { ap: 1 } },
    ],
  },
  {
    id: "P-E02",
    title: "日常突发 · 猎头来电",
    cardText: "外包猎头发来一批候选简历，但语气听起来非常像群发。",
    options: [
      { label: "买下名单", sub: "消耗 3 碎片，简历刷新次数 +2", effect: { cost: 3, recruit_refresh: 2 } },
      { label: "让他先发免费样例", sub: "简历刷新次数 +1", effect: { recruit_refresh: 1 } },
    ],
  },
  {
    id: "P-E03",
    title: "日常突发 · 员工关怀日",
    cardText: "行政部突然记起今天是员工关怀日，士气窗口期很短。",
    options: [
      { label: "发放补给包", sub: "全员血量 +10%", effect: { team_hp_pct: 0.1 } },
      { label: "举办五分钟晨会", sub: "本关全员攻击 +5%", effect: { prep_team_atk_pct: 0.05 } },
    ],
  },
  {
    id: "P-E04",
    title: "日常突发 · 临时预算口子",
    cardText: "CEO 转来一封没有正文的邮件，附件名叫《临时预算最终最终版.xlsx》。",
    options: [
      { label: "申请战备预算", sub: "本关通关奖励 +15%", effect: { prep_reward_mult: 0.15 } },
      { label: "申请防损预算", sub: "本关抚恤金 -20%", effect: { prep_pension_mult: -0.2 } },
    ],
  },
  {
    id: "P-E05",
    title: "日常突发 · 建筑队有空",
    cardText: "地下城维修队今天正好路过，可以顺手改一间休息室。",
    options: [
      { label: "压价扩建", sub: "获得 10 碎片，适合立刻扩建", effect: { shards: 10 } },
      { label: "让他们修训练场", sub: "本关全员攻击 +5%", effect: { prep_team_atk_pct: 0.05 } },
    ],
  },
  // ─── 新增日常事件（v0.24） ───
  {
    id: "P-E06",
    title: "日常突发 · 转职培训班",
    cardText: "隔壁魔王城开了个转职培训班，今天有团购优惠。",
    options: [
      { label: "团购报名", sub: "获得 12 碎片（用于转职费用）", effect: { shards: 12 } },
      { label: "自己培训更靠谱", sub: "本关全员暴击率 +3%", effect: { prep_team_crit: 0.03 } },
    ],
  },
  {
    id: "P-E07",
    title: "日常突发 · 勇者情报",
    cardText: "情报部门截获了下一位勇者的技能情报，但需要付费解密。",
    options: [
      { label: "付费解密", sub: "消耗 8 碎片，本关全员攻击 +8%（知己知彼）", effect: { cost: 8, prep_team_atk_pct: 0.08 } },
      { label: "省钱硬扛", sub: "获得 5 碎片情报费退款", effect: { shards: 5 } },
    ],
  },
  {
    id: "P-E08",
    title: "日常突发 · 员工体检",
    cardText: "年度体检报告出来了，部分员工亚健康需要调理。",
    options: [
      { label: "全员调理", sub: "消耗 6 碎片，全员血量 +15%", effect: { cost: 6, team_hp_pct: 0.15 } },
      { label: "只给重点岗位", sub: "TANK 血量 +20%（其余不变）", effect: { tank_hp_pct: 0.2 } },
    ],
  },
];

export const BOARD_POLICIES: BoardPolicy[] = [
  {
    id: "cost_control",
    title: "节流经营",
    desc: "奖金费用 -30%，但本关怪物攻击 -5%。",
    bonusDiscount: 0.3,
    monsterAtkPct: -0.05,
  },
  {
    id: "roadshow_sprint",
    title: "路演冲刺",
    desc: "通关绩效 +25%，但本关勇者血量 +10%。",
    rewardMult: 1.25,
    heroHpPct: 0.1,
  },
  {
    id: "employee_care",
    title: "员工关怀",
    desc: "怪物血量 +15%，但本关抚恤成本 +20%。",
    monsterHpPct: 0.15,
    pensionMult: 1.2,
  },
  {
    id: "aggressive_hiring",
    title: "激进排班",
    desc: "本关行动点 +1，但勇者攻击 +5%。",
    extraAp: 1,
    heroAtkPct: 0.05,
  },
];

export const HERO_VARIANTS: HeroVariant[] = [
  { id: "shield", title: "持盾", desc: "血量 +20%，攻击 -10%。", hpMult: 1.2, atkMult: 0.9, critDelta: 0 },
  { id: "berserker", title: "狂热", desc: "攻击 +20%，血量 -10%。", hpMult: 0.9, atkMult: 1.2, critDelta: 0.02 },
  { id: "auditor", title: "审计", desc: "血量 +10%，暴击率 +3%。", hpMult: 1.1, atkMult: 1, critDelta: 0.03 },
  { id: "tired", title: "疲惫", desc: "血量 -10%，攻击 -5%。", hpMult: 0.9, atkMult: 0.95, critDelta: -0.01 },
];

export const PERSONAL_GOALS: PersonalGoal[] = [
  { id: "survive_2", title: "稳定就业", desc: "累计存活 2 场战斗。", reward: { hpMax: 12 }, rewardText: "血量上限 +12" },
  { id: "deal_200", title: "绩效样板", desc: "累计造成 200 点伤害。", reward: { atk: 3 }, rewardText: "攻击 +3" },
  { id: "no_bonus_survive", title: "不靠奖金", desc: "不领取战前奖金并存活一场。", reward: { atk: 1, hpMax: 8 }, rewardText: "攻击 +1，血量上限 +8" },
  { id: "reach_level_3", title: "骨干员工", desc: "升到 3 级。", reward: { atk: 2, critRate: 0.03 }, rewardText: "攻击 +2，暴击率 +3%" },
];

export const GROWTH_CHOICES: GrowthChoice[] = [
  { id: "atk_training", title: "专项训练", desc: "永久攻击 +1。" },
  { id: "hp_benefits", title: "健康福利", desc: "永久血量上限 +6，并立即恢复 6 血量。" },
  { id: "salary_review", title: "薪酬复盘", desc: "日薪 -1（最低 1），略微缓解长期经济压力。" },
  { id: "reveal_trait", title: "背景调查", desc: "立刻揭示隐藏词条。" },
  { id: "crit_drill", title: "暴击演练", desc: "永久暴击率 +2%。" },
];

export const BATTLE_LOG_TEMPLATES: BattleLogTemplates = {
  monsterHit: [
    "{m} 发起反击，造成 {x} 点伤害。",
    "{m} 猛扑而上，勇者承受 {x} 点伤害。",
    "{m} 抓准时机出手，造成 {x} 点伤害。",
  ],
  heroHit: [
    "勇者挥剑而下，{m} 承受 {x} 点伤害。",
    "勇者一记重击，{m} 损失 {x} 点血量。",
    "勇者突进劈砍，{m} 承受 {x} 点伤害。",
  ],
  monsterMiss: ["{m} 试图反击，但勇者闪过。", "{m} 出手过急，攻击落空。"],
  heroMiss: ["勇者一击落空，{m} 险险闪过。", "勇者挥剑过猛，{m} 灵巧躲开。"],
  crit: ["{atk} 抓住破绽，{def} 承受 {x} 点暴击伤害！", "{atk} 一击致命，{def} 遭受 {x} 点暴击！"],
  death: ["{m} 力竭倒下。HR 系统记录在案。", "{m} 缓缓瘫软，绩效评定：尽职。"],
};

export const TRIGGERS: Record<string, TriggerText> = {
  T01: {
    id: "T01",
    title: "收件箱 · 未读 — From: CEO@魔王城.corp",
    body:
      "主题：入职第一天\n\n新任 HR 总监，欢迎入职魔王城。\n\n前任 HR 离职原因：不适合。请确保你更适合。\n\n本季度核心 KPI：撑过勇者的周期性突袭，完成 IPO 路演，让魔王城成功上市。\n\n勇者会定期突袭。招募怪物、管好薪酬、抵御每一波冲击。\n\n记住：今天没有人辞职，就算胜利。",
  },
  T02: { id: "T02", title: "招募提示", body: "每份简历都有隐藏词条，入职后才会激活，请谨慎甄别。" },
  T03: { id: "T03", title: "突袭警报", body: "突袭警报！B1 驻守岗已就位，倒计时开始。" },
  T04: { id: "T04", title: "突发事件教学", body: "战斗中会出现突发事件，你有 10 秒做出二选一决策。注意：超时将自动选择不利项！" },
  T05: { id: "T05", title: "内部备忘录", body: "员工已光荣牺牲。抚恤金已从灵魂碎片账户扣除。绩效评定：尽职。" },
  T06: { id: "T06", title: "全员注意", body: "路演倒计时 1 天。本次为 IPO 前最终压力测试。" },
  T07: { id: "T07", title: "收件箱 · 未读 — From: CEO@魔王城.corp", body: "主题：上市钟声\n\n钟声敲响，魔王城成功上市！\n\n附股权激励邮件：行权期 4 年，Cliff 1 年（小字部分请自行阅读）。\n\n你做到了——今天没有人辞职。" },
  T08: { id: "T08", title: "战斗失败", body: "地下城无人值守。勇者打卡。股价跌停。" },
  T09: { id: "T09", title: "公司破产", body: "工资账户余额不足。集体离职。劳动仲裁通知已送达。公司破产。" },
  P03: { id: "P03", title: "经济警告", body: "灵魂碎片储备告急，请控制人力成本。" },
  P04: { id: "P04", title: "收件箱 · 未读 — From: CEO@魔王城.corp", body: "主题：IPO 中期审计警告\n\n审计部门发现人力成本偏高，流动性承压。\n\n本阶段进入高压区，请谨慎招募与发奖金。" },
  P05: { id: "P05", title: "流动性承压", body: "灵魂碎片低于安全阈值，流动性承压。请注意控制下一阶段支出。" },
};

export const ENDINGS: Record<string, EndingDef> = {
  E01: {
    id: "E01",
    title: "E01 · 满血上市",
    tone: "good",
    body:
      "上市钟声敲响，魔王城股价高开。CEO 邮件附带空头期权的小字条款，但那是明天的烦恼。\n\n格鲁巴斯·史莱姆私信：『谢谢你没有把我末位淘汰。』",
  },
  E02: {
    id: "E02",
    title: "E02 · 破发",
    tone: "bad",
    body: "魔王城勉强上市，但首日即破发。CEO 要求你解释亏损与人力成本失控。\n\n你撑过来了，但代价不小。",
  },
  E03: {
    id: "E03",
    title: "E03 · 无人值守",
    tone: "bad",
    body: "某一波后，地下城再无可战之将。勇者大摇大摆地打卡发帖：『轻松通关，求加更。』\n\n魔王城停摆。",
  },
  E04: {
    id: "E04",
    title: "E04 · 破产",
    tone: "bad",
    body: "灵魂碎片归零，工资发不出，怪物集体离职，劳动仲裁通知雪片般飞来。\n\n格鲁巴斯·史莱姆最后留言：『这次我不是被淘汰的。』",
  },
};

// 简历随机生成备选库
export const RESUME_DATA = {
  speciesAdj: ["格鲁巴斯", "奥莫斯", "维克塔", "塞德里", "莫尔加", "卡兹尼", "费罗斯", "祖尔坦"],
  romanSuffix: ["二世", "三世", "四世", "五世"],
  positions: ["B1 驻守", "远程输出", "前排肉盾", "侧翼游击", "陷阱管理"],
  performance: [
    "连续 3 个财年零离职记录。",
    "擅长高强度重复性防御工作。",
    "熟悉当前勇者突袭时间窗口规律。",
    "曾独自拖延勇者超过 5 个回合。",
    "AOE 控制稳定，不携带高风险负面词条。",
  ],
  salaryExpectation: [
    "稳定，不要无故降薪。",
    "面议，请先报价。",
    "参照同岗位同级别。",
    "市价九折可接受，再低不行。",
    "参照同级标准，可适当下浮。",
  ],
  notes: [
    "本人不接受绩效末位淘汰，如有异议请联系工会。",
    "本人健康状况良好，仅偶有低气压。",
    "上一家雇主拖欠薪资，望贵司勿重蹈覆辙。",
    "本人坚持基本职业原则，不参与策反。",
  ],
  innerThoughts: [
    "我其实不太适合这个行业，但我暂时没有选择。",
    "如果薪酬可以，我不介意工作久一点。",
    "上一家雇主在我升级前就关门了。",
    "我有时候觉得当怪物挺累的，但这不影响工作。",
  ],
};

// 怪物模板（balance §3.1）：TANK/DPS/RANGE 三档，±15% 浮动
export interface MonsterTemplateDef {
  template: MonsterTemplate;
  species: string;
  art: string;
  baseHp: number;
  baseAtk: number;
  baseSpeed: number;
  baseCritRate: number;
  baseSalary: number;
  visiblePool: TraitId[];
}

export const MONSTER_TEMPLATES: MonsterTemplateDef[] = [
  { template: "MON_TANK", species: "slime", art: ART.groobas, baseHp: 75, baseAtk: 10, baseSpeed: 9, baseCritRate: 0.03, baseSalary: 8, visiblePool: ["tough", "team_player", "shield_wall", "mentor", "glass_heart"] },
  { template: "MON_TANK", species: "mushroom", art: ART.generic3, baseHp: 75, baseAtk: 10, baseSpeed: 9, baseCritRate: 0.03, baseSalary: 8, visiblePool: ["tough", "cancer", "shield_wall", "compliance", "overtime_ready"] },
  { template: "MON_DPS", species: "goblin", art: ART.generic1, baseHp: 50, baseAtk: 16, baseSpeed: 11, baseCritRate: 0.12, baseSalary: 10, visiblePool: ["team_player", "lone_wolf", "precision", "overtime_ready", "compliance"] },
  { template: "MON_DPS", species: "imp", art: ART.generic2, baseHp: 50, baseAtk: 16, baseSpeed: 11, baseCritRate: 0.12, baseSalary: 10, visiblePool: ["cancer", "tough", "precision", "mentor", "compliance"] },
  { template: "MON_RANGE", species: "skeleton", art: ART.xiaoxing, baseHp: 45, baseAtk: 14, baseSpeed: 12, baseCritRate: 0.10, baseSalary: 9, visiblePool: ["lone_wolf", "team_player", "precision", "overtime_ready", "glass_heart"] },
];

export const HIDDEN_TRAIT_POOL: TraitId[] = ["loyalty", "nostalgic", "cheap_skate", "tough", "lone_wolf", "night_shift", "battle_trance", "quiet_quitter"];

// 职业标签映射（用于 UI 显示）
export const TEMPLATE_LABEL: Record<string, { icon: string; label: string; color: string; bg: string; desc: string }> = {
  MON_TANK: { icon: "🛡️", label: "前排肉盾", color: "text-blue-800", bg: "bg-blue-100 border-blue-300", desc: "嘲讽：吸收60%勇者伤害，保护队友" },
  MON_DPS: { icon: "⚔️", label: "近战输出", color: "text-red-800", bg: "bg-red-100 border-red-300", desc: "高攻击、高暴击率，主要输出手" },
  MON_RANGE: { icon: "🏹", label: "远程输出", color: "text-green-800", bg: "bg-green-100 border-green-300", desc: "均衡型，速度快，暴击率适中" },
};

// ─── 转职系统数据 ───
export const JOB_CHANGE_MIN_LEVEL = 3;
export const JOB_CHANGE_AP_COST = 1;

export const JOB_CHANGE_OPTIONS: Record<MonsterTemplate, [JobChangeOption, JobChangeOption]> = {
  MON_TANK: [
    { advancedClass: "HEAVY_ARMOR", label: "重装骑士", desc: "HP+30%，嘲讽吸收提升至70%", cost: 18, statMods: { hpPct: 0.3 } },
    { advancedClass: "WARRIOR", label: "战场勇士", desc: "ATK+20%，HP+10%，攻守兼备", cost: 16, statMods: { atkPct: 0.2, hpPct: 0.1 } },
  ],
  MON_DPS: [
    { advancedClass: "ASSASSIN", label: "暗影刺客", desc: "暴击率+8%，ATK+10%，致命一击", cost: 18, statMods: { atkPct: 0.1, critDelta: 0.08 } },
    { advancedClass: "BERSERKER", label: "狂战士", desc: "ATK+30%，但HP-15%，极限输出", cost: 15, statMods: { atkPct: 0.3, hpPct: -0.15 } },
  ],
  MON_RANGE: [
    { advancedClass: "MAGE", label: "战术法师", desc: "队伍全体ATK+5%光环", cost: 18, statMods: {}, auraEffect: "team_atk_5" },
    { advancedClass: "SNIPER", label: "精准狙击手", desc: "ATK+25%，速度-2，一击必杀", cost: 16, statMods: { atkPct: 0.25, speedDelta: -2 } },
  ],
};

// 高级职业标签（用于 UI 显示）
export const ADVANCED_CLASS_LABEL: Record<AdvancedClass, { icon: string; label: string; color: string; bg: string; desc: string }> = {
  HEAVY_ARMOR: { icon: "🏰", label: "重装骑士", color: "text-indigo-800", bg: "bg-indigo-100 border-indigo-300", desc: "HP+30%，嘲讽吸收70%伤害" },
  WARRIOR: { icon: "⚔️", label: "战场勇士", color: "text-orange-800", bg: "bg-orange-100 border-orange-300", desc: "ATK+20%，HP+10%，攻守兼备" },
  ASSASSIN: { icon: "🗡️", label: "暗影刺客", color: "text-purple-800", bg: "bg-purple-100 border-purple-300", desc: "暴击率+8%，ATK+10%，致命一击" },
  BERSERKER: { icon: "🔥", label: "狂战士", color: "text-rose-800", bg: "bg-rose-100 border-rose-300", desc: "ATK+30%，HP-15%，极限输出" },
  MAGE: { icon: "✨", label: "战术法师", color: "text-violet-800", bg: "bg-violet-100 border-violet-300", desc: "队伍全体ATK+5%光环" },
  SNIPER: { icon: "🎯", label: "精准狙击手", color: "text-teal-800", bg: "bg-teal-100 border-teal-300", desc: "ATK+25%，速度-2" },
};

// ─── 勇者后期技能定义 ───
export const HERO_SKILLS: Record<string, HeroSkill> = {
  cleave: { id: "cleave", name: "群攻", desc: "概率对全体怪物造成 ATK×0.4 伤害（不走嘲讽分摊）", chance: 0.25 },
  block: { id: "block", name: "格挡", desc: "概率减免一次怪物攻击 50% 伤害", chance: 0.20 },
  regen: { id: "regen", name: "回血", desc: "每 3 回合恢复 5% maxHP", chance: 1.0 },
  awakening: { id: "awakening", name: "觉醒", desc: "HP<30% 时觉醒，攻击翻倍持续 2 回合（一次性）", chance: 1.0 },
  friendship: { id: "friendship", name: "友谊之力", desc: "每回合 20% 概率暴击率翻倍 1 回合", chance: 0.20 },
  revive: { id: "revive", name: "不屈复活", desc: "精英勇者死后 40% 概率以 50%HP 复活一次", chance: 0.40 },
  sabotage: { id: "sabotage", name: "策反", desc: "对消极怠工怪物 30% 概率使其本回合不攻击", chance: 0.30 },
  item: { id: "item", name: "道具", desc: "每场 1-2 次随机使用道具（回血/攻击卷轴/护盾）", chance: 0.35 },
  ultimate: { id: "ultimate", name: "必杀技", desc: "HP<50% 时一次机会发动必杀（全屏AOE 或秒杀）", chance: 1.0 },
};

// ─── 勇者机制触发事件卡片（幽默风格，选项不影响实际效果） ───
export interface HeroMechanismEventCard {
  title: string;
  cardText: string;
  options: [{ label: string; sub: string }, { label: string; sub: string }];
}

export const HERO_MECHANISM_EVENTS: Record<string, HeroMechanismEventCard[]> = {
  awakening: [
    {
      title: "⚠️ 紧急警报",
      cardText: "勇者突然浑身发光，头发竖了起来！空气中弥漫着危险的气息……这是传说中的「觉醒」！",
      options: [
        { label: "趁他变身打他！", sub: "（然而变身是无敌帧）" },
        { label: "全员后退三步！", sub: "（来不及了，地方太小）" },
      ],
    },
    {
      title: "⚠️ 异常能量波动",
      cardText: "勇者的眼睛变成了金色！BGM突然变燃了！这剧情我在动画里看过……",
      options: [
        { label: "快！播放舒缓音乐对冲！", sub: "（音响被震坏了）" },
        { label: "紧急联系编剧改剧本", sub: "（编剧已读不回）" },
      ],
    },
    {
      title: "⚠️ 主角光环发动",
      cardText: "勇者突然开始回忆童年、师父、已故的伙伴……这是要爆发的节奏啊！",
      options: [
        { label: "打断他的回忆！", sub: "（但他有霸体）" },
        { label: "也开始回忆自己的过去", sub: "（并没有什么用）" },
      ],
    },
  ],
  friendship: [
    {
      title: "✨ 场外援助",
      cardText: "勇者的粉丝后援会到了！他们在场外举着荧光棒大喊「你可以的」！",
      options: [
        { label: "举报非法集会", sub: "（城管今天休息）" },
        { label: "安排啦啦队对冲", sub: "（预算超了）" },
      ],
    },
    {
      title: "✨ 羁绊之力",
      cardText: "勇者掏出一张泛黄的合照，眼神变得坚定：「为了大家……」暴击率翻倍了！",
      options: [
        { label: "派人去抢那张照片", sub: "（被弹开了）" },
        { label: "也给员工发合照激励", sub: "（大家表示不需要）" },
      ],
    },
    {
      title: "✨ 友情爆发",
      cardText: "远方传来勇者同伴的呐喊声！虽然人没来，但精神支持到位了！",
      options: [
        { label: "信号干扰！切断通讯！", sub: "（是心灵感应，切不断）" },
        { label: "也给员工打鸡血电话", sub: "（全部转入语音信箱）" },
      ],
    },
  ],
  item_potion: [
    {
      title: "🧪 可疑补给",
      cardText: "勇者从背包里掏出一瓶可疑的红色液体，一口闷了下去！HP在恢复！",
      options: [
        { label: "那是食堂的番茄汁！", sub: "（并不是）" },
        { label: "派人去偷背包", sub: "（背包有密码锁）" },
      ],
    },
    {
      title: "🧪 非法回血",
      cardText: "勇者居然在战斗中喝药！这不犯规吗？！裁判呢？？",
      options: [
        { label: "申请药检！", sub: "（这里没有药检制度）" },
        { label: "我们也喝！", sub: "（公司不报销）" },
      ],
    },
  ],
  item_scroll: [
    {
      title: "📜 神秘卷轴",
      cardText: "勇者展开一张发光的卷轴念了几句咒语，浑身散发出攻击性的气场！",
      options: [
        { label: "那是盗版卷轴吧", sub: "（然而效果是真的）" },
        { label: "记下咒语回头研究", sub: "（听不懂异世界语）" },
      ],
    },
    {
      title: "📜 外挂道具",
      cardText: "勇者使用了「攻击力提升卷轴」！这种东西从哪买的？！",
      options: [
        { label: "投诉商城不平衡", sub: "（客服已下线）" },
        { label: "也去买一张", sub: "（怪物没有购买权限）" },
      ],
    },
  ],
  item_shield: [
    {
      title: "🛡️ 临时防御",
      cardText: "勇者掏出一面闪闪发光的护盾！这回合的攻击全被弹开了一半！",
      options: [
        { label: "那盾是租的吧", sub: "（人家买断了）" },
        { label: "集中火力打盾！", sub: "（盾比你们硬）" },
      ],
    },
    {
      title: "🛡️ 乌龟战术",
      cardText: "勇者缩在护盾后面！打不动啊！这也太赖皮了！",
      options: [
        { label: "等他盾消失再打", sub: "（但这回合已经挨打了）" },
        { label: "绕后攻击！", sub: "（盾是360度的）" },
      ],
    },
  ],
  sabotage: [
    {
      title: "🗣️ 职场PUA",
      cardText: "勇者低声说道：「来我们这边有五险一金哦……还有下午茶……」有人动摇了！",
      options: [
        { label: "立刻加薪挽留！", sub: "（预算不允许）" },
        { label: "播放企业文化宣传片", sub: "（效果存疑）" },
      ],
    },
    {
      title: "🗣️ 挖墙脚",
      cardText: "勇者居然在战场上发LinkedIn！「诚招队友，待遇从优」——有员工在偷看！",
      options: [
        { label: "没收手机！", sub: "（他用的是脑波传输）" },
        { label: "反向策反：给勇者发offer", sub: "（他不接受降薪）" },
      ],
    },
    {
      title: "🗣️ 思想攻势",
      cardText: "勇者开始讲述「自由的意义」和「追求梦想」……有怪物开始思考人生了！",
      options: [
        { label: "紧急开展团建活动", sub: "（大家更想走了）" },
        { label: "用加班费堵住耳朵", sub: "（加班费不够塞）" },
      ],
    },
  ],
  ultimate_execute: [
    {
      title: "⚡ 处刑宣告",
      cardText: "勇者举起了发光的剑，指向你最虚弱的员工：「审判之时到了！」",
      options: [
        { label: "全员趴下！", sub: "（被点名的躲不掉）" },
        { label: "紧急拨打工伤保险", sub: "（保险不赔战斗伤亡）" },
      ],
    },
    {
      title: "⚡ 斩杀线",
      cardText: "勇者的剑刃闪过寒光——他瞄准了血量最低的那位！这是必杀技！",
      options: [
        { label: "用爱感化", sub: "（他没有心）" },
        { label: "让实习生顶上", sub: "（实习生已经跑了）" },
      ],
    },
  ],
  ultimate_aoe: [
    {
      title: "⚡ 全屏大招",
      cardText: "空气中弥漫着危险的气息……勇者开始蓄力！「圣光爆裂！」全体伤害！",
      options: [
        { label: "全员趴下！", sub: "（没用，是范围伤害）" },
        { label: "用爱感化", sub: "（他没有心）" },
      ],
    },
    {
      title: "⚡ 终极奥义",
      cardText: "勇者双手合十，天空裂开一道光——「接受神的制裁吧！」全体中招！",
      options: [
        { label: "我们不信这个神！", sub: "（神不在乎）" },
        { label: "申请宗教豁免", sub: "（审批要三个工作日）" },
      ],
    },
  ],
  resurrect: [
    {
      title: "💀→🌟 诈尸了？！",
      cardText: "勇者明明已经倒下了……但他又站起来了？！这不科学！",
      options: [
        { label: "叫裁判！这犯规！", sub: "（裁判已下班）" },
        { label: "加班费翻倍继续打！", sub: "（员工集体拒绝）" },
      ],
    },
    {
      title: "💀→🌟 不屈意志",
      cardText: "「我还没输……」勇者从地上爬了起来，浑身散发着不甘的气场！",
      options: [
        { label: "确认一下他的死亡证明", sub: "（证明被撕了）" },
        { label: "要求重新验尸", sub: "（他活蹦乱跳的）" },
      ],
    },
    {
      title: "💀→🌟 复活币",
      cardText: "勇者摸出一枚金币塞进了嘴里……然后满血复活了？！什么付费复活机制？！",
      options: [
        { label: "投诉氪金不平衡！", sub: "（运营不管）" },
        { label: "我们也买复活币！", sub: "（怪物商城没有卖）" },
      ],
    },
  ],
};
