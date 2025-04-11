import { useNavigate } from "react-router-dom";
import AssessmentStepper from "@/components/onboarding/AssessmentStepper";

export default function Assessment() {
  const navigate = useNavigate();

  const handleComplete = (responses) => {
    console.log("Reflection complete:", responses);
    sessionStorage.setItem("codexReflection", JSON.stringify(responses));
    navigate("/onboarding/voice-capture");
  };

  return (
    <div className="min-h-screen px-6 py-20 text-white font-inter bg-black text-center">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">🪞 The First Reflection</h1>
      <p className="text-zinc-400 max-w-xl mx-auto mb-10 italic">
        Take a breath. Feel your presence. Let these questions guide your inner alignment.
      </p>

      <AssessmentStepper onComplete={handleComplete} />
    </div>
  );
}
