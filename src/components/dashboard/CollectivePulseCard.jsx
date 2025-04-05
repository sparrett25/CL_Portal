// components/dashboard/CollectivePulseCard.jsx

import { motion } from "framer-motion";
import { auraGlow, fadeIn } from "@/utils/CodexUIThemeGuide.js";

export default function CollectivePulseCard() {
  return (
    <motion.div
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
      className={`bg-zinc-900 border border-zinc-700 rounded-xl p-4 ${auraGlow.neutral}`}
    >
      <h2 className="text-xl font-semibold text-white mb-1">
        🌐 Collective Pulse
      </h2>
      <p className="text-sm text-zinc-400">
        Trending Archetype:{" "}
        <span className="text-lime-400 font-medium">The Visionary</span>
      </p>
      <p className="text-sm text-zinc-400">
        Most accessed ritual:{" "}
        <span className="text-sky-300 font-medium">Ritual of Clarity</span>
      </p>
    </motion.div>
  );
}
