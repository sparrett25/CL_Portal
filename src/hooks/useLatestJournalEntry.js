// hooks/useLatestJournalEntry.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useLatestJournalEntry(userId) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Optional: track error

  useEffect(() => {
    if (!userId) return;

    const fetchEntry = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(); // ✅ Avoids 406 if no entry

      if (error) {
        console.error("Failed to load journal entry:", error);
        setError(error);
      }

      setEntry(data || null); // ✅ Safely handles empty result
      setLoading(false);
    };

    fetchEntry();
  }, [userId]);

  return { entry, loading, error };
}
