// lioraEngine.js — Mixed Tone Reflection Engine

export function getLioraResponse(tones) {
  if (!Array.isArray(tones)) tones = [tones]; // Support single or multiple tones
  const toneSet = new Set(tones);

  const has = (t) => toneSet.has(t);

  // Determine combination types
  const combo = tones.join(',');

  // Layered response logic
  if (has('sad') && has('hopeful')) {
    return {
      affirmation: "It’s okay to feel the weight of sorrow while still reaching for the light. You are honoring both truth and trust.",
      ritual: "Breathe in deeply and whisper your own name with compassion. Light a candle for what is ending—and one for what is just beginning.",
      whisper: "A single seed grows even in a storm."
    };
  }

  if (has('angry') && has('confused')) {
    return {
      affirmation: "Your fire is sacred, even when it feels directionless. Clarity will emerge from the ashes.",
      ritual: "Write out what you wish you could say without filters. Then fold the paper and place it under something heavy, grounding the energy.",
      whisper: "The fire does not ask permission to burn."
    };
  }

  if (has('joyful') && has('grateful')) {
    return {
      affirmation: "You are radiating in harmony. Let joy be a prayer and gratitude its rhythm.",
      ritual: "Dance or move freely to a sound you love. Let your body be an altar of celebration.",
      whisper: "This moment is your offering."
    };
  }

  if (has('sad') && has('angry')) {
    return {
      affirmation: "You are allowed to grieve and rage at the same time. Your truth is complex and sacred.",
      ritual: "Scream into a pillow. Cry in the shower. Then write one thing you still believe in.",
      whisper: "Even the wildest storms return to stillness."
    };
  }

  if (has('confused') && has('neutral')) {
    return {
      affirmation: "Not knowing is part of becoming. Rest in the pause between questions.",
      ritual: "Sit in silence for 3 minutes. Feel into your body without needing answers.",
      whisper: "The unknown is your cocoon."
    };
  }

  // Single tone fallback
  const tone = tones[0];
  const responses = {
    sad: {
      affirmation: "Your sadness is sacred. Let it move through you like a river—not a wall.",
      ritual: "Place your hand over your heart and say: I am still here. I am still love.",
      whisper: "Softness is strength in disguise."
    },
    hopeful: {
      affirmation: "Hope is your compass—even if the road is unclear.",
      ritual: "Write a note to your future self. Fold it into a star and keep it nearby.",
      whisper: "You are already becoming what you’re reaching for."
    },
    angry: {
      affirmation: "Your anger is a map. Follow it inward and ask what it’s protecting.",
      ritual: "Shake your body. Loosen your jaw. Let the fire move safely through.",
      whisper: "Even fire has something to teach."
    },
    joyful: {
      affirmation: "Your joy is not accidental. It is a signal from your soul that you are aligned.",
      ritual: "Sing out loud, even if just a single word. Let it echo from your core.",
      whisper: "Joy is your permission slip."
    },
    confused: {
      affirmation: "Confusion is the first step toward clarity. You are not lost—you are loosening.",
      ritual: "Draw a spiral on paper. Breathe into its center. Let it reflect your process.",
      whisper: "The fog holds a message."
    },
    neutral: {
      affirmation: "Stillness is not emptiness. This space is fertile with unseen transformation.",
      ritual: "Sit quietly with your hands open. Ask nothing. Just receive.",
      whisper: "Something gentle is unfolding within you."
    }
  };

  return responses[tone] || {
    affirmation: "You are a being of many layers. There is no wrong way to feel.",
    ritual: "Place your hand over your solar plexus and breathe. Say: I trust my inner compass.",
    whisper: "Even now, you are aligning."
  };
}
