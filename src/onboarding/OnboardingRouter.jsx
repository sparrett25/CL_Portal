import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Onboarding Components
import WelcomeIntro from "@/onboarding/WelcomeIntro";
import JourneyOverview from "@/onboarding/JourneyOverview";
import Assessment from "@/onboarding/Assessment";
import ProfileReveal from "@/onboarding/ProfileReveal";
import VoiceCaptureRitual from "@/components/onboarding/VoiceCaptureRitual";

export default function OnboardingRouter() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="welcome" element={<WelcomeIntro />} />
      <Route path="overview" element={<JourneyOverview />} />
      <Route path="assessment" element={<Assessment />} />
      <Route
        path="voice-capture"
        element={
          <VoiceCaptureRitual
            onComplete={(audioBlob, publicUrl) => {
              console.log("Voice captured:", { audioBlob, publicUrl });
              navigate("/onboarding/reveal"); // ✅ Move directly to Profile Reveal
            }}
          />
        }
      />
      <Route path="reveal" element={<ProfileReveal />} />
      <Route path="*" element={<Navigate to="welcome" replace />} />
    </Routes>
  );
}
