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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#000000B3] p-2 py-4 text-[16px] font-normal text-[#FFFFFF] opacity-100 sm:items-center sm:p-4">
      {children}
    </div>
  );
}

// ───────── 剧情 / 邮件弹窗（ART.mailCeo 作为面板背景） ─────────
export function StoryDialog({ g }: { g: UseGameApi }) {
  if (!g.storyText) return null;
  const isEmail = g.storyText.title.includes("收件箱");
  // 邮件模式：body 第一行作为主题，剩余按 \n 拼回作为正文
  const emailLines = isEmail ? g.storyText.body.split("\n") : [];
  const emailSubject = emailLines[0] ?? "";
  const displayBody = isEmail ? emailLines.slice(1).join("\n") : g.storyText.body;

  return (
    <Overlay>
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={isEmail ? {
          backgroundImage: `url(${ART.mailCeo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        } : {
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        {/* 邮件模式：CEO 印章作为右下角装饰，与 mailCeo 背景的圆圈位对齐；层级低于 z-10 文本 */}
        {isEmail && (
          <img
            src={ART.ceoStamp}
            alt="CEO"
            className="absolute w-[12.5rem] h-[12.5rem] rounded-full object-cover pointer-events-none"
            style={{ bottom: 5, right: -38 }}
          />
        )}
        <div className="relative z-10">
          <div className={`${isEmail ? "pl-16 pr-5 pt-5 pb-3 flex flex-col gap-3" : "px-5 py-3 flex items-center gap-2"}`}>
            <div className={`text-sm font-bold ${isEmail ? "text-slate-900" : "text-amber-100"} ${TXT}`}>{g.storyText.title}</div>
            {isEmail && (
              <div className={`text-sm font-semibold text-slate-800 ${TXT_SM}`}>{emailSubject}</div>
            )}
          </div>
          <div className={`px-5 py-4 ${isEmail ? "text-slate-900" : "text-white"} text-sm leading-relaxed whitespace-pre-line min-h-[80px] ${TXT_SM}`}>
            {displayBody}
          </div>
          <div className="px-5 pb-4 flex justify-end">
            <button
              onClick={g.closeStory}
              className="relative px-5 py-3 text-[#3D3A36] font-bold text-base transition-all
                active:brightness-90 active:scale-95
                hover:brightness-110 hover:scale-[1.02] hover:-translate-y-[1px]"
              style={{
                minWidth: 240,
                marginRight: -75,
                borderStyle: "solid",
                borderColor: "transparent",
                borderWidth: "16px 32px",
                borderImage: `url(${ART.btn}) 26 fill / 16px 32px / 0 stretch`,
                background: "transparent",
                outline: "none",
              }}
            >
              继续
            </button>
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
      className="flex flex-col h-full min-h-0 items-center justify-center cursor-pointer group"
      onClick={onChoose}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onChoose(); }}
    >
      {/* 卡片主容器 — 559:800 比例匹配简历图，高度优先缩放，宽度由比例推导 + maxWidth 防超列 */}
      <div className="relative overflow-hidden rounded-2xl group-hover:ring-3 group-hover:ring-[#C97A4F] group-hover:scale-[1.03] group-hover:shadow-lg group-hover:shadow-[#C97A4F]/30 transition-all duration-200"
        style={{
          backgroundColor: "#F5F0E8",
          aspectRatio: "559/800",
          height: "100%",
          maxWidth: "100%",
          width: "auto",
        }}
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
                ❤️ 血量 {r.hp}
              </div>
              <div className="text-[16px] text-rose-700 font-semibold"
                style={{ textShadow: "0 0 3px rgba(255,255,255,0.9)" }}>
                ⚔️ 攻击 {r.atk}
              </div>
              <div className="text-[16px] text-rose-700 font-semibold"
                style={{ textShadow: "0 0 3px rgba(255,255,255,0.9)" }}>
                💨 速度 {r.speed}
              </div>
              <div className="text-[16px] text-rose-700 font-semibold"
                style={{ textShadow: "0 0 3px rgba(255,255,255,0.9)" }}>
                🎯 暴击 {Math.round(r.critRate * 100)}%
              </div>
              <div className="text-[16px] text-amber-700 font-semibold"
                style={{ textShadow: "0 0 3px rgba(255,255,255,0.9)" }}>
                💰 日薪 {r.salary}
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
            <div className="w-[4.25rem] h-[4.25rem] rounded-full border border-[#C97A4F]/40 flex items-center justify-center text-[30px] text-[#C97A4F]/60">
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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-2 py-4 sm:items-center sm:p-4"
      style={{ backgroundColor: "rgba(15,12,8,0.55)" }}
      onClick={g.closeRecruit}
    >
      {/* 全屏布局 - 卡片整体下移，顶部留更多空间 */}
      <div className="flex min-h-full w-full flex-col px-1 pb-2 pt-2 sm:h-full sm:px-3 sm:pt-6" onClick={(e) => e.stopPropagation()}>
        {/* R9: 顶部信息栏 - 字号 1.6em 加粗 */}
        <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-2">
          <div className={`flex items-center gap-2 text-sm font-semibold text-white sm:text-base ${TXT}`}>
            <ShardIcon size={28} />
            <span>× {g.shards} 灵魂碎片</span>
          </div>
          <h2 className={`min-w-0 flex-1 text-center text-lg font-black text-white sm:text-[1.6em] ${TXT}`}>
            招募候选人 - 点击简历即可录用
          </h2>
          <button onClick={g.closeRecruit} className={`text-white text-2xl leading-none hover:brightness-150 ${TXT}`}>
            ×
          </button>
        </div>

        {/* 三张简历卡并排 — 下移后占满剩余空间 */}
        <div className="grid flex-1 grid-cols-1 gap-3 py-1 sm:min-h-0 sm:grid-cols-3">
          {pool.map((r) => (
            <ResumeCard key={r.id} r={r} onChoose={() => g.chooseResume(r)} />
          ))}
        </div>

        {/* 刷新按钮 — 花费2碎片，每关最多2次；底图 ART.btn (A-UI-BTN) 用 9-slice 撑满整个按钮 div */}
        <div className="shrink-0 flex justify-center py-2">
          <button
            onClick={g.refreshRecruitPool}
            disabled={g.recruitRefreshLeft <= 0 || g.shards < 2}
            className="relative px-5 py-3 text-[#3D3A36] font-bold text-base transition-all
              active:brightness-90 active:scale-95 disabled:opacity-50 disabled:grayscale-[0.3] disabled:cursor-not-allowed
              hover:brightness-110 hover:scale-[1.02] hover:-translate-y-[1px]"
            style={{
              width: "min(620px, 100%)",
              borderStyle: "solid",
              borderColor: "transparent",
              borderWidth: "16px 32px",
              borderImage: `url(${ART.btn}) 32 fill / 16px 32px / 0 stretch`,
              background: "transparent",
              outline: "none",
            }}
          >
            换一批（2<ShardIcon size={26} />） 剩{g.recruitRefreshLeft}次
          </button>
        </div>
      </div>
    </div>
  );
}
// ───────── 发奖金弹窗（ART.cardEvent 作为面板背景） ─────────
export function BonusDialog({ g }: { g: UseGameApi }) {
  if (!g.bonusOpen) return null;
  const active = g.monsters.filter((m) => m.state === "active" || m.state === "negative");
  const target = (g.bonusTargetId ? active.find((m) => m.id === g.bonusTargetId) : active[0]) ?? null;
  const tierKeys: BonusTier[] = ["small", "medium", "large"];
  if (!target) return null;

  return (
    <Overlay>
      <div
        className="relative my-auto w-full max-w-[460px] overflow-hidden rounded-2xl"
        style={{
          backgroundColor: "#F2E6C9",
          border: "3px solid #3D3A36",
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        }}
      >
        <div className="relative z-10 text-[#3D3A36]">
          <div className="flex items-center justify-between gap-3 border-b border-[#3D3A36]/20 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-2 text-sm font-black">
              <ShardIcon size={18} />
              <span className="truncate">给 {target.name} 发奖金</span>
            </div>
            <button onClick={g.closeBonus} className="shrink-0 text-xl font-black leading-none hover:brightness-125">×</button>
          </div>
          <div className="space-y-3 p-4 sm:p-5">
            <div className="flex items-center gap-3 rounded-xl border border-[#3D3A36]/15 bg-white/45 p-3">
              <img src={target.artUrl} alt={target.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="break-words text-sm font-black leading-tight">{target.name}</div>
                <div className="mt-1 text-[11px] font-semibold text-[#3D3A36]/70">
                  ATK {target.atk} · 当前奖金倍率 x{target.bonusAtkMult.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              {tierKeys.map((key) => {
                const tier = BONUS_TIERS[key];
                const cost = Math.max(1, Math.round(tier.cost * (1 - (g.activePolicy?.bonusDiscount ?? 0))));
                const disabled = g.shards < cost || g.ap <= 0;
                return (
                  <button
                    key={key}
                    onClick={() => g.applyBonus(target.id, key)}
                    disabled={disabled}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[#3D3A36]/20 bg-white/60 px-3 py-3 text-left transition hover:bg-white/85 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <div className="min-w-0">
                      <div className="text-[14px] font-black leading-tight">{tier.label}</div>
                      <div className="mt-1 text-[11px] font-semibold text-[#3D3A36]/65">本场 ATK x{tier.atkMult.toFixed(2)} · 消耗 1 行动点</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 text-[13px] font-black text-amber-700">
                      {cost}
                      <ShardIcon size={14} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={g.closeBonus}
                className="rounded-lg border border-[#3D3A36]/20 bg-white/45 px-4 py-2 text-[13px] font-black transition hover:bg-white/75 active:scale-[0.99]"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── 突发事件弹窗（ART.cardEvent 作为单层扁平面板背景） ─────────
export function EventDialog({ g }: { g: UseGameApi }) {
  if (!g.pendingEvent) return null;
  const ev = g.pendingEvent.event;
  const relM = g.pendingEvent.monsterId
    ? g.monsters.find((m) => m.id === g.pendingEvent!.monsterId)
    : undefined;
  const text = ev.cardText.replace("[怪物名]", relM?.name ?? "某怪物");

  return (
    <Overlay>
      <div className="flex flex-col items-center gap-3 w-full">
        {g.eventIsTutorial && (
          <div className="w-full max-w-[540px] rounded-lg border border-white/10 bg-black/70 px-4 py-2 text-[12px] text-white/95 backdrop-blur-[1px]">
            教学：战斗中会出现突发事件，你有 10 秒做出二选一决策。超时将自动选择不利项！
          </div>
        )}
        <div
          className="relative w-full max-w-[540px] aspect-[3/2] overflow-visible"
          style={{
            backgroundImage: `url(${ART.cardEvent})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 h-full">
            <div className="absolute left-[8%] top-[5.7%] flex h-[18%] items-center">
              <div className="text-base font-bold text-[#3D3A36]">突发事件</div>
            </div>
            <div className="absolute left-[88.2%] top-[14.7%] flex h-[14%] w-[9.3%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <span className="font-mono text-sm font-bold text-rose-700 animate-pulse">{g.eventTimeLeft}s</span>
            </div>
            <div className="absolute left-[6%] top-[29%] flex h-[30.3%] w-[88%] items-center px-4">
              <div className="text-[#3D3A36] text-[15px] leading-relaxed font-medium">{text}</div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[37%]">
              {ev.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => g.chooseEventOption(idx as 0 | 1)}
                  className="absolute left-[9.1%] flex w-[81.8%] flex-col items-center justify-center rounded-full px-4 text-center text-[#3D3A36] transition hover:bg-black/5 active:scale-[0.99]"
                  style={{
                    top: idx === 0 ? "5.4%" : "42.4%",
                    height: "28.8%",
                  }}
                >
                  <span className="text-[12px] font-semibold leading-tight">{opt.label}</span>
                  {opt.sub && <span className="mt-0.5 text-[10px] leading-tight opacity-75">{opt.sub}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── 本日经营方针 ─────────
export function PolicyDialog({ g }: { g: UseGameApi }) {
  if (g.dailyPolicyChoices.length === 0 || g.activePolicy) return null;
  return (
    <Overlay>
      <div
        className="relative my-auto w-full max-w-[560px] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl"
        style={{
          backgroundColor: "#F2E6C9",
          border: "3px solid #3D3A36",
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        }}
      >
        <div className="relative z-10 p-4 sm:p-5">
          <div className="mb-2 text-[16px] font-black text-[#3D3A36] sm:mb-4">本日经营方针</div>
          <div className="mb-3 text-[12px] font-semibold leading-relaxed text-[#3D3A36]/80 sm:mb-4 sm:text-[13px]">
            董事会要求本关先定策略。方针只影响本关，选完后进入日常突发事件。
          </div>
          <div className="space-y-2 sm:space-y-3">
            {g.dailyPolicyChoices.map((policy) => (
              <button
                key={policy.id}
                onClick={() => g.choosePolicy(policy)}
                className="w-full rounded-md border border-[#3D3A36]/25 bg-white/60 px-3 py-2.5 text-left text-[#3D3A36] transition hover:bg-white/85 active:scale-[0.99] sm:rounded-lg sm:px-4 sm:py-3"
              >
                <div className="text-[14px] font-black leading-tight">{policy.title}</div>
                <div className="mt-1 text-[12px] font-semibold leading-snug opacity-75">{policy.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── 准备阶段日常事件 ─────────
export function PrepEventDialog({ g }: { g: UseGameApi }) {
  if (!g.prepEvent || g.dailyPolicyChoices.length > 0) return null;
  const ev = g.prepEvent;
  return (
    <Overlay>
      <div
        className="relative my-auto w-full max-w-[540px] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl"
        style={{
          backgroundColor: "#F2E6C9",
          border: "3px solid #3D3A36",
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        }}
      >
        <div className="relative z-10 p-4 text-[#3D3A36] sm:p-5">
          <div className="mb-3 text-[16px] font-black leading-tight">{ev.title}</div>
          <div className="mb-4 text-[14px] font-semibold leading-relaxed text-[#3D3A36]/85">{ev.cardText}</div>
          <div className="space-y-2 sm:space-y-3">
          {ev.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => g.choosePrepEventOption(idx as 0 | 1)}
              className="flex w-full flex-col rounded-md border border-[#3D3A36]/25 bg-white/60 px-3 py-2.5 text-left text-[#3D3A36] transition hover:bg-white/85 active:scale-[0.99] sm:rounded-lg sm:px-4 sm:py-3"
            >
              <span className="text-[14px] font-black leading-tight">{opt.label}</span>
              {opt.sub && <span className="mt-1 text-[12px] font-semibold leading-snug opacity-75">{opt.sub}</span>}
            </button>
          ))}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ───────── 谈薪弹窗（ART.negotiate 作为专用面板背景） ─────────
export function NegotiateDialog({ g }: { g: UseGameApi }) {
  if (!g.negotiate) return null;
  const m = g.monsters.find((x) => x.id === g.negotiate!.monsterId);
  if (!m) return null;

  return (
    <Overlay>
      <div
        className="relative w-full max-w-[520px] aspect-[5/3] overflow-visible"
        style={{
          backgroundImage: `url(${ART.negotiate})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute left-[14%] top-[7.5%] flex h-[18%] items-center">
          <div className="text-[16px] font-black text-[#3D3A36]">谈薪请求</div>
        </div>
        <section className="absolute left-[8%] top-[31%] flex h-[34%] w-[84%] flex-col justify-center px-5 py-2 text-[#3D3A36]">
          <div className="flex items-center gap-3">
            <img src={m.artUrl} alt={m.name} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0">
              <div className="truncate text-[15px] font-black">{m.name}</div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#3D3A36]/75">
                Lv.{m.level} | 当前日薪 {m.salary} <ShardIcon size={10} />
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[14px] font-semibold leading-tight">
            请求加薪 <span className="font-black text-amber-700">+{g.negotiate.delta}</span> <ShardIcon size={14} />/天（+20%）
          </div>
          <div className="mt-1 text-[10px] font-semibold leading-tight text-rose-700">
            拒绝：本场攻击 x0.75，下场攻击 x0.85，1场后清除
          </div>
        </section>
        <button
          onClick={() => g.answerNegotiate(true)}
          className="absolute left-[9.4%] top-[75.2%] flex h-[12.9%] w-[37.1%] items-center justify-center rounded-full text-[15px] font-black text-[#3D3A36] transition hover:bg-black/5 active:scale-[0.99]"
        >
          批准加薪
        </button>
        <button
          onClick={() => g.answerNegotiate(false)}
          className="absolute left-[53.4%] top-[75.2%] flex h-[12.9%] w-[37.1%] items-center justify-center rounded-full text-[15px] font-black text-[#3D3A36] transition hover:bg-black/5 active:scale-[0.99]"
        >
          拒绝
        </button>
      </div>
    </Overlay>
  );
}

// ───────── 战后成长三选一 ─────────
export function GrowthDialog({ g }: { g: UseGameApi }) {
  if (!g.growth) return null;
  const m = g.monsters.find((x) => x.id === g.growth!.monsterId);
  if (!m) return null;

  return (
    <Overlay>
      <div
        className="relative my-auto w-full max-w-[560px] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl"
        style={{
          backgroundColor: "#F2E6C9",
          border: "3px solid #3D3A36",
          boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        }}
      >
        <div className="relative z-10 p-4 text-[#3D3A36] sm:p-5">
          <div className="mb-2 text-[18px] font-black sm:mb-3">战后成长</div>
          <div className="mb-3 flex items-center gap-3 sm:mb-4">
            <img src={m.artUrl} alt={m.name} className="h-12 w-12 rounded-lg object-cover" />
            <div className="min-w-0">
              <div className="truncate text-[15px] font-black">{m.name}</div>
              <div className="text-[11px] font-semibold leading-snug opacity-75 sm:text-[12px]">
                Lv.{m.level} | ATK {m.atk} | HP {m.hp}/{m.hpMax} | 日薪 {m.salary}
              </div>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {g.growth.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => g.chooseGrowth(choice)}
                className="w-full rounded-md border border-[#3D3A36]/25 bg-white/60 px-3 py-2.5 text-left transition hover:bg-white/85 active:scale-[0.99] sm:rounded-lg sm:px-4 sm:py-3"
              >
                <div className="text-[14px] font-black leading-tight">{choice.title}</div>
                <div className="mt-1 text-[12px] font-semibold leading-snug opacity-75">{choice.desc}</div>
              </button>
            ))}
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
  const net = reward.total - pensionPaid;

  return (
    <Overlay>
      <div
        className="relative w-full max-w-[620px] aspect-[9/7] overflow-visible"
        style={{
          backgroundImage: `url(${ART.result})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute left-[8%] top-[6.5%] flex h-[13%] items-center">
          <div className="text-[18px] font-black text-[#3D3A36]">绩效考评 (EVAL)</div>
        </div>
        <img
          src={rankImg}
          alt="rank"
          className="absolute left-[88.2%] top-[12.9%] h-[12%] w-[12%] -translate-x-1/2 -translate-y-1/2 object-contain"
        />

        <section className="absolute left-[7%] top-[25%] h-[29%] w-[86%] px-4 py-2 text-[#3D3A36]">
          <div className="mb-1 text-[12px] font-bold text-emerald-700">存活员工（{survived.length}）</div>
          <div className="grid max-h-[calc(100%-1.25rem)] grid-cols-2 content-start gap-x-5 gap-y-1 overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {survived.length === 0 && <div className="text-[13px] font-semibold text-rose-700">无员工存活</div>}
            {survived.map((m) => (
              <div key={m.id} className="flex h-7 min-w-0 items-center gap-2 rounded-sm">
                <img src={m.artUrl} alt={m.name} className="h-6 w-6 shrink-0 rounded object-cover" />
                <div className="flex min-w-0 flex-1 items-center gap-1">
                  <span className="truncate text-[11px] font-bold" title={`${m.name} Lv.${m.level}`}>{m.name} Lv.{m.level}</span>
                  {leveledUp.includes(m.id) && <span className="shrink-0 text-[10px] font-bold text-amber-700">升级!</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="absolute left-[7%] top-[58%] h-[23.5%] w-[86%] px-5 py-2.5 text-[#3D3A36]">
          <div className="mb-2 flex items-center gap-1 text-[13px] font-black text-amber-700">
            <ShardIcon size={14} />
            季度奖金（KPI达成）
          </div>
          <div className="max-h-[calc(100%-1.5rem)] space-y-1.5 overflow-y-auto pr-1 text-[11px] font-semibold [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center justify-between">
              <span>通关保底</span>
              <span>+{reward.completionBase}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>存活奖励（{reward.surviveCount}人 x {BALANCE.SURVIVE_REWARD}）</span>
              <span>+{reward.surviveReward}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="min-w-0 truncate">DPS 提成（总伤害{reward.totalDamage}, 每{BALANCE.DPS_UNIT}点 +{BALANCE.DPS_REWARD}）</span>
              <span className="ml-3 shrink-0">+{reward.dpsReward}</span>
            </div>
            {dead.length > 0 && (
              <div className="flex items-center justify-between text-rose-700">
                <span>阵亡抚恤（{dead.length}人）</span>
                <span>-{pensionPaid}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 text-[13px] font-black">
              <span>绩效提成合计</span>
              <span className="flex items-center gap-1">+{reward.total} <ShardIcon size={12} /></span>
            </div>
            <div className="flex items-center justify-between border-t border-[#D4A574]/40 pt-1.5 text-[12px] font-black">
              <span>本轮净收支</span>
              <span className="flex items-center gap-1">+{reward.total} - {pensionPaid} = {net >= 0 ? "+" : ""}{net} <ShardIcon size={12} /></span>
            </div>
          </div>
        </section>

        <button
          onClick={g.proceedEval}
          className="absolute left-[71%] top-[85.2%] flex h-[8.3%] w-[23%] items-center justify-center rounded-full text-[16px] font-black text-[#3D3A36] transition hover:bg-black/5 active:scale-[0.99]"
        >
          继续
        </button>
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
        <div className="relative z-10">
          <div className="px-5 py-3 flex items-center justify-between">
            <div className={`text-sm font-bold text-white ${TXT}`}>解雇员工</div>
            <button onClick={g.closeDismiss} className={`text-white text-lg hover:brightness-150 ${TXT}`}>×</button>
          </div>
          <div className="p-4 space-y-2 max-h-[50vh] overflow-y-auto">
            {active.length === 0 && <div className={`text-sm text-slate-300 text-center py-4 ${TXT_SM}`}>暂无在岗员工</div>}
            {active.map((m) => (
              <div key={m.id} className="relative flex items-center gap-3 rounded-lg p-2 overflow-hidden"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
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

// ───────── Toast（纯 CSS 透明黑底） ─────────
export function ToastContainer({ g }: { g: UseGameApi }) {
  if (g.toasts.length === 0) return null;
  return (
    <div className="fixed inset-x-2 bottom-3 z-[60] space-y-2 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:max-w-sm">
      {g.toasts.map((t) => (
        <div
          key={t.id}
          className="rounded-lg border border-white/10 bg-black/70 px-4 py-2.5 text-sm text-white/95 backdrop-blur-[1px] animate-in slide-in-from-right-5 fade-in duration-300"
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
