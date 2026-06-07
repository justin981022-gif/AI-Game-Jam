// 状态管理 hook：驱动 UI 的核心状态机
import { useCallback, useEffect, useRef, useState } from "react";
import { BALANCE, BONUS_TIERS, EVENTS, LEVELS, TRAITS } from "./data";
import {
  allActiveTraits,
  applyBonusTier,
  applyLevelUp,
  calcPension,
  calcRewardOnClear,
  checkLevelUp,
  createHero,
  decideEnding,
  generateResumePool,
  pick,
  resumeToMonster,
  runRoundTick,
} from "./engine";
import type {
  BonusTier,
  BonusTierDef,
  GameEvent,
  GameState,
  Hero,
  LogEntry,
  Monster,
  NegotiateRequest,
  PendingEvent,
  ResumeCandidate,
  RewardBreakdown,
  TraitId,
  TriggerText,
} from "./types";
import { TRIGGERS } from "./data";

export interface ToastMsg {
  id: number;
  text: string;
}

export interface EvalView {
  survived: Monster[];
  dead: Monster[];
  pensionPaid: number;
  leveledUp: string[];
  reward: RewardBreakdown;
}

export interface UseGameApi {
  // 核心状态
  gameState: GameState;
  levelIndex: number;
  levelId: string;
  levelTitle: string;
  shards: number;
  ap: number;
  apMax: number;
  slots: number;
  monsters: Monster[];
  hero: Hero | null;
  logs: LogEntry[];
  battleEnded: "win" | "lose" | null;
  speed: number;
  economyWarning: boolean;
  // 弹窗 / 触发
  storyText: TriggerText | null;
  recruitOpen: boolean;
  resumePool: ResumeCandidate[];
  resumeShowHint: boolean;
  recruitRefreshLeft: number;
  refreshRecruitPool: () => void;
  bonusOpen: boolean;
  pendingEvent: PendingEvent | null;
  eventTimeLeft: number;
  eventIsTutorial: boolean;
  negotiate: NegotiateRequest | null;
  evalOpen: boolean;
  evalData: EvalView | null;
  dismissOpen: boolean;
  endingId: string | null;
  gameOverId: string | null;
  toasts: ToastMsg[];
  // 动作
  startGame: () => void;
  closeStory: () => void;
  advanceLevel: () => void;
  openRecruit: () => void;
  closeRecruit: () => void;
  chooseResume: (r: ResumeCandidate) => void;
  doBuild: () => void;
  openBonus: () => void;
  closeBonus: () => void;
  applyBonus: (monsterId: string, tier: BonusTier) => void;
  doLabor: () => void;
  startBattle: () => void;
  toggleSpeed: () => void;
  chooseEventOption: (idx: 0 | 1) => void;
  proceedEval: () => void;
  openDismiss: () => void;
  closeDismiss: () => void;
  dismissMonster: (monsterId: string) => void;
  answerNegotiate: (approve: boolean) => void;
  restart: () => void;
  canBuild: boolean;
  buildCost: number;
}

const lastLevelIdx = LEVELS.length - 1; // L07

