import React from "react";
import { useUserSync } from "@/context/UserSyncContext";

export default function SanctumPillar() {
  const { user } = useUserSync();

  const profile = {
    archetype: user?.archetype || "The Visionary",
    energy: user?.energy || "Light",
    phase: user?.phase || "Awakening",
    glyph: "✨",
  };

  return (
    <div className="text-center space-y-2">
      <div className="text-6xl">{profile.glyph}</div>
      <h2 className="text-2xl tracking-wide font-bold">{profile.archetype}</h2>
      <p className="text-sm uppercase opacity-70">{profile.energy} Energy</p>
      <p className="text-sm italic text-indigo-400">{profile.phase} Phase</p>
    </div>
  );
}
