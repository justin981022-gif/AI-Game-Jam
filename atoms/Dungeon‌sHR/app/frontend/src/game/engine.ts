// 引擎层：随机生成、战斗演算、招募、EVAL、词条效果
import {
  ART,
  BALANCE,
  BATTLE_LOG_TEMPLATES,
  HEROES,
  HERO_SKILLS,
  HERO_VARIANTS,
  HIDDEN_TRAIT_POOL,
  JOB_CHANGE_OPTIONS,
  MONSTER_TEMPLATES,
  PERSONAL_GOALS,
  RESUME_DATA,
  TRAITS,
} from "./data";
import type { AdvancedClass, BonusTier, Hero, HeroVariant, JobChangeOption, Monster, MonsterTemplate, ResumeCandidate, RewardBreakdown, TraitId } from "./types";
import bustMetaRaw from "./bust_meta.json";
import namePoolRaw from "./recruit_name_pool.json";

let _uid = 1;
export const uid = (prefix: string) => `${prefix}_${_uid++}_${Math.floor(Math.random() * 1e6)}`;

export const rand = (min: number, max: number) => Math.random() * (max - min) + min;
export const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));
export const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ±15% 浮动
function floatVal(base: number, pct: number = 0.15): number {
  return Math.round(base * (1 + rand(-pct, pct)));
}

// ─── 招募候选人生成器（BUST → name 流程） ───

interface BustEntry {
  asset_id: string;
  asset_path: string;
  race: string;
  race_en: string;
  role: "TANK" | "DPS" | "RANGE";
  applied_position: string;
  canonical_name_locked: string | null;
  is_named_character: boolean;
}

const BUST_CANDIDATES: Record<string, BustEntry> = bustMetaRaw.candidates as Record<string, BustEntry>;
const BUST_KEYS = Object.keys(BUST_CANDIDATES); // GROOBAS, XIAOXING, GENERIC-1/2/3
const NAME_POOL = namePoolRaw as {
  race_suffix: Record<string, string>;
  prefix_pool: Record<string, string[]>;
  self_intro_pool: { lines: string[] };
  tags_pool: { lines: string[] };
};

const BUST_ART: Record<string, string> = {
  "A-CHR-BUST-GROOBAS": "/art/characters/A-CHR-BUST-GROOBAS.png",
  "A-CHR-BUST-XIAOXING": "/art/characters/A-CHR-BUST-XIAOXING.png",
  "A-CHR-BUST-GENERIC-1": "/art/characters/A-CHR-BUST-GENERIC-1.png",
  "A-CHR-BUST-GENERIC-2": "/art/characters/A-CHR-BUST-GENERIC-2.png",
  "A-CHR-BUST-GENERIC-3": "/art/characters/A-CHR-BUST-GENERIC-3.png",
};

function bustPublicPath(bust: BustEntry): string {
  return BUST_ART[bust.asset_id] ?? bust.asset_path.replace("atoms/assets", "");
}

// Role → MonsterTemplate mapping
const ROLE_TO_TEMPLATE: Record<string, MonsterTemplate> = {
  TANK: "MON_TANK",
  DPS: "MON_DPS",
  RANGE: "MON_RANGE",
};

// Role → base stats (from balance)
const ROLE_BASE_STATS: Record<string, { hp: number; atk: number; speed: number; critRate: number; salary: number }> = {
  TANK: { hp: 75, atk: 10, speed: 9, critRate: 0.03, salary: 8 },
  DPS: { hp: 50, atk: 16, speed: 11, critRate: 0.08, salary: 10 },
  RANGE: { hp: 45, atk: 14, speed: 12, critRate: 0.10, salary: 9 },
};

// Bust key → correct battle art (1:1 mapping, no random)
const BUST_TO_ART: Record<string, string> = {
  GROOBAS: ART.groobas,
  XIAOXING: ART.xiaoxing,
  "GENERIC-1": ART.generic1,
  "GENERIC-2": ART.generic2,
  "GENERIC-3": ART.generic3,
};

// Visible trait pools by role
const ROLE_VISIBLE_TRAITS: Record<string, TraitId[]> = {
  TANK: ["tough", "team_player", "cancer", "shield_wall", "mentor", "glass_heart", "compliance"],
  DPS: ["lone_wolf", "team_player", "cancer", "tough", "precision", "overtime_ready", "glass_heart"],
  RANGE: ["team_player", "glass", "lone_wolf", "precision", "overtime_ready", "mentor", "compliance"],
};

