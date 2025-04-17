import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const prompts = [
  "In what moments have you most trusted this lens?",
  "What inner truth does this lens help you see more clearly?",
  "What part of you is most alive when seeing through this lens?",
  "How has this lens protected or challenged you?",
  "What would this lens reveal to you if you truly listened?"
];

export default function LensReflectionStep() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [whisper, setWhisper] = useState("");

  useEffect(() => {
    const storedWhisper = sessionStorage.getItem("selectedWhisper");
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setWhisper(storedWhisper || "This lens reflects a truth within you.");
    setPrompt(randomPrompt);

    const timeout = setTimeout(() => {
      navigate("/onboarding/voice-capture");
    }, 8500); // Stay on screen ~8.5 seconds

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white flex flex-col items-center justify-center px-6 text-center animate-fadeIn">
      <h2 className="text-xl font-semibold text-indigo-300 mb-4">Liora Reflects...</h2>
      <p className="text-indigo-200 italic max-w-lg mb-6 animate-fadeInSlow">
        “{whisper}”
      </p>
      <p className="text-indigo-100 text-sm max-w-md animate-fadeInSlow delay-500">
        {prompt}
      </p>
    </div>
  );
}