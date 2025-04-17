import { useEffect, useState, useRef } from "react";

export default function BreathPractice({ energy = "Neutral" }) {
  const [phase, setPhase] = useState("Inhale");
  const [count, setCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  const cycle = ["Inhale", "Hold", "Exhale", "Pause"];
  const durations = [4000, 2000, 4000, 2000];

  const playSound = (filename) => {
    if (!audioEnabled) return;
    const audio = new Audio(`/sounds/${filename}`);
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    if (isRunning) {
      let current = 0;

      intervalRef.current = setInterval(() => {
        const nextPhase = cycle[current];
        setPhase(nextPhase);

        switch (nextPhase) {
          case "Inhale":
            playSound("breathe-in.mp3");
            break;
          case "Hold":
            playSound("hold.mp3");
            break;
          case "Exhale":
            playSound("breathe-out.mp3");
            break;
          case "Pause":
            playSound("pause.mp3");
            break;
        }

        setCount((c) => c + 1);
        current = (current + 1) % cycle.length;
      }, durations[current]);

      timerRef.current = setInterval(() => {
        setTimeElapsed((t) => t + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(timerRef.current);
    };
  }, [isRunning, audioEnabled]);

  const resetBreath = () => {
    clearInterval(intervalRef.current);
    clearInterval(timerRef.current);
    setPhase("Inhale");
    setCount(0);
    setTimeElapsed(0);
    setIsRunning(true);
  };

  const glowColors = {
    Light: "bg-yellow-300",
    Neutral: "bg-blue-400",
    Dark: "bg-purple-800",
  };

  const glow = glowColors[energy] || "bg-zinc-600";

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <div
        className={`w-36 h-36 rounded-full ${glow} bg-opacity-40 shadow-lg animate-breath transition-all duration-1000 flex items-center justify-center`}
        style={{
          transform:
            phase === "Inhale"
              ? "scale(1.2)"
              : phase === "Exhale"
              ? "scale(0.9)"
              : "scale(1)",
        }}
      >
        <span className="text-white text-lg font-semibold">{phase}</span>
      </div>

      <p className="text-sm text-indigo-300 mt-4">
        ⏳ {formatTime(timeElapsed)} • Breath Cycle: {count}
      </p>

      <div className="mt-4 space-x-3">
        <button
          onClick={() => setIsRunning((r) => !r)}
          className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-full shadow"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
        <button
          onClick={resetBreath}
          className="px-4 py-2 text-sm bg-zinc-700 hover:bg-zinc-800 rounded-full shadow"
        >
          Reset
        </button>
        <button
          onClick={() => setAudioEnabled((a) => !a)}
          className="px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 rounded-full shadow"
        >
          {audioEnabled ? "Mute Sound" : "Unmute Sound"}
        </button>
      </div>
    </div>
  );
}
