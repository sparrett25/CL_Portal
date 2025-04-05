// utils/insightWhispers.js

const whispers = {
  Neutral: {
    Seeker: {
      "Phase 1": [
        "The pause between questions holds more truth than the answer itself.",
        "You are not empty. You are fertile with potential.",
        "Stillness is not stuckness. It is sacred preparation.",
      ],
      "Phase 2": [
        "The unseen is beginning to reveal itself — stay attuned.",
        "You are awakening with each breath of intention.",
      ],
    },
    Visionary: {
      "Phase 1": [
        "You see glimpses others ignore. Trust your lens.",
        "Your dreaming is a signal, not a mistake.",
      ],
    },
  },
  Light: {
    Guardian: {
      "Phase 1": [
        "Even protectors must rest. Restoration is not weakness.",
      ],
    },
  },
};

export function getWhisper(energy, archetype, phase) {
  const options =
    whispers?.[energy]?.[archetype]?.[phase] || ["A new path awaits. Keep listening."];

  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}
