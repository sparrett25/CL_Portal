import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUserSync } from "@/context/UserSyncContext"; // Correct import for useUserSync
import LoginView from "@/components/auth/LoginView";
import HomePage from "@/pages/HomePage";
import CodexLibrary from "@/pages/CodexLibrary";
import PortalView from "@/pages/PortalView";
import UserProfile from "@/pages/UserProfile";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";  // Ensure this import is correct

export default function App() {
  const { user, loading } = useUserSync(); // Using context to access user and loading states

  // If loading, show loading text
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <Router>
        <Routes>
          <Route path="/" element={<PortalView />} />
          <Route path="/portal" element={<PortalView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/library" element={user ? <CodexLibrary /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="*" element={<div className="p-10 text-center">404 – Page not found</div>} />
        </Routes>
      </Router>
    </div>
  );
}
