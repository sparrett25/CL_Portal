// src/components/library/MultiFlavorEntry.jsx
import React from 'react';
import sampleLibraryEntry from '../../data/library/sampleLibraryEntry';

export default function MultiFlavorEntry() {
  const { title, description, flavorVersions } = sampleLibraryEntry;

  const flavorLabels = {
    core: 'Codex Core',
    christian: 'Christianity',
    buddhist: 'Buddhism',
    metaphysical: 'Metaphysics',
    mystic: 'Mysticism',
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/5 p-8 rounded-2xl text-white shadow-md">
      <h1 className="text-4xl font-bold text-lime-300 mb-2">{title}</h1>
      <p className="text-purple-200 mb-6 italic">{description}</p>

      <div className="space-y-6">
        {Object.entries(flavorVersions).map(([flavorKey, text]) => (
          <div key={flavorKey} className="bg-white/10 p-4 rounded-xl border border-white/20">
            <h2 className="text-xl text-sky-300 font-semibold mb-2">
              {flavorLabels[flavorKey]}
            </h2>
            <p className="text-white/90 whitespace-pre-line">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
