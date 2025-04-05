// services/journalService.js

import { supabase } from "@/lib/supabase";

export async function insertJournalEntry(userId, content, tag = "general") {
  const { error } = await supabase.from("journal_entries").insert([
    {
      user_id: userId,
      content,
      tag,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) console.error("Error saving journal entry:", error.message);
}

export async function getAllJournalEntries(userId) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching journal entries:", error.message);
    return [];
  }

  return data;
}
