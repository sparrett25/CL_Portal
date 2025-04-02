import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Import your context
import { supabase } from './lib/supabase'; // Import supabase instance

import HomePage from './pages/HomePage'; // Example page
import LoginPage from './pages/LoginPage'; // Example page
import OnboardingPage from './pages/OnboardingPage'; // Example page

function App() {
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('User is logged in', session);
      } else {
        console.log('No active session');
      }
    };

    fetchSession();
  }, []);

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* 🔁 Redirect root "/" to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Add your other routes here */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
