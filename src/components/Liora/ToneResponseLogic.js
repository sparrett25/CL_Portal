const toneResponseMap = {
  neutral: {
    affirmation: "I center myself in the stillness of now.",
    ritual: "Take three slow breaths, pausing at the top and bottom. Feel the space between moments.",
    whisper: "In the quiet, you are already becoming."
  },
  hopeful: {
    affirmation: "Hope lights even the smallest corners of the unknown.",
    ritual: "Place your hand over your heart. Whisper your intention softly. Let it echo inward.",
    whisper: "A spark grows where your spirit dares to believe."
  },
  heavy: {
    affirmation: "Even in shadow, your presence holds meaning.",
    ritual: "Sit with your heaviness. Name it. Breathe into it. Then let it rest beside you — not on you.",
    whisper: "The weight you carry is not who you are. It is what you are transforming."
  },
  grateful: {
    affirmation: "Gratitude expands what the heart can hold.",
    ritual: "Write down three small things that warmed your soul today.",
    whisper: "The light you notice returns the favor."
  },
  uncertain: {
    affirmation: "Uncertainty is the invitation to deepen trust.",
    ritual: "Close your eyes. Speak your question to the silence, then wait. Do not seek — just feel.",
    whisper: "The answer is not far. It is unfolding with you."
  }
};

export function getLioraToneResponse(tone = "neutral") {
  return toneResponseMap[tone] || toneResponseMap["neutral"];
}
