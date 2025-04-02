import React, { useState } from 'react';
import { rephraseAffirmationByLens } from '@/utils/affirmationRephraser';
import { beliefLensVisuals } from '@/data/belief_lens_visuals';

const sampleAffirmation = "I am guided by love, clarity, and purpose.";

const AffirmationLensPreview = () => {
  const [affirmation, setAffirmation] = useState(sampleAffirmation);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2">Universal Affirmation</h2>
        <textarea
          value={affirmation}
          onChange={(e) => setAffirmation(e.target.value)}
          className="w-full p-3 bg-gray-900 text-white rounded border border-gray-600"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(beliefLensVisuals).map(([lensKey, lensData]) => (
          <div
            key={lensKey}
            className="bg-gradient-to-br from-gray-800 to-gray-950 border border-gray-700 rounded-lg p-4 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-indigo-300 mb-1">{lensData.label}</h3>
            <p className="text-sm text-gray-400 mb-2 italic">{lensData.description}</p>
            <div className="bg-gray-900 border border-gray-800 p-3 rounded text-white">
              {rephraseAffirmationByLens(affirmation, lensKey)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffirmationLensPreview;
