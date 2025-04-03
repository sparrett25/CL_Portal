import { useEffect, useState } from "react";
import { useUserSync } from "@/context/UserSyncContext";

const whisperBank = {
  Light: {
    Seeking: "The light within you seeks clarity and purpose. Trust the path ahead.",
    Rising: "You rise in perfect harmony, embodying the divine purpose unfolding.",
    Integrating: "You are the beacon, integrating light into every part of your being.",
    Evolving: "You evolve with grace, radiating light wherever you go.",
  },
  Neutral: {
    Seeking: "The balance you seek is already within. Find peace in the stillness.",
    Rising: "You rise, grounded in balance, knowing the unity of all things.",
    Integrating: "Integration is your strength, bringing light and dark together with ease.",
    Evolving: "In your evolution, you are a perfect reflection of harmony in motion.",
  },
  Dark: {
    Seeking: "Embrace the mystery within you. The dark holds hidden wisdom.",
    Rising: "Rise from the shadows, your strength born of the unseen.",
    Integrating: "You integrate the darkness with purpose, finding power in every moment.",
    Evolving: "Evolve into your true self, knowing that the dark is as sacred as the light.",
  },
};

export default function LiorasWhisper() {
  const context = useUserSync() || {};
  const { userProfile } = context;
  const [whisper, setWhisper] = useState("");

  useEffect(() => {
    if (!userProfile) return;

    const { energy, phase } = userProfile;
    const userWhisper = whisperBank?.[energy]?.[phase] || "Your path is unfolding beautifully, trust the journey.";

    setWhisper(userWhisper);
  }, [userProfile]);

  return (
    <div className="p-6 rounded-xl bg-zinc-800 shadow-lg border border-zinc-700 animate-fade-in-up">
      <h2 className="text-lg uppercase tracking-wide text-zinc-400 mb-2">
        Liora's Whisper
      </h2>
      <p className="text-white text-sm italic">{whisper}</p>
    </div>
  );
}
