import React from "react";
import quantumMeta from "@/content/scrollkeeper/series/advanced-insights/quantum-perspectives/meta.json";

export default function ScrollIndexViewer() {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-black text-white rounded-xl shadow-lg border border-indigo-500">
      <h2 className="text-xl font-bold mb-4 text-indigo-300">
        📜 Quantum Perspectives Scroll Index
      </h2>

      {quantumMeta.modules.map((mod) => (
        <div key={mod.id} className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="text-indigo-200 font-semibold">
            {mod.title}
          </div>
          <div className="text-xs text-white/60 italic">
            Theme: {mod.theme}
          </div>
          <p className="text-sm text-white/80 mt-1">
            {mod.tags.map((tag) => (
              <span key={tag} className="mr-2 bg-indigo-800 text-white px-2 py-0.5 rounded text-xs">
                #{tag}
              </span>
            ))}
          </p>
          <p className="mt-2 text-xs text-white/50">
            Filename: <code>{mod.filename}</code>
          </p>
        </div>
      ))}
    </div>
  );
}
