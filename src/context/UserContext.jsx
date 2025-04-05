import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const UserSyncContext = createContext();

export function UserSyncProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session ? session.user : null);

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session ? session.user : null);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <UserSyncContext.Provider value={{ user }}>
      {children}
    </UserSyncContext.Provider>
  );
}

export function useUser() {
  return useContext(UserSyncContext);
}
