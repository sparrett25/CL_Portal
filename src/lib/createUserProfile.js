import { supabase } from "@/lib/supabase";

/**
 * Creates or updates a Codex Profile in Supabase upon onboarding.
 * Accepts user auth object and spiritual profile data.
 */
export async function createUserProfile(user, profileData = {}) {
  const {
    nickname = "",
    energy = "",
    phase = "",
    archetype = "",
    avatar = "liora1"
  } = profileData;

  console.log("🔥 Supabase Auth User ID:", user?.id);
  console.log("📦 Profile Payload:", {
    id: user?.id,
    nickname,
    energy,
    phase,
    archetype,
    avatar,
  });

  if (!user?.id) {
    console.error("❌ No valid user ID found — aborting profile creation.");
    throw new Error("User not authenticated or missing ID.");
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        nickname,
        energy,
        phase,
        archetype,
        avatar,
        created_at: new Date().toISOString(),
        has_onboarded: true,
      },
      { onConflict: ["id"] }
    );

  console.log("🔁 Supabase upsert response:", { data, error });

  if (error) {
    console.error("❌ Failed to upsert profile:", error.message);
    throw error;
  }

  console.log("✅ Profile upsert successful. Signature set.");
}
