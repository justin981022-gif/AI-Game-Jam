// 主屏组件：准备阶段 / 战斗界面 / EVAL 绩效屏的内容区
// 所有视觉装饰使用 art 图片驱动，CSS 仅用于布局
import { useEffect, useRef } from "react";
import { ART, BALANCE, LEVELS, TRAITS } from "@/game/data";
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
      className="relative flex flex-col justify-center w-full h-[60px] px-4 rounded-lg text-left transition-all
        active:brightness-90 active:scale-95 disabled:opacity-50 disabled:grayscale-[0.3] disabled:cursor-not-allowed
        hover:brightness-110 hover:scale-[1.02] hover:-translate-y-[1px] hover:shadow-md"
      style={{
        borderImage: `url(${ART.btn}) 16 fill / 16px / 0 stretch`,
        border: "none",
        background: "transparent",
      }}
    >
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="text-[16px] font-bold text-[#3D3A36]">{icon} {name}</span>
        <span className="text-[14px] text-[#3D3A36]/90">{cost}</span>
      </div>
      <div className="relative z-10">
        <span className="text-[12px] text-[#3D3A36]/60">{sub}</span>
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
export function MonsterCard({ m, showHidden = false, compact = false }: { m: Monster; showHidden?: boolean; compact?: boolean }) {
  const dead = m.state === "dead";
  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all h-full ${dead ? "opacity-50 grayscale" : ""} ${compact ? "p-2" : "p-3 min-w-[160px]"} flex flex-col`}
      style={{
        backgroundColor: "#F2EDE0",
        border: "1px solid rgba(61,58,54,0.5)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-1 flex-1 overflow-hidden">
        {/* BUST 头像 */}
        <img src={m.artUrl} alt={m.name} className={`${compact ? "w-12 h-12" : "w-16 h-16"} rounded-lg object-cover flex-shrink-0`} />
        {/* 名字 + LV */}
        <div className="text-sm font-bold text-[#3D3A36] text-center truncate w-full">{m.name}</div>
        <div className="text-[10px] text-[#3D3A36]/70">
          Lv.{m.level} · {m.role}
        </div>
        {/* HP 条 */}
        <div className="w-full">
          <HpBar hp={m.hp} max={m.hpMax} />
        </div>
        {/* ATK / CRIT */}
        <div className="flex justify-between w-full text-[11px] text-[#3D3A36] mt-0.5">
          <span>攻击 {m.atk}</span>
          <span className="text-amber-700">CRIT {Math.round(m.critRate * 100)}%</span>
        </div>
        {/* 词条 chips */}
        {!compact && <SlotTraitChips m={m} showHidden={showHidden} />}
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
    <div className="flex flex-wrap gap-1 mt-1 justify-center">
      {visible.map((t) => (
        <span key={t} title={TRAITS[t]?.desc ?? ""} className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-help">
          {TRAITS[t]?.name ?? t}
        </span>
      ))}
      {showHidden && hidden && (
        <span title={TRAITS[hidden]?.desc ?? ""} className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 cursor-help">
          🔒 {TRAITS[hidden]?.name ?? hidden}
        </span>
      )}
      {runtime.map((t) => (
        <span key={t} title={TRAITS[t]?.desc ?? ""} className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 cursor-help">
          {TRAITS[t]?.name ?? t}
        </span>
      ))}
      {m.slackerBattlesLeft > 0 && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
          消极怠工({m.slackerBattlesLeft}场)
        </span>
      )}
    </div>
  );
}

function LevelProgress({ idx }: { idx: number }) {
  return (
    <div
      className="flex items-center justify-center gap-0 px-3 py-1.5 rounded-lg"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      {LEVELS.map((lv, i) => {
        const nodeColor = i === idx ? "#C97B5C" : i < idx ? "#8FA89B" : "#B8B5A8";
        // Line color: if both sides are passed, use dark; otherwise light
        const lineColor = i < idx ? "#8FA89B" : "#B8B5A8";
        return (
          <div key={lv.id} className="flex items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: nodeColor,
                border: "2px solid #3D3A36",
              }}
            >
              <span className={`text-[10px] font-bold text-white ${TXT_SM}`}>{lv.id}</span>
            </div>
            {i < LEVELS.length - 1 && (
              <div className="w-6 h-1" style={{ backgroundColor: lineColor }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── AP Tooltip ─── */
function ApTooltip({ ap, apMax }: { ap: number; apMax: number }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 cursor-help"
      title="行动点每关刷新。招募、发奖金、打零工各消耗 1 行动点。"
    >
      <span className="text-lg">{"\u26A1"}</span>
      <span>行动点 {ap}/{apMax}</span>
      <span className="text-xs opacity-70">❓</span>
    </div>
  );
}

export function TopBar({ g }: { g: UseGameApi }) {
  return (
    <div
      className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-2.5 rounded-xl overflow-hidden"
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
      }}
    >
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 font-semibold text-lg ${g.economyWarning ? "text-rose-300 animate-pulse" : "text-violet-200"} ${TXT}`}>
          <ShardIcon size={36} />
          <span>灵魂碎片 {g.shards}</span>
          {g.economyWarning && (
            <span className={`text-[10px] text-rose-100 px-1.5 py-0.5 rounded ${TXT_SM}`}
              style={{ backgroundImage: `url(${ART.toast})`, backgroundSize: "100% 100%" }}
            >储备告急</span>
          )}
        </div>
        <div className={`flex items-center gap-2 text-sky-200 font-semibold text-lg ${TXT}`}>
          <ApTooltip ap={g.ap} apMax={g.apMax} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 overflow-hidden hover:brightness-125 transition" title="重启（准备阶段：撤销本回合 / 其他：重新开始）" onClick={g.restart}>
          <img src={ART.icoRestart} alt="重启" className="w-full h-full object-cover" />
        </button>
        <div className="text-right ml-2">
          <div className={`text-sm font-bold text-amber-200 ${TXT}`}>{g.levelId} · {g.levelTitle}</div>
          <LevelProgress idx={g.levelIndex} />
        </div>
      </div>
    </div>
  );
}

