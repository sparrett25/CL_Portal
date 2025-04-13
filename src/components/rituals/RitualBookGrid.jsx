import React from "react";
import { rituals } from "./ritualsData";
import RitualCard from "./RitualCard";

export default function RitualBookGrid() {
  return (
    <div className="min-h-screen bg-black text-white font-inter p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-300">
        ✧ Book of Rituals ✧
      </h1>
      <p className="text-center text-zinc-400 mb-8">
        Choose a ritual aligned with your energy, archetype, or phase.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rituals.map((ritual) => (
          <RitualCard key={ritual.title} ritual={ritual} />
        ))}
      </div>
    </div>
  );
}
