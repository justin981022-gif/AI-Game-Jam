// 主入口页：组合所有界面与弹窗，编排状态机
// 所有视觉装饰使用 art 图片驱动，CSS 仅用于布局
import { ART } from "@/game/data";
import { useGame } from "@/game/useGame";
import { BattleScreen, PrepScreen, TopBar } from "@/components/GameScreens";
import {
  BonusDialog,
  DismissDialog,
  EndingDialog,
  EvalDialog,
  EventDialog,
  GrowthDialog,
  NegotiateDialog,
  PolicyDialog,
  PrepEventDialog,
  RecruitDialog,
  StoryDialog,
  ToastContainer,
  TrainingDialog,
} from "@/components/Dialogs";


function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#b7b1a3" }}
    >
      {/* 全屏背景图 — 16:9 contain 居中，不裁切 */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: "16 / 9",
          maxWidth: "min(100vw, 177.78vh)",
          maxHeight: "100vh",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${ART.title})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* 标题文字层 — 叠加在顶部米白横条区域，居中 */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: "28%",
              right: "28%",
              top: "8%",
              bottom: "76%",
            }}
          >
            <h1
              className="font-black text-center"
              style={{ fontSize: "clamp(26px, 4.5vw, 52px)", color: "#3D3A36" }}
            >
              地下城打工人
            </h1>
          </div>

          {/* Start 按钮层 — 透明 hit-area 精确覆盖陶土色矩形 */}
          <button
            onClick={onStart}
            className="absolute flex items-center justify-center cursor-pointer hover:brightness-110 transition-all duration-200 active:brightness-90"
            style={{
              left: "55%",
              top: "66.5%",
              width: "clamp(78px, 18vw, 280px)",
              height: "clamp(42px, 7.25vw, 92px)",
              background: "transparent",
              border: "none",
              outline: "none",
            }}
          >
            <span
              className="font-bold leading-none whitespace-nowrap"
              style={{ fontSize: "clamp(12px, 3vw, 44px)", color: "#3D3A36" }}
            >
              开始入职
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const g = useGame();

  const inGame = g.gameState !== "GAME_INIT";
  const bgUrl = g.gameState === "BATTLE" ? ART.bgBattle : ART.bgPrep;

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* 背景 - 全屏 art 图片 */}
      {inGame && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${bgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      {/* 轻微暗化层帮助文字可读 */}
      {inGame && <div className="fixed inset-0 bg-black/20 pointer-events-none" />}

      <div className="relative z-10">
        {g.gameState === "GAME_INIT" ? (
          <StartScreen onStart={g.startGame} />
        ) : (
          <div className="min-h-screen w-full px-2 py-2 pb-4 space-y-2 sm:px-3 sm:space-y-3">
            <TopBar g={g} />
            {g.gameState === "BATTLE" ? <BattleScreen g={g} /> : <PrepScreen g={g} />}
          </div>
        )}
      </div>

      {/* 弹窗层 */}
      <StoryDialog g={g} />
      <PolicyDialog g={g} />
      <PrepEventDialog g={g} />
      <RecruitDialog g={g} />
      <BonusDialog g={g} />
      <TrainingDialog g={g} />
      <EventDialog g={g} />
      <EvalDialog g={g} />
      <GrowthDialog g={g} />
      <DismissDialog g={g} />
      <NegotiateDialog g={g} />
      <EndingDialog g={g} />
      <ToastContainer g={g} />
    </div>
  );
}
