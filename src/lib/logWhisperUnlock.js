import { supabase } from "@/lib/supabase";

/**
 * Log the unlocking of a whisper for a specific user.
 * Used to track sacred insights that have been revealed.
 *
 * @param {string} userId - Supabase Auth User ID
 * @param {string} whisperId - ID of the whisper unlocked
 * @returns {Promise<{ data: any, error: any }>}
 */
export async function logWhisperUnlock(userId, whisperId) {
  if (!userId || !whisperId) {
    console.warn("⚠️ Missing userId or whisperId — aborting whisper log.");
    return { data: null, error: "Missing required IDs" };
  }

  const { data, error } = await supabase
    .from("unlocked_whispers")
    .insert([{ user_id: userId, whisper_id: whisperId }]);

  if (error) {
    console.error("❌ Failed to log whisper unlock:", error.message);
  } else {
    console.log("🔓 Whisper unlock logged:", { userId, whisperId });
  }

  return { data, error };
}
