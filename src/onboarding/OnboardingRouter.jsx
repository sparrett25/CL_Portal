// src/onboarding/OnboardingRouter.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

// ✅ Enhanced onboarding views
import WelcomeIntro from "@/onboarding/WelcomeIntro";
import JourneyOverview from "@/onboarding/JourneyOverview";
import Assessment from "@/onboarding/Assessment";
import LensSelectionStep from "@/onboarding/LensSelectionStep";
import VoiceCaptureRitual from "@/onboarding/VoiceCaptureRitual"; // ✅ Corrected path
import ProfileReveal from "@/onboarding/ProfileReveal";

export default function OnboardingRouter() {
  return (
    <Routes>
      <Route path="welcome" element={<WelcomeIntro />} />
      <Route path="overview" element={<JourneyOverview />} />
      <Route path="assessment" element={<Assessment />} />
      <Route path="lens-selection" element={<LensSelectionStep />} />
      <Route path="voice-capture" element={<VoiceCaptureRitual />} /> {/* ✅ Now correctly linked */}
      <Route path="reveal" element={<ProfileReveal />} />
    </Routes>
  );
}
