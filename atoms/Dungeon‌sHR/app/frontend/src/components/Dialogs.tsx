// 弹窗组件：剧情邮件 / 招募简历 / 突发事件卡片 / 谈薪 / EVAL / 解雇 / 结局 / Toast
// 所有视觉装饰使用 art 图片驱动，CSS 仅用于布局
import { ART, BALANCE, BONUS_TIERS, ENDINGS, TRAITS } from "@/game/data";
import type { BonusTier, ResumeCandidate } from "@/game/types";
import type { UseGameApi } from "@/game/useGame";
import { GameBtn, ShardIcon } from "@/components/GameScreens";

/* ─── 通用样式常量 ─── */
const TXT = "drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]";
const TXT_SM = "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]";

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-[0px] mr-[0px] mb-[0px] ml-[0px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] rounded-none text-[16px] font-normal text-[#FFFFFF] bg-[#000000B3] opacity-100">
      {children}
    </div>
  );
}

// ───────── 剧情 / 邮件弹窗（ART.mailCeo 作为面板背景） ─────────
export function StoryDialog({ g }: { g: UseGameApi }) {
  if (!g.storyText) return null;
  const isEmail = g.storyText.title.includes("收件箱");
  const bgImg = isEmail ? ART.mailCeo : ART.cardEvent;

  return (
    <Overlay>
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative z-10">
          <div className="px-5 py-3 flex items-center gap-2">
            {isEmail && <img src={ART.ceoStamp} alt="CEO" className="w-9 h-9 rounded-full object-cover" />}
            <div className={`text-sm font-bold text-amber-100 ${TXT}`}>{g.storyText.title}</div>
          </div>
          <div className={`px-5 py-4 text-white text-sm leading-relaxed whitespace-pre-line min-h-[80px] ${TXT_SM}`}>
            {g.storyText.body}
          </div>
          <div className="px-5 pb-4 flex justify-end">
            <GameBtn onClick={g.closeStory}>
              继续
            </GameBtn>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── 招募简历弹窗（全屏撑满排版 — v0.21 全面修复） ─────────

function ResumeCard({ r, onChoose }: { r: ResumeCandidate; onChoose: () => void }) {
  return (
    <div
      className="flex flex-col h-full cursor-pointer group"
      onClick={onChoose}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onChoose(); }}
    >
      {/* 卡片主容器 — 559:800 比例匹配简历图 */}
      <div className="relative w-full overflow-hidden rounded-2xl group-hover:ring-3 group-hover:ring-[#C97A4F] group-hover:scale-[1.03] group-hover:shadow-lg group-hover:shadow-[#C97A4F]/30 transition-all duration-200"
        style={{ backgroundColor: "#F5F0E8", aspectRatio: "559/800" }}
      >
        {/* 简历背景图 — 容器与图片同比例，完整填充 */}
        <img
          src={ART.resume}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none select-none object-cover"
        />
        {/* 内容层 */}
        <div className="relative z-10 flex flex-col h-full" style={{ padding: "6% 10% 5% 10%" }}>
          {/* 姓名 */}
          <div className="shrink-0 text-center" style={{ marginTop: "2%" }}>
            <div className="text-xl font-bold text-slate-900 leading-tight"
              style={{ textShadow: "0 0 4px rgba(255,255,255,0.9)" }}>
              【{r.name}】
            </div>
          </div>

          {/* BUST 头像 — 底边对齐白框底部黑线 */}
          <div className="shrink-0 flex items-end justify-center" style={{ marginTop: 0, height: "22%", padding: 0, marginBottom: 0 }}>
            <img
              src={r.bustAsset}
              alt={r.name}
              className="max-h-[95%] w-auto"
              style={{ objectFit: "contain", objectPosition: "center bottom", padding: 0, margin: 0, display: "block", transform: "translateY(25px)" }}
            />
          </div>

          {/* 属性区域 — 纵向居中，应聘岗位在属性上方 */}
          <div className="flex-1 min-h-0 flex flex-col items-center justify-center">
            {/* R2: 应聘岗位 */}
            <div className="text-[16px] text-slate-700 mb-2 text-center font-semibold"
              style={{ textShadow: "0 0 3px rgba(255,255,255,0.8)" }}>
              应聘岗位：{r.position}
            </div>
            {/* R1: 数值行 — 每个属性独占一行，左对齐但居中区域 */}
            <div className="space-y-1.5 w-fit">
              <div className="text-[16px] text-rose-700 font-semibold"
                style={{ textShadow: "0 0 3px rgba(255,255,255,0.9)" }}>
                ❤️ 血量　{r.hp}
              </div>
              <div className="text-[16px] text-rose-700 font-semibold"
                style={{ textShadow: "0 0 3px rgba(255,255,255,0.9)" }}>
                ⚔️ 攻击　{r.atk}
              </div>
              <div className="text-[16px] text-rose-700 font-semibold"
                style={{ textShadow: "0 0 3px rgba(255,255,255,0.9)" }}>
                💨 速度　{r.speed}
              </div>
              <div className="text-[16px] text-rose-700 font-semibold"
                style={{ textShadow: "0 0 3px rgba(255,255,255,0.9)" }}>
                🎯 暴击　{Math.round(r.critRate * 100)}%
              </div>
              <div className="text-[16px] text-amber-700 font-semibold"
                style={{ textShadow: "0 0 3px rgba(255,255,255,0.9)" }}>
                💰 日薪　{r.salary}
              </div>
            </div>
          </div>

          {/* 词条区 — R3: 明面词条 + 隐藏词条占位 */}
          <div className="shrink-0 flex flex-col justify-center gap-1 overflow-hidden mt-1">
            <div className="flex flex-wrap justify-center gap-1">
              {r.traitsVisible.map((t) => {
                const td = TRAITS[t];
                return (
                  <span key={t} className="text-[12px] text-slate-700 bg-white/60 px-1.5 py-0.5 rounded" title={td.desc}>
                    ✓ {td.name}
                  </span>
                );
              })}
              {/* R3: 隐藏词条占位 */}
              <span className="text-[12px] px-1.5 py-0.5 rounded" style={{ color: "rgba(61,58,54,0.5)" }}>
                🔒 隐藏词条：待入职后激活
              </span>
            </div>

            {/* R7: 内心泄露句（完整显示，不 truncate） */}
            <div className="text-[12px] text-slate-600 italic text-center leading-snug px-1 py-0.5 mt-1"
              style={{ textShadow: "0 0 3px rgba(255,255,255,0.8)" }}>
              "{r.personalNote}"
            </div>
          </div>

          {/* 签名 + 圆章装饰 */}
          <div className="shrink-0 flex items-end justify-between" style={{ height: "8%" }}>
            <div className="text-[12px] text-slate-500">
              应聘者签名
            </div>
            {/* R8: 圆章位留空装饰 */}
            <div className="w-7 h-7 rounded-full border border-[#C97A4F]/40 flex items-center justify-center text-[10px] text-[#C97A4F]/60">
              ★
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecruitDialog({ g }: { g: UseGameApi }) {
  if (!g.recruitOpen) return null;
  const pool = g.resumePool;

  return (
    // R6: 深棕蒙版 rgba(15,12,8,0.55)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,12,8,0.55)" }}
      onClick={g.closeRecruit}
    >
      {/* 全屏布局 — 卡片整体下移，顶部留更多空间 */}
      <div className="w-full h-full flex flex-col px-3 pt-6 pb-2" onClick={(e) => e.stopPropagation()}>
        {/* R9: 顶部信息栏 — 字号 1.6em 加粗 */}
        <div className="flex items-center justify-between shrink-0 mb-3">
          <div className={`flex items-center gap-2 text-white font-semibold ${TXT}`}>
            <ShardIcon size={20} />
            <span>× {g.shards} 灵魂碎片</span>
          </div>
          <h2 className={`font-black text-white ${TXT}`} style={{ fontSize: "1.6em" }}>
            招募候选人 — 点击简历即可录用
          </h2>
          <button onClick={g.closeRecruit} className={`text-white text-2xl leading-none hover:brightness-150 ${TXT}`}>
            ×
          </button>
        </div>

        {/* 三张简历卡并排 — 下移后占满剩余空间 */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-3 py-1">
          {pool.map((r) => (
            <ResumeCard key={r.id} r={r} onChoose={() => g.chooseResume(r)} />
          ))}
        </div>

        {/* 刷新按钮 — 花费2碎片，每关最多2次 */}
        <div className="shrink-0 flex justify-center py-2">
          <GameBtn
            onClick={g.refreshRecruitPool}
            disabled={g.recruitRefreshLeft <= 0 || g.shards < 2}
            style={{ minWidth: 180 }}
          >
            🔄 换一批（2💎）剩{g.recruitRefreshLeft}次
          </GameBtn>
        </div>
      </div>
    </div>
  );
}
// ───────── 发奖金弹窗（ART.cardEvent 作为面板背景） ─────────
export function BonusDialog({ g }: { g: UseGameApi }) {
  if (!g.bonusOpen) return null;
  const active = g.monsters.filter((m) => m.state === "active" || m.state === "negative");
  const tierKeys: BonusTier[] = ["small", "medium", "large"];

  return (
    <Overlay>
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${ART.cardEvent})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative z-10">
          <div className="px-5 py-3 flex items-center justify-between">
            <div className={`text-sm font-bold text-amber-100 flex items-center gap-2 ${TXT}`}>
              <ShardIcon size={18} />
              发奖金（选择档位和目标）
            </div>
            <button onClick={g.closeBonus} className={`text-white text-lg hover:brightness-150 ${TXT}`}>×</button>
          </div>
          <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
            {active.map((m) => (
              <div key={m.id} className="relative rounded-xl p-3 overflow-hidden"
                style={{ backgroundImage: `url(${ART.cardEvent})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={m.artUrl} alt={m.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold text-white truncate ${TXT}`}>{m.name}</div>
                      <div className={`text-[11px] text-slate-200 ${TXT_SM}`}>ATK {m.atk} | 当前奖金倍率 x{m.bonusAtkMult.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {tierKeys.map((key) => {
                      const tier = BONUS_TIERS[key];
                      const disabled = g.shards < tier.cost;
                      return (
                        <GameBtn
                          key={key}
                          onClick={() => g.applyBonus(m.id, key)}
                          disabled={disabled}
                          className="flex-1 text-xs"
                        >
                          {tier.label} ({tier.cost}<ShardIcon size={10} />, x{tier.atkMult.toFixed(2)})
                        </GameBtn>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-4 flex justify-end">
            <GameBtn onClick={g.closeBonus}>
              取消
            </GameBtn>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── 突发事件弹窗（ART.cardEvent 作为面板背景） ─────────
export function EventDialog({ g }: { g: UseGameApi }) {
  if (!g.pendingEvent) return null;
  const ev = g.pendingEvent.event;
  const relM = g.pendingEvent.monsterId
    ? g.monsters.find((m) => m.id === g.pendingEvent!.monsterId)
    : undefined;
  const text = ev.cardText.replace("[怪物名]", relM?.name ?? "某怪物");

  return (
    <Overlay>
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${ART.cardEvent})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative z-10">
          <div className="px-5 py-3 flex items-center justify-between">
            <div className={`text-sm font-bold text-violet-100 ${TXT}`}>突发事件</div>
            <div className="flex items-center gap-1">
              <img src={ART.timer} alt="timer" className="w-5 h-5 object-contain" />
              <span className={`text-xs text-rose-200 font-mono animate-pulse ${TXT_SM}`}>{g.eventTimeLeft}s</span>
            </div>
          </div>
          {g.eventIsTutorial && (
            <div className={`mx-4 mt-3 rounded-lg px-3 py-2 text-[11px] text-amber-100 ${TXT_SM}`}
              style={{ backgroundImage: `url(${ART.toast})`, backgroundSize: "100% 100%" }}
            >
              教学：战斗中会出现突发事件，你有 10 秒做出二选一决策。超时将自动选择不利项！
            </div>
          )}
          <div className={`px-5 py-4 text-white text-sm leading-relaxed ${TXT_SM}`}>{text}</div>
          <div className="px-5 pb-4 space-y-2">
            {ev.options.map((opt, idx) => (
              <GameBtn
                key={idx}
                onClick={() => g.chooseEventOption(idx as 0 | 1)}
                className="w-full justify-start text-left h-auto py-3 px-4"
              >
                <div>
                  <div className="font-semibold text-sm">{opt.label}</div>
                  {opt.sub && <div className="text-[11px] opacity-80 mt-0.5">{opt.sub}</div>}
                </div>
              </GameBtn>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── 谈薪弹窗（ART.cardEvent 作为面板背景） ─────────
export function NegotiateDialog({ g }: { g: UseGameApi }) {
  if (!g.negotiate) return null;
  const m = g.monsters.find((x) => x.id === g.negotiate!.monsterId);
  if (!m) return null;

  return (
    <Overlay>
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${ART.cardEvent})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative z-10">
          <div className="px-5 py-3">
            <div className={`text-sm font-bold text-amber-100 flex items-center gap-2 ${TXT}`}>
              <ShardIcon size={16} />
              谈薪请求
            </div>
          </div>
          <div className="px-5 py-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={m.artUrl} alt={m.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <div className={`text-sm font-semibold text-white ${TXT}`}>{m.name}</div>
                <div className={`text-[11px] text-slate-200 flex items-center gap-1 ${TXT_SM}`}>Lv.{m.level} | 当前日薪 {m.salary} <ShardIcon size={10} /></div>
              </div>
            </div>
            <div className={`text-sm text-white mb-4 ${TXT_SM}`}>
              {m.name} 请求加薪 <span className="text-amber-200 font-bold">+{g.negotiate.delta}</span> <ShardIcon size={14} />/天（+20%）。
            </div>
            <div className={`text-[11px] text-slate-300 mb-4 ${TXT_SM}`}>
              拒绝后果：触发"消极怠工"（本场 攻击 x0.75，下场 攻击 x0.85，1场后清除）
            </div>
            <div className="flex gap-3">
              <GameBtn onClick={() => g.answerNegotiate(true)} className="flex-1">
                批准加薪
              </GameBtn>
              <GameBtn onClick={() => g.answerNegotiate(false)} className="flex-1">
                拒绝
              </GameBtn>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── EVAL 绩效弹窗（ART.result 作为面板背景 + ART.rankX 评级图） ─────────
function getRankImage(survived: number, dead: number): string {
  const total = survived + dead;
  if (total === 0) return ART.rankD;
  const ratio = survived / total;
  if (ratio >= 1.0) return ART.rankS;
  if (ratio >= 0.8) return ART.rankA;
  if (ratio >= 0.6) return ART.rankB;
  if (ratio >= 0.4) return ART.rankC;
  return ART.rankD;
}

export function EvalDialog({ g }: { g: UseGameApi }) {
  if (!g.evalOpen || !g.evalData) return null;
  const { survived, dead, pensionPaid, leveledUp, reward } = g.evalData;
  const rankImg = getRankImage(survived.length, dead.length);

  return (
    <Overlay>
      <div
        className="relative w-full max-w-lg rounded-2xl max-h-[85vh] overflow-y-auto overflow-hidden"
        style={{
          backgroundImage: `url(${ART.result})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="relative z-10">
          <div className="px-5 py-3 flex items-center justify-between mt-[55px] mx-auto mb-[0px] pt-[12px] pr-[20px] pb-[12px] pl-[20px] rounded-none font-normal text-left text-[#FFFFFF] bg-[#00000000] opacity-100 w-[412px] h-[50px]">
            <div className={`drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mt-[0px] mr-[0px] mb-[0px] ml-[30px] pt-[0px] pr-[0px] pb-[0px] pl-[0px] rounded-none text-[14px] font-bold text-[#FFFFFF] bg-[#00000000] opacity-100`}>绩效考评 (EVAL)</div>
            <img src={rankImg} alt="rank" className="w-14 h-14 object-contain" />
          </div>
          <div className="p-5 space-y-4">
            {dead.length > 0 && (
              <div className="relative rounded-xl p-3 overflow-hidden"
                style={{ backgroundImage: `url(${ART.cardEvent})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                <div className="relative z-10">
                  <div className={`text-xs font-semibold text-rose-200 mb-2 ${TXT}`}>阵亡名单</div>
                  {dead.map((m) => (
                    <div key={m.id} className="flex items-center gap-2 text-sm text-rose-100">
                      <img src={m.artUrl} alt={m.name} className="w-8 h-8 rounded object-cover opacity-50" />
                      <span className={TXT_SM}>{m.name}</span>
                      <span className={`text-[11px] text-rose-200 ml-auto flex items-center gap-1 ${TXT_SM}`}>
                        抚恤金 {m.salary * BALANCE.PENSION_MULT + BALANCE.PENSION_FLAT} <ShardIcon size={10} />
                      </span>
                    </div>
                  ))}
                  <div className={`mt-2 text-xs text-rose-200 text-right flex items-center justify-end gap-1 ${TXT_SM}`}>
                    抚恤金合计：-{pensionPaid} <ShardIcon size={12} />
                  </div>
                </div>
              </div>
            )}

            {survived.length > 0 && (
              <div className="relative p-3 overflow-hidden mt-[0px] mr-auto mb-[0px] ml-auto pt-[12px] pr-[0px] pb-[12px] pl-[0px] rounded-xl text-[16px] font-normal text-[#FFFFFF] bg-[#00000000] opacity-100 w-[372px]"
                style={{ backgroundImage: `url(${ART.cardEvent})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                <div className="relative z-10">
                  <div className={`text-xs font-semibold text-emerald-200 mb-2 ${TXT}`}>存活员工</div>
                  {survived.map((m) => (
                    <div key={m.id} className="flex items-center gap-2 text-sm text-emerald-100">
                      <img src={m.artUrl} alt={m.name} className="w-8 h-8 rounded object-cover" />
                      <span className={TXT_SM}>{m.name} Lv.{m.level}</span>
                      {leveledUp.includes(m.id) && (
                        <span className={`text-[10px] text-amber-100 px-1.5 py-0.5 rounded ${TXT_SM}`}
                          style={{ borderImage: `url(${ART.btn}) 16 fill / 4px / 0 stretch`, border: "none", background: "transparent" }}
                        >升级!</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 通关绩效提成明细 */}
            <div className="relative rounded-xl p-3 overflow-hidden w-[372px] mx-auto"
              style={{ backgroundImage: `url(${ART.cardEvent})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              <div className="relative z-10 mt-[0px] mr-auto mb-[0px] ml-auto pt-[0px] pr-[0px] pb-[0px] pl-[0px] rounded-none text-[16px] font-normal text-[#FFFFFF] bg-[#00000000] opacity-100 w-[372px]">
                <div className={`flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mt-[0px] mr-[0px] mb-[8px] ml-[0px] pt-[0px] pr-[0px] pb-[0px] pl-[0px] rounded-none text-[12px] font-semibold text-[#FDE68A] bg-[#00000000] opacity-100`}>
                  <ShardIcon size={14} />
                  季度奖金（KPI达成）
                </div>
                <div className={`space-y-1 text-[11px] text-amber-100 ${TXT_SM}`}>
                  <div className="flex justify-between">
                    <span>通关保底</span>
                    <span>+{reward.completionBase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>存活奖励（{reward.surviveCount}人 x {BALANCE.SURVIVE_REWARD}）</span>
                    <span>+{reward.surviveReward}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DPS 提成（总伤害{reward.totalDamage}, 每{BALANCE.DPS_UNIT}点 +{BALANCE.DPS_REWARD}）</span>
                    <span>+{reward.dpsReward}</span>
                  </div>
                  <div className="flex justify-between pt-1 font-bold text-amber-50">
                    <span>绩效提成合计</span>
                    <span>+{reward.total} <ShardIcon size={12} /></span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`text-xs text-white text-center flex items-center justify-center gap-1 ${TXT_SM}`}>
              本轮净收支：+{reward.total} - {pensionPaid} = {reward.total - pensionPaid >= 0 ? "+" : ""}{reward.total - pensionPaid} <ShardIcon size={12} />
            </div>
          </div>
          <div className="px-5 pb-4 flex justify-end">
            <GameBtn onClick={g.proceedEval}>
              继续
            </GameBtn>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── 解雇弹窗（ART.cardEvent 作为面板背景） ─────────
export function DismissDialog({ g }: { g: UseGameApi }) {
  if (!g.dismissOpen) return null;
  const active = g.monsters.filter((m) => m.state === "active" || m.state === "negative");

  return (
    <Overlay>
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${ART.cardEvent})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="relative z-10">
          <div className="px-5 py-3 flex items-center justify-between">
            <div className={`text-sm font-bold text-white ${TXT}`}>解雇员工</div>
            <button onClick={g.closeDismiss} className={`text-white text-lg hover:brightness-150 ${TXT}`}>×</button>
          </div>
          <div className="p-4 space-y-2 max-h-[50vh] overflow-y-auto">
            {active.length === 0 && <div className={`text-sm text-slate-300 text-center py-4 ${TXT_SM}`}>暂无在岗员工</div>}
            {active.map((m) => (
              <div key={m.id} className="relative flex items-center gap-3 rounded-lg p-2 overflow-hidden"
                style={{ backgroundImage: `url(${ART.cardEvent})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                <img src={m.artUrl} alt={m.name} className="relative z-10 w-10 h-10 rounded object-cover" />
                <div className="relative z-10 flex-1 min-w-0">
                  <div className={`text-sm text-white truncate ${TXT}`}>{m.name}</div>
                  <div className={`text-[11px] text-slate-200 flex items-center gap-1 ${TXT_SM}`}>Lv.{m.level} | 日薪 {m.salary} <ShardIcon size={10} /></div>
                </div>
                <GameBtn onClick={() => g.dismissMonster(m.id)} className="relative z-10 text-xs px-3">
                  解雇
                </GameBtn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── 结局弹窗（ART.endE01~E04 作为面板背景） ─────────
function getEndingArt(id: string): string {
  if (id === "E01") return ART.endE01;
  if (id === "E02") return ART.endE02;
  if (id === "E03") return ART.endE03;
  if (id === "E04") return ART.endE04;
  return ART.endE01;
}

export function EndingDialog({ g }: { g: UseGameApi }) {
  const id = g.endingId ?? g.gameOverId;
  if (!id) return null;
  const ending = ENDINGS[id];
  if (!ending) return null;

  return (
    <Overlay>
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${getEndingArt(id)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <div className="relative z-10 px-5 py-6 text-center">
          <div className={`text-lg font-bold mb-3 text-amber-100 ${TXT}`}>
            {ending.title}
          </div>
          <div className={`text-sm text-white leading-relaxed whitespace-pre-line mb-6 ${TXT_SM}`}>
            {ending.body}
          </div>
          <GameBtn onClick={g.restart} className="mx-auto">
            重新开始
          </GameBtn>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── Toast（ART.toast 作为背景） ─────────
export function ToastContainer({ g }: { g: UseGameApi }) {
  if (g.toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-[60] space-y-2 max-w-sm">
      {g.toasts.map((t) => (
        <div
          key={t.id}
          className={`rounded-lg px-4 py-2.5 text-sm text-white animate-in slide-in-from-right-5 fade-in duration-300 ${TXT_SM}`}
          style={{
            backgroundImage: `url(${ART.toast})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}