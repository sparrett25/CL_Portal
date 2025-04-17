import { supabase } from "@/lib/supabase";

/**
 * Updates the user's phase and logs timestamp in the profiles table.
 */
export async function updatePhaseAndTimestamp(userId, newPhase) {
  const { error } = await supabase
    .from("profiles") // ✅ Corrected from "users"
    .update({
      phase: newPhase,
      lastPhaseShiftDate: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) console.error("❌ Failed to update phase:", error.message);
}

/**
 * Logs a phase shift event into the evolution_log.
 */
export async function logPhaseShiftEvent(userId, fromPhase, toPhase) {
  const { error } = await supabase.from("evolution_log").insert([
    {
      user_id: userId,
      from_phase: fromPhase,
      to_phase: toPhase,
      timestamp: new Date().toISOString(),
    },
  ]);

  if (error) console.error("❌ Failed to log phase event:", error.message);
}

/**
 * Retrieves a user's full evolution history.
 */
export async function getUserEvolutionHistory(userId) {
  const { data, error } = await supabase
    .from("evolution_log")
    .select("*")
    .eq("user_id", userId)
    .order("timestamp", { ascending: true });

  if (error) {
    console.error("Failed to fetch evolution log:", error.message);
    return [];
  }

  return data;
}
