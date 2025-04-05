// components/dashboard/LioraWhisperCard.jsx

import { motion } from "framer-motion";
import { getWhisper } from "@/utils/insightWhispers";

export default function LioraWhisperCard({ profile }) {
  if (!profile) return null;

  const { energy, archetype, phase } = profile;
  const whisper = getWhisper(energy, archetype, phase);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl text-white shadow-md"
    >
      <h3 className="text-sm uppercase text-indigo-400 mb-2 tracking-wider">
        Liora’s Whisper
      </h3>

      <div className="border-l-4 border-indigo-500 pl-4 italic text-indigo-200 text-base">
        “{whisper}”
      </div>

      <div className="text-xs text-right text-zinc-500 mt-3 italic">
        Alignment: {energy} | Archetype: {archetype} | {phase}
      </div>
    </motion.div>
  );
}
