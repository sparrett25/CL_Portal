import React, { useState } from "react";
import { useDevFlags } from "./useDevFlags";
import { useUserSync } from "@/context/UserSyncContext";
import { runDevSeeder } from "@/scripts/devSeeder";
import { supabase } from "@/lib/supabase";

export default function DevConsole() {
  const flags = useDevFlags();
  const { user } = useUserSync();
  const [seederStatus, setSeederStatus] = useState("");

  const handleRunSeeder = async () => {
    setSeederStatus("🌱 Running DevSeeder...");
    await runDevSeeder();
    setSeederStatus("✅ DevSeeder completed!");
  };

  const handleSeedMe = async () => {
    setSeederStatus("🌱 Seeding for active user...");
    const res = await fetch("/api/seed", { method: "POST" });
    const msg = await res.text();
    setSeederStatus(msg);
  };

  const resetToSeekerMode = async () => {
    console.log("🔁 Resetting to Seeker Mode...");

    try {
      await supabase.auth.signOut();
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase("supabase-auth-cache");

      setTimeout(() => {
        console.log("✨ Seeker mode active — redirecting to /portal");
        window.location.href = "/portal";
      }, 500); // small delay to ensure deletion finishes
    } catch (err) {
      console.error("❌ Error during seeker reset:", err);
    }
  };

  return (
    <div className="p-6 bg-black text-white space-y-6">
      <h2 className="text-2xl font-bold">🛠️ Dev Console</h2>

      {/* 🔍 Flags & User */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Dev Flags</h3>
        <pre className="text-sm bg-zinc-800 p-3 rounded">{JSON.stringify(flags, null, 2)}</pre>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">User Context</h3>
        <pre className="text-sm bg-zinc-800 p-3 rounded">{JSON.stringify(user, null, 2)}</pre>
      </div>

      {/* 🌱 Seeder Section */}
      <div>
        <h3 className="text-lg font-semibold">🌱 Run Seeder</h3>
        <button
          onClick={handleRunSeeder}
          className="px-4 py-2 mt-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all"
        >
          Run Local DevSeeder
        </button>
        <button
          onClick={handleSeedMe}
          className="px-4 py-2 mt-2 ml-4 bg-purple-600 hover:bg-purple-700 rounded-xl transition-all"
        >
          🌱 Seed For Active User (API)
        </button>
        <p className="mt-2 text-green-400 text-sm">{seederStatus}</p>
      </div>

      {/* 🔑 Codex Key Test Suite */}
      <div>
        <h3 className="text-lg font-semibold mb-2">🔑 Codex Key Test Suite</h3>
        <div className="space-y-2">
          <button
            onClick={() => window.location.href = "/portal?key=INITIATE-888"}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Test VALID Key (INITIATE-888)
          </button>
          <button
            onClick={() => window.location.href = "/portal?key=USED-KEY-123"}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
          >
            Test USED Key (USED-KEY-123)
          </button>
          <button
            onClick={() => window.location.href = "/portal?key=EXPIRED-KEY-999"}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Test EXPIRED Key (EXPIRED-KEY-999)
          </button>
        </div>
      </div>

      {/* 🧼 Seeker Reset Ritual */}
      <div className="pt-8">
        <h3 className="text-lg font-semibold mb-2">🧼 Ritual of the Seeker Reset</h3>
        <button
          onClick={resetToSeekerMode}
          className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow-md transition-all"
        >
          🔁 Reset to Seeker Mode (Clear Auth + Cache)
        </button>
        <p className="text-sm mt-2 text-gray-400">
          Sign out, clear session/cache, and return to <code>/portal</code>
        </p>
      </div>
    </div>
  );
}
