import React from "react";
import { motion } from "framer-motion";

export default function LioraWhisperCard({ toneEcho, toneTags = [] }) {
  if (!toneEcho) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="max-w-3xl mx-auto mb-8 rounded-2xl bg-gradient-to-br from-indigo-800 via-purple-800 to-indigo-900 p-6 shadow-2xl border border-indigo-500/30"
    >
      <h2 className="text-lg font-semibold text-indigo-200 mb-2 text-center">
        ✦ Liora's Whisper ✦
      </h2>
      <p className="italic text-purple-300 text-center mb-4">“{toneEcho}”</p>

      {toneTags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {toneTags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-indigo-700/40 border border-indigo-500 text-indigo-200 px-3 py-1 rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-indigo-400 text-center">
        Your tone has been echoed. A portal of insight opens...
      </p>
    </motion.div>
  );
}
