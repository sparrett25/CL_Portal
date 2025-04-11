import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// ✅ Existing working steps
import WelcomeIntro from "@/onboarding/WelcomeIntro";
import JourneyOverview from "@/onboarding/JourneyOverview";
import Assessment from "@/onboarding/Assessment";
import ProfileReveal from "@/onboarding/ProfileReveal";
import VoiceCaptureRitual from "@/components/onboarding/VoiceCaptureRitual";

const OnboardingRouter = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="welcome" element={<WelcomeIntro />} />
      <Route path="overview" element={<JourneyOverview />} />
      <Route path="assessment" element={<Assessment />} />

      {/* ✅ Fixed: onComplete function now passed */}
      <Route
        path="voice-capture"
        element={
          <VoiceCaptureRitual
            onComplete={(blob, url) => {
              console.log("Voice upload complete:", { blob, url });

              // TODO: You can also store the URL in the user profile here if needed
              // Example: await updateUserProfile({ voiceSignatureUrl: url });

              // Navigate to the next onboarding step
              navigate("/onboarding/reveal");
            }}
          />
        }
      />

      <Route path="reveal" element={<ProfileReveal />} />

      {/* Optional placeholder for when components are ready */}
      {/* <Route path="key-entry" element={<CodexKeyEntry />} /> */}
      {/* <Route path="lens-selection" element={<LensSelectionStep />} /> */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

      {/* Default fallback */}
      <Route path="*" element={<Navigate to="welcome" replace />} />
    </Routes>
  );
};

export default OnboardingRouter;
