import React from "react";
import LioraAvatarManager from "./LioraAvatarManager";
import LioraWhisperRipple from "./LioraWhisperRipple";
import LioraMoodParticles from "./LioraMoodParticles";

export default function LioraVisualShell({ tone, speaking, phase, archetype, micLevel }) {
  return (
    <div className="relative flex items-center justify-center w-full max-w-md">
      {/* 🌌 Mood Particles Background */}
      <LioraMoodParticles tone={tone} />

      {/* 🔮 Core Avatar Display */}
      <LioraAvatarManager tone={tone} phase={phase} archetype={archetype} />

      {/* 🌀 Whisper Ripple when speaking */}
      {speaking && <LioraWhisperRipple tone={tone} />}

      {/* 🎙️ Optional: Mic Level Visual Bar */}
      {typeof micLevel === "number" && (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-zinc-800/60 rounded overflow-hidden mt-4">
          <div
            className="h-full bg-indigo-400 transition-all duration-75"
            style={{ width: `${Math.min(micLevel * 1.5, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
