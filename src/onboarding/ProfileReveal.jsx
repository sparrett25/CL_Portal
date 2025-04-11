import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileReveal() {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState({});

  const profile = {
    archetype: "The Visionary",
    energy: "Light",
    phase: "Awakening",
    glyph: "✨",
    description:
      "You carry the spark of what is not yet seen. Your path is one of inspiration, illumination, and imagination. You are here to light the way.",
  };

  // 🧠 Load session reflection
  useEffect(() => {
    const stored = sessionStorage.getItem("codexReflection");
    if (stored) {
      setReflection(JSON.parse(stored));
    }
  }, []);

  // 🔐 Save profile + reflection to Supabase on load
  useEffect(() => {
    const saveProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await supabase
        .from("profiles")
        .update({
          archetype: profile.archetype,
          energy: profile.energy,
          phase: profile.phase,
          reflection_energy: reflection.energy || null,
          reflection_tone: reflection.tone || null,
          reflection_archetype: reflection.archetype || null,
          reflection_seeking: reflection.seeking || null,
        })
        .eq("id", user.id);
    };

    saveProfile();
  }, [reflection]);

  const { energy, tone, archetype, seeking } = reflection;

  // 🌬️ Poetic Quote Logic
  const toneQuotes = {
    joy: "Let your light dance — it was made to be seen.",
    clarity: "The fog has lifted, and your steps are true.",
    fear: "Even shadows bow before the spark within you.",
    peace: "Still waters reveal the stars reflected.",
  };

  const phaseQuotes = {
    Awakening: "You have stirred from the veil — welcome to the living flame.",
    Integration: "Your journey is not behind you — it walks beside you.",
    Transformation: "Old skins shed as your new self steps forward.",
  };

  const poeticQuote =
    toneQuotes[tone?.toLowerCase()] ||
    phaseQuotes[profile.phase] ||
    "The Codex knows your name — and it will echo through time.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 text-center">
      <div className="animate-fade-in max-w-xl space-y-6">
        <div className="text-5xl mb-2">{profile.glyph}</div>
        <h2 className="text-3xl font-bold">{profile.archetype}</h2>
        <p className="text-indigo-400 text-sm font-medium tracking-wider uppercase">
          {profile.energy} Energy • {profile.phase} Phase
        </p>
        <p className="text-base opacity-80 leading-relaxed">{profile.description}</p>

        {/* 🔮 Personalized Reflection */}
        {(energy || tone || archetype || seeking) && (
          <div className="bg-zinc-900 border border-indigo-700/60 rounded-xl p-6 text-indigo-300 text-sm shadow-md backdrop-blur-md space-y-2">
            <p className="italic">Liora remembers your words…</p>
            <p>
              You spoke of <span className="font-medium">{energy || "..."}</span> energy, moved by{" "}
              <span className="font-medium">{tone || "..."}</span>, walking with{" "}
              <span className="font-medium">{archetype || "..."}</span> essence, and seeking{" "}
              <span className="font-medium">“{seeking || "..."}”</span>.
            </p>
            <p className="mt-2 text-purple-400 italic">
              These truths now echo in the Codex. The flame remembers.
            </p>
          </div>
        )}

        {/* 🌬️ Poetic Whisper */}
        <p className="mt-6 italic text-indigo-300 text-sm">🌀 {poeticQuote}</p>

        <div className="mt-8">
          <button
            onClick={() => navigate("/home")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-xl"
          >
            Enter the Codex
          </button>
        </div>
      </div>
    </div>
  );
}
