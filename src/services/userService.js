import { supabase } from "@/lib/supabase";

export async function updatePhaseAndTimestamp(userId, newPhase) {
  const { error } = await supabase
    .from("users")
    .update({
      phase: newPhase,
      lastPhaseShiftDate: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) console.error("❌ Failed to update phase:", error.message);
}

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
