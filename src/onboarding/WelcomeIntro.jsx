import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function WelcomeIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio("/sounds/portal-chime.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Gracefully handle autoplay block
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 text-center">
      <div className="animate-fade-in">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg animate-pulse" />
          <h1 className="text-3xl font-bold mb-2 tracking-wider">Welcome to Codex Lumina</h1>
          <p className="text-lg opacity-80">This is the sacred beginning of your journey.</p>
        </div>

        <p className="max-w-xl text-sm opacity-70 leading-relaxed mt-4 mb-8">
          You are about to enter a space between worlds — guided by Liora, you’ll uncover your energy signature, breathe into your essence, and receive the first whisper of your archetype. This is not just onboarding. It is awakening.
        </p>

        <button
          onClick={() => navigate("/onboarding/overview")}
          className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-xl"
        >
          Begin the Journey
        </button>
      </div>
    </div>
  );
}
