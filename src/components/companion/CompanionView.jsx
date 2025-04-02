import React from 'react';
import { useUserContext } from '@/context/UserContext';
import LoadingSigil from '@/components/LoadingSigil';

const CompanionView = () => {
  const { userProfile, isLoading } = useUserContext();

  if (isLoading) {
    return <LoadingSigil />;
  }

  return (
    <div className="companion-container">
      <h1 className="text-2xl font-bold">
        Welcome back, {userProfile?.nickname || 'Luminary'}!
      </h1>
      
      <div className="mt-4">
        <p><strong>Archetype:</strong> {userProfile?.archetype || 'Unknown'}</p>
        <p><strong>Energy Alignment:</strong> {userProfile?.energy_alignment || 'Neutral'}</p>
        <p><strong>Belief Lens:</strong> {userProfile?.belief_lens || 'Universal'}</p>
      </div>

      {/* Add your additional Companion features or widgets here */}
    </div>
  );
};

export default CompanionView;
