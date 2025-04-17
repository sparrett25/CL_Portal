import React from "react";
import { useUserSync } from "@/context/UserSyncContext";
import { getAllDevFlags } from "@/dev/useDevFlags";

export default function DevTestPage() {
  const { user, profile } = useUserSync();
  const devFlags = getAllDevFlags();

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-indigo-300 mb-4">🛠 Dev Console</h1>

      <section className="mb-6">
        <h2 className="text-lg text-indigo-400 mb-2">🔧 Dev Flags</h2>
        <pre className="bg-black/30 p-4 rounded-xl border border-indigo-800 text-sm">
          {JSON.stringify(devFlags, null, 2)}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="text-lg text-indigo-400 mb-2">🧑‍🚀 User Profile</h2>
        <pre className="bg-black/30 p-4 rounded-xl border border-indigo-800 text-sm">
          {JSON.stringify(profile, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="text-lg text-indigo-400 mb-2">🔐 Supabase User</h2>
        <pre className="bg-black/30 p-4 rounded-xl border border-indigo-800 text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      </section>
    </div>
  );
}
