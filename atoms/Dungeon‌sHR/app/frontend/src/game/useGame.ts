// 状态管理 hook：驱动 UI 的核心状态机
import { useCallback, useEffect, useRef, useState } from "react";
import { BALANCE, BOARD_POLICIES, BONUS_TIERS, EVENTS, GROWTH_CHOICES, HERO_MECHANISM_EVENTS, LEVELS, PREP_EVENTS, TRAITS } from "./data";
import {
  allActiveTraits,
  applyHeroVariant,
  applyBonusTier,
  applyJobChange,
  applyLevelUp,
  calcPension,
  calcRewardOnClear,
  checkLevelUp,
  createHero,
  decideEnding,
  generateResumePool,
  getJobChangeOptions,
  pick,
  randomHeroVariant,
  resumeToMonster,
  runRoundTick,
} from "./engine";
import type {
  BonusTier,
  BonusTierDef,
  BoardPolicy,
  GameEvent,
  GameState,
  GrowthChoice,
  GrowthRequest,
  Hero,
  JobChangeOption,
  LogEntry,
  Monster,
  NegotiateRequest,
  PendingEvent,
  PrepEvent,
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
  // 新手引导
  tutorialOpen: boolean;
  closeTutorial: () => void;
  // 存档
  hasSave: boolean;
  loadGame: () => void;
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
  freeRecruitRefreshLeft: number;
  refreshRecruitPool: () => void;
  bonusOpen: boolean;
  bonusTargetId: string | null;
  trainingOpen: boolean;
  trainingTargetId: string | null;
  healOpen: boolean;
  healTargetId: string | null;
  dismissTargetId: string | null;
  pendingEvent: PendingEvent | null;
  eventTimeLeft: number;
  eventIsTutorial: boolean;
  prepEvent: PrepEvent | null;
  dailyPolicyChoices: BoardPolicy[];
  activePolicy: BoardPolicy | null;
  growth: GrowthRequest | null;
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
  openBonus: (monsterId?: string) => void;
  closeBonus: () => void;
  applyBonus: (monsterId: string, tier: BonusTier) => void;
  openTraining: (monsterId?: string) => void;
  closeTraining: () => void;
  applyTraining: (monsterId: string) => void;
  trainingCost: (monster: Monster) => number;
  dismissCost: (monster: Monster) => number;
  openHeal: (monsterId?: string) => void;
  closeHeal: () => void;
  healCost: (monster: Monster) => number;
  healMonster: (monsterId: string) => void;
  doLabor: () => void;
  startBattle: () => void;
  toggleSpeed: () => void;
  chooseEventOption: (idx: 0 | 1) => void;
  choosePrepEventOption: (idx: 0 | 1) => void;
  choosePolicy: (policy: BoardPolicy) => void;
  chooseGrowth: (choice: GrowthChoice) => void;
  proceedEval: () => void;
  openDismiss: (monsterId?: string) => void;
  closeDismiss: () => void;
  dismissMonster: (monsterId: string) => void;
  answerNegotiate: (approve: boolean) => void;
  restart: () => void;
  restartRound: () => void;
  canBuild: boolean;
  buildCost: number;
  // 转职系统
  jobChangeOpen: boolean;
  jobChangeTargetId: string | null;
  jobChangeOptions: [JobChangeOption, JobChangeOption] | null;
  openJobChange: (monsterId: string) => void;
  closeJobChange: () => void;
  applyJobChangeAction: (monsterId: string, option: JobChangeOption) => void;
  canJobChange: (m: Monster) => boolean;
  // 勇者机制事件卡片
  pendingMechanismEvent: { title: string; cardText: string; options: [{ label: string; sub: string }, { label: string; sub: string }] } | null;
  chooseMechanismOption: (idx: 0 | 1) => void;
}

const lastLevelIdx = LEVELS.length - 1;
const SAVE_KEY = "dungeon_hr_save";

interface SaveData {
  gameState: GameState;
  levelIndex: number;
  shards: number;
  ap: number;
  slots: number;
  monsters: Monster[];
  resumePool: ResumeCandidate[];
  recruitRefreshLeft: number;
  freeRecruitRefreshLeft: number;
  usedFlags: string[];
  // FIX #7: 保存 activePolicy
  activePolicy?: BoardPolicy | null;
}

function writeSave(data: SaveData) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch { /* quota exceeded — silently fail */ }
}

// Reverse mapping: artUrl → bustAsset for migrating old saves without bustAsset
const ART_TO_BUST: Record<string, string> = {
  "/art/characters/A-CHR-GROOBAS.png": "/art/characters/A-CHR-BUST-GROOBAS.png",
  "/art/characters/A-CHR-XIAOXING.png": "/art/characters/A-CHR-BUST-XIAOXING.png",
  "/art/characters/A-CHR-GENERIC-1.png": "/art/characters/A-CHR-BUST-GENERIC-1.png",
  "/art/characters/A-CHR-GENERIC-2.png": "/art/characters/A-CHR-BUST-GENERIC-2.png",
  "/art/characters/A-CHR-GENERIC-3.png": "/art/characters/A-CHR-BUST-GENERIC-3.png",
};

function readSave(): SaveData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SaveData;
    // Migrate old saves: patch missing bustAsset from artUrl
    if (data.monsters) {
      data.monsters = data.monsters.map((m) => {
        if (!m.bustAsset && m.artUrl) {
          return { ...m, bustAsset: ART_TO_BUST[m.artUrl] || m.artUrl };
        }
        return m;
      });
    }
    return data;
  } catch {
    return null;
  }
}

