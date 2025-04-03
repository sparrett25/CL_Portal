import { useUserSync } from "@/context/UserSyncContext";

// Simple test content bank
const contentBank = {
  Light: {
    Seeking: {
      affirmation: "I welcome clarity and divine direction.",
      breathwork: "4-7-8 Calm Breath",
      ritual: "Morning Sunlight Ritual",
    },
    Rising: {
      affirmation: "I rise in radiant alignment.",
      breathwork: "Solar Charging Breath",
      ritual: "Path of Purpose Invocation",
    },
    Integrating: {
      affirmation: "I anchor light in all I do.",
      breathwork: "Harmonic Balancing Breath",
      ritual: "Chakra Harmonization Ritual",
    },
    Evolving: {
      affirmation: "I embody light through every shift.",
      breathwork: "Breath of Expansion",
      ritual: "Mirror of Ascension",
    },
  },
  Neutral: {
    Seeking: {
      affirmation: "I am the stillness between knowing and becoming.",
      breathwork: "Box Breath",
      ritual: "Clarity Reflection Practice",
    },
    // ... fill in as desired
  },
  Dark: {
    Seeking: {
      affirmation: "I trust what is unseen within me.",
      breathwork: "Shadow Integration Breath",
      ritual: "Cave of Listening",
    },
    // ... fill in as desired
  },
};

export default function DailyAlignmentSpotlight() {
  const context = useUserSync() || {};
  const { userProfile } = context;

  if (!userProfile) return null;

  const { energy, phase } = userProfile;
  const content =
    contentBank?.[energy]?.[phase] || {
      affirmation: "Your path is uniquely unfolding.",
      breathwork: "Centering Breath",
      ritual: "Reflective Stillness",
    };

  return (
    <div className="p-6 rounded-xl bg-zinc-900 shadow-lg border border-zinc-700 animate-fade-in-up">
      <h2 className="text-lg uppercase tracking-wide text-zinc-400 mb-3">
        Daily Alignment Spotlight
      </h2>

      <div className="space-y-2">
        <p>
          <span className="text-yellow-400 font-medium">Affirmation:</span>{" "}
          <span className="italic text-white">{content.affirmation}</span>
        </p>
        <p>
          <span className="text-cyan-300 font-medium">Breathwork:</span>{" "}
          <span className="text-white">{content.breathwork}</span>
        </p>
        <p>
          <span className="text-purple-300 font-medium">Ritual:</span>{" "}
          <span className="text-white">{content.ritual}</span>
        </p>
      </div>
    </div>
  );
}
