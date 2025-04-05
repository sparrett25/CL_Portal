import React, { useEffect, useState } from "react";
import { useUserSync } from "@/context/UserSyncContext";  // Make sure the hook is correctly imported

export default function HomePage() {
  const { user, loading } = useUserSync();  // Destructure the user and loading state from the hook

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user); // Log user data for debugging purposes
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while fetching the user
  }

  if (!user) {
    return <div>Please log in to view this page.</div>;  // If no user, show a login prompt
  }

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <div className="p-10 text-center">
        <h1>Welcome to Codex Lumina ✨</h1>
        <p>You’ve successfully logged in. This is your Home Page.</p>
      </div>
    </div>
  );
}
