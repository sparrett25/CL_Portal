import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <div className="animate-pulse text-3xl font-cinzel tracking-wide mb-4">
          🔮 Loading Codex Lumina...
        </div>
        <div className="text-sm opacity-60">Please wait while your path is prepared</div>
      </div>
    </div>
  );
}