function generateCandidateFromBust(bustKey: string, usedIntros: Set<string>): ResumeCandidate {
  const bust = BUST_CANDIDATES[bustKey];
  const role = bust.role;
  const race = bust.race;

  // Name generation
  let name: string;
  if (bust.is_named_character && bust.canonical_name_locked) {
    name = `${bust.canonical_name_locked}·${NAME_POOL.race_suffix[race] || race}`;
  } else {
    const prefixes = NAME_POOL.prefix_pool[race] || ["无名"];
    const prefix = pick(prefixes);
    name = `${prefix}·${NAME_POOL.race_suffix[race] || race}`;
  }

  // Stats with ±15% float
  const base = ROLE_BASE_STATS[role];
  const hp = floatVal(base.hp);
  const atk = floatVal(base.atk);
  const speed = floatVal(base.speed);
  const critRate = Math.round((base.critRate * (1 + rand(-0.15, 0.15))) * 100) / 100;
  const salary = Math.max(1, Math.round(base.salary * (1 + rand(-BALANCE.SALARY_FLOAT, BALANCE.SALARY_FLOAT))));

  // Visible traits: pick 2 from role pool
  const pool = [...ROLE_VISIBLE_TRAITS[role]];
  const traitsVisible: TraitId[] = [];
  const visCount = 2;
  for (let i = 0; i < visCount && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    traitsVisible.push(pool.splice(idx, 1)[0]);
  }

  // Hidden trait
  const hiddenCandidates = HIDDEN_TRAIT_POOL.filter((t) => !traitsVisible.includes(t));
  const traitHidden = Math.random() < 0.7 ? pick(hiddenCandidates) : null;

  // Inner thought — draw without replacement
  let personalNote = "";
  const availableIntros = NAME_POOL.self_intro_pool.lines.filter((l) => !usedIntros.has(l));
  if (availableIntros.length > 0) {
    personalNote = pick(availableIntros);
    usedIntros.add(personalNote);
  } else {
    personalNote = pick(NAME_POOL.self_intro_pool.lines);
  }

  // Art for battle (small icon) — use bust-specific art (1:1 mapping)
  const artUrl = BUST_TO_ART[bustKey] || ART.generic1;

  return {
    id: uid("resume"),
    name,
    species: bust.race_en,
    template: ROLE_TO_TEMPLATE[role],
    artUrl,
    bustAsset: bustPublicPath(bust),
    position: bust.applied_position,
    tenureYears: randInt(2, 12),
    performanceRecord: pick(RESUME_DATA.performance),
    salaryExpectation: pick(RESUME_DATA.salaryExpectation),
    personalNote,
    hp,
    atk,
    speed,
    critRate,
    salary,
    traitsVisible,
    traitHidden,
  };
}

// Generate resume pool with BUST-first logic
// levelId: current level for unlock rules (L01 guarantees GROOBAS, L02+ unlocks XIAOXING)
export function generateResumePool(n = 3, levelId?: string): ResumeCandidate[] {
  const usedIntros = new Set<string>();
  const availableBusts = [...BUST_KEYS];

  // Unlock rules
  const isL01 = levelId === "L01";
  const isL02Plus = !isL01;

  // If not L02+, remove XIAOXING from pool
  if (!isL02Plus) {
    const xiIdx = availableBusts.indexOf("XIAOXING");
    if (xiIdx >= 0) availableBusts.splice(xiIdx, 1);
  }

  // Draw n unique BUSTs
  const drawn: string[] = [];

  // L01: guarantee GROOBAS appears
  if (isL01 && availableBusts.includes("GROOBAS")) {
    drawn.push("GROOBAS");
    const gIdx = availableBusts.indexOf("GROOBAS");
    availableBusts.splice(gIdx, 1);
  }

  // Fill remaining slots
  while (drawn.length < n && availableBusts.length > 0) {
    const idx = Math.floor(Math.random() * availableBusts.length);
    drawn.push(availableBusts.splice(idx, 1)[0]);
  }

  // If still not enough (shouldn't happen with 5 busts), allow repeats
  while (drawn.length < n) {
    drawn.push(pick(BUST_KEYS));
  }

  return drawn.map((bustKey) => generateCandidateFromBust(bustKey, usedIntros));
}

// Legacy single resume generation (fallback)
export function generateResume(): ResumeCandidate {
  return generateResumePool(1)[0];
}

