import React from 'react';
import { useUserSync } from '@/context/UserSyncContext'; // Correct import for useUserSync

const HomePage = () => {
  const { user, loading } = useUserSync(); // Get user and loading state from context

  // Display loading state if loading is true
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not available, redirect to login page or display an appropriate message
  if (!user) {
    return <div>You need to be logged in to view this page.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1> {/* Assuming user has an email property */}
      {/* Render more content for the logged-in user */}
    </div>
  );
};

export default HomePage;
