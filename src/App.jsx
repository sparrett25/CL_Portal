// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUserSync } from "@/context/UserSyncContext";
import { DevFlagProvider } from "@/context/DevFlagContext";
import { getDevFlag } from "@/dev/useDevFlags";
import DevConsole from "@/dev/DevConsole";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Pages
import LoginView from "@/components/auth/LoginView";
import HomePage from "@/pages/HomePage";
import CodexLibrary from "@/pages/CodexLibrary";
import PortalView from "@/pages/PortalView";
import PortalPreview from "@/pages/PortalPreview";
import CreateAccount from "@/pages/CreateAccount";
import AccountConfirmation from "@/pages/CreateAccountConfirmation";
import UserProfile from "@/pages/UserProfile";
import Reflections from "@/pages/Reflections";
import JournalPage from "@/pages/JournalPage";
import CompanionPage from "@/pages/CompanionPage";
import SettingsPage from "@/pages/SettingsPage";
import DevTestPage from "@/pages/DevTestPage";
import OnboardingRouter from "@/onboarding/OnboardingRouter";

// Rituals
import RitualBookGrid from "@/components/rituals/RitualBookGrid";

// Layout
import MainLayout from "@/layouts/MainLayout";

export default function App() {
  const { user, loading } = useUserSync();
  const simulateProd = getDevFlag("simulateProd");
  const [hasOnboarded, setHasOnboarded] = useState(null);

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("has_onboarded")
        .eq("id", user.id)
        .single();

      if (data?.has_onboarded === false) {
        setHasOnboarded(false);
      } else {
        setHasOnboarded(true);
      }
    };
    if (user) fetchOnboardingStatus();
  }, [user]);

  if (loading || (user && hasOnboarded === null)) {
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
            {/* Public Routes */}
            <Route path="/" element={<PortalView />} />
            <Route path="/portal" element={<PortalView />} />
            <Route path="/portal-preview" element={<PortalPreview />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/create-account/confirmation" element={<AccountConfirmation />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/onboarding/*" element={<OnboardingRouter />} />

            {/* Authenticated Routes */}
            {user && hasOnboarded && (
              <Route path="/*" element={<MainLayout />}>
                <Route path="home" element={<HomePage />} />
                <Route path="library" element={<CodexLibrary />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="reflections" element={<Reflections />} />
                <Route path="journal" element={<JournalPage />} />
                <Route path="companion" element={<CompanionPage />} />
                <Route path="rituals" element={<RitualBookGrid />} />
                <Route path="settings" element={<SettingsPage />} />
                {!simulateProd && (
                  <Route path="dev-test" element={<DevTestPage />} />
                )}
              </Route>
            )}
            {user && hasOnboarded === false && (
              <Route path="*" element={<Navigate to="/onboarding/welcome" replace />} />
            )}
            {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
          </Routes>
        </Router>

        {!simulateProd && <DevConsole />}
      </div>
    </DevFlagProvider>
  );
}
