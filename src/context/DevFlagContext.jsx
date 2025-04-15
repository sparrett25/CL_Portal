// src/context/DevFlagContext.jsx
import { createContext, useContext } from "react";

const DevFlagContext = createContext({});

export const DevFlagProvider = ({ children }) => {
  const devFlags = {
    simulateProd: false,
    whisperPreviewEnabled: true,
    toneEchoDebug: true,
  };

  return (
    <DevFlagContext.Provider value={devFlags}>
      {children}
    </DevFlagContext.Provider>
  );
};

// 🌀 Return all flags
export const useAllDevFlags = () => useContext(DevFlagContext);

// 🔍 Return one specific flag
export const useDevFlag = (flagName) => {
  const flags = useContext(DevFlagContext);
  return flags[flagName];
};
