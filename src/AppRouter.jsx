import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

// Views and Pages
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import JournalPage from "@/pages/JournalPage";
import RitualsPage from "@/pages/RitualsPage";
import CompanionPage from "@/pages/CompanionPage";
import SettingsPage from "@/pages/SettingsPage";
import OnboardingRouter from "@/views/Onboarding/OnboardingRouter";
import PortalView from "@/pages/PortalView";
import CreateAccount from "@/pages/CreateAccount";
import CreateAccountConfirmation from "@/pages/CreateAccountConfirmation";
import LoginView from "@/components/auth/LoginView";
import Signup from "@/components/auth/Signup";
import DevTestPage from "@/routes/dev-test";
import { useDevFlags } from "@/utils/devFlags";

export default function AppRouter() {
  const [loading, setLoading] = useState(true);
  const [shouldOnboard, setShouldOnboard] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const flags = useDevFlags();

  useEffect(() => {
    const checkUserStatus = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (!user) {
        setIsAuthed(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("has_onboarded")
        .eq("id", user.id)
        .single();

      setShouldOnboard(!profile?.has_onboarded);
      setIsAuthed(true);
      setLoading(false);
    };

    checkUserStatus();
  }, []);

  if (loading) return <div className="text-white p-10">Loading Codex...</div>;

  return (
    <Routes>
      {/* 🌀 Public Access */}
      <Route path="/portal" element={<PortalView />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/create-account/confirmation" element={<CreateAccountConfirmation />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔮 Onboarding Path */}
      <Route path="/onboarding/*" element={<OnboardingRouter />} />

      {/* 🌟 Main Codex Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<HomePage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="rituals" element={<RitualsPage />} />
        <Route path="companion" element={<CompanionPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 🧪 Dev Test */}
      {flags.simulateProd === false && (
        <Route path="/dev-test" element={<DevTestPage />} />
      )}

      {/* 🌌 Fallback */}
      <Route
        path="*"
        element={
          isAuthed ? (
            shouldOnboard ? (
              <Navigate to="/onboarding/welcome" />
            ) : (
              <Navigate to="/home" />
            )
          ) : (
            <Navigate to="/portal" />
          )
        }
      />
    </Routes>
  );
}
