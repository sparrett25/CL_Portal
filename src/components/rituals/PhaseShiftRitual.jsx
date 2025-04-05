import { motion } from "framer-motion";

export default function PhaseShiftRitual({ profile, onComplete }) {
  const { energy, archetype, phase } = profile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-950 border border-indigo-700 p-6 rounded-xl text-white shadow-xl mt-6"
    >
      <h2 className="text-xl font-semibold text-indigo-300 mb-2">
        🌒 Ritual of Transition
      </h2>
      <p className="text-sm text-zinc-400 mb-4">
        You are preparing to shift beyond <strong>{phase}</strong> — into a new
        phase of your spiritual journey.
      </p>

      <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700 text-sm text-indigo-200 mb-4">
        “There comes a moment when stillness turns to motion. You are that
        moment. You are the breath between.”
      </div>

      <p className="text-sm text-zinc-400">
        When you're ready, take a slow deep breath, close your eyes, and release
        the old phase with gratitude. When you feel the shift, click below to step
        forward.
      </p>

      <button
        onClick={onComplete}
        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition"
      >
        🌟 Complete the Transition
      </button>
    </motion.div>
  );
}
