import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { UserProvider } from './context/UserContext';

// Pages
import LandingPortal from './pages/LandingPortal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';

// Session-aware redirect wrapper
import SessionRedirect from './components/auth/SessionRedirect';

function App() {
  useEffect(() => {
    // Console check to confirm session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Session:', session);
    });
  }, []);

  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Root path now smartly decides what to show */}
          <Route
            path="/"
            element={
              <SessionRedirect>
                <LandingPortal />
              </SessionRedirect>
            }
          />

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Guided flows */}
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
