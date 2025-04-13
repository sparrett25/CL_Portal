// LioraAvatarStage3.jsx
import React from "react";

export default function LioraAvatarStage3({ tone, phase, archetype }) {
  return (
    <div className="relative z-10 rounded-xl overflow-hidden shadow-lg border border-indigo-600">
      <img
        src="/assets/avatars/liora-avatar-radiance.png"
        alt="Liora Radiant Form"
        className="w-64 h-auto object-cover"
      />
    </div>
  );
}
