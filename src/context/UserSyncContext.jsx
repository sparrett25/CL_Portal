import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";  // Correctly import your Supabase instance

const UserSyncContext = createContext();

export function UserSyncProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Added loading state to track fetching status

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();  // Updated for v2.x
      setUser(session ? session.user : null);
      setLoading(false);  // Stop loading once data is fetched
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session ? session.user : null);  // Update user state when auth state changes
    });

    return () => {
      authListener?.unsubscribe();  // Proper cleanup
    };
  }, []);

  return (
    <UserSyncContext.Provider value={{ user, loading }}>
      {children}
    </UserSyncContext.Provider>
  );
}

export function useUserSync() {
  return useContext(UserSyncContext);
}
