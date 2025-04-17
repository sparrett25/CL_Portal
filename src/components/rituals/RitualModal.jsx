import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RitualModal({ ritual, onClose }) {
  const [audio, setAudio] = useState(null);
  const [audioOn, setAudioOn] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const steps = ritual.description
    ? ritual.description.split(/(?<=[.!?])\s+(?=[A-Z])/g)
    : [];

  // Audio setup
  useEffect(() => {
    const sound = new Audio(`/assets/audio/ritual-pad-light.mp3`);
    sound.loop = true;
    sound.volume = 0.4;
    setAudio(sound);
    return () => {
      sound.pause();
      setAudio(null);
    };
  }, []);

  useEffect(() => {
    if (audio) {
      audioOn ? audio.play() : audio.pause();
    }
  }, [audio, audioOn]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Ritual complete handler
  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
    // TODO: Add Supabase or Journal log here
    console.log(`✨ Ritual completed: ${ritual.title}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center overflow-y-auto px-4 py-8"
      >
        {/* Background glow aura */}
        <div className="absolute inset-0 z-10 pointer-events-none animate-pulse bg-gradient-radial from-indigo-700/10 to-transparent" />

        {/* Modal Content */}
        <div className="relative w-full max-w-3xl bg-zinc-900 rounded-2xl shadow-2xl p-6 sm:p-10 text-white border border-zinc-700 z-20">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-xl bg-zinc-800 border border-zinc-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition z-30"
            aria-label="Close Ritual"
          >
            ✕
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => setAudioOn(!audioOn)}
            className="absolute top-6 left-6 text-sm bg-zinc-800 text-white border border-zinc-600 px-3 py-1 rounded-full hover:bg-indigo-600 transition z-30"
          >
            {audioOn ? "🔊 Sound On" : "🔇 Sound Off"}
          </button>

          {/* Title + Quote */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-2">{ritual.title}</h2>
            {ritual.quote && (
              <p className="italic text-indigo-300 text-md">“{ritual.quote}”</p>
            )}
          </div>

          {/* Archetype + Phase */}
          <div className="flex justify-center gap-4 mb-6 text-sm text-zinc-400">
            <span>🧬 {ritual.archetype}</span>
            <span>🌒 {ritual.phase}</span>
          </div>

          {/* Ritual Steps */}
          <div className="text-lg leading-relaxed min-h-[120px] text-center">
            {steps[stepIndex]}
          </div>

          {/* Step Controls */}
          <div className="flex justify-center gap-4 mt-8">
            {stepIndex < steps.length - 1 ? (
              <button
                onClick={() => setStepIndex(stepIndex + 1)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white transition"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className={`px-6 py-2 rounded-xl text-white transition ${
                  completed
                    ? "bg-emerald-600 animate-pulse"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {completed ? "🌟 Ritual Complete" : "Complete Ritual"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
