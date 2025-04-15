
import React, { useState } from "react";

export default function WhisperCard({ whisper }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer p-4 bg-black/70 rounded-xl border border-indigo-500 shadow-md transition-all"
    >
      <h3 className="text-lg font-semibold text-indigo-300">{whisper.title}</h3>
      {expanded && <p className="mt-2 text-white">{whisper.message}</p>}
    </div>
  );
}
