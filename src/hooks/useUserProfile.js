// hooks/useUserProfile.js
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Fetches the user profile from Supabase for a given authenticated user.
 * Commonly used when bypassing full UserSyncContext (or in SSR contexts).
 */
export function useUserProfile(user) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Optional error exposure

  useEffect(() => {
    if (!user || !user.id) {
      setLoading(false);
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn("⚠️ Error loading profile:", error.message);
        setError(error);
        setProfile(null);
      } else {
        setProfile(data || null);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
}
