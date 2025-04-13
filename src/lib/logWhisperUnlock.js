import { supabase } from "@/lib/supabase";

export async function logWhisperUnlock(userId, whisperId) {
  const { data, error } = await supabase
    .from("unlocked_whispers")
    .insert([{ user_id: userId, whisper_id: whisperId }]);

  if (error) {
    console.error("Failed to log whisper unlock:", error);
  }

  return { data, error };
}
