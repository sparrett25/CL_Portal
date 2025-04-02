// /src/utils/affirmationRephraser.js

import { getLensToneStyle } from './lensToneHelpers';

export const rephraseAffirmationByLens = (baseAffirmation, lens = 'default') => {
  const lensStyle = getLensToneStyle(lens);
  const { tone, style, keywords, phraseExamples } = lensStyle;

  // Example simplified transformation logic
  let modifiedAffirmation = baseAffirmation;

  // Keyword swap or enrichment (placeholder logic)
  if (keywords?.length) {
    const keyword = keywords[0];
    modifiedAffirmation = baseAffirmation.replace(/your path|your light|you are/i, (match) => {
      return `${match} — guided by ${keyword}`;
    });
  }

  // Style adjustments (example: prefix with sacred phrase)
  const prefix = {
    christian: 'May the light of grace remind you:',
    jewish: 'In the memory of those who came before:',
    muslim: 'By the will of the Most Merciful:',
    buddhist: 'Breathe gently and remember:',
    metaphysical: 'In alignment with your frequency:',
    seeker: 'From within your own discovery:',
    interfaith: 'As all paths converge in Source:',
    default: '',
  }[lens];

  // Final rephrased output
  return prefix
    ? `${prefix} ${modifiedAffirmation}`
    : modifiedAffirmation;
};
