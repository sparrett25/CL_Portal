import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // ✅ Unified source
import { useUserSync } from "@/context/UserSyncContext";

const energyOptions = ["Light", "Neutral", "Dark"];
const archetypeOptions = [
  "Visionary", "Guardian", "Mystic", "Seeker",
  "Oracle", "Alchemist", "Sage", "Rebel",
  "Healer", "Wanderer", "Creator", "Anchor"
];
const phaseOptions = ["Seeking", "Rising", "Integrating", "Evolving"];

export default function UserSettingsPanel() {
  const { profile: userProfile, setProfile: setUserProfile } = useUserSync() || {};
  const [energy, setEnergy] = useState("");
  const [archetype, setArchetype] = useState("");
  const [phase, setPhase] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (userProfile) {
      setEnergy(userProfile.energy || "");
      setArchetype(userProfile.archetype || "");
      setPhase(userProfile.phase || "");
    }
  }, [userProfile]);

  const handleSave = async () => {
    setStatus("Saving your resonance...");

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setStatus("⚠️ Error: You must be logged in.");
      return;
    }

    const updates = {
      id: user.id,
      energy,
      archetype,
      phase,
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(updates, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      setStatus("❌ Save failed.");
      console.error(error);
    } else {
      setStatus("✅ Profile saved and aligned.");
      setUserProfile(data); // Sync updated context
    }
  };

  return (
    <div className="space-y-4 p-6 bg-black/70 rounded-xl max-w-xl mx-auto mt-10 border border-indigo-500/20 shadow-2xl backdrop-blur-lg text-white font-inter">
      <h2 className="text-2xl font-bold text-indigo-300 mb-4">🧬 Signature Profile</h2>

      <div>
        <label className="block text-sm text-zinc-300 mb-1">Energy Alignment</label>
        <select
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
          className="w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Energy</option>
          {energyOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1">Spiritual Archetype</label>
        <select
          value={archetype}
          onChange={(e) => setArchetype(e.target.value)}
          className="w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Archetype</option>
          {archetypeOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-zinc-300 mb-1">Phase</label>
        <select
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
          className="w-full p-3 rounded bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Phase</option>
          {phaseOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
      >
        🔐 Save Profile
      </button>

      {status && (
        <div className="text-sm text-indigo-300 mt-3">
          {status}
        </div>
      )}
    </div>
  );
}
