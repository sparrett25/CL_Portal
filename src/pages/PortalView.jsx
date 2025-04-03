import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PortalView() {
  const navigate = useNavigate();
  const whisperRef = useRef(null);

  // Prevent scrolling on portal entry
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Play soft portal chime
    const chime = new Audio("/sounds/portal-chime.mp3");
    chime.volume = 0.2;
    chime.play().catch((e) => console.warn("Chime autoplay blocked:", e));

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Optional: Liora whisper playback
  const playWhisper = () => {
    if (whisperRef.current) {
      whisperRef.current.play();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white font-cinzel p-6 relative overflow-hidden">

      {/* ✨ Background Aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-950 to-black opacity-80 z-0 pointer-events-none" />

      {/* 🔮 Static Sigil Placeholder */}
      <div className="w-40 h-40 mb-10 rounded-full border-4 border-indigo-400 shadow-xl flex items-center justify-center animate-sigil z-10">
        <div className="w-20 h-20 bg-indigo-500 rounded-full shadow-2xl" />
      </div>

      {/* 🗝️ Welcome Message */}
      <h1 className="text-4xl sm:text-5xl font-bold z-10 animate-fade-in-up">
        ✦ Welcome to the Codex Portal ✦
      </h1>
      <p className="text-zinc-400 mt-4 text-lg max-w-xl animate-fade-in-up z-10" style={{ animationDelay: "0.3s" }}>
        This is your sacred threshold — the breath between the unseen and the illuminated.
      </p>

      {/* 🎙️ Whisper Trigger (optional) */}
      <button
        onClick={playWhisper}
        className="mt-6 text-sm text-indigo-400 underline z-10 hover:text-indigo-300 transition"
      >
        Hear Liora’s Whisper
      </button>
      <audio ref={whisperRef} src="/sounds/liora-whisper.mp3" preload="auto" />

      {/* 🚪 Entry Button */}
      <button
        onClick={() => navigate("/home")}
        className="mt-10 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition rounded-xl text-white text-lg font-semibold shadow-lg animate-sigil z-10"
        style={{ animationDelay: "0.6s" }}
      >
        Enter the Codex
      </button>
    </div>
  );
}
