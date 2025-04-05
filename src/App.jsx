import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useUserSync } from "@/context/UserSyncContext"; // Correct import for useUserSync
import LoginView from "@/components/Auth/LoginView";
import HomePage from "@/pages/HomePage";
import CodexLibrary from "@/pages/CodexLibrary";
import PortalView from "@/pages/PortalView";
import UserProfile from "@/pages/UserProfile";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";  // Ensure this import is correct

export default function App() {
  const [user, setUser] = useState(null); // Ensure user state is initialized
  const [loading, setLoading] = useState(true); // Track the loading state

  // Fetch session on initial mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user); // Update the user state with the session data
        }
        setLoading(false); // Set loading to false after session fetch
      } catch (error) {
        console.error('Error fetching session:', error);
        setLoading(false); // Handle errors by setting loading to false
      }
    };

    fetchSession();

    // Listen to authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session ? session.user : null); // Update user on auth state change
      setLoading(false);
    });

    // Ensure proper cleanup
    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe(); // Ensure unsubscribe is available before calling it
      }
    };
  }, []);

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
