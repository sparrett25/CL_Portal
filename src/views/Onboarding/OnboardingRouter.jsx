// OnboardingRouter.jsx

import React, { useState } from 'react';
import CodexKeyEntry from '@/views/Onboarding/CodexKeyEntry';
import LensSelectionStep from '@/views/Onboarding/LensSelectionStep';
import VoiceCaptureRitual from '@/views/Onboarding/VoiceCaptureRitual';
import Dashboard from '@/views/Dashboard/Dashboard';

const OnboardingRouter = () => {
  const [step, setStep] = useState('codexKey');

  const advanceTo = (nextStep) => setStep(nextStep);

  return (
    <>
      {step === 'codexKey' && (
        <CodexKeyEntry onComplete={() => advanceTo('lensSelection')} />
      )}

      {step === 'lensSelection' && (
        <LensSelectionStep onComplete={() => advanceTo('voiceCapture')} />
      )}

      {step === 'voiceCapture' && (
        <VoiceCaptureRitual onComplete={() => advanceTo('dashboard')} />
      )}

      {step === 'dashboard' && <Dashboard />}
    </>
  );
};

export default OnboardingRouter;
