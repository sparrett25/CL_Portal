import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ✅ Existing working steps
import WelcomeIntro from "@/onboarding/WelcomeIntro";
import JourneyOverview from "@/onboarding/JourneyOverview";
import Assessment from "@/onboarding/Assessment";
import ProfileReveal from "@/onboarding/ProfileReveal";
import VoiceCapture from "@/onboarding/VoiceCapture";

// 🌀 Optional: Replace these once files exist
// import CodexKeyEntry from "./CodexKeyEntry";
// import LensSelectionStep from "./LensSelectionStep";
// import VoiceCaptureRitual from "./VoiceCaptureRitual";
// import Dashboard from "../Dashboard/Dashboard";

const OnboardingRouter = () => {
  return (
    <Routes>
      <Route path="welcome" element={<WelcomeIntro />} />
      <Route path="overview" element={<JourneyOverview />} />
      <Route path="assessment" element={<Assessment />} />
      <Route path="voice-capture" element={<VoiceCapture />} />
      <Route path="reveal" element={<ProfileReveal />} />

      {/* Optional placeholder for when components are ready */}
      {/* <Route path="key-entry" element={<CodexKeyEntry />} /> */}
      {/* <Route path="lens-selection" element={<LensSelectionStep />} /> */}
      {/* <Route path="voice" element={<VoiceCaptureRitual />} /> */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

      {/* Default fallback */}
      <Route path="*" element={<Navigate to="welcome" replace />} />
    </Routes>
  );
};

export default OnboardingRouter;
