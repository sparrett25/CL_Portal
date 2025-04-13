import { useNavigate } from "react-router-dom";

export default function JourneyOverview() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 text-center bg-black">
      <div className="animate-fade-in max-w-2xl space-y-6">
        {/* 🔮 Phase Orb */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full 
                        bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 
                        shadow-lg animate-pulse" />

        {/* ✨ Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-200">
          The Path Before You
        </h2>

        <p className="text-base text-zinc-400 max-w-lg mx-auto">
          Every soul carries a unique energy signature — a resonance shaped by light, shadow, breath, and phase.
        </p>

        {/* 📜 Scroll of Steps */}
        <div className="text-sm text-zinc-300 opacity-80 leading-relaxed space-y-4">
          <p>In this sacred initiation, you will:</p>
          <ul className="list-disc list-inside text-left mx-auto max-w-md">
            <li>Answer reflective prompts to reveal your energetic essence</li>
            <li>Receive your first Archetype — a mirror of your soul’s pattern</li>
            <li>Connect breath to phase, tone to truth, and insight to initiation</li>
          </ul>
        </div>

        {/* 🧭 Continue Button */}
        <button
          onClick={() => navigate("/onboarding/assessment")}
          className="bg-purple-600 hover:bg-purple-700 transition-all 
                     text-white px-6 py-3 rounded-full text-lg font-semibold 
                     shadow-md hover:shadow-xl"
        >
          I’m Ready to Begin
        </button>
      </div>
    </div>
  );
}