// 简历转为正式怪物（应用 tough 词条 HP 加成在入职时计算 hpMax）
export function resumeToMonster(r: ResumeCandidate): Monster {
  let hpMax = r.hp;
  if (r.traitsVisible.includes("tough") || r.traitHidden === "tough") {
    hpMax = Math.round(hpMax * 1.2);
  }
  // cheap_skate: 薪水×0.95
  let salary = r.salary;
  if (r.traitsVisible.includes("cheap_skate") || r.traitHidden === "cheap_skate") {
    salary = Math.round(salary * 0.95);
  }

  const m: Monster = {
    id: uid("monster"),
    name: r.name,
    species: r.species,
    template: r.template,
    role: r.position,
    advancedClass: null,
    artUrl: r.artUrl,
    bustAsset: r.bustAsset, // bust portrait for monster slot display
    baseHpMax: r.hp,
    baseAtk: r.atk,
    hp: hpMax,
    hpMax,
    atk: r.atk,
    speed: r.speed,
    critRate: r.critRate,
    level: 1,
    battlesSurvived: 0,
    salary,
    traitsVisible: r.traitsVisible,
    traitHidden: r.traitHidden,
    traitHiddenRevealed: false,
    runtimeTraits: [],
    personalNote: r.personalNote,
    state: "active",
    hasFoughtOnce: false,
    bonusAtkMult: 1.0,
    receivedBonusThisBattle: false,
    tempAtkMult: 1,
    skipNextRound: false,
    nextRoundAtkPct: 0,
    slackerBattlesLeft: 0,
    personalGoal: pick(PERSONAL_GOALS),
    goalCompleted: false,
    careerDamage: 0,
    damageDealt: 0,
    hits: 0,
    attempts: 0,
    noDamageStreak: 0,
  };
  return m;
}

// 创建勇者实例
export function createHero(heroId: string): Hero {
  const def = HEROES[heroId];
  return {
    ...def,
    hpMax: def.hp,
    atkPctThisRound: 0,
    atkPctNextRound: 0,
    forcedSkip: false,
    hasCritOnce: false,
    skills: def.skills ?? [],
    regenCounter: 0,
    awakened: false,
    awakeningRoundsLeft: 0,
    friendshipActive: false,
    revived: false,
    itemUsesLeft: Math.random() < 0.5 ? 1 : 2, // 每场 1-2 次
    ultimateUsed: false,
  };
}

// ─── 转职系统 ───
export function getJobChangeOptions(m: Monster): [JobChangeOption, JobChangeOption] | null {
  if (m.advancedClass !== null) return null; // 已转职
  if (m.state !== "active") return null;
  return JOB_CHANGE_OPTIONS[m.template] ?? null;
}

export function applyJobChange(m: Monster, option: JobChangeOption): Monster {
  m.advancedClass = option.advancedClass;
  // 应用数值修改
  const { hpPct, atkPct, critDelta, speedDelta } = option.statMods;
  if (hpPct) {
    m.baseHpMax = Math.round(m.baseHpMax * (1 + hpPct));
    m.hpMax = Math.round(m.hpMax * (1 + hpPct));
    m.hp = Math.round(m.hp * (1 + hpPct));
  }
  if (atkPct) {
    m.baseAtk = Math.round(m.baseAtk * (1 + atkPct));
    m.atk = Math.round(m.atk * (1 + atkPct));
  }
  if (critDelta) {
    m.critRate = Math.min(0.5, m.critRate + critDelta);
  }
  if (speedDelta) {
    m.speed = Math.max(1, m.speed + speedDelta);
  }
  return m;
}

export function applyHeroVariant(hero: Hero, variant?: HeroVariant): Hero {
  if (!variant) return hero;
  const hpMax = Math.max(1, Math.round(hero.hpMax * variant.hpMult));
  return {
    ...hero,
    name: `${hero.name}·${variant.title}`,
    hp: hpMax,
    hpMax,
    atk: Math.max(1, Math.round(hero.atk * variant.atkMult)),
    critRate: Math.max(0, Math.min(0.5, Math.round((hero.critRate + variant.critDelta) * 100) / 100)),
  };
}

export function randomHeroVariant(levelId: string): HeroVariant | undefined {
  if (["L01", "L02", "L03"].includes(levelId)) return undefined;
  return pick(HERO_VARIANTS);
}

// 全部怪物的所有词条（可见 + 已揭示隐藏 + 运行期）
export function allActiveTraits(m: Monster): TraitId[] {
  const ts: TraitId[] = [...m.traitsVisible, ...m.runtimeTraits];
  if (m.traitHiddenRevealed && m.traitHidden) ts.push(m.traitHidden);
  return ts;
}

