// hooks/useUserProfile.js
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useUserProfile(user) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
      }

      setProfile(data || null);
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
}
