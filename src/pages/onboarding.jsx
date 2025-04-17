import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import SignatureStep from "./SignatureStep";
import VoiceCaptureStep from "./VoiceCaptureStep";
import CodexKeyEntry from "./CodexKeyEntry";
import LottieSigilAnimation from "@/components/visual/LottieSigilAnimation";
import { useNavigate } from "react-router-dom";
import { useUserSync } from "@/context/UserSyncContext";

export default function OnboardingFlow() {
  const [stage, setStage] = useState("codexKey");
  const [codexKey, setCodexKey] = useState(null);
  const [userEnergy, setUserEnergy] = useState("Neutral");
  const [voiceBlob, setVoiceBlob] = useState(null);

  const navigate = useNavigate();
  const { refetchProfile } = useUserSync();

  useEffect(() => {
    const storedKey = sessionStorage.getItem("codexKey");
    if (storedKey) {
      setCodexKey(storedKey);
      setStage("signature");
    }
  }, []);

  const handleSignatureComplete = (energy) => {
    setUserEnergy(energy);
    setStage("voice");
  };

  const handleVoiceComplete = async (blob) => {
    setVoiceBlob(blob);
    setStage("complete");

    // ✅ Mark onboarding as complete
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    if (userId) {
      await supabase
        .from("profiles")
        .update({ has_onboarded: true })
        .eq("id", userId);

      await supabase.auth.updateUser({
        data: { has_onboarded: true }
      });
    }

    // ✅ Refetch profile and navigate to home
    setTimeout(async () => {
      await refetchProfile();
      navigate("/home");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      {stage === "codexKey" && (
        <CodexKeyEntry
          onSubmit={(key) => {
            setCodexKey(key);
            sessionStorage.setItem("codexKey", key);
            setStage("signature");
          }}
        />
      )}

      {stage === "signature" && (
        <SignatureStep energy={userEnergy} onComplete={handleSignatureComplete} />
      )}

      {stage === "voice" && (
        <VoiceCaptureStep energy={userEnergy} onComplete={handleVoiceComplete} />
      )}

      {stage === "complete" && (
        <div className="text-center space-y-4">
          <LottieSigilAnimation energy={userEnergy} />
          <h2 className="text-2xl font-bold text-lime-300">Welcome, Luminary</h2>
          <p className="text-zinc-400">
            Your Codex Signature has been recorded. Preparing your journey...
          </p>
        </div>
      )}
    </div>
  );
}
