// inviteKeyService.js

import { supabase } from "@/lib/supabase";

/**
 * Validate a user-entered Codex invite key
 * @param {string} key - The invite key to validate
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function validateInviteKey(key) {
  if (!key || key.trim().length === 0) {
    return { success: false, error: "No key provided" };
  }

  const { data, error } = await supabase
    .from("invite_keys")
    .select("id, key, is_active")
    .eq("key", key.trim())
    .single();

  if (error) {
    console.warn("Invite key validation failed:", error.message);
    return { success: false, error: error.message };
  }

  if (!data || !data.is_active) {
    return { success: false, error: "Key is inactive or invalid" };
  }

  return { success: true };
}
