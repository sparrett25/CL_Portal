export default function JournalList({ entries = [] }) {
  if (!entries.length) {
    return <p className="text-sm text-indigo-300">No journal entries yet. Begin your reflection above.</p>;
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white/5 border border-indigo-800 rounded-lg p-4 text-white"
        >
          <p className="text-xs text-indigo-300 mb-2">
            {new Date(entry.created_at).toLocaleDateString()} • Tone: {entry.tone || "Neutral"}
          </p>
          <p className="text-sm text-white/90 whitespace-pre-wrap">{entry.content}</p>
        </div>
      ))}
    </div>
  );
}
