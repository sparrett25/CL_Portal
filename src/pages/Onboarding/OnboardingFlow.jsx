import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LensSelectionStep from './steps/LensSelectionStep';
import SignatureSummaryScreen from './SignatureSummaryScreen';
import { useUserContext } from '@/context/UserContext';

const OnboardingFlow = () => {
  const [step, setStep] = useState(0);
  const { userProfile, setUserProfile } = useUserContext();
  const navigate = useNavigate();

  const handleLensSelect = async (selectedLens) => {
    setUserProfile((prev) => ({ ...prev, belief_lens: selectedLens }));
    setStep(1);
  };

  const handleOnboardingComplete = async () => {
    // Save profile to Supabase (assumes `userProfile` has required data)
    try {
      const res = await fetch('/api/saveUserProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile),
      });

      if (!res.ok) throw new Error('Failed to save user profile');

      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-indigo-950 p-6">
      <div className="w-full max-w-4xl bg-black bg-opacity-60 border border-gray-700 rounded-lg shadow-lg p-8">
        {step === 0 && <LensSelectionStep onSelect={handleLensSelect} />}
        {step === 1 && (
          <SignatureSummaryScreen onComplete={handleOnboardingComplete} />
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
