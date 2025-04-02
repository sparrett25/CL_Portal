import React, { useState } from 'react';
import { rephraseAffirmationByLens } from '@/utils/affirmationRephraser';
import { lensVisuals } from '@/config/belief_lens_visuals';
import { lensDeliveryStyles } from '@/config/lens_delivery_styles';
import WhisperReflectionBlock from '@/components/Liora/WhisperReflectionBlock';

const LioraVoiceTester = () => {
  const [baseText, setBaseText] = useState('You are seen. You are sacred. You are becoming.');
  const [selectedLens, setSelectedLens] = useState('buddhist');

  const rephrased = rephraseAffirmationByLens(baseText, selectedLens);
  const visual = lensVisuals[selectedLens] || {};
  const delivery = lensDeliveryStyles[selectedLens] || lensDeliveryStyles.default;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-indigo-600">🗣️ Liora Voice Tester</h1>

      {/* Base Affirmation Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Base Affirmation</label>
        <textarea
          rows={2}
          value={baseText}
          onChange={(e) => setBaseText(e.target.value)}
          className="w-full p-3 rounded-md border dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>

      {/* Lens Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Belief Lens</label>
        <select
          value={selectedLens}
          onChange={(e) => setSelectedLens(e.target.value)}
          className="p-2 rounded-md border dark:border-zinc-700 dark:bg-zinc-800"
        >
          {Object.keys(lensVisuals).filter(l => l !== 'default').map((lens) => (
            <option key={lens} value={lens}>
              {lens.charAt(0).toUpperCase() + lens.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Whisper Reflection Output */}
      <div className="mt-6">
        <WhisperReflectionBlock
          text={rephrased}
          lens={selectedLens}
          speed="slow"
          sound="veil-breath"
          showMeta
        />
      </div>
    </div>
  );
};

export default LioraVoiceTester;
