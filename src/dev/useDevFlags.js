import { useState, useEffect } from "react";

const defaultFlags = {
  enableWhispers: true,
  ritualPortalsEnabled: false,
  phaseMapVisible: false,
  lioraGlow: true,
  supabaseProfile: true,
};

export function useDevFlags() {
  const [flags, setFlags] = useState(() => {
    const saved = localStorage.getItem("codexDevFlags");
    return saved ? JSON.parse(saved) : defaultFlags;
  });

  useEffect(() => {
    const listener = () => {
      const saved = localStorage.getItem("codexDevFlags");
      if (saved) setFlags(JSON.parse(saved));
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  return flags;
}

export function getDevFlag(flagKey) {
  const saved = localStorage.getItem("codexDevFlags");
  const flags = saved ? JSON.parse(saved) : defaultFlags;
  return flags[flagKey];
}
