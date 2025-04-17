// inviteKeyService.js

import { supabase } from "@/lib/supabase";

/**
 * Validate a user-entered Codex Invite Key.
 * Ensures the key is active and legitimate before allowing portal access.
 *
 * @param {string} key - The invite key to validate
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function validateInviteKey(key) {
  const trimmedKey = key?.trim();

  if (!trimmedKey) {
    return { success: false, error: "No invite key provided." };
  }

  const { data, error } = await supabase
    .from("invite_keys")
    .select("id, key, is_active")
    .eq("key", trimmedKey)
    .single();

  if (error) {
    console.warn("⚠️ Invite key validation error:", error.message);
    return { success: false, error: "Key not found or invalid." };
  }

  if (!data || !data.is_active) {
    return { success: false, error: "This invite key is inactive or invalid." };
  }

  console.log("🔑 Invite key validated successfully:", data.key);
  return { success: true };
}
