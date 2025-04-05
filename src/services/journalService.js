// services/journalService.js

import { supabase } from "@/lib/supabase";

// Existing functions
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

// New function to get user journal tone history
export async function getUserJournalToneHistory(userId) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("content")  // Assuming the tone is embedded in the content field
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching journal tone history:", error.message);
    return [];
  }

  // Here, you would need to analyze the content to extract tones. 
  // Assuming you have a way to extract the tone from each entry's content.
  const tones = data.map(entry => extractToneFromContent(entry.content));
  return tones;
}

// Helper function to analyze the tone from the content (for example purposes)
function extractToneFromContent(content) {
  // This function should return the tone based on content. 
  // For example, you could use some natural language processing or simple keywords:
  if (content.includes("struggle")) return "struggle";
  if (content.includes("hopeful")) return "hopeful";
  if (content.includes("breakthrough")) return "breakthrough";
  return "neutral";
}
