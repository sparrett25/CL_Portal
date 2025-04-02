import React, { useState } from 'react';
import lensVisuals from '@/data/belief_lens_visuals';

const LensSelectionStep = ({ onSelect }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Choose Your Belief Lens</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {lensVisuals.map((lens) => (
          <button
            key={lens.id}
            onClick={() => setSelected(lens.id)}
            className={`p-4 border rounded ${selected === lens.id ? 'border-indigo-500' : 'border-zinc-600'}`}
          >
            <div className="font-bold">{lens.label}</div>
            <div className="text-sm opacity-70">{lens.description}</div>
          </button>
        ))}
      </div>
      <button
        disabled={!selected}
        onClick={() => onSelect(selected)}
        className="mt-4 py-2 px-6 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        Continue
      </button>
    </div>
  );
};

export default LensSelectionStep;
