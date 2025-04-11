import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function JournalReflectionFeed({ entries }) {
  const [filtered, setFiltered] = useState("all");

  const tones = ["all", "neutral", "hopeful", "heavy", "grateful", "uncertain"];

  const filteredEntries = entries.filter((entry) =>
    filtered === "all" ? true : entry.tone === filtered
  );

  return (
    <div className="space-y-6 mt-6">
      <div className="flex gap-2 items-center mb-4">
        <span className="text-zinc-400">Filter by tone:</span>
        {tones.map((tone) => (
          <button
            key={tone}
            onClick={() => setFiltered(tone)}
            className={`px-3 py-1 rounded-full text-sm transition 
              ${filtered === tone ? "bg-indigo-600 text-white" : "bg-zinc-700 text-zinc-300"}`}
          >
            {tone.charAt(0).toUpperCase() + tone.slice(1)}
          </button>
        ))}
      </div>

      {filteredEntries.length === 0 ? (
        <p className="text-zinc-400 text-center">No reflections found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredEntries.map((entry, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 shadow-md bg-zinc-800 ${
                toneColor(entry.tone)
              }`}
            >
              <p className="text-sm text-zinc-400 mb-2">
                {format(new Date(entry.timestamp), "PPPp")}
              </p>
              <p className="text-white">{entry.entry}</p>
              <span className="text-xs mt-2 inline-block text-zinc-400">Tone: {entry.tone}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function toneColor(tone) {
  switch (tone) {
    case "hopeful":
      return "border-green-400";
    case "heavy":
      return "border-red-500";
    case "grateful":
      return "border-yellow-400";
    case "uncertain":
      return "border-blue-400";
    case "neutral":
    default:
      return "border-zinc-500";
  }
}
