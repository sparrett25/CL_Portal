import { supabase } from "@/lib/supabase";

// Save a new journal entry
export async function insertJournalEntry(userId, content, type = "user", tone_tags = []) {
  const { error } = await supabase.from("journal_entries").insert([
    {
      user_id: userId,
      content,
      entry_type: type,  // Add 'entry_type' field
      tone_tags,         // Include 'tone_tags' field
    },
  ]);
  if (error) {
    console.error("Failed to insert journal entry:", error);
    throw error;
  }
}

// Fetch recent journal entries (limit or preview)
export async function getJournalEntries(userId) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load journal entries:", error);
    return [];
  }

  return data;
}

// Fetch all entries without limit (for full reflection archive)
export async function getAllJournalEntries(userId) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch all journal entries:", error);
    return [];
  }

  return data;
}

// Get tone history for phase readiness scoring
export async function getUserJournalToneHistory(userId, limit = 15) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("tone, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch tone history:", error);
    return [];
  }

  return data;
}

// ✏️ Update a journal entry
export async function updateJournalEntry(id, content) {
  const { error } = await supabase
    .from("journal_entries")
    .update({ content })
    .eq("id", id);

  if (error) {
    console.error("Failed to update journal entry:", error);
    throw error;
  }
}

// 🗑️ Delete a journal entry
export async function deleteJournalEntry(id) {
  const { error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Failed to delete journal entry:", error);
    throw error;
  }
}