// 计算单个怪物的有效 ATK（含词条/奖金/临时效果/队伍协作/消极怠工）
export function effectiveAtk(m: Monster, team: Monster[], hero?: Hero, round = 1): number {
  let atk = m.atk;
  const traits = allActiveTraits(m);

  // 奖金倍率（社恐减半效果）
  let bonusMult = m.bonusAtkMult;
  if (traits.includes("lone_wolf") && bonusMult > 1) {
    // 减半奖金增益部分
    bonusMult = 1 + (bonusMult - 1) * 0.5;
  }
  atk *= bonusMult;

  // 团队协作/毒瘤：来自队伍其他怪物
  let teamPct = 0;
  for (const other of team) {
    if (other.id === m.id || other.state === "dead") continue;
    const ot = allActiveTraits(other);
    if (ot.includes("team_player")) teamPct += 0.05;
    if (ot.includes("cancer")) teamPct -= 0.1;
  }
  atk *= 1 + teamPct;

  // 末位淘汰恐惧：HP<30% 时 ATK +15%
  if (traits.includes("nostalgic") && m.hp / m.hpMax < 0.3) atk *= 1.15;

  // 带新人：队伍人数≥2 时自身 ATK +8%
  if (traits.includes("mentor") && team.filter((tm) => tm.state !== "dead" && tm.state !== "quit").length >= 2) {
    atk *= 1.08;
  }

  // 自愿加班：第 3 回合起 ATK +12%
  if (traits.includes("overtime_ready") && round >= 3) atk *= 1.12;

  // 合规意识：未领取奖金时 ATK +6%
  if (traits.includes("compliance") && m.bonusAtkMult <= 1) atk *= 1.06;

  // 夜班熟手：勇者半血后 ATK +10%
  if (traits.includes("night_shift") && hero && hero.hp / hero.hpMax < 0.5) atk *= 1.1;

  // 越打越顺：每次命中后本场 ATK 小幅提升，最多 +15%
  if (traits.includes("battle_trance") && m.hits > 0) atk *= 1 + Math.min(0.15, m.hits * 0.03);

  // 隐性摆烂：连续两回合未造成伤害后 ATK -10%
  if (traits.includes("quiet_quitter") && m.noDamageStreak >= 2) atk *= 0.9;

  // 消极怠工
  if (m.slackerBattlesLeft > 0) {
    // 当前场是第一场还是后续场
    if (m.slackerBattlesLeft >= 2) {
      // 本场（刚触发的那场）
      atk *= BALANCE.SLACKER_THIS_BATTLE_MULT;
    } else {
      // 下场（持续1场）
      atk *= BALANCE.SLACKER_NEXT_BATTLE_MULT;
    }
  }

  // 合同未签：本场 ATK +10%
  if (traits.includes("contract_pending")) atk *= 1.1;

  // 精英克星：面对精英级勇者时自身攻击 +20%
  if (traits.includes("glass") && hero && ["HERO_ELITE", "HERO_ELITE_2", "HERO_FINAL"].includes(hero.id)) {
    atk *= 1.2;
  }

  // 事件临时倍率 / 本回合加成
  atk *= m.tempAtkMult;
  atk *= 1 + m.nextRoundAtkPct;

  return atk;
}

function fillTemplate(tpl: string, m: string, x: number, atk?: string, def?: string): string {
  return tpl
    .replace("{m}", m)
    .replace("{x}", String(x))
    .replace("{atk}", atk ?? m)
    .replace("{def}", def ?? m);
}

export type HeroMechanismType = "awakening" | "friendship" | "item_potion" | "item_scroll" | "item_shield" | "sabotage" | "ultimate_execute" | "ultimate_aoe" | "resurrect";

// 延迟执行的机制参数（卡片展示后再执行）
export interface DeferredMechanism {
  type: HeroMechanismType;
  targetName: string;
  // 具体参数
  healAmount?: number; // item_potion
  atkBoost?: number; // item_scroll
  sabotageTargetId?: string; // sabotage
  executeTargetId?: string; // ultimate_execute
  aoeDmg?: number; // ultimate_aoe
}

export interface RoundResult {
  logs: { text: string; kind: "monster" | "hero" | "crit" | "death" }[];
  monstersDeadThisRound: string[];
  heroCritThisRound: boolean;
  heroMechanismTriggered: HeroMechanismType | null;
  mechanismTargetName?: string;
  deferredMechanism?: DeferredMechanism;
}

