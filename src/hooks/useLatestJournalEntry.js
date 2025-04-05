// hooks/useLatestJournalEntry.js
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useLatestJournalEntry(userId) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchEntry = async () => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Failed to load journal entry:", error);
      }

      setEntry(data);
      setLoading(false);
    };

    fetchEntry();
  }, [userId]);

  return { entry, loading };
}
