import React from "react";

export default function RitualCard({ ritual }) {
  return (
    <div className="bg-black/90 rounded-2xl overflow-hidden shadow-lg border border-indigo-500 hover:shadow-xl transition-all duration-300">
      <img
        src={`/assets/rituals/cards/${ritual.filename}`}
        alt={ritual.title}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
