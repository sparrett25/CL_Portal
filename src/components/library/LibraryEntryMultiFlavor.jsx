import React from 'react';

const sampleEntry = {
  title: 'Surrender Across Traditions',
  flavorVersions: {
    core: 'I release my will to the unfolding path. I trust the Light within.',
    christian: 'Heavenly Father, not my will but Yours be done.',
    buddhist: 'As breath comes and goes, I release all clinging and control.',
    metaphysical: 'I align with the divine current of energy and surrender the outcome.',
    mystic: 'Within the veil, I dissolve. My resistance is transmuted into becoming.',
  },
};

const flavorOrder = ['core', 'christian', 'buddhist', 'metaphysical', 'mystic'];

const flavorLabels = {
  core: 'Codex Core',
  christian: 'Christian',
  buddhist: 'Buddhist',
  metaphysical: 'Metaphysical',
  mystic: 'Mystic',
};

export default function LibraryEntryMultiFlavor() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-black via-indigo-950 to-purple-950 rounded-xl shadow-md text-white space-y-6">
      <h1 className="text-3xl font-bold text-lime-300 text-center">{sampleEntry.title}</h1>

      {flavorOrder.map((flavor) => (
        <div key={flavor} className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-purple-300">{flavorLabels[flavor]}</h2>
          <p className="mt-2 text-white/90 italic">{sampleEntry.flavorVersions[flavor]}</p>
        </div>
      ))}
    </div>
  );
}
