import React, { useState } from "react";
import JournalEntry from "@/components/Journal/JournalEntry";
import JournalReflectionFeed from "@/components/Journal/JournalReflectionFeed";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);

  const handleSave = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-lime-300 drop-shadow">
            📖 Soul Reflections
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Honor what rises. This is your sacred archive.
          </p>
        </header>

        {/* Journal Entry Input */}
        <JournalEntry onSave={handleSave} />

        {/* Reflection Feed */}
        <JournalReflectionFeed entries={entries} />
      </div>
    </div>
  );
}
