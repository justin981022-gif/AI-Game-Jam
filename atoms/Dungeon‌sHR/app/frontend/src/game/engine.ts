// 引擎层：随机生成、战斗演算、招募、EVAL、词条效果
import {
  ART,
  BALANCE,
  BATTLE_LOG_TEMPLATES,
  HEROES,
  HERO_VARIANTS,
  HIDDEN_TRAIT_POOL,
  MONSTER_TEMPLATES,
  PERSONAL_GOALS,
  RESUME_DATA,
  TRAITS,
} from "./data";
import type { BonusTier, Hero, HeroVariant, Monster, MonsterTemplate, ResumeCandidate, RewardBreakdown, TraitId } from "./types";
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

// Role → monster art (for battle display, not bust)
const ROLE_ART: Record<string, string[]> = {
  TANK: [ART.groobas, ART.generic3],
  DPS: [ART.generic1],
  RANGE: [ART.xiaoxing, ART.generic2],
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

  // Art for battle (small icon) — pick from role art
  const artOptions = ROLE_ART[role];
  const artUrl = pick(artOptions);

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
    artUrl: r.artUrl, // battle icon art
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
  };
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

export interface RoundResult {
  logs: { text: string; kind: "monster" | "hero" | "crit" | "death" }[];
  monstersDeadThisRound: string[];
  heroCritThisRound: boolean;
}

// 执行一个 ROUND_TICK 的演算，直接修改 monsters / hero
export function runRoundTick(
  monsters: Monster[],
  hero: Hero,
  opts: { round?: number } = {}
): RoundResult {
  const logs: RoundResult["logs"] = [];
  const monstersDeadThisRound: string[] = [];
  let heroCritThisRound = false;
  const alive = () => monsters.filter((m) => m.state !== "dead" && m.state !== "quit");

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
  hero.hp = Math.max(0, hero.hp - monsterTotal);
  // 清理本回合加成
  for (const m of monsters) {
    m.nextRoundAtkPct = 0;
    m.tempAtkMult = 1;
  }

  if (hero.hp <= 0) return { logs, monstersDeadThisRound, heroCritThisRound };

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
      const isCrit = Math.random() < hero.critRate;
      if (isCrit) {
        heroDmg *= BALANCE.CRIT_MULT;
        if (!hero.hasCritOnce) {
          hero.hasCritOnce = true;
          heroCritThisRound = true;
        }
      }
      heroDmg = Math.max(1, Math.round(heroDmg));

      // 按 HP 比例分配伤害到怪物队
      const livingMonsters = alive();
      const totalHp = livingMonsters.reduce((s, m) => s + m.hp, 0) || 1;
      for (const m of livingMonsters) {
        let share = Math.round((m.hp / totalHp) * heroDmg);
        const traits = allActiveTraits(m);
        // 易燃体质：火焰勇者伤害 ×2（精英视为火焰）
        if (traits.includes("glass") && hero.critRate >= 0.18) share = Math.round(share * 2);
        // 前排意识：稳定减伤；玻璃心：受到暴击伤害增加
        if (traits.includes("shield_wall")) share = Math.round(share * 0.88);
        if (isCrit && traits.includes("glass_heart")) share = Math.round(share * 1.25);

        // L03 强制阵亡已移至 tick 层脚本（v0.5），此处不再做伤害倍率

        m.hp = Math.max(0, m.hp - share);
        if (isCrit) {
          logs.push({ text: fillTemplate(pick(BATTLE_LOG_TEMPLATES.crit), m.name, share, hero.name, m.name), kind: "crit" });
        } else {
          logs.push({ text: fillTemplate(pick(BATTLE_LOG_TEMPLATES.heroHit), m.name, share), kind: "hero" });
        }
      }
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

  return { logs, monstersDeadThisRound, heroCritThisRound };
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
