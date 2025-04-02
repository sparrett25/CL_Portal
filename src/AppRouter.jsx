// AppRouter.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OnboardingRouter from '@/views/Onboarding/OnboardingRouter';
import Dashboard from '@/views/Dashboard/Dashboard';
import Home from '@/views/Home/Home';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Entry Point */}
        <Route path="/" element={<Home />} />

        {/* Onboarding Flow */}
        <Route path="/onboarding" element={<OnboardingRouter />} />

        {/* Main Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
