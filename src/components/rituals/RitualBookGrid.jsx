import React from "react";
import RitualScrollCard from "./RitualScrollCard";
import useRituals from "@/hooks/useRituals";

// 🔐 Replace with actual user context later
const user = {
  archetype: "Flamekeeper",
  phase: "Dark – Rebirth",
};

function checkRitualAccess(user, ritual) {
  const matchesPhase = !ritual.phase || ritual.phase === user.phase;
  const matchesArchetype = !ritual.archetype || ritual.archetype === user.archetype;
  return matchesPhase && matchesArchetype;
}

export default function RitualBookGrid({ onSelect }) {
  const { rituals, loading, error } = useRituals();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-inter p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-300">
          ✧ Book of Rituals ✧
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-zinc-800 h-72 p-6 border border-zinc-700 shadow-inner"
            >
              <div className="h-6 bg-zinc-700 rounded w-2/3 mb-4" />
              <div className="h-4 bg-zinc-700 rounded w-1/2 mb-2" />
              <div className="h-3 bg-zinc-700 rounded w-full mb-2" />
              <div className="h-3 bg-zinc-700 rounded w-5/6 mb-4" />
              <div className="h-8 bg-zinc-700 rounded w-1/3 mt-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error loading rituals.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white font-inter p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-300">
        ✧ Book of Rituals ✧
      </h1>
      <p className="text-center text-zinc-400 mb-8">
        Choose a ritual aligned with your energy, archetype, or phase.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rituals.map((ritual) => {
          const unlocked = checkRitualAccess(user, ritual);
          return (
            <RitualScrollCard
              key={ritual.id}
              ritual={ritual}
              isUnlocked={unlocked}
              onBegin={() => onSelect?.(ritual)}
            />
          );
        })}
      </div>
    </div>
  );
}
