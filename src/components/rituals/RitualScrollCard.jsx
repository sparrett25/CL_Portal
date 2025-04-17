import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function RitualScrollCard({ ritual, isUnlocked = true, onBegin }) {
  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`relative w-full rounded-2xl shadow-xl border border-zinc-700 p-6 bg-zinc-900 overflow-hidden group ${
        isUnlocked ? "hover:border-indigo-500" : "opacity-60 cursor-not-allowed"
      }`}
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-white mb-2">{ritual.title}</h2>

      {/* Quote or Purpose */}
      {ritual.quote && (
        <p className="italic text-indigo-300 text-sm mb-4">“{ritual.quote}”</p>
      )}
      {ritual.purpose && (
        <p className="text-sm text-zinc-300 mb-4">{ritual.purpose}</p>
      )}

      {/* Archetype & Phase */}
      <div className="flex flex-wrap gap-4 text-xs text-zinc-400 mb-4">
        <span>🧬 {ritual.archetype}</span>
        <span>🌒 {ritual.phase}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ritual.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-zinc-800 text-white text-xs px-2 py-1 rounded-full border border-zinc-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Begin Button or Lock */}
      {isUnlocked ? (
        <button
          onClick={onBegin}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm transition"
        >
          Begin Ritual →
        </button>
      ) : (
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <Lock size={18} />
          <span>This ritual is locked</span>
        </div>
      )}

      {/* Optional Locked Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl z-10 pointer-events-none" />
      )}
    </motion.div>
  );
}
