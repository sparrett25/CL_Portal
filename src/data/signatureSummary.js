// signatureSummary.js

export const getArchetypeDescription = (archetype) => {
  const map = {
    Seer: "You are the visionary of hidden truths, sensing patterns others overlook. You walk between future whispers and present knowing.",
    Alchemist: "You turn shadow into gold. Transformation is your sacred craft, and you blend spirit with matter in divine balance.",
    Nurturer: "You carry warmth in your hands. Others feel safe in your presence. You are the heartbeat of compassion in the Codex.",
    Visionary: "You dream wide and high. Possibility dances in your thoughts. The future is shaped by your bold imaginings.",
    Mystic: "You trust what cannot be seen. Your soul speaks in symbols, and silence is your language of depth.",
    Warrior: "You are fire with a purpose. Fierce and protective, you defend truth and move forward with courage and clarity.",
    Sage: "You are the keeper of insight. Your wisdom is grounded in stillness. You speak less, but your words echo far.",
    Oracle: "You are a vessel of messages unspoken. You receive what others miss and awaken others through quiet knowing.",
    Rebel: "You break rules that no longer serve. Freedom is your compass, and disruption becomes your path to creation.",
    Lover: "You feel deeply, fully. Love in all its forms is your teacher, and connection is your sacred devotion.",
    Guardian: "You hold space and protect what matters. Loyalty, integrity, and strength are etched in your spirit.",
    Wanderer: "You walk unknown paths with curiosity. Not all who wander are lost — you are a mapmaker for the unseen."
  };

  return map[archetype] || "You are a unique archetype in the Codex, still emerging in form and essence.";
};

export const getEnergyMeaning = (energy) => {
  const map = {
    Light: "You are drawn to illumination, truth, and inspiration. Your path uplifts, reveals, and awakens others.",
    Neutral: "You are a bridge between extremes. You harmonize chaos and stillness, offering balance in all realms.",
    Dark: "You are the keeper of depth and mystery. You navigate shadow with grace, turning the unseen into sacred power."
  };

  return map[energy] || "Your energy walks a new frequency, undefined by any single path.";
};

export const getToneReflection = (tones) => {
  if (!tones || !tones.length) return "Your tone is calm and undefined, like the pause before the inhale.";

  if (tones.includes('hopeful') && tones.includes('sad'))
    return "You are carrying light while healing sorrow — a sign of emergence and resilience.";

  if (tones.includes('confused') && tones.includes('joyful'))
    return "There is a joyful soul seeking clarity — you are becoming something new in the unknown.";

  if (tones.includes('sad') && tones.includes('angry'))
    return "You are releasing and rising — a storm before the clearing.";

  const reflections = {
    hopeful: "Hope surrounds you like morning light. You are drawn to what is becoming.",
    sad: "There is depth in your current space — a sacred silence asking to be felt.",
    confused: "You are in the mystery. Let questions be companions, not problems.",
    joyful: "Joy glimmers in your tone. You are aligned with the beauty of being.",
    angry: "Fire flows through you now. There is something you are ready to change."
  };

  return tones.map(t => reflections[t] || '').join(' ');
};