// 执行一个 ROUND_TICK 的演算，直接修改 monsters / hero
// deferFirstMechanism: 若为 true，第一个触发的机制不执行效果，仅记录参数供卡片展示后执行
export function runRoundTick(
  monsters: Monster[],
  hero: Hero,
  opts: { round?: number; deferFirstMechanism?: boolean } = {}
): RoundResult {
  const logs: RoundResult["logs"] = [];
  const monstersDeadThisRound: string[] = [];
  let heroCritThisRound = false;
  let heroMechanismTriggered: HeroMechanismType | null = null;
  let mechanismTargetName: string | undefined;
  let deferredMechanism: DeferredMechanism | undefined;
  const deferFirst = opts.deferFirstMechanism ?? false;
  const alive = () => monsters.filter((m) => m.state !== "dead" && m.state !== "quit");

  // ── 勇者回血技能（regen）：每 3 回合恢复 5% maxHP ──
  if (hero.skills.includes("regen")) {
    hero.regenCounter += 1;
    if (hero.regenCounter >= 3) {
      hero.regenCounter = 0;
      const heal = Math.round(hero.hpMax * 0.05);
      hero.hp = Math.min(hero.hpMax, hero.hp + heal);
      logs.push({ text: `${hero.name} 恢复了 ${heal} 点生命值（回血技能）。`, kind: "hero" });
    }
  }

  // ── 勇者觉醒：HP<30% 时一次性爆发，攻击翻倍 2 回合 ──
  if (hero.skills.includes("awakening") && !hero.awakened && hero.hp > 0 && hero.hp / hero.hpMax < 0.3) {
    if (!heroMechanismTriggered && deferFirst) {
      // 延迟执行：仅标记，不执行效果
      heroMechanismTriggered = "awakening";
      mechanismTargetName = hero.name;
      deferredMechanism = { type: "awakening", targetName: hero.name };
      // 不设置 awakened/awakeningRoundsLeft，等卡片选择后执行
    } else {
      hero.awakened = true;
      hero.awakeningRoundsLeft = 2;
      if (!heroMechanismTriggered) { heroMechanismTriggered = "awakening"; mechanismTargetName = hero.name; }
      logs.push({ text: `💥 ${hero.name} 觉醒了！怒火中烧，攻击力翻倍持续 2 回合！`, kind: "hero" });
    }
  }
  // 觉醒倍率应用（在攻击计算前设置）
  if (hero.awakeningRoundsLeft > 0) {
    hero.atkPctThisRound += 1.0; // +100% = 翻倍
    hero.awakeningRoundsLeft -= 1;
  }

  // ── 友谊之力：每回合 20% 概率暴击率翻倍 1 回合 ──
  hero.friendshipActive = false;
  if (hero.skills.includes("friendship") && Math.random() < HERO_SKILLS.friendship.chance) {
    if (!heroMechanismTriggered && deferFirst) {
      heroMechanismTriggered = "friendship";
      mechanismTargetName = hero.name;
      deferredMechanism = { type: "friendship", targetName: hero.name };
      // 不设置 friendshipActive，等卡片选择后执行
    } else {
      hero.friendshipActive = true;
      if (!heroMechanismTriggered) { heroMechanismTriggered = "friendship"; mechanismTargetName = hero.name; }
      logs.push({ text: `✨ ${hero.name} 感受到了友谊之力！本回合暴击率大幅提升！`, kind: "hero" });
    }
  }

  // ── 勇者道具：随机使用道具 ──
  if (hero.skills.includes("item") && hero.itemUsesLeft > 0 && Math.random() < HERO_SKILLS.item.chance) {
    hero.itemUsesLeft -= 1;
    const itemRoll = Math.random();
    if (itemRoll < 0.33) {
      // 回血药水：恢复 15% HP
      const heal = Math.round(hero.hpMax * 0.15);
      if (!heroMechanismTriggered && deferFirst) {
        heroMechanismTriggered = "item_potion";
        mechanismTargetName = hero.name;
        deferredMechanism = { type: "item_potion", targetName: hero.name, healAmount: heal };
      } else {
        hero.hp = Math.min(hero.hpMax, hero.hp + heal);
        if (!heroMechanismTriggered) { heroMechanismTriggered = "item_potion"; mechanismTargetName = hero.name; }
        logs.push({ text: `🧪 ${hero.name} 使用了回血药水，恢复 ${heal} 点生命值！`, kind: "hero" });
      }
    } else if (itemRoll < 0.66) {
      // 攻击卷轴：本回合攻击 +30%
      if (!heroMechanismTriggered && deferFirst) {
        heroMechanismTriggered = "item_scroll";
        mechanismTargetName = hero.name;
        deferredMechanism = { type: "item_scroll", targetName: hero.name, atkBoost: 0.3 };
      } else {
        hero.atkPctThisRound += 0.3;
        if (!heroMechanismTriggered) { heroMechanismTriggered = "item_scroll"; mechanismTargetName = hero.name; }
        logs.push({ text: `📜 ${hero.name} 使用了攻击卷轴，本回合攻击力 +30%！`, kind: "hero" });
      }
    } else {
      // 护盾：本回合受到伤害减半
      if (!heroMechanismTriggered && deferFirst) {
        heroMechanismTriggered = "item_shield";
        mechanismTargetName = hero.name;
        deferredMechanism = { type: "item_shield", targetName: hero.name };
      } else {
        (hero as Hero & { shieldActive?: boolean }).shieldActive = true;
        if (!heroMechanismTriggered) { heroMechanismTriggered = "item_shield"; mechanismTargetName = hero.name; }
        logs.push({ text: `🛡️ ${hero.name} 使用了防御护盾，本回合受到伤害减半！`, kind: "hero" });
      }
    }
  }

  // ── 策反：对消极怠工怪物 30% 概率使其本回合不攻击 ──
  if (hero.skills.includes("sabotage")) {
    for (const m of alive()) {
      if (m.state === "negative" && !allActiveTraits(m).includes("loyalty") && Math.random() < HERO_SKILLS.sabotage.chance) {
        if (!heroMechanismTriggered && deferFirst) {
          heroMechanismTriggered = "sabotage";
          mechanismTargetName = m.name;
          deferredMechanism = { type: "sabotage", targetName: m.name, sabotageTargetId: m.id };
        } else {
          m.skipNextRound = true;
          if (!heroMechanismTriggered) { heroMechanismTriggered = "sabotage"; mechanismTargetName = m.name; }
          logs.push({ text: `🗣️ ${hero.name} 策反了 ${m.name}！"你们老板根本不在乎你！" ${m.name} 本回合拒绝攻击。`, kind: "hero" });
        }
      }
    }
  }

  // ── 怪物方攻击勇者 ──
  let monsterTotal = 0;
  for (const m of alive()) {
    if (m.skipNextRound) {
      m.skipNextRound = false;
      continue;
    }
    m.attempts += 1;
    // Miss
    if (Math.random() < BALANCE.BASE_MISS_RATE) {
      logs.push({ text: fillTemplate(pick(BATTLE_LOG_TEMPLATES.monsterMiss), m.name, 0), kind: "monster" });
      m.noDamageStreak += 1;
      continue;
    }
    let dmg = effectiveAtk(m, monsters, hero, opts.round ?? 1) * rand(0.9, 1.1);
    // 怪物独立暴击
    const traits = allActiveTraits(m);
    const critRate = traits.includes("precision") ? Math.min(0.5, m.critRate + 0.05) : m.critRate;
    const isCrit = Math.random() < critRate;
    if (isCrit) dmg *= BALANCE.CRIT_MULT;
    dmg = Math.max(1, Math.round(dmg));
    // 勇者格挡技能（block）：概率减免 50% 伤害
    if (hero.skills.includes("block") && Math.random() < HERO_SKILLS.block.chance) {
      dmg = Math.round(dmg * 0.5);
      logs.push({ text: `${hero.name} 格挡了 ${m.name} 的攻击，伤害减半！`, kind: "hero" });
    }
    monsterTotal += dmg;
    m.damageDealt += dmg;
    m.hits += 1;
    m.noDamageStreak = 0;
    if (isCrit) {
      logs.push({ text: fillTemplate(pick(BATTLE_LOG_TEMPLATES.crit), m.name, dmg, m.name, hero.name), kind: "crit" });
    } else {
      logs.push({ text: fillTemplate(pick(BATTLE_LOG_TEMPLATES.monsterHit), m.name, dmg), kind: "monster" });
    }
  }
  // 护盾效果：本回合受到伤害减半
  if ((hero as Hero & { shieldActive?: boolean }).shieldActive) {
    monsterTotal = Math.round(monsterTotal * 0.5);
    (hero as Hero & { shieldActive?: boolean }).shieldActive = false;
  }
  hero.hp = Math.max(0, hero.hp - monsterTotal);
  // 清理本回合加成
  for (const m of monsters) {
    m.nextRoundAtkPct = 0;
    m.tempAtkMult = 1;
  }

  // ── 勇者必杀技：HP<50% 时一次机会 ──
  if (hero.skills.includes("ultimate") && !hero.ultimateUsed && hero.hp > 0 && hero.hp / hero.hpMax < 0.5) {
    hero.ultimateUsed = true;
    const livingMonsters = alive();
    // 尝试秒杀最低 HP 且 HP<20% 的怪物
    const lowHpMonster = livingMonsters
      .filter((m) => m.hp / m.hpMax < 0.2)
      .sort((a, b) => a.hp - b.hp)[0];
    if (lowHpMonster) {
      if (!heroMechanismTriggered && deferFirst) {
        heroMechanismTriggered = "ultimate_execute";
        mechanismTargetName = lowHpMonster.name;
        deferredMechanism = { type: "ultimate_execute", targetName: lowHpMonster.name, executeTargetId: lowHpMonster.id };
      } else {
        lowHpMonster.hp = 0;
        lowHpMonster.state = "dead";
        monstersDeadThisRound.push(lowHpMonster.id);
        if (!heroMechanismTriggered) { heroMechanismTriggered = "ultimate_execute"; mechanismTargetName = lowHpMonster.name; }
        logs.push({ text: `⚡ ${hero.name} 发动必杀技——「审判之剑」！直接斩杀了 ${lowHpMonster.name}！`, kind: "hero" });
      }
    } else {
      // 全屏 AOE：ATK×0.6 对全体
      const aoeDmg = Math.round(hero.atk * 0.6);
      if (!heroMechanismTriggered && deferFirst) {
        heroMechanismTriggered = "ultimate_aoe";
        mechanismTargetName = hero.name;
        deferredMechanism = { type: "ultimate_aoe", targetName: hero.name, aoeDmg };
      } else {
        for (const m of livingMonsters) {
          m.hp = Math.max(0, m.hp - aoeDmg);
        }
        if (!heroMechanismTriggered) { heroMechanismTriggered = "ultimate_aoe"; mechanismTargetName = hero.name; }
        logs.push({ text: `⚡ ${hero.name} 发动必杀技——「圣光爆裂」！对全体怪物造成 ${aoeDmg} 点伤害！`, kind: "hero" });
      }
    }
  }

  // ── 勇者复活：精英勇者死后 40% 概率以 50%HP 复活一次 ──
  if (hero.hp <= 0 && hero.skills.includes("revive") && !hero.revived && Math.random() < HERO_SKILLS.revive.chance) {
    if (!heroMechanismTriggered && deferFirst) {
      hero.revived = true; // 标记已用复活（防止重复触发）
      heroMechanismTriggered = "resurrect";
      mechanismTargetName = hero.name;
      deferredMechanism = { type: "resurrect", targetName: hero.name, healAmount: Math.round(hero.hpMax * 0.5) };
      // 不恢复HP，等卡片选择后执行
    } else {
      hero.revived = true;
      hero.hp = Math.round(hero.hpMax * 0.5);
      heroMechanismTriggered = "resurrect";
      mechanismTargetName = hero.name;
      logs.push({ text: `🌟 ${hero.name} 倒下了……但奇迹发生了！不屈的意志使其以半血复活！`, kind: "hero" });
    }
  }

  if (hero.hp <= 0) return { logs, monstersDeadThisRound, heroCritThisRound, heroMechanismTriggered, mechanismTargetName, deferredMechanism };

  // ── 勇者攻击怪物方 ──
  if (hero.forcedSkip) {
    hero.forcedSkip = false;
    logs.push({ text: `${hero.name} 被迫暂停了攻击。`, kind: "hero" });
  } else {
    const heroAtk = hero.atk * (1 + hero.atkPctThisRound);
    hero.atkPctThisRound = hero.atkPctNextRound;
    hero.atkPctNextRound = 0;

    if (Math.random() < BALANCE.BASE_MISS_RATE) {
      const t = alive()[0];
      logs.push({ text: fillTemplate(pick(BATTLE_LOG_TEMPLATES.heroMiss), t ? t.name : "怪物", 0), kind: "hero" });
    } else {
      let heroDmg = heroAtk * rand(0.9, 1.1);
      const effectiveCritRate = hero.friendshipActive ? Math.min(1, hero.critRate * 2) : hero.critRate;
      const isCrit = Math.random() < effectiveCritRate;
      if (isCrit) {
        heroDmg *= BALANCE.CRIT_MULT;
        if (!hero.hasCritOnce) {
          hero.hasCritOnce = true;
          heroCritThisRound = true;
        }
      }
      heroDmg = Math.max(1, Math.round(heroDmg));

      // 嘲讽机制（方案B）：有 TANK 时，TANK 吸收 60% 伤害（重装骑士 70%），其余平分剩余
      const livingMonsters = alive();
      const tanks = livingMonsters.filter((m) => m.template === "MON_TANK");
      const nonTanks = livingMonsters.filter((m) => m.template !== "MON_TANK");
      const hasTaunt = tanks.length > 0 && nonTanks.length > 0;

      // 计算每个怪物的基础伤害份额
      const shareMap = new Map<string, number>();
      if (hasTaunt) {
        // 重装骑士吸收 70%，普通 TANK 吸收 60%
        const hasHeavyArmor = tanks.some((t) => t.advancedClass === "HEAVY_ARMOR");
        const absorbRatio = hasHeavyArmor ? 0.7 : BALANCE.TAUNT_ABSORB_RATIO;
        const tankShare = Math.round(heroDmg * absorbRatio);
        const nonTankShare = heroDmg - tankShare;
        const perTank = Math.round(tankShare / tanks.length);
        const perNonTank = nonTanks.length > 0 ? Math.round(nonTankShare / nonTanks.length) : 0;
        for (const t of tanks) shareMap.set(t.id, perTank);
        for (const nt of nonTanks) shareMap.set(nt.id, perNonTank);
      } else {
        // 无嘲讽：按 HP 比例分配
        const totalHp = livingMonsters.reduce((s, m) => s + m.hp, 0) || 1;
        for (const m of livingMonsters) {
          shareMap.set(m.id, Math.round((m.hp / totalHp) * heroDmg));
        }
      }

      for (const m of livingMonsters) {
        let share = shareMap.get(m.id) ?? 0;
        const traits = allActiveTraits(m);
        // 精英克星：面对精英级勇者时受到伤害 ×1.5
        if (traits.includes("glass") && ["HERO_ELITE", "HERO_ELITE_2", "HERO_FINAL"].includes(hero.id)) share = Math.round(share * 1.5);
        // 前排意识：稳定减伤；玻璃心：受到暴击伤害增加
        if (traits.includes("shield_wall")) share = Math.round(share * 0.88);
        if (isCrit && traits.includes("glass_heart")) share = Math.round(share * 1.25);

        m.hp = Math.max(0, m.hp - share);
        if (isCrit) {
          logs.push({ text: fillTemplate(pick(BATTLE_LOG_TEMPLATES.crit), m.name, share, hero.name, m.name), kind: "crit" });
        } else {
          logs.push({ text: fillTemplate(pick(BATTLE_LOG_TEMPLATES.heroHit), m.name, share), kind: "hero" });
        }
      }
    }
  }

  // ── 勇者群攻技能（cleave）：概率对全体怪物造成 ATK×0.4 伤害（不走嘲讽分摊） ──
  if (hero.skills.includes("cleave") && !hero.forcedSkip && Math.random() < HERO_SKILLS.cleave.chance) {
    const cleaveDmg = Math.round(hero.atk * 0.4);
    for (const m of alive()) {
      m.hp = Math.max(0, m.hp - cleaveDmg);
    }
    logs.push({ text: `${hero.name} 发动群攻！对全体怪物造成 ${cleaveDmg} 点伤害！`, kind: "hero" });
  }

  // ── 战术法师光环（MAGE aura）：队伍全体 ATK+5% ──
  const hasMageAura = alive().some((m) => m.advancedClass === "MAGE");
  if (hasMageAura) {
    for (const m of alive()) {
      m.tempAtkMult = Math.max(m.tempAtkMult, 1.05);
    }
  }

  // ── 结算阵亡 ──
  for (const m of monsters) {
    if (m.state !== "dead" && m.hp <= 0) {
      m.state = "dead";
      m.hp = 0;
      monstersDeadThisRound.push(m.id);
      logs.push({ text: fillTemplate(pick(BATTLE_LOG_TEMPLATES.death), m.name, 0), kind: "death" });
    }
  }

  return { logs, monstersDeadThisRound, heroCritThisRound, heroMechanismTriggered, mechanismTargetName };
}

