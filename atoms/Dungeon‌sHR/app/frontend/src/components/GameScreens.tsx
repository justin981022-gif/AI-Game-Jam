// 主屏组件：准备阶段 / 战斗界面 / EVAL 绩效屏的内容区
// 所有视觉装饰使用 art 图片驱动，CSS 仅用于布局
import { useEffect, useRef, useState } from "react";
import { ADVANCED_CLASS_LABEL, ART, BALANCE, HEROES, LEVELS, TEMPLATE_LABEL, TRAITS } from "@/game/data";
import type { Hero, LogEntry, Monster } from "@/game/types";
import type { UseGameApi } from "@/game/useGame";

/* ─── 通用样式常量 ─── */
const TXT = "drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]";
const TXT_SM = "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]";

/* ─── 自定义按钮：ART.btn 作为完整背景，无 CSS 渐变/边框/阴影 ─── */
export function GameBtn({
  onClick,
  disabled,
  children,
  className = "",
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center px-5 py-3 rounded-lg text-[#3D3A36] font-bold text-base transition-all
        active:brightness-90 active:scale-95 disabled:opacity-50 disabled:grayscale-[0.3] disabled:cursor-not-allowed
        hover:brightness-110 hover:scale-[1.02] hover:-translate-y-[1px] hover:shadow-md ${className}`}
      style={{
        borderImage: `url(${ART.btn}) 16 fill / 16px / 0 stretch`,
        border: "none",
        background: "transparent",
      }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* ─── 准备阶段动作按钮：规范化两行排版 ─── */
function ActionBtn({
  onClick,
  disabled,
  icon,
  name,
  cost,
  sub,
}: {
  onClick?: () => void;
  disabled?: boolean;
  icon: string;
  name: string;
  cost: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative flex flex-col justify-center w-full h-[54px] px-3 rounded-lg text-left transition-all sm:h-[60px] sm:px-4
        active:brightness-90 active:scale-95 disabled:opacity-50 disabled:grayscale-[0.3] disabled:cursor-not-allowed
        hover:brightness-110 hover:scale-[1.02] hover:-translate-y-[1px] hover:shadow-md"
      style={{
        borderImage: `url(${ART.btn}) 16 fill / 16px / 0 stretch`,
        border: "none",
        background: "transparent",
      }}
    >
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="min-w-0 truncate text-[14px] font-bold text-[#3D3A36] sm:text-[16px]">{icon} {name}</span>
        <span className="shrink-0 text-[12px] text-[#3D3A36]/90 sm:text-[14px]">{cost}</span>
      </div>
      <div className="relative z-10">
        <span className="block truncate text-[11px] text-[#3D3A36]/60 sm:text-[12px]">{sub}</span>
      </div>
    </button>
  );
}

/* ─── HP Bar：ART.hpbar 作为完整外框 ─── */
function hpColor(ratio: number) {
  if (ratio > 0.6) return "#10b981";
  if (ratio > 0.3) return "#f59e0b";
  return "#e11d48";
}

function HpBar({ hp, max }: { hp: number; max: number }) {
  const ratio = Math.max(0, Math.min(1, hp / max));
  return (
    <div
      className="relative w-full h-5 overflow-hidden"
      style={{
        backgroundImage: `url(${ART.hpbar})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute top-[3px] bottom-[3px] left-[3px] rounded-sm transition-all duration-500"
        style={{ width: `${ratio * 96}%`, backgroundColor: hpColor(ratio) }}
      />
      <span className={`absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold ${TXT_SM}`}>
        {Math.round(hp)}/{max}
      </span>
    </div>
  );
}

/* ─── 碎片图标 ─── */
export function ShardIcon({ size = 20 }: { size?: number }) {
  return <img src={ART.shardIcon} alt="碎片" className="inline-block" style={{ width: size, height: size }} />;
}

/* ─── 怪物槽位卡片 ─── */
export function MonsterCard({
  m,
  showHidden = false,
  compact = false,
  onBonus,
  bonusDisabled = false,
  onTraining,
  trainingDisabled = false,
  onJobChange,
  jobChangeDisabled = false,
  jobChangeTooltip,
  onHeal,
  healDisabled = false,
  healCostValue,
}: {
  m: Monster;
  showHidden?: boolean;
  compact?: boolean;
  onBonus?: () => void;
  bonusDisabled?: boolean;
  onTraining?: () => void;
  trainingDisabled?: boolean;
  onJobChange?: () => void;
  jobChangeDisabled?: boolean;
  jobChangeTooltip?: string;
  onHeal?: () => void;
  healDisabled?: boolean;
  healCostValue?: number;
}) {
  const dead = m.state === "dead";
  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all h-full ${dead ? "opacity-50 grayscale" : ""} ${compact ? "p-2" : "p-2.5 sm:p-3 sm:min-w-[160px]"} flex flex-col`}
      style={{
        backgroundColor: "#F2EDE0",
        border: "1px solid rgba(61,58,54,0.5)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      }}
    >
      {!compact && (onTraining || (onJobChange && !m.advancedClass) || onHeal) && (
        <div className="absolute left-2 top-2 z-20 flex flex-col gap-1">
          {onTraining && (
            <button
              onClick={onTraining}
              disabled={trainingDisabled}
              className="rounded-full border border-cyan-300 bg-cyan-100 px-2 py-1 text-[10px] font-bold leading-none text-cyan-800 shadow-sm transition hover:bg-cyan-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45"
              title="单独培训：消耗 1 行动点和灵魂碎片，使怪物升级"
            >
              🎓 培训
            </button>
          )}
          {onJobChange && !m.advancedClass && (
            <button
              onClick={onJobChange}
              disabled={jobChangeDisabled}
              className="rounded-full border border-violet-300 bg-violet-100 px-2 py-1 text-[10px] font-bold leading-none text-violet-800 shadow-sm transition hover:bg-violet-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45"
              title={jobChangeTooltip ?? "转职：消耗 1 行动点和碎片，选择进阶职业"}
            >
              ⚡ 转职
            </button>
          )}
          {onHeal && (
            <button
              onClick={onHeal}
              disabled={healDisabled}
              className="rounded-full border border-green-300 bg-green-100 px-2 py-1 text-[10px] font-bold leading-none text-green-800 shadow-sm transition hover:bg-green-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45"
              title={`治疗：消耗 ${healCostValue ?? "?"} 碎片，HP 回满（不消耗行动点）`}
            >
              💊 治疗{healCostValue != null ? ` (${healCostValue})` : ""}
            </button>
          )}
        </div>
      )}
      {!compact && onBonus && (
        <button
          onClick={onBonus}
          disabled={bonusDisabled}
          className="absolute right-2 top-2 z-20 rounded-full border border-amber-300 bg-amber-100 px-2 py-1 text-[10px] font-bold leading-none text-amber-800 shadow-sm transition hover:bg-amber-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-45"
          title="发奖金：消耗 1 行动点，选择一档临时提升本场攻击"
        >
          💰 奖金
        </button>
      )}
      <div className="relative z-10 flex flex-1 flex-col items-center gap-1 overflow-hidden">
        {/* BUST 头像 */}
        <img src={m.artUrl} alt={m.name} className={`${compact ? "h-12 w-12" : "h-12 w-12 sm:h-14 sm:w-14"} flex-shrink-0 rounded-lg object-cover`} />
        {/* 名字 + LV */}
        <div
          className="flex min-h-[1.6rem] w-full items-center justify-center break-words text-center text-[13px] font-bold leading-tight text-[#3D3A36] [overflow-wrap:anywhere] sm:text-sm"
          title={m.name}
        >
          {m.name}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1 text-[10px] text-[#3D3A36]/70">
          <span>Lv.{m.level}</span>
          <span
            className={`inline-flex cursor-help items-center gap-0.5 rounded-full border px-1.5 py-[1px] text-[9px] font-bold leading-tight ${TEMPLATE_LABEL[m.template]?.bg ?? ""} ${TEMPLATE_LABEL[m.template]?.color ?? ""}`}
            title={TEMPLATE_LABEL[m.template]?.desc}
          >
            {TEMPLATE_LABEL[m.template]?.icon} {TEMPLATE_LABEL[m.template]?.label ?? m.role}
          </span>
          {m.advancedClass && ADVANCED_CLASS_LABEL[m.advancedClass] && (
            <span
              className={`inline-flex cursor-help items-center gap-0.5 rounded-full border px-1.5 py-[1px] text-[9px] font-bold leading-tight ${ADVANCED_CLASS_LABEL[m.advancedClass].bg} ${ADVANCED_CLASS_LABEL[m.advancedClass].color}`}
              title={ADVANCED_CLASS_LABEL[m.advancedClass].desc}
            >
              {ADVANCED_CLASS_LABEL[m.advancedClass].icon} {ADVANCED_CLASS_LABEL[m.advancedClass].label}
            </span>
          )}
        </div>
        {!compact && (
          <div
            className={`w-full rounded-md px-2 py-1 text-center text-[10px] font-semibold leading-tight ${
              m.goalCompleted ? "bg-emerald-100 text-emerald-800" : "bg-sky-50 text-slate-700"
            }`}
            title={`${m.personalGoal.desc} 完成奖励：${m.personalGoal.rewardText}。`}
          >
            目标：{m.personalGoal.title} · 奖励 {m.personalGoal.rewardText}{m.goalCompleted ? "（已生效）" : ""}
          </div>
        )}
        {/* 词条 chips */}
        {!compact && <SlotTraitChips m={m} showHidden={showHidden} />}
        {/* HP 条 */}
        <div className="w-full">
          <HpBar hp={m.hp} max={m.hpMax} />
        </div>
        {/* 攻击 / 日薪 / 暴击率 */}
        <div className="grid w-full grid-cols-3 items-center gap-1 text-[11px] text-[#3D3A36] mt-0.5">
          <span>攻击 {m.atk}</span>
          <span className="flex items-center justify-center gap-0.5 text-amber-800">
            日薪 {m.salary}
            <ShardIcon size={10} />
          </span>
          <span className="text-right text-amber-700">暴击率 {Math.round(m.critRate * 100)}%</span>
        </div>
      </div>
    </div>
  );
}

/* 槽位卡专用词条 chips — CSS 圆角小标签 */
function SlotTraitChips({ m, showHidden }: { m: Monster; showHidden: boolean }) {
  const visible = m.traitsVisible || [];
  const hidden = m.traitHidden;
  const runtime = m.runtimeTraits || [];
  if (visible.length === 0 && !hidden && runtime.length === 0 && m.slackerBattlesLeft <= 0) return null;
  return (
    <div className="flex max-h-[3rem] flex-wrap justify-center gap-1 overflow-hidden">
      {visible.map((t) => (
        <span key={t} title={TRAITS[t]?.desc ?? ""} className="cursor-help rounded-full border border-emerald-300 bg-emerald-100 px-1.5 py-0.5 text-[10px] leading-none text-emerald-800">
          {TRAITS[t]?.name ?? t}
        </span>
      ))}
      {showHidden && hidden && (
        <span title={TRAITS[hidden]?.desc ?? ""} className="cursor-help rounded-full border border-amber-300 bg-amber-100 px-1.5 py-0.5 text-[10px] leading-none text-amber-800">
          🔒 {TRAITS[hidden]?.name ?? hidden}
        </span>
      )}
      {runtime.map((t) => (
        <span key={t} title={TRAITS[t]?.desc ?? ""} className="cursor-help rounded-full border border-indigo-300 bg-indigo-100 px-1.5 py-0.5 text-[10px] leading-none text-indigo-800">
          {TRAITS[t]?.name ?? t}
        </span>
      ))}
      {m.slackerBattlesLeft > 0 && (
        <span className="rounded-full border border-rose-300 bg-rose-100 px-1.5 py-0.5 text-[10px] leading-none text-rose-800">
          消极怠工({m.slackerBattlesLeft}场)
        </span>
      )}
    </div>
  );
}

function LevelProgress({ idx }: { idx: number }) {
  return (
    <div
      className="max-w-full overflow-x-auto rounded-lg px-2 py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-3"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <div className="flex min-w-max items-center justify-center gap-0">
      {LEVELS.map((lv, i) => {
        const nodeColor = i === idx ? "#C97B5C" : i < idx ? "#8FA89B" : "#B8B5A8";
        // Line color: if both sides are passed, use dark; otherwise light
        const lineColor = i < idx ? "#8FA89B" : "#B8B5A8";
        return (
          <div key={lv.id} className="flex items-center">
            <div
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8"
              style={{
                backgroundColor: nodeColor,
                border: "2px solid #3D3A36",
              }}
            >
              <span className={`text-[7px] font-bold text-white sm:text-[10px] ${TXT_SM}`}>{lv.id}</span>
            </div>
            {i < LEVELS.length - 1 && (
              <div className="h-1 w-1.5 sm:w-6" style={{ backgroundColor: lineColor }} />
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}

/* ─── AP Tooltip ─── */
function ApTooltip({ ap, apMax }: { ap: number; apMax: number }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 cursor-help whitespace-nowrap"
      title="行动点每关刷新。招募、发奖金、单独培训、打零工各消耗 1 行动点。"
    >
      <span className="text-lg">{"\u26A1"}</span>
      <span>行动点 {ap}/{apMax}</span>
      <span className="text-xs opacity-70">❓</span>
    </div>
  );
}

export function TopBar({ g }: { g: UseGameApi }) {
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [shardAnim, setShardAnim] = useState<"" | "gain" | "lose">("");
  const prevShardsRef = useRef(g.shards);

  useEffect(() => {
    const prev = prevShardsRef.current;
    prevShardsRef.current = g.shards;
    if (g.shards > prev) {
      setShardAnim("gain");
      setTimeout(() => setShardAnim(""), 500);
    } else if (g.shards < prev) {
      setShardAnim("lose");
      setTimeout(() => setShardAnim(""), 500);
    }
  }, [g.shards]);

  const shardAnimClass = shardAnim === "gain"
    ? "animate-[shardPulseGain_0.5s_ease-out]"
    : shardAnim === "lose"
    ? "animate-[shardPulseLose_0.5s_ease-out]"
    : "";

  return (
    <div
      className="relative flex flex-col gap-2 overflow-hidden rounded-xl px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-2.5"
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
      }}
    >
      <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 sm:w-auto sm:gap-4">
        <div className={`flex items-center gap-1.5 text-sm font-semibold sm:gap-2 sm:text-lg ${g.economyWarning ? "text-rose-300 animate-pulse" : "text-violet-200"} ${TXT}`}>
          <ShardIcon size={28} />
          <span className={shardAnimClass}>灵魂碎片 {g.shards}</span>
          {g.economyWarning && (
            <span className="rounded border border-rose-200/25 bg-black/70 px-1.5 py-0.5 text-[10px] text-rose-100 backdrop-blur-[1px]">储备告急</span>
          )}
        </div>
        <div className={`flex items-center gap-2 text-sm font-semibold text-sky-200 sm:text-lg ${TXT}`}>
          <ApTooltip ap={g.ap} apMax={g.apMax} />
        </div>
        {g.activePolicy && (
          <div className={`hidden md:block text-xs text-amber-100 font-semibold ${TXT_SM}`} title={g.activePolicy.desc}>
            方针：{g.activePolicy.title}
          </div>
        )}
      </div>
      <div className="flex w-full min-w-0 items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-3">
        <button className="w-8 h-8 overflow-hidden hover:brightness-125 transition" title="重新开始" onClick={() => setConfirmRestart(true)}>
          <img src={ART.icoRestart} alt="重新开始" className="w-full h-full object-cover" />
        </button>
        <div className="min-w-0 flex-1 text-right sm:ml-2 sm:flex-none">
          <div className={`truncate text-xs font-bold text-amber-200 sm:text-sm ${TXT}`}>{g.levelId} · {g.levelTitle}</div>
          <LevelProgress idx={g.levelIndex} />
        </div>
      </div>

      {/* 重新开始选项弹窗 */}
      {confirmRestart && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60" onClick={() => setConfirmRestart(false)}>
          <div
            className="mx-4 w-full max-w-xs rounded-2xl p-5 text-center"
            style={{ backgroundColor: "#F2EDE0", border: "3px solid #3D3A36" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[#3D3A36] font-bold text-base mb-4">选择重新开始方式</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setConfirmRestart(false);
                  g.restartRound();
                }}
                className="w-full rounded-lg border border-amber-400 bg-amber-100 px-4 py-2.5 text-sm font-bold text-[#3D3A36] transition hover:brightness-105 active:scale-95"
              >
                🔄 重新开始该轮次
              </button>
              <button
                onClick={() => {
                  setConfirmRestart(false);
                  g.restart();
                }}
                className="w-full rounded-lg border border-rose-400 bg-rose-100 px-4 py-2.5 text-sm font-bold text-rose-700 transition hover:brightness-105 active:scale-95"
              >
                🏠 重新开始游戏
              </button>
              <button
                onClick={() => setConfirmRestart(false)}
                className="w-full rounded-lg border border-[#3D3A36]/20 bg-[#D8CCB8] px-4 py-2 text-sm font-bold text-[#3D3A36] transition hover:brightness-105 active:scale-95"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PrepScreen({ g }: { g: UseGameApi }) {
  const nextLevel = LEVELS[g.levelIndex];
  const heroPreview = nextLevel?.heroId;
  const heroMap = HEROES;
  const heroImage = (id: string) => {
    if (id === "HERO_W01") return ART.heroW01;
    if (id === "HERO_W02") return ART.heroW02;
    if (id === "HERO_W03") return ART.heroW03;
    if (id === "HERO_W04" || id === "HERO_W05") return ART.heroW04;
    return ART.heroElite;
  };
  const isL01 = g.levelId === "L01";
  const emptyCount = Math.max(0, g.slots - g.monsters.length);

  // Track newly added monsters for pop-in animation
  const prevMonsterIdsRef = useRef<Set<string>>(new Set(g.monsters.map((m) => m.id)));
  const [newMonsterIds, setNewMonsterIds] = useState<Set<string>>(new Set());
  // Track slot expansion
  const prevSlotsRef = useRef(g.slots);
  const [slotExpanded, setSlotExpanded] = useState(false);

  useEffect(() => {
    const prevIds = prevMonsterIdsRef.current;
    const currentIds = new Set(g.monsters.map((m) => m.id));
    const added = new Set<string>();
    currentIds.forEach((id) => { if (!prevIds.has(id)) added.add(id); });
    prevMonsterIdsRef.current = currentIds;
    if (added.size > 0) {
      setNewMonsterIds(added);
      setTimeout(() => setNewMonsterIds(new Set()), 600);
    }
  }, [g.monsters]);

  useEffect(() => {
    if (g.slots > prevSlotsRef.current) {
      setSlotExpanded(true);
      setTimeout(() => setSlotExpanded(false), 600);
    }
    prevSlotsRef.current = g.slots;
  }, [g.slots]);

  return (
    <div className="flex h-full flex-col gap-3 xl:flex-row">
      {/* 怪物槽位面板（全宽） */}
      <div className="flex-1 flex flex-col gap-3">
        <div
          className="relative overflow-hidden rounded-2xl p-3 sm:p-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            border: "2px solid rgba(61,58,54,0.5)",
          }}
        >
          <div className="relative z-10">
            <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
              <h2 className={`text-lg text-white font-bold flex items-center gap-2 ${TXT}`}>
                怪物槽位（{g.monsters.length}/{g.slots}）
              </h2>
              {isL01 && <span className={`text-xs text-amber-200 sm:text-sm ${TXT_SM}`}>入职第一天：先招募你的第一位员工</span>}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {g.monsters.map((m) => (
                <div key={m.id} className={`h-[210px] sm:h-[220px] xl:h-[230px] ${newMonsterIds.has(m.id) ? "animate-[popIn_0.5s_ease-out]" : ""}`}>
                  <MonsterCard
                    m={m}
                    showHidden
                    onTraining={m.state === "active" || m.state === "negative" ? () => g.openTraining(m.id) : undefined}
                    trainingDisabled={g.ap <= 0 || m.level >= BALANCE.LEVELUP_MAX || g.shards < g.trainingCost(m)}
                    onBonus={m.state === "active" || m.state === "negative" ? () => g.openBonus(m.id) : undefined}
                    bonusDisabled={g.ap <= 0}
                    onJobChange={!m.advancedClass && (m.state === "active" || m.state === "negative") ? () => g.openJobChange(m.id) : undefined}
                    jobChangeDisabled={!g.canJobChange(m) || g.ap <= 0}
                    jobChangeTooltip={
                      m.advancedClass ? undefined
                        : m.state === "negative" ? "消极怠工期间无法转职"
                        : m.level < 3 ? "需要达到 Lv.3 才能转职"
                        : g.ap <= 0 ? "行动点不足"
                        : "转职：消耗 1 行动点和碎片，选择进阶职业"
                    }
                    onHeal={m.state !== "dead" && m.hp < m.hpMax ? () => g.healMonster(m.id) : undefined}
                    healDisabled={m.hp >= m.hpMax || g.shards < g.healCost(m)}
                    healCostValue={g.healCost(m)}
                  />
                </div>
              ))}
              {Array.from({ length: emptyCount }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className={`flex h-[210px] flex-col items-center justify-center rounded-xl sm:h-[220px] xl:h-[230px] ${slotExpanded && i === emptyCount - 1 ? "animate-[slotExpand_0.5s_ease-out]" : ""}`}
                  style={{
                    backgroundColor: "rgba(184,181,168,0.5)",
                    border: "4px dashed #3D3A36",
                  }}
                >
                  <span className="text-[#3D3A36] text-3xl font-bold mb-1">+</span>
                  <span className="text-[#3D3A36] text-xs font-medium">空槽位</span>
                </div>
              ))}
              {/* +扩建 占位格：紧跟已有槽位后面 */}
              {g.slots < BALANCE.SLOT_MAX && (
                <button
                  onClick={g.doBuild}
                  disabled={!g.canBuild}
                  className="flex h-[210px] flex-col items-center justify-center rounded-xl transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40 sm:h-[220px] xl:h-[230px]"
                  style={{
                    backgroundColor: "rgba(184,181,168,0.3)",
                    border: "2px dashed #C97B5C",
                  }}
                >
                  <span className="text-[#C97B5C] text-3xl font-bold mb-1">＋</span>
                  <span className="text-[#C97B5C] text-xs font-medium flex items-center gap-1">扩建 ({g.buildCost}<ShardIcon size={12} />)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 右侧：动作按钮面板 */}
      <div className="flex w-full flex-col gap-3 xl:w-[280px]">
        <div
          className="rounded-2xl p-3 flex flex-col gap-2 flex-1"
          style={{
            backgroundColor: "rgba(232,226,213,0.8)",
            border: "3px solid #3D3A36",
            borderRadius: "16px",
          }}
        >
          <h2 className={`text-base text-[#3D3A36] font-bold`}>准备阶段</h2>
          <ActionBtn onClick={g.openRecruit} disabled={g.ap <= 0} icon="📋" name="招募" cost="1 行动点" sub="免费" />
          <ActionBtn onClick={g.doBuild} disabled={!g.canBuild} icon="🏗️" name="扩建" cost="1 行动点" sub={`${g.buildCost} 碎片`} />
          <ActionBtn onClick={g.doLabor} disabled={g.ap <= 0} icon="⛏️" name="打零工" cost="1 行动点" sub={`+${BALANCE.AP_TO_SHARD_RATE} 碎片`} />

          <div className="mt-auto pt-2">
            {nextLevel?.hasBattle ? (
              <>
                <GameBtn
                  onClick={g.startBattle}
                  disabled={g.monsters.length === 0}
                  className={`w-full text-sm h-[60px] ${g.ap === 0 ? "animate-pulse" : ""}`}
                >
                  ⚔️ 开战 →
                </GameBtn>
                <div className="text-[11px] text-[#3D3A36]/60 text-center mt-1">
                  准备就绪？点击开战开始勇者突袭
                </div>
              </>
            ) : (
              <>
                <GameBtn
                  onClick={g.advanceLevel}
                  disabled={false}
                  className={`w-full text-sm h-[60px] ${g.ap === 0 ? "animate-pulse" : ""}`}
                >
                  ✅ 结束准备 →
                </GameBtn>
                <div className="text-[11px] text-[#3D3A36]/60 text-center mt-1">
                  本关无战斗，完成准备后进入下一关
                </div>
              </>
            )}
          </div>

          {heroPreview && (
            <div
              className="relative mt-2 rounded-lg p-2 overflow-hidden"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div className="relative z-10 flex items-center gap-2">
                <img
                  src={heroImage(heroPreview)}
                  alt="hero"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <div className={`text-[11px] text-rose-200 font-semibold ${TXT_SM}`}>下波勇者</div>
                  <div className={`text-xs text-rose-100 font-semibold ${TXT}`}>{heroMap[heroPreview]?.name}</div>
                  <div className={`text-[10px] text-rose-200 ${TXT_SM}`}>血量 {heroMap[heroPreview]?.hp}</div>
                </div>
              </div>
            </div>
          )}

          {isL01 && (
            <div className={`text-[10px] text-[#3D3A36]/60 leading-relaxed mt-1`}>
              行动点每关刷新，合理分配行动点。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LogLine({ entry }: { entry: LogEntry }) {
  const colorMap: Record<LogEntry["kind"], string> = {
    info: "text-slate-200",
    system: "text-amber-200 font-semibold",
    monster: "text-emerald-200",
    hero: "text-rose-200",
    crit: "text-yellow-200 font-bold",
    death: "text-slate-400 italic",
    event: "text-violet-200",
  };
  return (
    <div className={`text-sm leading-relaxed ${colorMap[entry.kind]} ${TXT_SM}`}>
      {"> "}
      {entry.text}
    </div>
  );
}

/* ─── 战斗动效：伤害飘字 ─── */
interface DamageFloat {
  id: number;
  value: number;
  isCrit: boolean;
}

function DamageFloats({ floats }: { floats: DamageFloat[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-30">
      {floats.map((f) => (
        <span
          key={f.id}
          className={`absolute left-1/2 top-0 -translate-x-1/2 font-black animate-[floatUp_0.9s_ease-out_forwards] ${
            f.isCrit ? "text-yellow-300 text-xl" : "text-rose-300 text-sm"
          }`}
          style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}
        >
          -{f.value}{f.isCrit ? "!" : ""}
        </span>
      ))}
    </div>
  );
}

/* ─── 战斗中的怪物卡片（带动效） ─── */
function BattleMonsterCard({ m }: { m: Monster }) {
  const dead = m.state === "dead";
  const prevHpRef = useRef(m.hp);
  const [anim, setAnim] = useState<"" | "hit" | "crit" | "dead">("");
  const [floats, setFloats] = useState<DamageFloat[]>([]);
  const floatIdRef = useRef(0);

  useEffect(() => {
    const prevHp = prevHpRef.current;
    prevHpRef.current = m.hp;
    if (m.hp < prevHp) {
      const dmg = prevHp - m.hp;
      // Check if it's a crit by damage magnitude (>1.5x base would be crit, approximate)
      const isCrit = dmg > 20;
      const newFloat: DamageFloat = { id: floatIdRef.current++, value: dmg, isCrit };
      setFloats((prev) => [...prev, newFloat]);
      setTimeout(() => setFloats((prev) => prev.filter((f) => f.id !== newFloat.id)), 900);

      if (m.hp <= 0) {
        setAnim("dead");
      } else {
        setAnim(isCrit ? "crit" : "hit");
        setTimeout(() => setAnim(""), isCrit ? 500 : 300);
      }
    }
  }, [m.hp]);

  const animClass = anim === "hit"
    ? "animate-[shake_0.3s_ease-in-out]"
    : anim === "crit"
    ? "animate-[shakeHard_0.5s_ease-in-out] ring-2 ring-yellow-400/70"
    : anim === "dead"
    ? "animate-[fadeDown_0.8s_ease-out_forwards]"
    : "";

  return (
    <div className={`relative ${animClass} ${dead ? "opacity-40 grayscale" : ""}`}>
      <DamageFloats floats={floats} />
      <MonsterCard m={m} showHidden compact />
    </div>
  );
}

/* ─── 战斗中的勇者卡片（带动效） ─── */
function BattleHeroPanel({ hero }: { hero: Hero }) {
  const prevHpRef = useRef(hero.hp);
  const [anim, setAnim] = useState<"" | "hit" | "crit">("");
  const [floats, setFloats] = useState<DamageFloat[]>([]);
  const floatIdRef = useRef(0);

  useEffect(() => {
    const prevHp = prevHpRef.current;
    prevHpRef.current = hero.hp;
    if (hero.hp < prevHp) {
      const dmg = prevHp - hero.hp;
      const isCrit = dmg > 25;
      const newFloat: DamageFloat = { id: floatIdRef.current++, value: dmg, isCrit };
      setFloats((prev) => [...prev, newFloat]);
      setTimeout(() => setFloats((prev) => prev.filter((f) => f.id !== newFloat.id)), 900);
      setAnim(isCrit ? "crit" : "hit");
      setTimeout(() => setAnim(""), isCrit ? 500 : 300);
    }
  }, [hero.hp]);

  const animClass = anim === "hit"
    ? "animate-[shake_0.3s_ease-in-out]"
    : anim === "crit"
    ? "animate-[shakeHard_0.5s_ease-in-out] ring-2 ring-emerald-400/70"
    : "";

  return (
    <div className={`relative flex items-center gap-3 ${animClass}`}>
      <DamageFloats floats={floats} />
      <img
        src={hero.critRate >= 0.18 ? ART.heroElite : hero.critRate >= 0.10 ? ART.heroW04 : hero.critRate >= 0.06 ? ART.heroW03 : hero.critRate >= 0.03 ? ART.heroW02 : ART.heroW01}
        alt={hero.name}
        className="w-14 h-14 rounded-lg object-cover"
      />
      <div className="flex-1">
        <div className={`text-sm font-semibold text-rose-100 ${TXT}`}>{hero.name}</div>
        <HpBar hp={hero.hp} max={hero.hpMax} />
        <div className={`flex justify-between text-[11px] text-rose-200 mt-1 ${TXT_SM}`}>
          <span>攻击 {hero.atk}</span>
          <span>暴击率 {Math.round(hero.critRate * 100)}%</span>
        </div>
      </div>
    </div>
  );
}

export function BattleScreen({ g }: { g: UseGameApi }) {
  const hero = g.hero as Hero;
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [g.logs]);

  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-3 xl:gap-4">
      {/* 战斗日志面板 */}
      <div
        className="relative flex flex-col overflow-hidden rounded-2xl p-3 sm:p-4 xl:col-span-2"
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className={`text-white font-bold ${TXT}`}>战斗日志</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <img src={ART.timer} alt="timer" className="w-5 h-5 object-contain" />
                <span className={`text-xs text-slate-200 font-mono ${TXT_SM}`}>R{g.logs.filter(l => l.kind === "system").length}</span>
              </div>
              <GameBtn onClick={g.toggleSpeed} className="text-xs h-7 px-3">
                加速 x{g.speed}
              </GameBtn>
            </div>
          </div>
          <div ref={logRef} className="min-h-[220px] flex-1 space-y-1 overflow-y-auto pr-2 sm:min-h-[320px] max-h-[55vh]">
            {g.logs.map((l) => (
              <LogLine key={l.id} entry={l} />
            ))}
          </div>
          {g.battleEnded && (
            <div className={`mt-3 text-center font-bold text-lg ${g.battleEnded === "win" ? "text-emerald-300" : "text-rose-300"} ${TXT}`}>
              {g.battleEnded === "win" ? "我方胜利！" : "我方全灭..."}
            </div>
          )}
        </div>
      </div>

      {/* 右侧状态面板 */}
      <div className="space-y-4">
        {/* 勇者方 */}
        <div
          className="relative rounded-2xl p-4 overflow-hidden"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="relative z-10">
            <h3 className={`text-rose-200 font-bold mb-2 ${TXT}`}>勇者方</h3>
            {hero && <BattleHeroPanel hero={hero} />}
          </div>
        </div>

        {/* 怪物方 */}
        <div
          className="relative rounded-2xl p-4 overflow-hidden"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="relative z-10">
            <h3 className={`text-emerald-200 font-bold mb-2 ${TXT}`}>怪物方</h3>
            <div className="space-y-3">
              {g.monsters.map((m) => (
                <BattleMonsterCard key={m.id} m={m} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
