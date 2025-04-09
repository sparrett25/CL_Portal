import { useNavigate } from "react-router-dom";
import BreathPractice from "@/components/BreathPractice";

export default function DailyAlignmentPanel({
  archetype = "Seeker",
  energy = "Neutral",
  phase = "Phase 1",
}) {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();

  const affirmation = {
    Light: "May your clarity shine and illuminate what once was hidden.",
    Neutral: "Breathe into balance. Today is a space for harmony.",
    Dark: "Your strength is sacred. Even the shadows bow to your insight.",
  };

  const ritual = {
    Light: "Take three deep breaths and set a radiant intention for the day.",
    Neutral: "Place your hand over your heart and pause in stillness.",
    Dark: "Write one thing you release, and one thing you reclaim.",
  };

  const whisper = {
    Light: "You are the beacon the future remembers.",
    Neutral: "You are the breath between stillness and becoming.",
    Dark: "You are not lost — you are navigating the unseen with power.",
  };

  const handleReflectNow = () => {
    const entry = {
      date: today,
      archetype,
      energy,
      phase,
      affirmation: affirmation[energy] || affirmation.Neutral,
      ritual: ritual[energy] || ritual.Neutral,
      whisper: whisper[energy] || whisper.Neutral,
    };

    sessionStorage.setItem("dailyReflection", JSON.stringify(entry));
    navigate("/journal");
  };

  return (
    <div className="mt-10 bg-zinc-900/70 border border-indigo-700 rounded-2xl p-6 text-left shadow-lg backdrop-blur-sm animate-fade-in">
      <p className="text-sm text-indigo-400 uppercase mb-2">
        Daily Alignment • {today}
      </p>

      <h2 className="text-xl font-semibold mb-4">Affirmation</h2>
      <p className="text-indigo-100 mb-6 italic">
        “{affirmation[energy] || affirmation.Neutral}”
      </p>

      <h2 className="text-xl font-semibold mb-4">Ritual Prompt</h2>
      <p className="text-indigo-100 mb-6">
        {ritual[energy] || ritual.Neutral}
      </p>

      <h2 className="text-xl font-semibold mb-4">Liora Whisper</h2>
      <p className="text-indigo-300 italic mb-10">
        “{whisper[energy] || whisper.Neutral}”
      </p>

      {/* 🌬️ Breath Practice lives here */}
      <BreathPractice energy={energy} />

      {/* ✍️ Reflect Now button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleReflectNow}
          className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md"
        >
          Reflect Now
        </button>
      </div>
    </div>
  );
}