// EVAL：抚恤金（salary × 3 + 5）
export function calcPension(m: Monster): number {
  return m.salary * BALANCE.PENSION_MULT + BALANCE.PENSION_FLAT;
}

// 升级条件：存活且本场有效造成伤害
export function checkLevelUp(m: Monster): boolean {
  return m.state === "active" && m.damageDealt > 0 && m.level < BALANCE.LEVELUP_MAX;
}

// 应用升级：HP×(1+0.15×level), ATK×(1+0.12×level), CRIT+0.02×level
export function applyLevelUp(m: Monster) {
  m.level += 1;
  const lv = m.level;
  m.atk = Math.round(m.baseAtk * (1 + BALANCE.LEVELUP_ATK_PER_LV * lv));
  const newMax = Math.round(m.baseHpMax * (1 + BALANCE.LEVELUP_HP_PER_LV * lv));
  m.hpMax = newMax;
  m.hp = newMax;
  m.critRate = Math.min(BALANCE.LEVELUP_CRIT_CAP, m.critRate + BALANCE.LEVELUP_CRIT_PER_LV);
}

// 通关绩效提成
export function calcRewardOnClear(surviveCount: number, totalDamage: number): RewardBreakdown {
  const completionBase = BALANCE.COMPLETION_BASE;
  const surviveReward = BALANCE.SURVIVE_REWARD * surviveCount;
  const dpsReward = BALANCE.DPS_REWARD * Math.floor(totalDamage / BALANCE.DPS_UNIT);
  const total = completionBase + surviveReward + dpsReward;
  return {
    completionBase,
    surviveReward,
    surviveCount,
    dpsReward,
    totalDamage,
    total,
  };
}

// 奖金应用（三档）
export function applyBonusTier(_tier: BonusTier, m: Monster, atkMult: number) {
  // 奖金倍率直接覆盖（不叠加，取最大值）
  m.bonusAtkMult = Math.max(m.bonusAtkMult, atkMult);
}

// 结局判定
export function decideEnding(
  shards: number,
  aliveCount: number,
  reason: "win" | "wipe" | "bankrupt"
): string {
  if (reason === "bankrupt") return "E04";
  if (reason === "wipe") return "E03";
  // win
  if (aliveCount >= 1 && shards > BALANCE.SAFE_LINE) return "E01";
  return "E02";
}
