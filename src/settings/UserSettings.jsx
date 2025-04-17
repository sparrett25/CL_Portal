import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useUserSync } from "@/context/UserSyncContext";

export default function UserSettings() {
  const navigate = useNavigate();
  const { clearUser } = useUserSync();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearUser();
    navigate("/portal");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 font-inter">
      <div className="max-w-lg mx-auto bg-zinc-900 border border-indigo-500/30 p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-300 mb-4 text-center">🛠️ Codex Settings</h2>

        {/* ✏️ Placeholder for nickname, glyph aura, and theme settings */}
        <div className="text-zinc-400 text-sm mb-6 text-center">
          (More sacred settings will appear here soon...)
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
        >
          🔓 Log Out of the Codex
        </button>
      </div>
    </div>
  );
}
