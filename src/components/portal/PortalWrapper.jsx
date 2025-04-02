import React, { useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import LoadingSigil from '@/components/LoadingSigil';

const PortalWrapper = () => {
  const { user, userProfile, isLoading } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/onboarding', { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !userProfile) {
    return <LoadingSigil />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Portal Activated
      </h1>

      <p className="text-lg">
        Welcome, <strong>{userProfile.nickname || 'Luminary'}</strong>.
      </p>

      <div className="mt-4">
        <p>
          Your journey is aligned with the <strong>{userProfile.archetype || 'Mystic'}</strong> archetype, 
          the energy of <strong>{userProfile.energy_alignment || 'Neutrality'}</strong>, 
          and viewed through the lens of <strong>{userProfile.belief_lens || 'Universal'}</strong> truths.
        </p>
      </div>

      {/* Add your portal content or navigation here */}
    </div>
  );
};

export default PortalWrapper;
