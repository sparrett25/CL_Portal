// src/context/UserSyncContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // Correctly import supabase client

// ✅ Default safe shape to prevent undefined destructuring
const defaultContext = {
  userProfile: null,
  setUserProfile: () => {},
  loading: true,
};

export const UserSyncContext = createContext(defaultContext);

// ✅ Custom hook to access the context
export const useUserSync = () => useContext(UserSyncContext);

// ✅ Provider that wraps the app and syncs user profile from Supabase
export function UserSyncProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.warn("Failed to fetch user profile:", profileError.message);
        setUserProfile(null);
      } else {
        setUserProfile(profile);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []); // Fetch profile on mount

  return (
    <UserSyncContext.Provider value={{ userProfile, setUserProfile, loading }}>
      {children}
    </UserSyncContext.Provider>
  );
}
