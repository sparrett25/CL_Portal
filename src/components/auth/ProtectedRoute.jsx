import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserSync } from '@/context/UserSyncContext';

export default function ProtectedRoute({ children }) {
  const { user, profile } = useUserSync();

  if (!user || !profile) {
    return <Navigate to="/portal" replace />;
  }

  const hasRequiredFields = profile.belief_lens && profile.voice_signature_url;

  if (!hasRequiredFields) {
    return <Navigate to="/onboarding/welcome" replace />;
  }

  return children;
}
