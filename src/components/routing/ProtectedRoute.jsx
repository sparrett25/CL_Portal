import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';
import LoadingSigil from '@/components/LoadingSigil';

const ProtectedRoute = ({ children }) => {
  const { user, userProfile, isLoading } = useUserContext();

  if (isLoading) {
    return <LoadingSigil />;
  }

  // If not signed in at all, go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If signed in but onboarding is incomplete
  const hasCompletedOnboarding = userProfile?.belief_lens && userProfile?.voice_signature_url;

  if (!hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
