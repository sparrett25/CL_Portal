import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const UserSyncContext = createContext();

export function UserSyncProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user); // Set user if session exists
      }
      setLoading(false); // Set loading to false after session fetch
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session ? session.user : null); // Update user state
      setLoading(false); // Set loading to false when auth state changes
    });

    // Cleanup on unmount
    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  return (
    <UserSyncContext.Provider value={{ user, loading }}>
      {children}
    </UserSyncContext.Provider>
  );
}

export function useUserSync() {
  return useContext(UserSyncContext) || { user: null, loading: true }; // Ensure valid return
}
