import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const phaseQuotes = {
  Initiation: "The spark within you has become flame.",
  Awakening: "You stir from the dream — luminous and aware.",
  Embodiment: "You now carry the Codex in every breath.",
  Integration: "You are becoming what you once sought.",
  Transcendence: "You dissolve into truth — and become light.",
  Revelation: "You are the mirror, the myth, the muse."
};

export default function ProfileReveal() {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState({});

  useEffect(() => {
    const stored = sessionStorage.getItem("codexReflection");
    if (stored) {
      setReflection(JSON.parse(stored));
    }
  }, []);

  const {
    archetype = "The Seeker",
    energy = "Neutral",
    phase = "Initiation",
    glyph = "✨",
    description = "You are beginning your path. Mystery awaits."
  } = reflection;

  const affirmation = phaseQuotes[phase] || "You walk forward now with light in your hands.";

  const handleConfirm = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;
    if (!user) {
      alert("User session not found.");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        energy,
        archetype,
        phase,
        has_onboarded: true,
      })
      .eq("id", user.id);

    if (error) {
      console.error("❌ Failed to update profile:", error.message);
      alert("Profile update failed.");
      return;
    }

    const chime = new Audio("/sounds/ritual-confirm.mp3");
    chime.volume = 0.5;
    chime.play().catch(() => {});

    console.log("✅ Profile confirmed. Entering the Codex...");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-900 to-black text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-xl bg-white/10 p-8 rounded-2xl border border-indigo-600 backdrop-blur-md shadow-xl text-center animate-fadeInSlow">
        <div className="text-5xl mb-4 animate-pulse">{glyph}</div>
        <h1 className="text-3xl font-bold mb-4 text-indigo-100">You Are: {archetype}</h1>
        <p className="text-indigo-300 text-sm mb-1">Energy Alignment: {energy}</p>
        <p className="text-indigo-300 text-sm mb-4">Phase: {phase}</p>
        <p className="text-indigo-100 italic mb-6">{description}</p>
        <p className="text-indigo-200 text-sm mb-6 animate-fadeInSlow delay-300">“{affirmation}”</p>

        <button
          onClick={handleConfirm}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
        >
          ✨ Complete Onboarding
        </button>
      </div>
    </div>
  );
}