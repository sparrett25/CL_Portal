import { useState } from "react";

export default function JournalEntry({ onSave }) {
  const [entry, setEntry] = useState("");
  const [tone, setTone] = useState("neutral");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() === "") return;
    onSave({ entry, tone, timestamp: new Date().toISOString() });
    setEntry("");
    setTone("neutral");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg bg-zinc-800 shadow-md space-y-4">
      <textarea
        className="w-full p-3 rounded-lg bg-zinc-900 text-white placeholder-zinc-500"
        rows={6}
        placeholder="Begin your reflection..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <div className="flex items-center justify-between">
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded bg-zinc-700 text-white p-2"
        >
          <option value="neutral">Neutral</option>
          <option value="hopeful">Hopeful</option>
          <option value="heavy">Heavy</option>
          <option value="grateful">Grateful</option>
          <option value="uncertain">Uncertain</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          Save Entry
        </button>
      </div>
    </form>
  );
}
