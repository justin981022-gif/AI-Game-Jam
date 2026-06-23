// 主入口页：组合所有界面与弹窗，编排状态机
// 所有视觉装饰使用 art 图片驱动，CSS 仅用于布局
import { useEffect, useRef } from "react";
import { ART } from "@/game/data";
import { useGame } from "@/game/useGame";
import { BattleScreen, PrepScreen, TopBar } from "@/components/GameScreens";
import { useBgm } from "@/hooks/use-bgm";
import {
  BonusDialog,
  DismissDialog,
  EndingDialog,
  EvalDialog,
  EventDialog,
  HealDialog,
  GrowthDialog,
  JobChangeDialog,
  MechanismEventDialog,
  NegotiateDialog,
  PolicyDialog,
  PrepEventDialog,
  RecruitDialog,
  StoryDialog,
  ToastContainer,
  TrainingDialog,
  TutorialDialog,
} from "@/components/Dialogs";


function StartScreen({ onStart, onInteract }: { onStart: () => void; onInteract: () => void }) {
  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#b7b1a3" }}
      onPointerDown={onInteract}
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
  const { playTrack, playEvalMusic, stopEvalMusic, syncToState } = useBgm();
  const prevEvalOpenRef = useRef(g.evalOpen);
  const startTimerRef = useRef<number | null>(null);

  const inGame = g.gameState !== "GAME_INIT";
  const bgUrl = g.gameState === "BATTLE" ? ART.bgBattle : ART.bgPrep;

  useEffect(() => {
    syncToState(g.gameState, g.evalOpen);
  }, [g.gameState, g.evalOpen, syncToState]);

  useEffect(() => {
    if (g.evalOpen) {
      void playEvalMusic();
    } else if (prevEvalOpenRef.current) {
      stopEvalMusic();
    }
    prevEvalOpenRef.current = g.evalOpen;
  }, [g.evalOpen, playEvalMusic, stopEvalMusic]);

  useEffect(() => {
    return () => {
      if (startTimerRef.current !== null) {
        window.clearTimeout(startTimerRef.current);
      }
    };
  }, []);

  // 有存档时自动加载，跳过标题画面
  const autoLoadedRef = useRef(false);
  useEffect(() => {
    if (!autoLoadedRef.current && g.hasSave && g.gameState === "GAME_INIT") {
      autoLoadedRef.current = true;
      void playTrack("prep");
      g.loadGame();
    }
  }, [g.hasSave, g.gameState, g.loadGame, playTrack]);

  const handleStart = () => {
    if (startTimerRef.current !== null) {
      window.clearTimeout(startTimerRef.current);
    }
    startTimerRef.current = window.setTimeout(() => {
      void playTrack("prep");
      g.startGame();
    }, 450);
  };

  const handleTitleInteract = () => {
    if (g.gameState === "GAME_INIT") {
      void playTrack("title");
    }
  };

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
          <StartScreen onStart={handleStart} onInteract={handleTitleInteract} />
        ) : (
          <div className="min-h-screen w-full px-2 py-2 pb-4 space-y-2 sm:px-3 sm:space-y-3 animate-[sceneFadeIn_0.4s_ease-out]" key={g.gameState === "BATTLE" ? "battle" : "prep"}>
            <TopBar g={g} />
            {g.gameState === "BATTLE" ? <BattleScreen g={g} /> : <PrepScreen g={g} />}
          </div>
        )}
      </div>

      {/* 弹窗层 */}
      <TutorialDialog g={g} />
      <StoryDialog g={g} />
      <PolicyDialog g={g} />
      <PrepEventDialog g={g} />
      <RecruitDialog g={g} />
      <BonusDialog g={g} />
      <TrainingDialog g={g} />
      <HealDialog g={g} />
      <JobChangeDialog g={g} />
      <EventDialog g={g} />
      <MechanismEventDialog g={g} />
      <EvalDialog g={g} />
      <GrowthDialog g={g} />
      <DismissDialog g={g} />
      <NegotiateDialog g={g} />
      <EndingDialog g={g} />
      <ToastContainer g={g} />
    </div>
  );
}




