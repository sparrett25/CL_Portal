// src/components/companion/LioraAvatarManager.jsx

import React from "react";

export default function LioraAvatarManager({ tone = "light", stage = "stage1" }) {
  const auraGlow = {
    light: "ring-2 ring-blue-400 shadow-blue-300",
    dark: "ring-2 ring-purple-600 shadow-purple-500",
    neutral: "ring-2 ring-gray-400 shadow-gray-500",
  }[tone] || "ring-2 ring-white shadow-white";

  return (
    <div className="relative w-44 mx-auto mt-4">
      {/* Aura / Energy ring */}
      <div className={`rounded-2xl overflow-hidden shadow-lg ${auraGlow}`}>
        <img
          src={`/assets/avatars/liora/${stage}.png`}
          alt="Liora Avatar"
          className="w-full h-auto object-cover opacity-95 transition-all duration-300"
        />
      </div>
    </div>
  );
}