export function useGame(): UseGameApi {
  const [gameState, setGameState] = useState<GameState>("GAME_INIT");
  const [levelIndex, setLevelIndex] = useState(0);
  const [shards, setShards] = useState(BALANCE.SHARD_INIT);
  const [ap, setAp] = useState(BALANCE.AP_MAX);
  const [slots, setSlots] = useState(BALANCE.SLOT_INIT);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [hero, setHero] = useState<Hero | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [battleEnded, setBattleEnded] = useState<"win" | "lose" | null>(null);
  const [speed, setSpeed] = useState(1);
  const [economyWarning, setEconomyWarning] = useState(false);

  const [storyText, setStoryText] = useState<TriggerText | null>(null);
  const [recruitOpen, setRecruitOpen] = useState(false);
  const [resumePool, setResumePool] = useState<ResumeCandidate[]>([]);
  const [resumeShowHint, setResumeShowHint] = useState(false);
  const [recruitRefreshLeft, setRecruitRefreshLeft] = useState(2);
  const [bonusOpen, setBonusOpen] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<PendingEvent | null>(null);
  const [eventTimeLeft, setEventTimeLeft] = useState(BALANCE.EVENT_TIMEOUT_S);
  const [eventIsTutorial, setEventIsTutorial] = useState(false);
  const [negotiate, setNegotiate] = useState<NegotiateRequest | null>(null);
  const [evalOpen, setEvalOpen] = useState(false);
  const [evalData, setEvalData] = useState<EvalView | null>(null);
  const [dismissOpen, setDismissOpen] = useState(false);
  const [endingId, setEndingId] = useState<string | null>(null);
  const [gameOverId, setGameOverId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  // refs（避免闭包陈旧）
  const logIdRef = useRef(0);
  const toastIdRef = useRef(0);
  const tickRef = useRef<number | null>(null);
  const roundRef = useRef(0);
  const triggeredEventsRef = useRef<Set<string>>(new Set());
  const eventsCountRef = useRef(0);
  const usedFlagsRef = useRef<Set<string>>(new Set());
  const monstersRef = useRef<Monster[]>([]);
  const heroRef = useRef<Hero | null>(null);
  const eventTimerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const anyDeadThisBattleRef = useRef(false);

  // ───────── 准备阶段快照（用于撤销本回合操作） ─────────
  const prepSnapshotRef = useRef<{
    shards: number;
    ap: number;
    slots: number;
    monsters: Monster[];
    resumePool: ResumeCandidate[];
    usedFlags: Set<string>;
  } | null>(null);

  monstersRef.current = monsters;
  heroRef.current = hero;

  const level = LEVELS[levelIndex];
  const apMax = BALANCE.AP_MAX + (level?.apBonus ?? 0);

  const pushLog = useCallback((text: string, kind: LogEntry["kind"]) => {
    setLogs((prev) => [...prev, { id: logIdRef.current++, text, kind }]);
  }, []);

  const showToast = useCallback((text: string) => {
    const id = toastIdRef.current++;
    setToasts((prev) => [...prev, { id, text }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  // ───────── 保存准备阶段快照 ─────────
  const saveSnapshot = useCallback((snapshotShards: number, snapshotAp: number, snapshotSlots: number, snapshotMonsters: Monster[], snapshotResumes: ResumeCandidate[]) => {
    prepSnapshotRef.current = {
      shards: snapshotShards,
      ap: snapshotAp,
      slots: snapshotSlots,
      monsters: snapshotMonsters.map((m) => ({ ...m, runtimeTraits: [...m.runtimeTraits] })),
      resumePool: snapshotResumes.map((r) => ({ ...r })),
      usedFlags: new Set(usedFlagsRef.current),
    };
  }, []);

  // ───────── 进入某关的准备阶段 ─────────
  const enterPrep = useCallback(
    (idx: number) => {
      const lvl = LEVELS[idx];
      // 结局关 L07
      if (idx === lastLevelIdx) {
        const aliveCount = monstersRef.current.filter((m) => m.state === "active").length;
        const ending = decideEnding(shards, aliveCount, "win");
        // T06 在 L07 起点触发
        setStoryText(TRIGGERS.T06);
        setEndingId(ending);
        setGameState("ENDING");
        return;
      }

      // 每日扣薪（准备阶段开始）
      const dailySalary = monstersRef.current
        .filter((m) => m.state === "active" || m.state === "negative")
        .reduce((s, m) => s + m.salary, 0);

      let newShards = shards;
      setShards((prevShards) => {
        const next = prevShards - dailySalary;
        if (lvl.hasBattle && next < 0) {
          // 破产
          setStoryText(TRIGGERS.T09);
          setGameOverId("E04");
          setGameState("GAME_OVER");
          return prevShards;
        }
        newShards = Math.max(0, next);
        return newShards;
      });

      const newAp = BALANCE.AP_MAX + lvl.apBonus;
      const newResumes = generateResumePool(3, lvl.id);
      setAp(newAp);
      setResumePool(newResumes);
      setRecruitRefreshLeft(2);
      setGameState("MAIN_PREP");

      // 保存快照（扣薪后、行动前的状态）
      saveSnapshot(newShards, newAp, slots, monstersRef.current, newResumes);

      // L06 无独立过场卡片（T06 已迁至 L07）
    },
    [shards, slots, saveSnapshot]
  );

  // ───────── 开始游戏 ─────────
  const startGame = useCallback(() => {
    setStoryText(TRIGGERS.T01);
    setGameState("MAIN_PREP");
    setLevelIndex(0);
    setAp(BALANCE.AP_MAX);
    const initResumes = generateResumePool(3, "L01");
    setResumePool(initResumes);
    setRecruitRefreshLeft(2);
    // 保存 L01 初始快照
    saveSnapshot(BALANCE.SHARD_INIT, BALANCE.AP_MAX, BALANCE.SLOT_INIT, [], initResumes);
  }, [saveSnapshot]);

  const closeStory = useCallback(() => {
    setStoryText(null);
  }, []);

  // 手动进入下一关（用于无战斗关卡如 L01）
  const advanceLevel = useCallback(() => {
    const nextIdx = levelIndex + 1;
    setLevelIndex(nextIdx);
    setTimeout(() => enterPrep(nextIdx), 200);
  }, [levelIndex, enterPrep]);

  // ───────── 招募（免费，仅消耗1 AP）─────────
  const openRecruit = useCallback(() => {
    if (ap <= 0) return;
    if (monsters.length >= slots) {
      showToast("怪物槽位已满，请先扩建。");
      return;
    }
    setRecruitOpen(true);
    // T02 首次招募提示
    if (!usedFlagsRef.current.has("T02")) {
      usedFlagsRef.current.add("T02");
      setResumeShowHint(true);
    } else {
      setResumeShowHint(false);
    }
  }, [ap, monsters.length, slots, showToast]);

  const closeRecruit = useCallback(() => {
    setRecruitOpen(false);
    setResumeShowHint(false);
  }, []);

  const refreshRecruitPool = useCallback(() => {
    if (recruitRefreshLeft <= 0) {
      showToast("本回合刷新次数已用完。");
      return;
    }
    if (shards < 2) {
      showToast("灵魂碎片不足（需要2个）。");
      return;
    }
    setShards((s) => s - 2);
    setRecruitRefreshLeft((n) => n - 1);
    setResumePool(generateResumePool(3, LEVELS[levelIndex]?.id));
    showToast("已刷新简历池（-2 碎片）");
  }, [recruitRefreshLeft, shards, levelIndex, showToast]);

  const chooseResume = useCallback(
    (r: ResumeCandidate) => {
      // v0.7: 招募免费，仅消耗 1 AP
      const m = resumeToMonster(r);
      setMonsters((prev) => [...prev, m]);
      setAp((a) => a - 1);
      setRecruitOpen(false);
      setResumeShowHint(false);
      setResumePool(generateResumePool(3, LEVELS[levelIndex]?.id));
      if (!usedFlagsRef.current.has("P01")) {
        usedFlagsRef.current.add("P01");
        showToast(`已招募 ${m.name}。这是你的第一位员工，简历已归档。`);
      } else {
        showToast(`${m.name} 已入职。`);
      }
    },
    [showToast, levelIndex]
  );

  // ───────── 扩建 ─────────
  const buildCost = BALANCE.BUILD_COST[slots + 1] ?? 9999;
  const canBuild = slots < BALANCE.SLOT_MAX && shards >= buildCost && ap > 0;

  const doBuild = useCallback(() => {
    if (slots >= BALANCE.SLOT_MAX) {
      showToast("已达槽位上限。");
      return;
    }
    const cost = BALANCE.BUILD_COST[slots + 1] ?? 9999;
    if (shards < cost) {
      showToast("灵魂碎片不足，无法扩建。");
      return;
    }
    if (ap <= 0) return;
    setShards((s) => s - cost);
    setSlots((s) => s + 1);
    setAp((a) => a - 1);
    showToast(`扩建成功，新增 1 个槽位（-${cost} 碎片）。`);
  }, [slots, shards, ap, showToast]);

  // ───────── 发奖金（三档） ─────────
  const openBonus = useCallback(() => {
    if (ap <= 0) return;
    const active = monsters.filter((m) => m.state === "active" || m.state === "negative");
    if (active.length === 0) {
      showToast("暂无可发奖金的在岗怪物。");
      return;
    }
    setBonusOpen(true);
  }, [ap, monsters, showToast]);

  const closeBonus = useCallback(() => setBonusOpen(false), []);

  const applyBonusAction = useCallback(
    (monsterId: string, tier: BonusTier) => {
      const tierDef = BONUS_TIERS[tier] as BonusTierDef;
      if (shards < tierDef.cost) {
        showToast("灵魂碎片不足。");
        return;
      }
      setMonsters((prev) =>
        prev.map((m) => {
          if (m.id === monsterId) {
            const updated = { ...m };
            applyBonusTier(tier, updated, tierDef.atkMult);
            return updated;
          }
          return m;
        })
      );
      setShards((s) => s - tierDef.cost);
      setAp((a) => a - 1);
      setBonusOpen(false);
      showToast(`${tierDef.label}已发放（-${tierDef.cost} 碎片），本场 ATK ×${tierDef.atkMult.toFixed(2)}。`);
    },
    [shards, showToast]
  );

  // ───────── 打零工（1 AP → +4 碎片） ─────────
  const doLabor = useCallback(() => {
    if (ap <= 0) return;
    setShards((s) => s + BALANCE.AP_TO_SHARD_RATE);
    setAp((a) => a - 1);
    showToast(`打零工完成，获得 +${BALANCE.AP_TO_SHARD_RATE} 碎片。`);
  }, [ap, showToast]);

  // ───────── 战斗 ─────────
  const clearTick = () => {
    if (tickRef.current !== null) {
      window.clearTimeout(tickRef.current);
      tickRef.current = null;
    }
  };

  const startBattle = useCallback(() => {
    if (!level.hasBattle || !level.heroId) return;
    const h = createHero(level.heroId);
    const battleMonsters = monsters
      .filter((m) => m.state === "active" || m.state === "negative")
      .map((m) => ({
        ...m,
        tempAtkMult: 1,
        skipNextRound: false,
        nextRoundAtkPct: 0,
        damageDealt: 0,
        hits: 0,
        attempts: 0,
        noDamageStreak: 0,
        runtimeTraits: [] as TraitId[],
      }));

    if (battleMonsters.length === 0) {
      showToast("没有可出战的怪物，请先招募。");
      return;
    }

    // 揭示隐藏词条（首次出战）
    for (const m of battleMonsters) {
      if (!m.traitHiddenRevealed && m.traitHidden) {
        m.traitHiddenRevealed = true;
        showToast(`${m.name} 的隐藏词条已激活：${TRAITS[m.traitHidden].name}`);
      }
      m.hasFoughtOnce = true;
    }

    setMonsters(battleMonsters);
    setHero(h);
    monstersRef.current = battleMonsters;
    heroRef.current = h;

    roundRef.current = 0;
    triggeredEventsRef.current = new Set();
    eventsCountRef.current = 0;
    pausedRef.current = false;
    anyDeadThisBattleRef.current = false;
    setBattleEnded(null);
    setLogs([]);
    logIdRef.current = 0;
    setGameState("BATTLE");

    // T03 战斗开场日志
    pushLog(TRIGGERS.T03.body, "system");

    // 启动循环
    window.setTimeout(() => doTick(), 600 / speed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, monsters, speed, showToast, pushLog]);

  // 检查是否触发事件
  const tryTriggerEvent = useCallback(
    (round: number): GameEvent | null => {
      if (eventsCountRef.current >= BALANCE.MAX_EVENTS) return null;
      const ms = monstersRef.current;
      const h = heroRef.current;
      if (!h) return null;
      const aliveM = ms.filter((m) => m.state !== "dead" && m.state !== "quit");
      const poolIds = level.eventPool.filter((id) => !triggeredEventsRef.current.has(id));

      for (const id of poolIds) {
        const ev = EVENTS[id];
        if (!ev) continue;
        let cond = false;
        let relMonster: Monster | undefined;
        switch (ev.triggerCondition) {
          case "first_round_tick_in_battle":
            cond = round === 1;
            break;
          case "monster_first_battle":
            relMonster = aliveM.find((m) => !m.hasFoughtOnce);
            cond = !!relMonster && round >= 1 && !usedFlagsRef.current.has("C01");
            break;
          case "monster_hp_below_30":
            relMonster = aliveM.find((m) => m.hp / m.hpMax < 0.3);
            cond = !!relMonster;
            break;
          case "hero_hp_above_60_round3":
            cond = round === 3 && h.hp / h.hpMax > 0.6;
            break;
          case "monster_no_damage_2_rounds":
            relMonster = aliveM.find((m) => m.noDamageStreak >= 2);
            cond = !!relMonster;
            break;
          case "mid_battle_alive_2":
            cond = round === 2 && aliveM.length >= 2;
            break;
          case "no_crit_round_random":
            cond = round >= 2;
            break;
          case "hero_first_crit":
            cond = h.hasCritOnce && !triggeredEventsRef.current.has("B07");
            break;
        }
        if (cond && Math.random() <= ev.triggerProbability) {
          if (ev.id === "C01") usedFlagsRef.current.add("C01");
          return { ...ev, _relMonsterId: relMonster?.id } as GameEvent & { _relMonsterId?: string };
        }
      }
      return null;
    },
    [level]
  );

  // 单个 tick
  const doTick = useCallback(() => {
    if (pausedRef.current) return;
    const ms = monstersRef.current;
    const h = heroRef.current;
    if (!h) return;

    roundRef.current += 1;
    const round = roundRef.current;

    // 标记参战
    for (const m of ms) {
      if (m.state !== "dead" && m.state !== "quit") m.hasFoughtOnce = true;
    }

    const result = runRoundTick(ms, h, { round });
    for (const lg of result.logs) {
      pushLog(lg.text, lg.kind);
    }
    if (result.monstersDeadThisRound.length > 0) {
      anyDeadThisBattleRef.current = true;
    }

    // v0.5 L03 强制阵亡脚本：hero.HP < 0.4×HP_MAX && ROUND≥3 && 本场无阵亡
    if (
      level.forcedCasualty &&
      !anyDeadThisBattleRef.current &&
      round >= BALANCE.FORCE_DEATH_MIN_ROUND &&
      h.hp < BALANCE.FORCE_DEATH_HERO_HP_RATIO * h.hpMax
    ) {
      const aliveForScript = ms.filter((m) => m.state !== "dead" && m.state !== "quit");
      if (aliveForScript.length > 0) {
        const lowest = [...aliveForScript].sort((a, b) => a.hp - b.hp)[0];
        lowest.hp = 0;
        lowest.state = "dead";
        anyDeadThisBattleRef.current = true;
        pushLog(`${lowest.name} 力竭倒下。HR 系统记录在案。`, "death");
      }
    }

    setMonsters([...ms]);
    setHero({ ...h });

    // 胜负判定
    const aliveM = ms.filter((m) => m.state !== "dead" && m.state !== "quit");
    if (h.hp <= 0) {
      endBattle("win");
      return;
    }
    if (aliveM.length === 0) {
      endBattle("lose");
      return;
    }

    // 勇者首次暴击触发 B07 hook
    if (result.heroCritThisRound) {
      const ev = tryTriggerEvent(round) as (GameEvent & { _relMonsterId?: string }) | null;
      if (ev && ev.id === "B07") {
        triggeredEventsRef.current.add(ev.id);
        eventsCountRef.current += 1;
        pausedRef.current = true;
        clearTick();
        setPendingEvent({ event: ev, monsterId: ev._relMonsterId });
        setEventTimeLeft(BALANCE.EVENT_TIMEOUT_S);
        setEventIsTutorial(false);
        return;
      }
    }

    // 事件触发
    const ev = tryTriggerEvent(round) as (GameEvent & { _relMonsterId?: string }) | null;
    if (ev) {
      triggeredEventsRef.current.add(ev.id);
      eventsCountRef.current += 1;
      pausedRef.current = true;
      clearTick();
      const isTutorial = !usedFlagsRef.current.has("T04");
      if (isTutorial) usedFlagsRef.current.add("T04");
      setEventIsTutorial(isTutorial);
      setPendingEvent({ event: ev, monsterId: ev._relMonsterId });
      setEventTimeLeft(BALANCE.EVENT_TIMEOUT_S);
      return;
    }

    // 继续下一 tick
    clearTick();
    tickRef.current = window.setTimeout(() => doTick(), BALANCE.ROUND_TICK_MS / speed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushLog, speed, tryTriggerEvent, level]);

  const toggleSpeed = useCallback(() => {
    setSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1));
  }, []);

  // ───────── 事件选择 ─────────
  const applyEventEffect = useCallback(
    (ev: GameEvent, optIdx: 0 | 1, monsterId?: string) => {
      const effect = ev.options[optIdx].effect;
      const ms = monstersRef.current;
      const h = heroRef.current;
      if (!h) return;

      const relM = monsterId ? ms.find((m) => m.id === monsterId) : undefined;

      // 费用检查
      if (typeof effect.cost === "number") {
        if (shards >= (effect.cost as number)) {
          setShards((s) => s - (effect.cost as number));
        } else {
          showToast("灵魂碎片不足，效果未生效。");
        }
      }

      if (typeof effect.team_hp_pct === "number") {
        for (const m of ms) {
          if (m.state !== "dead") m.hp = Math.min(m.hpMax, Math.round(m.hp * (1 + (effect.team_hp_pct as number))));
        }
      }
      if (typeof effect.hero_atk_pct_this_round === "number") h.atkPctThisRound += effect.hero_atk_pct_this_round as number;
      if (typeof effect.hero_atk_pct_next_round === "number") h.atkPctNextRound += effect.hero_atk_pct_next_round as number;
      if (typeof effect.monster_atk_mult === "number" && relM) relM.tempAtkMult *= effect.monster_atk_mult as number;
      if (typeof effect.monster_hp_pct === "number" && relM) relM.hp = Math.min(relM.hpMax, Math.round(relM.hp * (1 + (effect.monster_hp_pct as number))));
      if (effect.both_skip) {
        h.forcedSkip = true;
        for (const m of ms) m.skipNextRound = true;
      }
      if (effect.random_power) {
        if (Math.random() < 0.5) {
          h.atkPctThisRound += 0.5;
          for (const m of ms) m.tempAtkMult *= 0.5;
        } else {
          h.atkPctThisRound -= 0.5;
          for (const m of ms) m.tempAtkMult *= 1.5;
        }
      }
      if (typeof effect.team_atk_pct_battle === "number" && shards >= 0) {
        for (const m of ms) m.bonusAtkMult *= 1 + (effect.team_atk_pct_battle as number);
      }
      if (effect.psy_war) {
        if (Math.random() < 0.5) h.atkPctNextRound -= 0.15;
      }
      if (typeof effect.alive_hp_pct === "number") {
        for (const m of ms) if (m.state !== "dead") m.hp = Math.min(m.hpMax, Math.round(m.hp * (1 + (effect.alive_hp_pct as number))));
      }
      if (typeof effect.monster_skip_next_bonus === "number" && relM) {
        relM.skipNextRound = true;
        relM.nextRoundAtkPct += effect.monster_skip_next_bonus as number;
      }
      if (effect.monster_force_work && relM) {
        if (Math.random() < 0.3) relM.tempAtkMult *= 0.5;
      }
      if (effect.lock_contract && relM) {
        relM.runtimeTraits = relM.runtimeTraits.filter((t) => t !== "slacker");
      }
      if (effect.hero_forced_skip) h.forcedSkip = true;
      if (effect.monster_contract_pending && relM) {
        if (!relM.runtimeTraits.includes("contract_pending")) relM.runtimeTraits.push("contract_pending");
      }
      if (effect.morale_down) {
        // 简化：无士气词条则无影响
      }

      setMonsters([...ms]);
      setHero({ ...h });
    },
    [shards, showToast]
  );

  const resumeAfterEvent = useCallback(() => {
    setPendingEvent(null);
    pausedRef.current = false;
    clearTick();
    tickRef.current = window.setTimeout(() => doTick(), 500 / speed);
  }, [doTick, speed]);

  const chooseEventOption = useCallback(
    (idx: 0 | 1) => {
      if (!pendingEvent) return;
      if (eventTimerRef.current !== null) {
        window.clearInterval(eventTimerRef.current);
        eventTimerRef.current = null;
      }
      applyEventEffect(pendingEvent.event, idx, pendingEvent.monsterId);
      resumeAfterEvent();
    },
    [pendingEvent, applyEventEffect, resumeAfterEvent]
  );

  // 事件倒计时
  useEffect(() => {
    if (!pendingEvent) return;
    setEventTimeLeft(BALANCE.EVENT_TIMEOUT_S);
    eventTimerRef.current = window.setInterval(() => {
      setEventTimeLeft((t) => {
        if (t <= 1) {
          if (eventTimerRef.current !== null) {
            window.clearInterval(eventTimerRef.current);
            eventTimerRef.current = null;
          }
          const def = pendingEvent.event.timeoutDefault;
          applyEventEffect(pendingEvent.event, def, pendingEvent.monsterId);
          resumeAfterEvent();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (eventTimerRef.current !== null) {
        window.clearInterval(eventTimerRef.current);
        eventTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingEvent]);

  // ───────── 结束战斗 → EVAL ─────────
  const endBattle = useCallback(
    (result: "win" | "lose") => {
      clearTick();
      pausedRef.current = true;
      setBattleEnded(result);

      const ms = monstersRef.current;

      if (result === "lose") {
        // 全灭
        setTimeout(() => {
          setStoryText(TRIGGERS.T08);
          setGameOverId("E03");
          setGameState("GAME_OVER");
        }, 1000);
        return;
      }

      // 胜利 → EVAL
      setTimeout(() => {
        const dead = ms.filter((m) => m.state === "dead");
        const survived = ms.filter((m) => m.state === "active" || m.state === "negative");

        // v0.5 EVAL 兜底：若仍无阵亡，强制随机非 TANK 怪物 HP=0
        if (level.forcedCasualty && dead.length === 0 && survived.length > 0) {
          const nonTank = survived.filter((m) => m.template !== "MON_TANK");
          const target = nonTank.length > 0 ? nonTank[Math.floor(Math.random() * nonTank.length)] : survived[0];
          target.state = "dead";
          target.hp = 0;
          dead.push(target);
          const idx = survived.indexOf(target);
          if (idx >= 0) survived.splice(idx, 1);
        }

        let pension = 0;
        for (const m of dead) pension += calcPension(m);

        // 存活者升级（条件：存活且有效伤害>0）
        const leveledUp: string[] = [];
        const totalDamage = ms.reduce((s, m) => s + m.damageDealt, 0);
        for (const m of survived) {
          m.battlesSurvived += 1;
          m.bonusAtkMult = 1.0; // 奖金本场结束
          m.runtimeTraits = [];
          // 消极怠工场次递减
          if (m.slackerBattlesLeft > 0) {
            m.slackerBattlesLeft -= 1;
          }
          if (checkLevelUp(m)) {
            applyLevelUp(m);
            leveledUp.push(m.id);
          }
        }

        // 通关绩效提成
        const reward = calcRewardOnClear(survived.length, totalDamage);

        // 扣抚恤金 + 加绩效提成
        setShards((s) => Math.max(0, s - pension + reward.total));

        // 更新怪物列表：移除阵亡
        const remaining = ms.filter((m) => m.state === "active" || m.state === "negative");
        setMonsters(remaining);

        setEvalData({ survived: survived.filter((m) => m.state !== "quit"), dead, pensionPaid: pension, leveledUp, reward });
        setEvalOpen(true);
        setGameState("EVAL");

        // T05 首次阵亡
        if (dead.length > 0 && !usedFlagsRef.current.has("T05")) {
          usedFlagsRef.current.add("T05");
          setStoryText(TRIGGERS.T05);
        }
      }, 1200);
    },
    [level]
  );

  // ───────── EVAL 继续 ─────────
  const proceedEval = useCallback(() => {
    setEvalOpen(false);

    // 谈薪检查（升级后≥2级时60%概率，非 cheap_skate）
    const leveled = evalData?.leveledUp ?? [];
    const ms = monstersRef.current;
    let negCandidate: Monster | undefined;
    // L04 必触发 P02
    const forceNeg = level.id === "L04";
    for (const id of leveled) {
      const m = ms.find((x) => x.id === id);
      if (!m) continue;
      if (allActiveTraits(m).includes("cheap_skate")) continue;
      if (m.level < 2 && !forceNeg) continue; // 只有≥2级才可能谈薪
      if (forceNeg || Math.random() < BALANCE.NEGOTIATE_PROB) {
        negCandidate = m;
        break;
      }
    }
    // L04 若无升级者也强制找一个在岗怪物谈薪
    if (forceNeg && !negCandidate) {
      negCandidate = ms.find((m) => (m.state === "active") && !allActiveTraits(m).includes("cheap_skate"));
    }

    if (negCandidate) {
      const delta = Math.max(1, Math.round(negCandidate.salary * BALANCE.NEGOTIATE_RAISE_PCT));
      setNegotiate({ monsterId: negCandidate.id, delta });
      return;
    }

    finishEval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evalData, level]);

  const checkEconomyAndAdvance = useCallback(() => {
    // P03 经济警告（L03 起，碎片 < 45）
    if (levelIndex >= 2 && shards < BALANCE.SAFE_LINE) {
      setEconomyWarning(true);
      if (!usedFlagsRef.current.has("P03")) {
        usedFlagsRef.current.add("P03");
        setStoryText(TRIGGERS.P03);
      } else {
        showToast(TRIGGERS.P05.body);
      }
    }

    // P04 在 L04 末触发（design_review v1.1 #2）
    if (level.id === "L04" && !usedFlagsRef.current.has("P04")) {
      usedFlagsRef.current.add("P04");
      setStoryText(TRIGGERS.P04);
    }

    // 进入下一关
    const nextIdx = levelIndex + 1;
    setLevelIndex(nextIdx);
    setTimeout(() => enterPrep(nextIdx), 200);
  }, [levelIndex, shards, enterPrep, showToast, level]);

  const finishEval = useCallback(() => {
    setEvalData(null);
    setHero(null);
    setBattleEnded(null);
    checkEconomyAndAdvance();
  }, [checkEconomyAndAdvance]);

  const answerNegotiate = useCallback(
    (approve: boolean) => {
      if (!negotiate) return;
      const ms = monstersRef.current;
      const m = ms.find((x) => x.id === negotiate.monsterId);
      if (m) {
        if (approve) {
          m.salary += negotiate.delta;
          showToast(`${m.name} 谈薪成功，日薪 +${negotiate.delta}（+20%）。`);
        } else {
          // 消极怠工：本场ATK×0.75，下场ATK×0.85（持续1场后清除）
          m.slackerBattlesLeft = 2; // 2 = 本场 + 下场
          m.state = "negative";
          showToast(`${m.name} 谈薪被拒，触发『消极怠工』（本场ATK×0.75，下场×0.85）。`);
        }
        setMonsters([...ms]);
      }
      setNegotiate(null);
      finishEval();
    },
    [negotiate, showToast, finishEval]
  );

  // ───────── 解雇 ─────────
  const openDismiss = useCallback(() => setDismissOpen(true), []);
  const closeDismiss = useCallback(() => setDismissOpen(false), []);
  const dismissMonster = useCallback(
    (monsterId: string) => {
      setMonsters((prev) => prev.filter((m) => m.id !== monsterId));
      setDismissOpen(false);
      showToast("已解雇该员工。");
    },
    [showToast]
  );

  // ───────── 重新开始 / 撤销本回合 ─────────
  const restart = useCallback(() => {
    clearTick();

    // 如果在准备阶段且有快照，则撤销本回合操作（恢复到本关开始时的状态）
    if (gameState === "MAIN_PREP" && prepSnapshotRef.current) {
      const snap = prepSnapshotRef.current;
      setShards(snap.shards);
      setAp(snap.ap);
      setSlots(snap.slots);
      setMonsters(snap.monsters.map((m) => ({ ...m, runtimeTraits: [...m.runtimeTraits] })));
      setResumePool(snap.resumePool.map((r) => ({ ...r })));
      usedFlagsRef.current = new Set(snap.usedFlags);
      // 关闭所有弹窗
      setRecruitOpen(false);
      setResumeShowHint(false);
      setBonusOpen(false);
      setDismissOpen(false);
      setToasts([]);
      showToast("已撤销本回合操作。");
      return;
    }

    // 否则完全重置游戏
    setGameState("GAME_INIT");
    setLevelIndex(0);
    setShards(BALANCE.SHARD_INIT);
    setAp(BALANCE.AP_MAX);
    setSlots(BALANCE.SLOT_INIT);
    setMonsters([]);
    setHero(null);
    setLogs([]);
    setBattleEnded(null);
    setSpeed(1);
    setEconomyWarning(false);
    setStoryText(null);
    setRecruitOpen(false);
    setResumePool([]);
    setBonusOpen(false);
    setPendingEvent(null);
    setNegotiate(null);
    setEvalOpen(false);
    setEvalData(null);
    setDismissOpen(false);
    setEndingId(null);
    setGameOverId(null);
    setToasts([]);
    usedFlagsRef.current = new Set();
    triggeredEventsRef.current = new Set();
    prepSnapshotRef.current = null;
  }, [gameState, showToast]);

  // 清理
  useEffect(() => () => clearTick(), []);

  return {
    gameState,
    levelIndex,
    levelId: level?.id ?? "",
    levelTitle: level?.title ?? "",
    shards,
    ap,
    apMax,
    slots,
    monsters,
    hero,
    logs,
    battleEnded,
    speed,
    economyWarning,
    storyText,
    recruitOpen,
    resumePool,
    resumeShowHint,
    recruitRefreshLeft,
    refreshRecruitPool,
    bonusOpen,
    pendingEvent,
    eventTimeLeft,
    eventIsTutorial,
    negotiate,
    evalOpen,
    evalData,
    dismissOpen,
    endingId,
    gameOverId,
    toasts,
    startGame,
    closeStory,
    advanceLevel,
    openRecruit,
    closeRecruit,
    chooseResume,
    doBuild,
    openBonus,
    closeBonus,
    applyBonus: applyBonusAction,
    doLabor,
    startBattle,
    toggleSpeed,
    chooseEventOption,
    proceedEval,
    openDismiss,
    closeDismiss,
    dismissMonster,
    answerNegotiate,
    restart,
    canBuild,
    buildCost,
  };
}