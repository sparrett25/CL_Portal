// LioraAvatarManager.jsx
import React from "react";
import LioraAvatarStage3 from "./LioraAvatarStage3";

export default function LioraAvatarManager({ tone, phase, archetype }) {
  // 🌗 Simple logic for now — always show Radiant stage
  return <LioraAvatarStage3 tone={tone} phase={phase} archetype={archetype} />;

  // 🔮 In future: return stage based on user progression or unlocking
}
