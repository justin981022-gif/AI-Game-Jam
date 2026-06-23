// 《地下城打工人 (Dungeon HR)》全部类型与枚举定义

export type GameState =
  | "GAME_INIT"
  | "MAIN_PREP"
  | "BATTLE"
  | "EVAL"
  | "ENDING"
  | "GAME_OVER";

export type MonsterStateTag = "active" | "negative" | "quit" | "dead";

// 怪物模板类型
export type MonsterTemplate = "MON_TANK" | "MON_DPS" | "MON_RANGE";

// 转职后的高级职业
export type AdvancedClass =
  | "HEAVY_ARMOR"   // TANK → 重装
  | "WARRIOR"       // TANK → 战士
  | "ASSASSIN"      // DPS → 刺客
  | "BERSERKER"     // DPS → 狂战士
  | "MAGE"          // RANGE → 法师
  | "SNIPER";       // RANGE → 狙击手

export interface JobChangeOption {
  advancedClass: AdvancedClass;
  label: string;
  desc: string;
  cost: number; // 碎片消耗
  statMods: { hpPct?: number; atkPct?: number; critDelta?: number; speedDelta?: number };
  auraEffect?: string; // 光环描述（如法师）
  newTrait?: TraitId;
}

// 勇者技能类型
export type HeroSkillId = "cleave" | "block" | "regen" | "awakening" | "friendship" | "revive" | "sabotage" | "item" | "ultimate";

export interface HeroSkill {
  id: HeroSkillId;
  name: string;
  desc: string;
  chance: number; // 触发概率
}

export type PersonalGoalId =
  | "survive_2"
  | "deal_200"
  | "no_bonus_survive"
  | "reach_level_3";

export interface PersonalGoalReward {
  atk?: number;
  hpMax?: number;
  critRate?: number;
}

export interface PersonalGoal {
  id: PersonalGoalId;
  title: string;
  desc: string;
  reward: PersonalGoalReward;
  rewardText: string;
}

// 词条 ID
export type TraitId =
  | "tough" // 吃苦耐劳
  | "glass" // 易燃体质
  | "team_player" // 团队协作
  | "cancer" // 团队毒瘤
  | "lone_wolf" // 社恐
  | "shield_wall" // 前排意识
  | "precision" // 精准打卡
  | "mentor" // 带新人
  | "overtime_ready" // 自愿加班
  | "compliance" // 合规意识
  | "glass_heart" // 玻璃心
  | "night_shift" // 夜班熟手
  | "battle_trance" // 越打越顺
  | "quiet_quitter" // 隐性摆烂
  | "cheap_skate" // 省钱攒学费
  | "loyalty" // 怀旧情绪
  | "nostalgic" // 末位淘汰恐惧
  | "slacker" // 消极怠工
  | "contract_pending"; // 合同未签

export interface TraitDef {
  id: TraitId;
  name: string;
  type: "positive" | "neutral" | "negative";
  desc: string;
  hidden: boolean;
}

export interface Monster {
  id: string;
  name: string;
  species: string;
  template: MonsterTemplate;
  role: string;
  advancedClass: AdvancedClass | null;
  artUrl: string;
  bustAsset: string;
  baseHpMax: number;
  baseAtk: number;
  hp: number;
  hpMax: number;
  atk: number;
  speed: number;
  critRate: number;
  level: number;
  battlesSurvived: number;
  salary: number;
  traitsVisible: TraitId[];
  traitHidden: TraitId | null;
  traitHiddenRevealed: boolean;
  // 本场战斗运行期附加词条（如 contract_pending / slacker）
  runtimeTraits: TraitId[];
  personalNote: string;
  state: MonsterStateTag;
  hasFoughtOnce: boolean;
  bonusAtkMult: number; // 发奖金本场 ATK 倍率（1.0 = 无奖金）
  receivedBonusThisBattle: boolean;
  // 本场临时效果
  tempAtkMult: number; // 倍率（事件用）
  skipNextRound: boolean;
  nextRoundAtkPct: number;
  // 消极怠工持续追踪
  slackerBattlesLeft: number; // 消极怠工剩余场次（0=无效果）
  personalGoal: PersonalGoal;
  goalCompleted: boolean;
  careerDamage: number;
  // 统计
  damageDealt: number;
  hits: number;
  attempts: number;
  noDamageStreak: number;
}

