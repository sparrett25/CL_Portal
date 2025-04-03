import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserSyncProvider } from "@/context/UserSyncContext";

import LoginView from "@/components/Auth/LoginView";
import HomePage from "@/pages/HomePage";
import CodexLibrary from "@/pages/CodexLibrary"; // Correct import path for CodexLibrary
import PortalView from "@/pages/PortalView";
import UserProfile from "@/pages/UserProfile";  // Added UserProfile route

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <Router>
        <UserSyncProvider>
          <Routes>
            <Route path="/" element={<PortalView />} />
            <Route path="/portal" element={<PortalView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/codex-library" element={<CodexLibrary />} /> {/* Correct route for Codex Library */}
            <Route path="/profile" element={<UserProfile />} />  {/* User profile page */}
            <Route path="*" element={<div className="p-10 text-center">404 – Page not found</div>} />
          </Routes>
        </UserSyncProvider>
      </Router>
    </div>
  );
}
