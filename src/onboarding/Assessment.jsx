import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Assessment() {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");

  const handleNext = () => {
    // You’ll eventually save this response to context or Supabase
    console.log("User response:", response);
    navigate("/onboarding/voice-capture");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 text-center">
      <div className="animate-fade-in max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold">The First Reflection</h2>
        <p className="opacity-70">
          Take a breath. Feel your presence in this moment.  
          Then answer with truth, without judgment.
        </p>

        <div className="w-full">
          <label className="block text-left text-sm opacity-80 mb-1">
            ✨ What energy feels most present in your life right now?
          </label>
          <textarea
            rows="4"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 mt-1 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write freely..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </div>

        <button
          onClick={handleNext}
          disabled={!response.trim()}
          className={`mt-4 px-6 py-3 rounded-full text-white text-lg font-semibold shadow-md transition-all ${
            response.trim()
              ? "bg-purple-600 hover:bg-purple-700 hover:shadow-xl"
              : "bg-zinc-700 opacity-40 cursor-not-allowed"
          }`}
        >
          Continue to Voice Ritual
        </button>
      </div>
    </div>
  );
}
