import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ WelcomeIntro mounted");
    try {
      new Audio("/assets/audio/veil-entry.mp3").play();
    } catch (err) {
      console.warn("Audio playback skipped:", err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      <h1 className="text-red-500 text-3xl mb-6">✅ WelcomeIntro is Rendering</h1>

      <p className="text-indigo-300 mb-4">Your journey begins here.</p>

      <button
        onClick={() => navigate("/onboarding/overview")}
        className="px-6 py-3 bg-indigo-600 rounded-full hover:bg-indigo-700 transition"
      >
        Begin the Journey
      </button>
    </div>
  );
}
