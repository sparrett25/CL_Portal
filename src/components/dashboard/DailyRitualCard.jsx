// components/dashboard/DailyRitualCard.jsx

import { getDailyAction } from "@/utils/dailyActions";
import { motion } from "framer-motion";

export default function DailyRitualCard({ profile }) {
  if (!profile) return null;

  const { energy, archetype, phase } = profile;
  const action = getDailyAction(energy, archetype, phase);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl text-white shadow-md"
    >
      <h3 className="text-sm uppercase text-pink-400 mb-2 tracking-wider">
        Daily {action.type === "breath" ? "Breath Practice" : "Ritual"}
      </h3>

      <h4 className="text-lg font-semibold text-pink-200">{action.title}</h4>
      <p className="text-base text-pink-100 mt-2">{action.prompt}</p>

      <div className="text-xs text-right text-zinc-500 mt-3 italic">
        Archetype: {archetype} | Phase: {phase}
      </div>
    </motion.div>
  );
}