export interface ResumeCandidate {
  id: string;
  name: string;
  species: string;
  template: MonsterTemplate;
  artUrl: string;
  bustAsset: string; // BUST 半身像路径
  position: string; // 应聘岗位显示文本（B1 驻守 / 近战输出 / 远程输出）
  tenureYears: number;
  performanceRecord: string;
  salaryExpectation: string;
  personalNote: string; // 内心泄露句
  hp: number;
  atk: number;
  speed: number;
  critRate: number;
  salary: number; // 日薪
  traitsVisible: TraitId[];
  traitHidden: TraitId | null;
}

export interface HeroDef {
  id: string;
  name: string;
  hp: number;
  atk: number;
  critRate: number;
  skills: HeroSkillId[];
}

export interface Hero extends HeroDef {
  hpMax: number;
  // 临时效果
  atkPctThisRound: number;
  atkPctNextRound: number;
  forcedSkip: boolean; // 被迫暂停一回合
  hasCritOnce: boolean;
  // 后期技能（L06+）
  skills: HeroSkillId[];
  regenCounter: number; // regen 回合计数器
  // 新机制状态
  awakened: boolean; // 觉醒是否已触发（一次性）
  awakeningRoundsLeft: number; // 觉醒攻击翻倍剩余回合
  friendshipActive: boolean; // 本回合友谊之力是否激活
  revived: boolean; // 是否已复活过
  itemUsesLeft: number; // 本场剩余道具使用次数
  ultimateUsed: boolean; // 必杀技是否已使用
}

export type EventEffect = Record<string, number | string | boolean>;

export interface EventOption {
  label: string;
  sub?: string;
  effect: EventEffect;
}

export interface GameEvent {
  id: string;
  triggerCondition: string;
  triggerProbability: number;
  availableLevels: string[];
  cardText: string;
  options: [EventOption, EventOption];
  timeoutDefault: 0 | 1;
}

export interface PrepEventOption {
  label: string;
  sub?: string;
  effect: EventEffect;
}

export interface PrepEvent {
  id: string;
  title: string;
  cardText: string;
  options: [PrepEventOption, PrepEventOption];
}

export interface GrowthChoice {
  id: "atk_training" | "hp_benefits" | "salary_review" | "reveal_trait" | "crit_drill";
  title: string;
  desc: string;
}

export interface GrowthRequest {
  monsterId: string;
  choices: GrowthChoice[];
}

export interface BoardPolicy {
  id: "cost_control" | "roadshow_sprint" | "employee_care" | "aggressive_hiring";
  title: string;
  desc: string;
  bonusDiscount?: number;
  rewardMult?: number;
  monsterAtkPct?: number;
  monsterHpPct?: number;
  heroHpPct?: number;
  heroAtkPct?: number;
  pensionMult?: number;
  extraAp?: number;
}

export interface HeroVariant {
  id: string;
  title: string;
  desc: string;
  hpMult: number;
  atkMult: number;
  critDelta: number;
}

export interface LevelDef {
  id: string;
  title: string;
  hasBattle: boolean;
  heroId: string | null;
  eventPool: string[];
  difficulty: number;
  apBonus: number;
  forcedCasualty: boolean; // L03 强制阵亡（数值阈值+兜底）
}

export interface LogEntry {
  id: number;
  text: string;
  kind: "info" | "monster" | "hero" | "crit" | "death" | "event" | "system";
}

export interface BattleLogTemplates {
  monsterHit: string[];
  heroHit: string[];
  monsterMiss: string[];
  heroMiss: string[];
  crit: string[];
  death: string[];
}

export interface TriggerText {
  id: string;
  title: string;
  body: string;
}

export interface EndingDef {
  id: string;
  title: string;
  body: string;
  tone: "good" | "bad";
}

export interface PendingEvent {
  event: GameEvent;
  monsterId?: string; // 与该事件相关的怪物
}

// 谈薪请求
export interface NegotiateRequest {
  monsterId: string;
  delta: number;
}

// 奖金等级
export type BonusTier = "small" | "medium" | "large";

export interface BonusTierDef {
  cost: number;
  atkMult: number;
  label: string;
}

// 通关绩效提成明细
export interface RewardBreakdown {
  completionBase: number;
  surviveReward: number;
  surviveCount: number;
  dpsReward: number;
  totalDamage: number;
  total: number;
}

export interface EvalReport {
  survived: Monster[];
  dead: Monster[];
  pensionPaid: number;
  leveledUp: string[];
  reward: RewardBreakdown;
}
