// /src/utils/lensToneHelpers.js

export const getLensToneStyle = (lens = 'default') => {
  switch (lens) {
    case 'christian':
      return {
        tone: 'reverent',
        style: 'scriptural/devotional',
        keywords: ['grace', 'divine light', 'Holy Spirit', 'faith', 'deliverance'],
        phraseExamples: ['You are held in divine grace.', 'Walk in the light of truth.']
      };

    case 'jewish':
      return {
        tone: 'poetic and ancestral',
        style: 'ritual-rooted, covenantal',
        keywords: ['remembrance', 'light of the ancestors', 'blessing', 'Shekinah'],
        phraseExamples: ['May your path echo the light of those who came before.']
      };

    case 'muslim':
      return {
        tone: 'flowing and rhythmic',
        style: 'submission-focused, prayerful',
        keywords: ['Allah', 'guidance', 'surrender', 'purification', 'light upon light'],
        phraseExamples: ['Surrender is the gate through which light enters.']
      };

    case 'buddhist':
      return {
        tone: 'calm and mindful',
        style: 'non-attached, reflective',
        keywords: ['emptiness', 'stillness', 'compassion', 'breath', 'non-duality'],
        phraseExamples: ['In stillness, truth arises. You are the breath between thoughts.']
      };

    case 'metaphysical':
      return {
        tone: 'expansive and intuitive',
        style: 'energetic, quantum-aware',
        keywords: ['frequency', 'manifestation', 'alignment', 'higher self', 'source'],
        phraseExamples: ['Your thoughts shape your field. You are a conscious creator.']
      };

    case 'seeker':
      return {
        tone: 'open and curious',
        style: 'journal-style, self-directed',
        keywords: ['discovery', 'experience', 'choice', 'truth within'],
        phraseExamples: ['Your questions are sacred. Every path leads inward.']
      };

    case 'interfaith':
      return {
        tone: 'integrative and harmonic',
        style: 'mystic-universal, all-inclusive',
        keywords: ['oneness', 'unity', 'cosmic symphony', 'sacred threads'],
        phraseExamples: ['All rivers return to the same sea. You are all and one.']
      };

    default:
      return {
        tone: 'neutral and supportive',
        style: 'uplifting',
        keywords: ['growth', 'inner truth', 'reflection'],
        phraseExamples: ['You are safe to grow and explore.']
      };
  }
};
