import { supabase } from "@/lib/supabase";

/**
 * Validates the provided invite key against the Supabase `invite_keys` table.
 * @param {string} key - The Codex invite key.
 * @returns {Promise<{ success: boolean, error?: string, metadata?: object }>}
 */
export async function validateInviteKey(key) {
  const trimmedKey = key?.trim();

  if (!trimmedKey) {
    return { success: false, error: "Empty key" };
  }

  // Step 1: Query Supabase for the invite key
  const { data, error } = await supabase
    .from("invite_keys")
    .select("*")
    .eq("key", trimmedKey)
    .single();

  if (error || !data) {
    console.warn("Invite Key Lookup Failed:", error?.message || "Not found");
    return { success: false, error: "Key not found or invalid" };
  }

  // Step 2: Check if the key has expired
  if (data.uses_left !== null && data.uses_left <= 0) {
    return { success: false, error: "Key has already been used" };
  }

  // Step 3: Track current user ID (if available)
  const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null;
  const userId = user?.id || null;

  // Step 4: Update usage info
  const updates = {
    last_used_at: new Date().toISOString(),
  };

  if (userId) updates.last_used_by = userId;
  if (data.uses_left !== null) updates.uses_left = data.uses_left - 1;

  const { error: updateError } = await supabase
    .from("invite_keys")
    .update(updates)
    .eq("id", data.id);

  if (updateError) {
    console.error("Failed to update invite key usage:", updateError.message);
  }

  // Step 5: Return success with optional metadata
  return {
    success: true,
    metadata: {
      type: data.type || "general",
      created_by: data.created_by || "unknown",
    },
  };
}
