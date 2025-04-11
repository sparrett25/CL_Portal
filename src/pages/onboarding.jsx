import React, { useState } from "react";
import CodexKeyEntry from "@/components/Auth/CodexKeyEntry";
import SignatureStep from "@/components/Onboarding/SignatureStep";
import VoiceCaptureRitual from "@/components/Onboarding/VoiceCaptureRitual";
import LottieSigilAnimation from "@/components/Onboarding/LottieSigilAnimation";

export default function OnboardingPage() {
  const [stage, setStage] = useState("codexKey"); // stages: codexKey → signature → voice → complete
  const [userEnergy, setUserEnergy] = useState("Neutral");
  const [voiceBlob, setVoiceBlob] = useState(null);

  const handleCodexKeySubmit = (key) => {
    // You may validate the key here with Supabase or preset
    if (key === "LUMINA-KEY-2025") {
      setStage("signature");
    } else {
      alert("Invalid Codex Key. Please try again.");
    }
  };

  const handleSignatureComplete = (profile) => {
    setUserEnergy(profile.energy);
    setStage("voice");
  };

  const handleVoiceComplete = (blob) => {
    setVoiceBlob(blob); // optional: upload to Supabase
    setStage("complete");

    setTimeout(() => {
      window.location.href = "/home";
    }, 2500); // Transition delay for effect
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-10">
        {stage === "codexKey" && <CodexKeyEntry onSubmit={handleCodexKeySubmit} />}

        {stage === "signature" && (
          <>
            <SignatureStep onComplete={handleSignatureComplete} />
            <div className="mt-6 flex justify-center">
              <LottieSigilAnimation energy={userEnergy} />
            </div>
          </>
        )}

        {stage === "voice" && (
          <>
            <VoiceCaptureRitual onComplete={handleVoiceComplete} />
            <div className="mt-6 flex justify-center">
              <LottieSigilAnimation energy={userEnergy} />
            </div>
          </>
        )}

        {stage === "complete" && (
          <div className="text-center space-y-4">
            <LottieSigilAnimation energy={userEnergy} />
            <h2 className="text-2xl font-bold text-lime-300">Welcome, Luminary</h2>
            <p className="text-zinc-400">Your Codex Signature has been recorded. Preparing your journey...</p>
          </div>
        )}
      </div>
    </div>
  );
}
