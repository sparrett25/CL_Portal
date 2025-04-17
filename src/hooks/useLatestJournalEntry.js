// hooks/useLatestJournalEntry.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Fetches the most recent journal entry for a given user.
 * Used to reflect tone, trigger Liora whispers, or track ritual cycles.
 */
export function useLatestJournalEntry(userId) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        .maybeSingle(); // ✅ Avoids 406 on empty

      if (error) {
        console.error("🛑 Failed to fetch latest journal entry:", error.message);
        setError(error);
      }

      setEntry(data || null);
      setLoading(false);
    };

    fetchEntry();
  }, [userId]);

  return { entry, loading, error };
}
