import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DailyAlignmentPanel from "@/components/DailyAlignmentPanel"; // ✅ Panel: light/dark reflection

export default function HomePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("archetype, energy, phase")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Failed to fetch profile:", error);
        return;
      }

      if (data) setProfile(data);
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading your Codex...
      </div>
    );
  }

  const { archetype, energy, phase } = profile;

  const energyGlow = {
    Light: "from-yellow-300 via-pink-300 to-purple-500",
    Neutral: "from-gray-600 via-blue-400 to-indigo-700",
    Dark: "from-indigo-900 via-purple-700 to-black",
  };

  const glow = energyGlow[energy] || "from-zinc-600 to-zinc-900";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${glow} text-white px-6 py-10`}>
      <div className="max-w-3xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-2 tracking-wide">
          Welcome, {archetype}
        </h1>
        <p className="text-sm uppercase tracking-widest text-indigo-300">
          {energy} Energy • {phase} Phase
        </p>

        <p className="mt-6 text-base opacity-80 leading-relaxed">
          Liora whispers: <em>"You have arrived at the threshold of your own becoming.  
          This space is alive with your reflection. Let’s begin."</em>
        </p>

        {/* 🔮 Living Daily Alignment Panel */}
        <DailyAlignmentPanel
          archetype={archetype}
          energy={energy}
          phase={phase}
        />
      </div>
    </div>
  );
}
