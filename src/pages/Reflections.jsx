// pages/Reflections.jsx

import { useEffect, useState } from "react";
import { useUserSync } from "@/context/UserSyncContext";
import { getAllJournalEntries } from "@/services/journalService";

export default function Reflections() {
  const { user } = useUserSync();
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user) {
      getAllJournalEntries(user.id).then(setEntries);
    }
  }, [user]);

  const filtered = entries.filter((e) =>
    filter === "all" ? true : e.tag === filter
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📜 Your Reflections</h1>

      <div className="flex gap-4 mb-6 flex-wrap">
        {["all", "phase-shift", "daily", "dream", "manual"].map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-3 py-1 text-sm rounded border ${
              filter === tag
                ? "bg-indigo-600 border-indigo-400"
                : "bg-zinc-800 border-zinc-600"
            }`}
          >
            {tag === "all" ? "All" : tag.replace("-", " ").toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((entry, idx) => (
          <div
            key={idx}
            className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 shadow-sm"
          >
            <div className="text-sm text-indigo-400 mb-2">
              {new Date(entry.created_at).toLocaleDateString()} •{" "}
              {entry.tag.toUpperCase()}
            </div>
            <p className="text-zinc-100 italic">“{entry.content}”</p>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-zinc-500 italic text-sm">No reflections yet for this category.</p>
        )}
      </div>
    </div>
  );
}
