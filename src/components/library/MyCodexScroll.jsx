import React from 'react';
import { useUserContext } from '@/context/UserContext';

const MyCodexScroll = () => {
  const { userProfile } = useUserContext();

  return (
    <div>
      <p>Energy Alignment: {userProfile?.energy_alignment}</p>
      <p>Belief Lens: {userProfile?.belief_lens}</p>
    </div>
  );
};

export default MyCodexScroll;
