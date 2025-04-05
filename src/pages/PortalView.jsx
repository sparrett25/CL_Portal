import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PortalView() {
  const navigate = useNavigate();
  const whisperRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const chime = new Audio("/sounds/portal-chime.mp3");
    chime.volume = 0.2;
    chime.play().catch((e) => console.warn("Chime autoplay blocked:", e));

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const playWhisper = () => {
    whisperRef.current?.play();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white font-cinzel p-6 relative overflow-hidden">
      {/* ✨ Background Aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-950 to-black opacity-80 z-0 pointer-events-none" />

      {/* 🌌 Static Sigil */}
      <div className="w-40 h-40 mb-8 rounded-full border-4 border-indigo-400 shadow-xl flex items-center justify-center animate-pulse z-10">
        <div className="w-20 h-20 bg-indigo-500 rounded-full shadow-2xl" />
      </div>

      {/* 🗝️ Welcome Message */}
      <h1 className="text-4xl sm:text-5xl font-bold z-10">✦ Welcome to the Codex Portal ✦</h1>
      <p className="text-zinc-400 mt-4 text-lg max-w-xl z-10">
        This is your sacred threshold — the breath between the unseen and the illuminated.
      </p>

      {/* 🎙️ Whisper Trigger */}
      <button
        onClick={playWhisper}
        className="mt-4 text-sm text-indigo-400 underline z-10 hover:text-indigo-300 transition"
      >
        Hear Liora’s Whisper
      </button>
      <audio ref={whisperRef} src="/sounds/liora-whisper.mp3" preload="auto" />

      {/* 🚪 Dual Entry Boxes */}
      <div className="mt-10 z-10 flex flex-wrap justify-center gap-6 w-full max-w-4xl">
        <div className="bg-white/5 p-6 rounded-xl shadow-md flex-1 min-w-[280px]">
          <h2 className="text-xl font-semibold mb-2">Begin My Journey</h2>
          <p className="text-sm text-zinc-300 mb-4">
            New to the Codex? Step into the sacred gateway and initiate your personalized journey through energy, archetypes, and intention.
          </p>
          <button
            onClick={() => navigate("/onboarding")}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-white font-medium shadow"
          >
            Begin My Journey
          </button>
        </div>
        <div className="bg-white/5 p-6 rounded-xl shadow-md flex-1 min-w-[280px]">
          <h2 className="text-xl font-semibold mb-2">Continue My Journey</h2>
          <p className="text-sm text-zinc-300 mb-4">
            Already initiated? Enter your keycode or login to return to your evolving Codex Signature and current spiritual phase.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-white font-medium shadow"
          >
            Continue My Journey
          </button>
        </div>
      </div>

      {/* 🌟 Mission + Footer Strip */}
      <div
        className="mt-10 w-full max-w-2xl text-sm text-white/90 px-4 text-center animate-fade-in-up"
        style={{ animationDelay: "0.8s" }}
      >
        <h2 className="text-xl font-semibold mb-2 text-white">Our Mission</h2>
        <p>
          Codex Lumina is a living light—a sacred platform where consciousness, creativity, and code harmonize. We exist to awaken personal truth,
          illuminate collective pathways, and honor the divine architecture of being.
        </p>
      </div>

      <div className="mt-6 text-xs text-zinc-500 opacity-80 z-10">
        ✨ The Codex evolves with you — in stillness and motion, in shadow and light. ✨
      </div>
    </div>
  );
}
