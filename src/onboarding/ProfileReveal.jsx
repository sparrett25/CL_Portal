import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfileReveal() {
  const navigate = useNavigate();

  const profile = {
    archetype: "The Visionary",
    energy: "Light",
    phase: "Awakening",
    glyph: "✨",
    description:
      "You carry the spark of what is not yet seen. Your path is one of inspiration, illumination, and imagination. You are here to light the way.",
  };

  // 🔐 Save profile to Supabase on load
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
        })
        .eq("id", user.id);
    };

    saveProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 text-center">
      <div className="animate-fade-in max-w-xl space-y-6">
        <div className="text-5xl mb-2">{profile.glyph}</div>
        <h2 className="text-3xl font-bold">{profile.archetype}</h2>
        <p className="text-indigo-400 text-sm font-medium tracking-wider uppercase">
          {profile.energy} Energy • {profile.phase} Phase
        </p>
        <p className="text-base opacity-80 leading-relaxed">{profile.description}</p>

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
