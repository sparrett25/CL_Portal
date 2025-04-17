import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function DailyAlignmentPanel({ archetype, energy, phase }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleVolume = () => {
    const isMuted = !muted;
    setMuted(isMuted);
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch((err) => {
          console.warn("Audio playback failed:", err.message);
        });
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.muted = true;
    }
  }, []);

  const affirmations = {
    Visionary: "You see what others have not yet imagined.",
    Architect: "Your design holds the seed of a greater world.",
    Seeker: "Your path is the map of becoming.",
    Alchemist: "You transmute the unseen into form.",
    Guardian: "You hold the sacred center with care.",
    Oracle: "Your insight weaves the fabric of time.",
    // Expand as needed
  };

  return (
    <div className="relative border border-white/10 rounded-xl bg-white/5 p-6 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-left space-y-2">
          <h2 className="text-lg font-bold text-indigo-300">Daily Alignment</h2>
          <p className="text-sm text-white/80 italic">
            {affirmations[archetype] || "May your path align with purpose."}
          </p>
        </div>

        <button
          onClick={toggleVolume}
          className="text-indigo-400 hover:text-indigo-200 transition"
        >
          {muted ? (
            <VolumeX size={20} />
          ) : (
            <Volume2 size={20} className="animate-pulse" />
          )}
        </button>
      </div>

      {/* 🔊 Ritual Audio Pad */}
      <audio ref={audioRef} loop>
        <source src="/assets/audio/ritual-pad-neutral.mp3" type="audio/mpeg" />
      </audio>

      {/* ✨ Breathing Pulse Visual */}
      <div className="mt-8 flex justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-indigo-400/20 animate-breathPulse" />
          <div className="absolute inset-2 rounded-full bg-indigo-400/30 blur-sm" />
          <div className="absolute inset-4 rounded-full bg-indigo-500/40 blur-[2px]" />
        </div>
      </div>
    </div>
  );
}
