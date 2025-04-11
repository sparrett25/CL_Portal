import { createContext, useContext, useEffect, useState } from "react";

const defaultFlags = {
  enableWhispers: true,
  ritualPortalsEnabled: false,
  phaseMapVisible: false,
  lioraGlow: true,
  supabaseProfile: true,
};

const DevFlagContext = createContext(defaultFlags);

export function DevFlagProvider({ children }) {
  const [flags, setFlags] = useState(() => {
    const saved = localStorage.getItem("codexDevFlags");
    return saved ? JSON.parse(saved) : defaultFlags;
  });

  useEffect(() => {
    const listener = () => {
      const saved = localStorage.getItem("codexDevFlags");
      if (saved) {
        setFlags(JSON.parse(saved));
      }
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  return (
    <DevFlagContext.Provider value={flags}>
      {children}
    </DevFlagContext.Provider>
  );
}

export function useDevFlag(key) {
  const flags = useContext(DevFlagContext);
  return flags[key];
}

export function useAllDevFlags() {
  return useContext(DevFlagContext);
}
