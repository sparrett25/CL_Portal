// src/dev/TempSignOutButton.jsx

import { supabase } from "@/lib/supabase";

export default function TempSignOutButton() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleSignOut}
      className="fixed bottom-6 right-6 px-4 py-2 bg-red-600 rounded-xl text-white font-semibold shadow-lg z-50 hover:bg-red-700 transition"
    >
      🔥 Sign Out
    </button>
  );
}