export function PrepScreen({ g }: { g: UseGameApi }) {
  const nextLevel = LEVELS[g.levelIndex];
  const heroPreview = nextLevel?.heroId;
  const heroMap: Record<string, { name: string; hp: number }> = {
    HERO_W01: { name: "勇者·初出茅庐", hp: 110 },
    HERO_W02: { name: "勇者·小有名气", hp: 220 },
    HERO_W03: { name: "勇者·身经百战", hp: 330 },
    HERO_W04: { name: "勇者·声名远扬", hp: 440 },
    HERO_ELITE: { name: "精英勇者", hp: 600 },
  };
  const isL01 = g.levelId === "L01";
  const emptyCount = Math.max(0, g.slots - g.monsters.length);

  return (
    <div className="flex flex-col lg:flex-row gap-3 h-full">
      {/* 怪物槽位面板（全宽） */}
      <div className="flex-1 flex flex-col gap-3">
        <div
          className="relative rounded-2xl p-4 overflow-hidden"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            border: "2px solid rgba(61,58,54,0.5)",
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 gap-2">
              <h2 className={`text-lg text-white font-bold flex items-center gap-2 ${TXT}`}>
                怪物槽位（{g.monsters.length}/{g.slots}）
              </h2>
              {isL01 && <span className={`text-sm text-amber-200 ${TXT_SM}`}>入职第一天：先招募你的第一位员工</span>}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {g.monsters.map((m) => (
                <div key={m.id} className="h-[220px]">
                  <MonsterCard m={m} showHidden />
                </div>
              ))}
              {Array.from({ length: emptyCount }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="rounded-xl flex flex-col items-center justify-center h-[220px]"
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
                  className="rounded-xl flex flex-col items-center justify-center h-[220px] transition hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed"
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
      <div className="w-full lg:w-[280px] flex flex-col gap-3">
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
          <ActionBtn onClick={g.openBonus} disabled={g.ap <= 0} icon="💰" name="发奖金" cost="1 行动点" sub="8/15/25 三档" />
          <ActionBtn onClick={g.doLabor} disabled={g.ap <= 0} icon="⛏️" name="打零工" cost="1 行动点" sub="+4 碎片" />

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
                  src={heroPreview === "HERO_ELITE" ? ART.heroElite : heroPreview === "HERO_W04" ? ART.heroW04 : heroPreview === "HERO_W03" ? ART.heroW03 : heroPreview === "HERO_W02" ? ART.heroW02 : ART.heroW01}
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

export function BattleScreen({ g }: { g: UseGameApi }) {
  const hero = g.hero as Hero;
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [g.logs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* 战斗日志面板 */}
      <div
        className="relative lg:col-span-2 rounded-2xl p-4 flex flex-col overflow-hidden"
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
          <div ref={logRef} className="flex-1 overflow-y-auto space-y-1 pr-2 min-h-[320px] max-h-[55vh]">
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
            {hero && (
              <div className="flex items-center gap-3">
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
                    <span>暴击 {Math.round(hero.critRate * 100)}%</span>
                  </div>
                </div>
              </div>
            )}
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
                <MonsterCard key={m.id} m={m} showHidden compact />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}