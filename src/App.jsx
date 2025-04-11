import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUserSync } from "@/context/UserSyncContext";
import { DevFlagProvider } from "@/context/DevFlagContext";
import { getDevFlag } from "@/dev/useDevFlags"; // ✅ NEW
import DevConsole from "@/dev/DevConsole";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Page Components
import LoginView from "@/components/auth/LoginView";
import HomePage from "@/pages/HomePage";
import CodexLibrary from "@/pages/CodexLibrary";
import PortalView from "@/pages/PortalView";
import UserProfile from "@/pages/UserProfile";
import Reflections from "@/pages/Reflections";
import JournalPage from "@/pages/JournalPage";
import CompanionPage from "@/pages/CompanionPage";
import RitualsPage from "@/pages/RitualsPage";
import SettingsPage from "@/pages/SettingsPage";
import DevTestPage from "@/pages/DevTestPage"; // ✅ NEW
import OnboardingRouter from "@/views/Onboarding/OnboardingRouter";

// Layout
import MainLayout from "@/layouts/MainLayout";

export default function App() {
  const { user, loading } = useUserSync();
  const simulateProd = getDevFlag("simulateProd");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <DevFlagProvider>
      <div className="min-h-screen bg-black text-white font-inter">
        <Router>
          <Routes>
            {/* Public routes (no layout) */}
            <Route path="/" element={<PortalView />} />
            <Route path="/portal" element={<PortalView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/onboarding/*" element={<OnboardingRouter />} />

            {/* Authenticated routes wrapped in MainLayout */}
            {user && (
              <Route element={<MainLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/library" element={<CodexLibrary />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/reflections" element={<Reflections />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/companion" element={<CompanionPage />} />
                <Route path="/rituals" element={<RitualsPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                {/* ✅ Dev Test Route - visible only if NOT simulating prod */}
                {!simulateProd && (
                  <Route path="/dev-test" element={<DevTestPage />} />
                )}
              </Route>
            )}

            {/* Fallbacks */}
            {!user && (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
            {user && (
              <Route path="*" element={<Navigate to="/home" replace />} />
            )}
          </Routes>
        </Router>

        {!simulateProd && <DevConsole />} {/* Dev Console hidden if simulateProd */}
      </div>
    </DevFlagProvider>
  );
}
