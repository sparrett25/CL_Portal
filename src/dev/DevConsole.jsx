import { useState, useEffect } from "react";

const defaultFlags = {
  enableWhispers: true,
  ritualPortalsEnabled: false,
  phaseMapVisible: false,
  lioraGlow: true,
  supabaseProfile: true,
};

export default function DevConsole() {
  const [flags, setFlags] = useState(() => {
    const saved = localStorage.getItem("codexDevFlags");
    return saved ? JSON.parse(saved) : defaultFlags;
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        setVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    localStorage.setItem("codexDevFlags", JSON.stringify(flags));
  }, [flags]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-zinc-900 border border-indigo-600 text-white rounded-lg shadow-xl w-80 p-4 space-y-4 text-sm">
      <h2 className="text-indigo-400 font-bold text-lg mb-2">🧪 Dev Console</h2>
      {Object.keys(flags).map((key) => (
        <div key={key} className="flex items-center justify-between">
          <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
          <button
            onClick={() =>
              setFlags((prev) => ({ ...prev, [key]: !prev[key] }))
            }
            className={`px-2 py-1 text-xs rounded-md shadow-inner transition-all ${
              flags[key]
                ? "bg-green-600 hover:bg-green-700"
                : "bg-zinc-700 hover:bg-zinc-600"
            }`}
          >
            {flags[key] ? "On" : "Off"}
          </button>
        </div>
      ))}
    </div>
  );
}

export function getDevFlag(flag) {
  const saved = localStorage.getItem("codexDevFlags");
  const parsed = saved ? JSON.parse(saved) : defaultFlags;
  return parsed[flag];
}

export function useDevFlags() {
  const [flags, setFlags] = useState(() => {
    const saved = localStorage.getItem("codexDevFlags");
    return saved ? JSON.parse(saved) : defaultFlags;
  });
  return flags;
}
