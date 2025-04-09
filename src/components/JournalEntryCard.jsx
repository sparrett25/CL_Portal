import { useState } from "react";

export default function JournalEntryCard({ entry, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((e) => !e);

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-black border border-indigo-700/50 rounded-xl p-5 shadow-lg space-y-3 relative">
      {/* Entry header with date and delete button */}
      <div className="flex justify-between items-center text-xs text-zinc-400 mb-1">
        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-red-400 hover:text-red-500 text-xs"
        >
          Delete
        </button>
      </div>

      {/* Tags for entry */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex gap-2 mb-2 text-xs">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-600 text-white px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Entry content */}
      <div className="text-sm text-indigo-100 whitespace-pre-line">
        {expanded || entry.content.length <= 100
          ? entry.content
          : `${entry.content.substring(0, 100)}...`}
      </div>

      {/* Read more / Collapse button */}
      {entry.content.length > 100 && (
        <button
          onClick={toggleExpand}
          className="text-xs text-indigo-400 hover:underline"
        >
          {expanded ? "Collapse" : "Read More"}
        </button>
      )}
    </div>
  );
}
