import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";  // Correctly import your Supabase instance

const UserSyncContext = createContext();

export function UserSyncProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session ? session.user : null);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session ? session.user : null);
      setLoading(false);
    });

    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserSyncContext.Provider value={{ user, loading, signOut }}>
      {children}
    </UserSyncContext.Provider>
  );
}

export function useUserSync() {
  return useContext(UserSyncContext);
}
