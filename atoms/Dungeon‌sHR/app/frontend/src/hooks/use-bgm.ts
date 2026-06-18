import { useCallback, useEffect, useRef } from "react";
import type { GameState } from "@/game/types";

type BgmTrack = "title" | "prep" | "battle";
type SfxId = "ui_click" | "eval_open";

const BGM_SRC: Record<BgmTrack, string> = {
  title: "/audio/bgm/BGM_TITLE_LOOP.mp3",
  prep: "/audio/bgm/BGM_PREP_LOOP.mp3",
  battle: "/audio/bgm/BGM_BATTLE_LOOP.mp3",
};

const SFX_SRC: Record<SfxId, { src: string; volume: number }> = {
  ui_click: { src: "/audio/sfx/SFX_UI_BUTTON_CLICK.wav", volume: 0.45 },
  eval_open: { src: "/audio/sfx/SFX_EVAL_OPEN.mp3", volume: 0.52 },
};

function createAudio() {
  const audio = new Audio();
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.36;
  return audio;
}

export function useBgm() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackRef = useRef<BgmTrack | null>(null);
  const evalAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickGuardRef = useRef(0);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = createAudio();
    }
    return audioRef.current;
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    trackRef.current = null;
  }, []);

  const pauseBgm = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const playTrack = useCallback(
    async (track: BgmTrack) => {
      const audio = ensureAudio();
      const src = BGM_SRC[track];

      if (trackRef.current !== track) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = src;
        trackRef.current = track;
      } else if (!audio.src) {
        audio.src = src;
      }

      audio.loop = true;
      audio.muted = false;

      try {
        await audio.play();
      } catch {
        // Autoplay may be blocked until the first user gesture.
      }
    },
    [ensureAudio]
  );

  const playSfx = useCallback(async (id: SfxId) => {
    const def = SFX_SRC[id];
    const audio = new Audio(def.src);
    audio.volume = def.volume;
    audio.preload = "auto";
    try {
      await audio.play();
    } catch {
      // 仍会被浏览器首次交互策略拦截，静默忽略。
    }
  }, []);

  const resumePrepBgm = useCallback(() => {
    void playTrack("prep");
  }, [playTrack]);

  const playEvalMusic = useCallback(async () => {
    pauseBgm();
    const prev = evalAudioRef.current;
    if (prev) {
      prev.pause();
      prev.currentTime = 0;
      evalAudioRef.current = null;
    }

    const def = SFX_SRC.eval_open;
    const audio = new Audio(def.src);
    evalAudioRef.current = audio;
    audio.volume = def.volume;
    audio.preload = "auto";
    audio.loop = false;
    audio.onended = () => {
      if (evalAudioRef.current !== audio) return;
      evalAudioRef.current = null;
      resumePrepBgm();
    };

    try {
      await audio.play();
    } catch {
      evalAudioRef.current = null;
      resumePrepBgm();
    }
  }, [pauseBgm, resumePrepBgm]);

  const stopEvalMusic = useCallback(() => {
    const audio = evalAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      evalAudioRef.current = null;
    }
  }, []);

  const syncToState = useCallback(
    (gameState: GameState, evalOpen = false) => {
      if (evalOpen) {
        pauseBgm();
        return;
      }
      if (gameState === "GAME_INIT") {
        void playTrack("title");
        return;
      }
      if (gameState === "BATTLE") {
        void playTrack("battle");
        return;
      }
      if (gameState === "MAIN_PREP" || gameState === "EVAL" || gameState === "ENDING" || gameState === "GAME_OVER") {
        void playTrack("prep");
        return;
      }
      stop();
    },
    [pauseBgm, playTrack, stop]
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const interactive = target.closest('button, [role="button"]');
      if (!interactive) return;
      if (interactive instanceof HTMLButtonElement && interactive.disabled) return;

      const now = performance.now();
      if (now - clickGuardRef.current < 40) return;
      clickGuardRef.current = now;
      void playSfx("ui_click");
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [playSfx]);

  useEffect(() => () => stop(), [stop]);

  return { playTrack, playSfx, playEvalMusic, stopEvalMusic, stop, syncToState };
}