function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function useGame(): UseGameApi {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [hasSave, setHasSave] = useState(() => !!readSave());
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
  const [freeRecruitRefreshLeft, setFreeRecruitRefreshLeft] = useState(0);
  const [bonusOpen, setBonusOpen] = useState(false);
  const [bonusTargetId, setBonusTargetId] = useState<string | null>(null);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [trainingTargetId, setTrainingTargetId] = useState<string | null>(null);
  const [healOpen, setHealOpen] = useState(false);
  const [healTargetId, setHealTargetId] = useState<string | null>(null);
  const [dismissTargetId, setDismissTargetId] = useState<string | null>(null);
  const [pendingEvent, setPendingEvent] = useState<PendingEvent | null>(null);
  const [eventTimeLeft, setEventTimeLeft] = useState(BALANCE.EVENT_TIMEOUT_S);
  const [eventIsTutorial, setEventIsTutorial] = useState(false);
  const [prepEvent, setPrepEvent] = useState<PrepEvent | null>(null);
  const [pendingMechanismEvent, setPendingMechanismEvent] = useState<{ title: string; cardText: string; options: [{ label: string; sub: string }, { label: string; sub: string }] } | null>(null);
  const [dailyPolicyChoices, setDailyPolicyChoices] = useState<BoardPolicy[]>([]);
  const [activePolicy, setActivePolicy] = useState<BoardPolicy | null>(null);
  const [growth, setGrowth] = useState<GrowthRequest | null>(null);
  const [negotiate, setNegotiate] = useState<NegotiateRequest | null>(null);
  const [evalOpen, setEvalOpen] = useState(false);
  const [evalData, setEvalData] = useState<EvalView | null>(null);
  const [dismissOpen, setDismissOpen] = useState(false);
  const [jobChangeOpen, setJobChangeOpen] = useState(false);
  const [jobChangeTargetId, setJobChangeTargetId] = useState<string | null>(null);
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
  const mechanismEventFiredRef = useRef(false);
  const activePolicyRef = useRef<BoardPolicy | null>(null);
  const prepRewardMultRef = useRef(1);
  const prepPensionMultRef = useRef(1);
  const prepTeamAtkPctRef = useRef(0);
  const lastGrowthMonsterIdRef = useRef<string | null>(null);
  // FIX #3: Use ref for speed so doTick always reads current value
  const speedRef = useRef(1);
  // FIX #4: Use ref for shards so event effects always read current value
  const shardsRef = useRef(BALANCE.SHARD_INIT);

  // ───────── 准备阶段快照（用于撤销本回合操作） ─────────
  const prepSnapshotRef = useRef<{
    shards: number;
    ap: number;
    slots: number;
    monsters: Monster[];
    resumePool: ResumeCandidate[];
    recruitRefreshLeft: number;
    freeRecruitRefreshLeft: number;
    usedFlags: Set<string>;
  } | null>(null);

  monstersRef.current = monsters;
  heroRef.current = hero;
  activePolicyRef.current = activePolicy;
  speedRef.current = speed;
  shardsRef.current = shards;

  const level = LEVELS[levelIndex];
  const apMax = BALANCE.AP_MAX + (level?.apBonus ?? 0) + (activePolicy?.extraAp ?? 0);

  const chooseUniquePolicies = useCallback(() => {
    const pool = [...BOARD_POLICIES];
    const out: BoardPolicy[] = [];
    while (out.length < 3 && pool.length > 0) {
      const idx = Math.floor(Math.random() * pool.length);
      out.push(pool.splice(idx, 1)[0]);
    }
    return out;
  }, []);

  // FIX #6: Randomize prep events instead of fixed mapping
  const prepEventForLevel = useCallback((idx: number) => {
    if (idx <= 0 || idx >= lastLevelIdx) return null;
    // Randomly pick from PREP_EVENTS pool
    return PREP_EVENTS[Math.floor(Math.random() * PREP_EVENTS.length)];
  }, []);

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
  const saveSnapshot = useCallback((snapshotShards: number, snapshotAp: number, snapshotSlots: number, snapshotMonsters: Monster[], snapshotResumes: ResumeCandidate[], snapshotRefreshLeft = 2, snapshotFreeRefreshLeft = 0) => {
    prepSnapshotRef.current = {
      shards: snapshotShards,
      ap: snapshotAp,
      slots: snapshotSlots,
      monsters: snapshotMonsters.map((m) => ({ ...m, runtimeTraits: [...m.runtimeTraits] })),
      resumePool: snapshotResumes.map((r) => ({ ...r })),
      recruitRefreshLeft: snapshotRefreshLeft,
      freeRecruitRefreshLeft: snapshotFreeRefreshLeft,
      usedFlags: new Set(usedFlagsRef.current),
    };
  }, []);



  // ───────── 读取存档 ─────────
  const loadGame = useCallback(() => {
    const data = readSave();
    if (!data) return;
    setGameState(data.gameState);
    setLevelIndex(data.levelIndex);
    setShards(data.shards);
    setAp(data.ap);
    setSlots(data.slots);
    setMonsters(data.monsters);
    setResumePool(data.resumePool);
    setRecruitRefreshLeft(data.recruitRefreshLeft);
    setFreeRecruitRefreshLeft(data.freeRecruitRefreshLeft);
    usedFlagsRef.current = new Set(data.usedFlags);
    // FIX #7: Restore activePolicy from save
    if (data.activePolicy) {
      setActivePolicy(data.activePolicy);
      activePolicyRef.current = data.activePolicy;
    } else {
      setActivePolicy(null);
    }
    // 清理弹窗状态
    setStoryText(null);
    setPrepEvent(null);
    setDailyPolicyChoices([]);
    setRecruitOpen(false);
    setBonusOpen(false);
    setTrainingOpen(false);
    setDismissOpen(false);
    setEvalOpen(false);
    setEvalData(null);
    setGrowth(null);
    setNegotiate(null);
    setPendingEvent(null);
    setEndingId(null);
    setGameOverId(null);
    setToasts([]);
    prepRewardMultRef.current = 1;
    prepPensionMultRef.current = 1;
    prepTeamAtkPctRef.current = 0;
    // 保存快照以支持撤销
    saveSnapshot(data.shards, data.ap, data.slots, data.monsters, data.resumePool, data.recruitRefreshLeft, data.freeRecruitRefreshLeft);
  }, [saveSnapshot]);

  // ───────── 进入某关的准备阶段 ─────────
  const enterPrep = useCallback(
    (idx: number) => {
      const lvl = LEVELS[idx];

      // 每日扣薪（准备阶段开始）
      const dailySalary = monstersRef.current
        .filter((m) => m.state === "active" || m.state === "negative")
        .reduce((s, m) => s + m.salary, 0);

      // FIX #1: Calculate newShards directly from shardsRef to avoid stale closure
      const currentShards = shardsRef.current;
      const newShards = Math.max(0, currentShards - dailySalary);

      // 破产检查
      if (lvl.hasBattle && currentShards - dailySalary < 0) {
        setStoryText(TRIGGERS.T09);
        setGameOverId("E04");
        setGameState("GAME_OVER");
        deleteSave();
        setHasSave(false);
        return;
      }

      // FIX #2: 结局关也先扣薪再判定
      if (idx === lastLevelIdx) {
        const aliveCount = monstersRef.current.filter((m) => m.state === "active").length;
        const ending = decideEnding(newShards, aliveCount, "win");
        setShards(newShards);
        setStoryText(TRIGGERS.T06);
        setEndingId(ending);
        setGameState("ENDING");
        deleteSave();
        setHasSave(false);
        return;
      }

      setShards(newShards);

      const newAp = BALANCE.AP_MAX + lvl.apBonus;
      const newResumes = generateResumePool(3, lvl.id);
      setAp(newAp);
      setResumePool(newResumes);
      setRecruitRefreshLeft(2);
      setFreeRecruitRefreshLeft(0);
      setPrepEvent(null);
      setActivePolicy(null);
      prepRewardMultRef.current = 1;
      prepPensionMultRef.current = 1;
      prepTeamAtkPctRef.current = 0;
      setGameState("MAIN_PREP");
      if (lvl.hasBattle) {
        setDailyPolicyChoices(chooseUniquePolicies());
      } else {
        setDailyPolicyChoices([]);
      }

      // 保存快照（扣薪后、行动前的状态）
      saveSnapshot(newShards, newAp, slots, monstersRef.current, newResumes, 2, 0);

      // FIX #7: 自动存档包含 activePolicy（此时为 null，新关开始）
      const autoSave: SaveData = {
        gameState: "MAIN_PREP",
        levelIndex: idx,
        shards: newShards,
        ap: newAp,
        slots,
        monsters: monstersRef.current,
        resumePool: newResumes,
        recruitRefreshLeft: 2,
        freeRecruitRefreshLeft: 0,
        usedFlags: Array.from(usedFlagsRef.current),
        activePolicy: null,
      };
      writeSave(autoSave);
      setHasSave(true);
    },
    [slots, saveSnapshot, chooseUniquePolicies]
  );

  // ───────── 开始游戏 ─────────
  const startGame = useCallback(() => {
    isT01Ref.current = true;
    setStoryText(TRIGGERS.T01);
    setGameState("MAIN_PREP");
    setLevelIndex(0);
    setShards(BALANCE.SHARD_INIT);
    setAp(BALANCE.AP_MAX);
    const initResumes = generateResumePool(3, "L01");
    setResumePool(initResumes);
    setRecruitRefreshLeft(2);
    setFreeRecruitRefreshLeft(0);
    setPrepEvent(null);
    setDailyPolicyChoices([]);
    setActivePolicy(null);
    prepRewardMultRef.current = 1;
    prepPensionMultRef.current = 1;
    prepTeamAtkPctRef.current = 0;
    // 保存 L01 初始快照
    saveSnapshot(BALANCE.SHARD_INIT, BALANCE.AP_MAX, BALANCE.SLOT_INIT, [], initResumes);
    // 自动存档
    const autoSave: SaveData = {
      gameState: "MAIN_PREP",
      levelIndex: 0,
      shards: BALANCE.SHARD_INIT,
      ap: BALANCE.AP_MAX,
      slots: BALANCE.SLOT_INIT,
      monsters: [],
      resumePool: initResumes,
      recruitRefreshLeft: 2,
      freeRecruitRefreshLeft: 0,
      usedFlags: Array.from(usedFlagsRef.current),
      activePolicy: null,
    };
    writeSave(autoSave);
    setHasSave(true);
  }, [saveSnapshot]);

  const closeTutorial = useCallback(() => {
    setTutorialOpen(false);
  }, []);

  // 标记是否为开局 T01 邮件（用于关闭后触发引导）
  const isT01Ref = useRef(false);

  const closeStory = useCallback(() => {
    const wasT01 = isT01Ref.current;
    isT01Ref.current = false;
    setStoryText(null);
    if (wasT01) {
      setTutorialOpen(true);
    }
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
    if (freeRecruitRefreshLeft <= 0 && recruitRefreshLeft <= 0) {
      showToast("本回合刷新次数已用完。");
      return;
    }
    const useFreeRefresh = freeRecruitRefreshLeft > 0;
    if (!useFreeRefresh && shards < 2) {
      showToast("灵魂碎片不足（需要2个）。");
      return;
    }
    if (useFreeRefresh) {
      setFreeRecruitRefreshLeft((n) => n - 1);
    } else {
      setShards((s) => s - 2);
      setRecruitRefreshLeft((n) => n - 1);
    }
    setResumePool(generateResumePool(3, LEVELS[levelIndex]?.id));
    showToast(useFreeRefresh ? "已免费刷新简历池" : "已刷新简历池（-2 碎片）");
  }, [freeRecruitRefreshLeft, recruitRefreshLeft, shards, levelIndex, showToast]);

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
  const openBonus = useCallback((monsterId?: string) => {
    if (ap <= 0) return;
    const active = monsters.filter((m) => m.state === "active" || m.state === "negative");
    if (active.length === 0) {
      showToast("暂无可发奖金的在岗怪物。");
      return;
    }
    if (monsterId && !active.some((m) => m.id === monsterId)) {
      showToast("该员工当前不可发奖金。");
      return;
    }
    setBonusTargetId(monsterId ?? null);
    setBonusOpen(true);
  }, [ap, monsters, showToast]);

  const closeBonus = useCallback(() => {
    setBonusOpen(false);
    setBonusTargetId(null);
  }, []);

  const applyBonusAction = useCallback(
    (monsterId: string, tier: BonusTier) => {
      const tierDef = BONUS_TIERS[tier] as BonusTierDef;
      const discount = activePolicyRef.current?.bonusDiscount ?? 0;
      const cost = Math.max(1, Math.round(tierDef.cost * (1 - discount)));
      if (shards < cost) {
        showToast("灵魂碎片不足。");
        return;
      }
      setMonsters((prev) =>
        prev.map((m) => {
          if (m.id === monsterId) {
            const updated = { ...m };
            applyBonusTier(tier, updated, tierDef.atkMult);
            updated.receivedBonusThisBattle = true;
            return updated;
          }
          return m;
        })
      );
      setShards((s) => s - cost);
      setAp((a) => a - 1);
      setBonusOpen(false);
      setBonusTargetId(null);
      showToast(`${tierDef.label}已发放（-${cost} 碎片），本场攻击 ×${tierDef.atkMult.toFixed(2)}。`);
    },
    [shards, showToast]
  );

  const trainingCost = useCallback((monster: Monster) => {
    return BALANCE.TRAINING_BASE_COST + monster.level * BALANCE.TRAINING_COST_PER_LEVEL;
  }, []);

  const dismissCost = useCallback((monster: Monster) => {
    return monster.salary + (levelIndex + 1) + 1;
  }, [levelIndex]);

  // ───────── 治疗（消耗碎片，不消耗 AP，回满 HP） ─────────
  const healCost = useCallback((monster: Monster) => {
    if (monster.hp >= monster.hpMax) return 0;
    return Math.max(1, Math.round(20 * (1 - monster.hp / monster.hpMax)));
  }, []);

  const openHeal = useCallback((monsterId?: string) => {
    const target = monsterId ? monstersRef.current.find((m) => m.id === monsterId) : monstersRef.current.find((m) => m.state !== "dead");
    if (!target || target.state === "dead") {
      showToast("该员工无法治疗。");
      return;
    }
    setHealTargetId(target.id);
    setHealOpen(true);
  }, [showToast]);

  const closeHeal = useCallback(() => {
    setHealOpen(false);
    setHealTargetId(null);
  }, []);

  const healMonster = useCallback(
    (monsterId: string) => {
      const target = monstersRef.current.find((m) => m.id === monsterId);
      if (!target || target.state === "dead") {
        showToast("该员工无法治疗。");
        return;
      }
      if (target.hp >= target.hpMax) {
        showToast("该员工已满血，无需治疗。");
        return;
      }
      const cost = healCost(target);
      if (shards < cost) {
        showToast("灵魂碎片不足，无法治疗。");
        return;
      }
      setMonsters((prev) =>
        prev.map((m) => {
          if (m.id !== monsterId) return m;
          return { ...m, hp: m.hpMax };
        })
      );
      setShards((s) => s - cost);
      showToast(`${target.name} 治疗完毕（-${cost} 碎片），HP 回满。`);
    },
    [shards, showToast, healCost]
  );

  // ───────── 单独培训（消耗碎片 + 1 AP → 指定怪物升级） ─────────
  const openTraining = useCallback((monsterId?: string) => {
    if (ap <= 0) return;
    const active = monsters.filter((m) => m.state === "active" || m.state === "negative");
    if (active.length === 0) {
      showToast("暂无可培训的在岗怪物。");
      return;
    }
    if (monsterId && !active.some((m) => m.id === monsterId)) {
      showToast("该员工当前不可培训。");
      return;
    }
    setTrainingTargetId(monsterId ?? null);
    setTrainingOpen(true);
  }, [ap, monsters, showToast]);

  const closeTraining = useCallback(() => {
    setTrainingOpen(false);
    setTrainingTargetId(null);
  }, []);

  const applyTrainingAction = useCallback(
    (monsterId: string) => {
      const target = monstersRef.current.find((m) => m.id === monsterId);
      if (!target || (target.state !== "active" && target.state !== "negative")) {
        showToast("该员工当前不可培训。");
        return;
      }
      if (target.level >= BALANCE.LEVELUP_MAX) {
        showToast("该员工已达到等级上限。");
        return;
      }
      const cost = trainingCost(target);
      if (ap <= 0) {
        showToast("行动点不足。");
        return;
      }
      if (shards < cost) {
        showToast("灵魂碎片不足，无法培训。");
        return;
      }

      let trainedName = target.name;
      let trainedLevel = target.level + 1;
      setMonsters((prev) =>
        prev.map((m) => {
          if (m.id !== monsterId) return m;
          const updated = { ...m };
          applyLevelUp(updated);
          trainedName = updated.name;
          trainedLevel = updated.level;
          return updated;
        })
      );
      setShards((s) => s - cost);
      setAp((a) => a - 1);
      setTrainingOpen(false);
      setTrainingTargetId(null);
      showToast(`${trainedName} 完成单独培训（-${cost} 碎片），升至 Lv.${trainedLevel}。`);
    },
    [ap, shards, showToast, trainingCost]
  );

  // ───────── 打零工（1 AP → +5 碎片） ─────────
  const doLabor = useCallback(() => {
    if (ap <= 0) return;
    setShards((s) => s + BALANCE.AP_TO_SHARD_RATE);
    setAp((a) => a - 1);
    showToast(`打零工完成，获得 +${BALANCE.AP_TO_SHARD_RATE} 碎片。`);
  }, [ap, showToast]);

  // ───────── 本日经营方针 / 日常突发事件 ─────────
  const choosePolicy = useCallback(
    (policy: BoardPolicy) => {
      setActivePolicy(policy);
      activePolicyRef.current = policy;
      setDailyPolicyChoices([]);
      if (policy.extraAp) {
        setAp((a) => a + policy.extraAp!);
        showToast(`已选择「${policy.title}」，本关行动点 +${policy.extraAp}。`);
      } else {
        showToast(`已选择「${policy.title}」。`);
      }
      const dailyEvent = prepEventForLevel(levelIndex);
      if (dailyEvent) setPrepEvent(dailyEvent);
    },
    [levelIndex, prepEventForLevel, showToast]
  );

  const choosePrepEventOption = useCallback(
    (idx: 0 | 1) => {
      if (!prepEvent) return;
      const effect = prepEvent.options[idx].effect;
      const cost = typeof effect.cost === "number" ? effect.cost : 0;
      if (cost > 0 && shards < cost) {
        showToast("灵魂碎片不足，日常事件选项未生效。");
        setPrepEvent(null);
        return;
      }
      if (cost > 0) setShards((s) => s - cost);
      if (typeof effect.shards === "number") setShards((s) => s + (effect.shards as number));
      if (typeof effect.ap === "number") setAp((a) => a + (effect.ap as number));
      if (typeof effect.recruit_refresh === "number") setFreeRecruitRefreshLeft((n) => n + (effect.recruit_refresh as number));
      if (typeof effect.team_hp_pct === "number") {
        setMonsters((prev) =>
          prev.map((m) => ({
            ...m,
            hp: Math.min(m.hpMax, Math.round(m.hp * (1 + (effect.team_hp_pct as number)))),
          }))
        );
      }
      if (typeof effect.prep_team_atk_pct === "number") prepTeamAtkPctRef.current += effect.prep_team_atk_pct as number;
      if (typeof effect.prep_reward_mult === "number") prepRewardMultRef.current += effect.prep_reward_mult as number;
      if (typeof effect.prep_pension_mult === "number") prepPensionMultRef.current += effect.prep_pension_mult as number;
      if (typeof effect.prep_team_crit === "number") {
        // 全员暴击率 +N%
        setMonsters((prev) =>
          prev.map((m) => ({
            ...m,
            critRate: Math.min(0.5, m.critRate + (effect.prep_team_crit as number)),
          }))
        );
      }
      if (typeof effect.tank_hp_pct === "number") {
        setMonsters((prev) =>
          prev.map((m) => {
            if (m.template !== "MON_TANK") return m;
            return { ...m, hp: Math.min(m.hpMax, Math.round(m.hp * (1 + (effect.tank_hp_pct as number)))) };
          })
        );
      }
      showToast(`日常事件已处理：${prepEvent.options[idx].label}`);
      setPrepEvent(null);
    },
    [prepEvent, shards, showToast]
  );

  // ───────── 战斗 ─────────
  const clearTick = () => {
    if (tickRef.current !== null) {
      window.clearTimeout(tickRef.current);
      tickRef.current = null;
    }
  };

  const startBattle = useCallback(() => {
    if (!level.hasBattle || !level.heroId) return;
    const variant = randomHeroVariant(level.id);
    const h = applyHeroVariant(createHero(level.heroId), variant);
    const policy = activePolicyRef.current;
    if (policy?.heroHpPct) {
      h.hpMax = Math.max(1, Math.round(h.hpMax * (1 + policy.heroHpPct)));
      h.hp = h.hpMax;
    }
    if (policy?.heroAtkPct) h.atk = Math.max(1, Math.round(h.atk * (1 + policy.heroAtkPct)));
    const battleMonsters = monsters
      .filter((m) => m.state === "active" || m.state === "negative")
      .map((m) => ({
        ...m,
        hp: Math.round(m.hp * (1 + (policy?.monsterHpPct ?? 0))),
        bonusAtkMult: m.bonusAtkMult * (1 + prepTeamAtkPctRef.current + (policy?.monsterAtkPct ?? 0)),
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
    mechanismEventFiredRef.current = false;
    setBattleEnded(null);
    setLogs([]);
    logIdRef.current = 0;
    setGameState("BATTLE");

    // T03 战斗开场日志
    pushLog(TRIGGERS.T03.body, "system");
    if (variant) pushLog(`本波勇者词缀：${variant.title}（${variant.desc}）`, "system");
    if (policy) pushLog(`本日经营方针：${policy.title}。`, "system");

    // FIX #3: 启动循环使用 speedRef
    window.setTimeout(() => doTick(), 600 / speedRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, monsters, showToast, pushLog]);

  // 检查是否触发事件
  const tryTriggerEvent = useCallback(
    (round: number, excludeIds?: Set<string>): (GameEvent & { _relMonsterId?: string }) | null => {
      if (eventsCountRef.current >= BALANCE.MAX_EVENTS) return null;
      const ms = monstersRef.current;
      const h = heroRef.current;
      if (!h) return null;
      const aliveM = ms.filter((m) => m.state !== "dead" && m.state !== "quit");
      const poolIds = level.eventPool.filter((id) => !triggeredEventsRef.current.has(id) && !(excludeIds?.has(id)));

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
          case "round_2_random":
            cond = round === 2;
            break;
          case "round_4_random":
            cond = round === 4;
            break;
          case "monster_count_3_round4":
            cond = round === 4 && aliveM.length >= 3;
            break;
          case "hero_hp_below_50":
            cond = h.hp / h.hpMax < 0.5;
            break;
          case "late_battle_random":
            cond = round >= 6;
            break;
          case "round_3_random":
            cond = round === 3;
            break;
        }
        if (cond && !relMonster && ev.cardText.includes("[怪物名]")) relMonster = pick(aliveM);
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
        pausedRef.current = true;
        clearTick();
        setMonsters([...ms]);
        setHero({ ...h });
        const forcedEvent: GameEvent = {
          id: "__FORCED_DEATH__",
          triggerCondition: "",
          triggerProbability: 1,
          availableLevels: [],
          cardText: `勇者突然觉醒了隐藏血脉，全身散发出耀眼的金色光芒！一道毁灭性的剑气直接贯穿了 ${lowest.name}，这一击无法闪避……`,
          options: [
            { label: "挺身而出挡在前面", sub: "（但腿已经在抖了）", effect: {} },
            { label: "紧急拨打工伤保险热线", sub: "（无人接听）", effect: {} },
          ],
          timeoutDefault: 0,
        };
        setPendingEvent({ event: forcedEvent, monsterId: lowest.id });
        setEventTimeLeft(BALANCE.EVENT_TIMEOUT_S);
        setEventIsTutorial(false);
        return;
      }
    }

    // ── 勇者机制事件卡片弹出（每场战斗仅一次） ──
    if (result.heroMechanismTriggered && !mechanismEventFiredRef.current) {
      const pool = HERO_MECHANISM_EVENTS[result.heroMechanismTriggered];
      if (pool && pool.length > 0) {
        const card = pool[Math.floor(Math.random() * pool.length)];
        mechanismEventFiredRef.current = true;
        pausedRef.current = true;
        clearTick();
        setMonsters([...ms]);
        setHero({ ...h });
        setPendingMechanismEvent(card);
        return;
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

    // FIX #5: 勇者首次暴击时直接检查 B07 是否在 eventPool 中
    if (result.heroCritThisRound && level.eventPool.includes("B07") && !triggeredEventsRef.current.has("B07")) {
      const b07 = EVENTS["B07"];
      if (b07 && eventsCountRef.current < BALANCE.MAX_EVENTS) {
        const aliveForB07 = ms.filter((m) => m.state !== "dead" && m.state !== "quit");
        const relMonster = aliveForB07.length > 0 ? pick(aliveForB07) : undefined;
        triggeredEventsRef.current.add("B07");
        eventsCountRef.current += 1;
        pausedRef.current = true;
        clearTick();
        setPendingEvent({ event: b07, monsterId: relMonster?.id });
        setEventTimeLeft(BALANCE.EVENT_TIMEOUT_S);
        setEventIsTutorial(false);
        return;
      }
    }

    // 事件触发（排除 B07 避免重复）
    const ev = tryTriggerEvent(round, new Set(["B07"]));
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

    // FIX #3: 继续下一 tick 使用 speedRef
    clearTick();
    tickRef.current = window.setTimeout(() => doTick(), BALANCE.ROUND_TICK_MS / speedRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pushLog, tryTriggerEvent, level]);

  const toggleSpeed = useCallback(() => {
    setSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1));
  }, []);

  // ───────── 事件选择 ─────────
  const applyEventEffect = useCallback(
    (ev: GameEvent, optIdx: 0 | 1, monsterId?: string) => {
      // 特殊事件：强制阵亡（两个选项结果相同）
      if (ev.id === "__FORCED_DEATH__") {
        const ms = monstersRef.current;
        const target = monsterId ? ms.find((m) => m.id === monsterId) : undefined;
        if (target) {
          target.hp = 0;
          target.state = "dead";
          anyDeadThisBattleRef.current = true;
          pushLog(`${target.name} 力竭倒下。HR 系统记录在案。`, "death");
        }
        setMonsters([...ms]);
        return;
      }

      const effect = ev.options[optIdx].effect;
      const ms = monstersRef.current;
      const h = heroRef.current;
      if (!h) return;

      const relM = monsterId ? ms.find((m) => m.id === monsterId) : undefined;

      // FIX #4: 费用检查使用 shardsRef 获取最新值
      let costPaid = true;
      if (typeof effect.cost === "number") {
        const currentShards = shardsRef.current;
        if (currentShards >= (effect.cost as number)) {
          setShards((s) => s - (effect.cost as number));
        } else {
          showToast("灵魂碎片不足，效果未生效。");
          costPaid = false;
        }
      }
      if (!costPaid) return;

      if (typeof effect.shards === "number") setShards((s) => s + (effect.shards as number));
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
      if (typeof effect.team_atk_pct_battle === "number") {
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
      // ─── 新增事件效果（v0.24） ───
      if (effect.tank_absorb_all) {
        // TANK 承受全部伤害（HP-15%），其余不受影响
        const tanks = ms.filter((m) => m.state !== "dead" && m.template === "MON_TANK");
        for (const t of tanks) {
          t.hp = Math.max(1, Math.round(t.hp * 0.85));
        }
      }
      if (effect.psy_war_atk) {
        // 50% 成功免费获得 +10% 攻击；50% 失败全员攻击 -5%
        if (Math.random() < 0.5) {
          for (const m of ms) if (m.state !== "dead") m.bonusAtkMult *= 1.1;
          showToast("豁免成功！全员攻击 +10%");
        } else {
          for (const m of ms) if (m.state !== "dead") m.bonusAtkMult *= 0.95;
          showToast("豁免失败…全员攻击 -5%");
        }
      }
      if (typeof effect.hero_atk_pct_next_round === "number") {
        h.atkPctNextRound += effect.hero_atk_pct_next_round as number;
      }
      if (typeof effect.tank_hp_pct === "number") {
        const tanks = ms.filter((m) => m.state !== "dead" && m.template === "MON_TANK");
        for (const t of tanks) {
          t.hp = Math.min(t.hpMax, Math.round(t.hp * (1 + (effect.tank_hp_pct as number))));
        }
      }

      setMonsters([...ms]);
      setHero({ ...h });
    },
    [showToast, pushLog]
  );

  // FIX #3: resumeAfterEvent uses speedRef
  const resumeAfterEvent = useCallback(() => {
    setPendingEvent(null);
    pausedRef.current = false;
    clearTick();
    tickRef.current = window.setTimeout(() => doTick(), 500 / speedRef.current);
  }, [doTick]);



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

  // 勇者机制事件卡片选择（纯展示通知，选项不影响实际效果，效果已在engine层生效）
  const chooseMechanismOption = useCallback(
    (_idx: 0 | 1) => {
      setPendingMechanismEvent(null);
      pausedRef.current = false;
      clearTick();
      tickRef.current = window.setTimeout(() => doTick(), 500 / speedRef.current);
    },
    [doTick]
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
        deleteSave();
        setHasSave(false);
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
        pension = Math.round(pension * prepPensionMultRef.current * (activePolicyRef.current?.pensionMult ?? 1));

        // 存活者升级（条件：存活且有效伤害>0）
        const leveledUp: string[] = [];
        const goalCompleted: string[] = [];
        const totalDamage = ms.reduce((s, m) => s + m.damageDealt, 0);
        for (const m of survived) {
          m.battlesSurvived += 1;
          m.careerDamage += m.damageDealt;
          if (!m.goalCompleted) {
            const goalDone =
              (m.personalGoal.id === "survive_2" && m.battlesSurvived >= 2) ||
              (m.personalGoal.id === "deal_200" && m.careerDamage >= 200) ||
              (m.personalGoal.id === "no_bonus_survive" && !m.receivedBonusThisBattle) ||
              (m.personalGoal.id === "reach_level_3" && m.level >= 3);
            if (goalDone) {
              completePersonalGoal(m, goalCompleted);
            }
          }
          m.bonusAtkMult = 1.0; // 奖金本场结束
          m.receivedBonusThisBattle = false;
          m.runtimeTraits = [];
          // 消极怠工场次递减
          if (m.slackerBattlesLeft > 0) {
            m.slackerBattlesLeft -= 1;
          }
          if (checkLevelUp(m)) {
            applyLevelUp(m);
            leveledUp.push(m.id);
          }
          if (!m.goalCompleted && m.personalGoal.id === "reach_level_3" && m.level >= 3) {
            completePersonalGoal(m, goalCompleted);
          }
          m.hp = Math.min(m.hp, m.hpMax);
          // 战后恢复：存活怪物恢复 50% 已损失 HP
          const lost = m.hpMax - m.hp;
          if (lost > 0) {
            m.hp = Math.min(m.hpMax, m.hp + Math.round(lost * BALANCE.POST_BATTLE_HEAL_RATIO));
          }
        }

        // 通关绩效提成
        const reward = calcRewardOnClear(survived.length, totalDamage);
        reward.total = Math.round(reward.total * prepRewardMultRef.current * (activePolicyRef.current?.rewardMult ?? 1));

        // 扣抚恤金 + 加绩效提成
        setShards((s) => Math.max(0, s - pension + reward.total));
        goalCompleted.forEach(showToast);

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
    [level, showToast]
  );

  // ───────── EVAL 继续 ─────────
  function buildGrowthChoices(m: Monster): GrowthChoice[] {
    const pool = GROWTH_CHOICES.filter((c) => c.id !== "reveal_trait" || (!!m.traitHidden && !m.traitHiddenRevealed));
    const out: GrowthChoice[] = [];
    const copy = [...pool];
    while (out.length < 3 && copy.length > 0) {
      const idx = Math.floor(Math.random() * copy.length);
      out.push(copy.splice(idx, 1)[0]);
    }
    return out;
  }

  function applyPersonalGoalReward(m: Monster): string {
    const reward = m.personalGoal.reward;
    if (reward.atk) {
      m.baseAtk += reward.atk;
      m.atk += reward.atk;
    }
    if (reward.hpMax) {
      m.baseHpMax += reward.hpMax;
      m.hpMax += reward.hpMax;
      m.hp = Math.min(m.hpMax, m.hp + reward.hpMax);
    }
    if (reward.critRate) {
      m.critRate = Math.min(BALANCE.LEVELUP_CRIT_CAP, Math.round((m.critRate + reward.critRate) * 100) / 100);
    }
    return reward.atk || reward.hpMax || reward.critRate ? m.personalGoal.rewardText : "属性提升";
  }

  function completePersonalGoal(m: Monster, goalCompleted: string[]) {
    m.goalCompleted = true;
    const rewardText = applyPersonalGoalReward(m);
    goalCompleted.push(`${m.name} 完成个人目标「${m.personalGoal.title}」(${rewardText})`);
  }

  function openNegotiationOrFinish() {
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
  }

  const proceedEval = useCallback(() => {
    setEvalOpen(false);
    const ms = monstersRef.current;
    const active = ms.filter((m) => m.state === "active" || m.state === "negative");
    const leveled = active.filter((m) => evalData?.leveledUp.includes(m.id));
    const pool = leveled.length > 0 ? leveled : active;
    const fairPool = pool.length > 1 ? pool.filter((m) => m.id !== lastGrowthMonsterIdRef.current) : pool;
    const candidates = fairPool.length > 0 ? fairPool : pool;
    const growthTarget = candidates.length > 0 ? pick(candidates) : undefined;
    if (growthTarget) {
      lastGrowthMonsterIdRef.current = growthTarget.id;
      setGrowth({ monsterId: growthTarget.id, choices: buildGrowthChoices(growthTarget) });
      return;
    }

    openNegotiationOrFinish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evalData, level]);

  const chooseGrowth = useCallback(
    (choice: GrowthChoice) => {
      if (!growth) return;
      const ms = monstersRef.current;
      const m = ms.find((x) => x.id === growth.monsterId);
      if (!m) {
        setGrowth(null);
        openNegotiationOrFinish();
        return;
      }
      if (choice.id === "atk_training") {
        m.baseAtk += 1;
        m.atk += 1;
      } else if (choice.id === "hp_benefits") {
        m.baseHpMax += 6;
        m.hpMax += 6;
        m.hp = Math.min(m.hpMax, m.hp + 6);
      } else if (choice.id === "salary_review") {
        m.salary = Math.max(1, m.salary - 1);
      } else if (choice.id === "reveal_trait" && m.traitHidden) {
        m.traitHiddenRevealed = true;
      } else if (choice.id === "crit_drill") {
        m.critRate = Math.min(BALANCE.LEVELUP_CRIT_CAP, Math.round((m.critRate + 0.02) * 100) / 100);
      }
      setMonsters([...ms]);
      setGrowth(null);
      showToast(`${m.name} 完成成长项目：${choice.title}`);
      openNegotiationOrFinish();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [growth, showToast]
  );

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
          showToast(`${m.name} 谈薪被拒，触发『消极怠工』（本场攻击×0.75，下场×0.85）。`);
        }
        setMonsters([...ms]);
      }
      setNegotiate(null);
      finishEval();
    },
    [negotiate, showToast, finishEval]
  );

  // ───────── 解雇 ─────────
  const openDismiss = useCallback((monsterId?: string) => {
    setDismissTargetId(monsterId ?? null);
    setDismissOpen(true);
  }, []);
  const closeDismiss = useCallback(() => {
    setDismissOpen(false);
    setDismissTargetId(null);
  }, []);
  const dismissMonster = useCallback(
    (monsterId: string) => {
      const target = monstersRef.current.find((m) => m.id === monsterId);
      if (!target) {
        setDismissOpen(false);
        setDismissTargetId(null);
        return;
      }
      const cost = dismissCost(target);
      if (shardsRef.current < cost) {
        showToast("灵魂碎片不足，无法支付辞退补偿金。");
        return;
      }
      setShards((prev) => Math.max(0, prev - cost));
      setMonsters((prev) => prev.filter((m) => m.id !== monsterId));
      setDismissOpen(false);
      setDismissTargetId(null);
      showToast("已支付 " + cost + " 碎片辞退补偿金，解雇 " + target.name + "。");
    },
    [dismissCost, showToast]
  );

  // ───────── 转职系统 ─────────
  const canJobChange = useCallback(
    (m: Monster) => {
      if (m.advancedClass !== null) return false;
      if (m.state !== "active") return false;
      if (m.level < 3) return false;
      return true;
    },
    []
  );

  const openJobChange = useCallback(
    (monsterId: string) => {
      const m = monstersRef.current.find((mon) => mon.id === monsterId);
      if (!m || !canJobChange(m)) return;
      setJobChangeTargetId(monsterId);
      setJobChangeOpen(true);
    },
    [canJobChange]
  );

  const closeJobChange = useCallback(() => {
    setJobChangeOpen(false);
    setJobChangeTargetId(null);
  }, []);

  const applyJobChangeAction = useCallback(
    (monsterId: string, option: JobChangeOption) => {
      if (ap < 1) {
        showToast("行动点不足！");
        return;
      }
      const cost = option.cost;
      if (shards < cost) {
        showToast(`碎片不足！需要 ${cost} 碎片。`);
        return;
      }
      setAp((a) => a - 1);
      setShards((s) => s - cost);
      setMonsters((prev) =>
        prev.map((m) => {
          if (m.id !== monsterId) return m;
          return applyJobChange({ ...m }, option);
        })
      );
      setJobChangeOpen(false);
      setJobChangeTargetId(null);
      showToast(`转职成功！${option.label} 已就位。`);
    },
    [ap, shards, showToast]
  );

  // ───────── 重新开始该轮次（恢复到本关准备阶段开始时的快照） ─────────
  const restartRound = useCallback(() => {
    clearTick();
    if (prepSnapshotRef.current) {
      const snap = prepSnapshotRef.current;
      setShards(snap.shards);
      setAp(snap.ap);
      setSlots(snap.slots);
      setMonsters(snap.monsters.map((m) => ({ ...m, runtimeTraits: [...m.runtimeTraits] })));
      setResumePool(snap.resumePool.map((r) => ({ ...r })));
      setRecruitRefreshLeft(snap.recruitRefreshLeft);
      setFreeRecruitRefreshLeft(snap.freeRecruitRefreshLeft);
      usedFlagsRef.current = new Set(snap.usedFlags);
      // 关闭所有弹窗
      setRecruitOpen(false);
      setResumeShowHint(false);
      setBonusOpen(false);
      setBonusTargetId(null);
      setTrainingOpen(false);
      setTrainingTargetId(null);
      setDismissOpen(false);
      setPrepEvent(null);
      setDailyPolicyChoices([]);
      setActivePolicy(null);
      setGrowth(null);
      setNegotiate(null);
      setEvalOpen(false);
      setEvalData(null);
      setPendingEvent(null);
      setHero(null);
      setBattleEnded(null);
      setLogs([]);
      setToasts([]);
      setGameState("MAIN_PREP");
      prepRewardMultRef.current = 1;
      prepPensionMultRef.current = 1;
      prepTeamAtkPctRef.current = 0;
      showToast("已重新开始该轮次。");
    }
  }, [showToast]);

  // ───────── 重新开始（完全重置，清除存档回标题） ─────────
  const restart = useCallback(() => {
    clearTick();
    deleteSave();
    setHasSave(false);
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
    setRecruitRefreshLeft(2);
    setFreeRecruitRefreshLeft(0);
    setBonusOpen(false);
    setBonusTargetId(null);
    setTrainingOpen(false);
    setTrainingTargetId(null);
    setPendingEvent(null);
    setPrepEvent(null);
    setDailyPolicyChoices([]);
    setActivePolicy(null);
    setGrowth(null);
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
    prepRewardMultRef.current = 1;
    prepPensionMultRef.current = 1;
    prepTeamAtkPctRef.current = 0;
  }, []);

  // 清理
  useEffect(() => () => clearTick(), []);

  return {
    tutorialOpen,
    closeTutorial,
    hasSave,
    loadGame,
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
    freeRecruitRefreshLeft,
    refreshRecruitPool,
    bonusOpen,
    bonusTargetId,
    trainingOpen,
    trainingTargetId,
    pendingEvent,
    eventTimeLeft,
    eventIsTutorial,
    prepEvent,
    dailyPolicyChoices,
    activePolicy,
    growth,
    negotiate,
    evalOpen,
    evalData,
    dismissOpen,
    healOpen,
    dismissTargetId,
    healTargetId,
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
    openTraining,
    closeTraining,
    applyTraining: applyTrainingAction,
    trainingCost,
    dismissCost,
    openHeal,
    closeHeal,
    healCost,
    healMonster,
    doLabor,
    startBattle,
    toggleSpeed,
    chooseEventOption,
    choosePrepEventOption,
    choosePolicy,
    chooseGrowth,
    proceedEval,
    openDismiss,
    closeDismiss,
    dismissMonster,
    answerNegotiate,
    restart,
    restartRound,
    canBuild,
    buildCost,
    // 转职系统
    jobChangeOpen,
    jobChangeTargetId,
    jobChangeOptions: (() => {
      if (!jobChangeTargetId) return null;
      const target = monsters.find((m) => m.id === jobChangeTargetId);
      if (!target) return null;
      return getJobChangeOptions(target);
    })(),
    openJobChange,
    closeJobChange,
    applyJobChangeAction,
    canJobChange,
    // 勇者机制事件卡片
    pendingMechanismEvent,
    chooseMechanismOption,
  };
}

