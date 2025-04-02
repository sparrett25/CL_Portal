import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import LensSelectionStep from './steps/LensSelectionStep';
import SignatureSummaryScreen from './SignatureSummaryScreen';
import LoadingSigil from '@/components/LoadingSigil';

const LioraOnboardingFlow = () => {
  const { user, setUserProfile, supabase } = useUserContext();
  const navigate = useNavigate();

  const [selectedLens, setSelectedLens] = useState(null);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      name: 'lens',
      component: (
        <LensSelectionStep
          selectedLens={selectedLens}
          setSelectedLens={setSelectedLens}
          onNext={() => setStep(step + 1)}
        />
      ),
    },
    {
      name: 'summary',
      component: (
        <SignatureSummaryScreen
          selectedLens={selectedLens}
          onComplete={handleCompleteOnboarding}
        />
      ),
    },
  ];

  async function handleCompleteOnboarding() {
    if (!user?.id || !selectedLens) {
      console.error('Onboarding error: Missing user ID or selected lens');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ belief_lens: selectedLens })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Failed to update profile:', error.message);
      } else {
        setUserProfile(data);
        navigate('/dashboard'); // Or wherever the post-onboarding destination is
      }
    } catch (err) {
      console.error('Unexpected error during onboarding:', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!user) return <LoadingSigil />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-black/60 rounded-xl shadow-xl p-6 backdrop-blur-md border border-white/10">
        {steps[step].component}
        {isSubmitting && (
          <div className="text-center text-sm mt-4 text-purple-300 animate-pulse">
            Completing your signature...
          </div>
        )}
      </div>
    </div>
  );
};

export default LioraOnboardingFlow;
