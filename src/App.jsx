import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // User context
import { supabase } from './lib/supabase'; // Supabase client

// Page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';

function App() {
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('User is logged in:', session);
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
          {/* Default redirect from "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Your actual pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Optional: Wildcard route to catch all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
