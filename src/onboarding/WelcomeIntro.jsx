import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function WelcomeIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio("/sounds/portal-chime.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Optional: display toast or whisper log if autoplay fails
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 text-center bg-black">
      <div className="animate-fade-in max-w-xl space-y-6">
        {/* ✨ Animated Glyph Orb */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-full 
                        bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 
                        shadow-xl animate-pulse" />

        {/* 🔮 Welcome Header */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-indigo-300">
          Welcome to Codex Lumina
        </h1>

        <p className="text-base sm:text-lg text-zinc-400">
          This is the sacred beginning of your journey.
        </p>

        {/* 📜 Journey Description */}
        <p className="text-sm sm:text-base text-zinc-300 opacity-80 leading-relaxed">
          You are about to enter a space between worlds — guided by Liora, you’ll uncover your energy signature, breathe into your essence, and receive the first whisper of your archetype. This is not just onboarding. It is awakening.
        </p>

        {/* 🌌 Proceed Button */}
        <button
          onClick={() => navigate("/onboarding/overview")}
          className="bg-indigo-500 hover:bg-indigo-600 transition-all 
                     text-white px-6 py-3 rounded-full text-lg font-semibold 
                     shadow-md hover:shadow-lg"
        >
          Begin the Journey
        </button>
      </div>
    </div>
  );
}
