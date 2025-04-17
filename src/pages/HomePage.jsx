import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DailyAlignmentPanel from "@/components/home/DailyAlignmentPanel";

export default function HomePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.error("❌ Failed to fetch profile:", error);
        return;
      }

      if (data) setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const energyGlow = {
    Light: "from-amber-300 via-rose-400 to-fuchsia-600",
    Neutral: "from-gray-800 via-sky-500 to-indigo-600",
    Dark: "from-indigo-950 via-purple-800 to-black",
  };

  const glow = profile?.energy ? energyGlow[profile.energy] : "from-zinc-800 to-black";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${glow} text-white px-6 py-10`}>
      <div className="max-w-3xl mx-auto text-center animate-fadeIn">
        {loading || !profile ? (
          <div className="text-xl opacity-80">Loading your Codex...</div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-2 tracking-wide drop-shadow-md">
              Welcome, {profile.archetype}
            </h1>
            <p className="text-sm uppercase tracking-widest text-indigo-300">
              {profile.energy} Energy • {profile.phase} Phase
            </p>

            <p className="mt-6 text-base opacity-90 leading-relaxed">
              Liora whispers: <em>
                “You have arrived at the threshold of your becoming.  
                This place echoes with your sacred rhythm. Let us begin.”
              </em>
            </p>

            <div className="mt-10">
              <DailyAlignmentPanel
                archetype={profile.archetype}
                energy={profile.energy}
                phase={profile.phase}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
