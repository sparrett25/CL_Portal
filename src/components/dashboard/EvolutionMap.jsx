import { useEffect, useState } from "react";
import { getUserEvolutionHistory } from "@/services/userService";
import { motion } from "framer-motion";

export default function EvolutionMap({ userId }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (userId) {
      getUserEvolutionHistory(userId).then(setEvents);
    }
  }, [userId]);

  if (!events.length) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-700 p-5 rounded-xl text-white mt-6">
      <h3 className="text-sm uppercase text-indigo-400 mb-3 tracking-widest">
        🌌 Evolution Timeline
      </h3>
      <ul className="space-y-2 text-sm">
        {events.map((e, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex justify-between border-b border-zinc-800 pb-1"
          >
            <span>
              <span className="mr-2">🌀</span>
              <strong>{e.from_phase}</strong> → <strong>{e.to_phase}</strong>
            </span>
            <span className="text-zinc-400">{new Date(e.timestamp).toLocaleDateString()}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
