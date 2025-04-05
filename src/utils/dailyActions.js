// utils/dailyActions.js

const actions = {
  Neutral: {
    Seeker: {
      "Phase 1": [
        {
          type: "breath",
          title: "3-3-3 Breath",
          prompt: "Inhale for 3, hold for 3, exhale for 3 — repeat for 3 minutes to anchor your seeking.",
        },
        {
          type: "ritual",
          title: "Light a Candle for Clarity",
          prompt: "Light a small candle and ask a single question aloud. Let the flame hold it for you today.",
        },
      ],
    },
  },
  Light: {
    Visionary: {
      "Phase 2": [
        {
          type: "breath",
          title: "Vision Breath",
          prompt: "Inhale deeply through the nose, visualize your goal. Exhale through the mouth releasing doubt.",
        },
      ],
    },
  },
};

export function getDailyAction(energy, archetype, phase) {
  const available = actions?.[energy]?.[archetype]?.[phase] || [
    {
      type: "ritual",
      title: "Presence Ritual",
      prompt: "Place one hand on your heart and one on your belly. Breathe and simply notice: I am here.",
    },
  ];

  const today = new Date().getDate(); // use day of month as a consistent selector
  return available[today % available.length];
}
