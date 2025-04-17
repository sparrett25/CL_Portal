import { supabase } from "@/lib/supabase";

export async function runDevSeeder() {
  console.log("🌱 Starting DevSeeder...");

  const { data: authUser, error: userError } = await supabase.auth.admin.createUser({
    email: "testuser@codex.com",
    password: "codexlumina",
    email_confirm: true,
  });

  if (userError) {
    console.error("❌ Error creating test user:", userError.message);
    return;
  }

  const userId = authUser?.user?.id;
  console.log("✅ Test user created:", userId);

  await supabase.from("profiles").insert({
    id: userId,
    nickname: "Seeker",
    phase: "Initiation",
    energy: "Neutral",
    archetype: "The Dreamer",
    has_onboarded: false,
  });

  console.log("✅ Profile created.");

  // ✅ FIXED: Changed to invite_keys and key_value
  await supabase.from("invite_keys").insert([
    {
      key_value: "INITIATE-888",
      is_active: true,
      used_by: null,
      used_at: null,
    },
    {
      key_value: "USED-KEY-123",
      is_active: true,
      used_by: userId,
      used_at: new Date().toISOString(),
    },
    {
      key_value: "EXPIRED-KEY-999",
      is_active: false,
    },
  ]);
  console.log("✅ Invite Keys seeded.");

  await supabase.from("journal_entries").insert({
    user_id: userId,
    content: "This is a seeded journal entry from DevSeeder.",
    tone: "Neutral",
    created_at: new Date().toISOString(),
  });
  console.log("✅ Journal entry seeded.");

  await supabase.from("key_logs").insert([
    {
      key: "INITIATE-888",
      user_id: userId,
      action: "claimed",
      timestamp: new Date().toISOString(),
    },
    {
      key: "FLAMEKEY-777",
      user_id: "flame-seer",
      action: "revoked",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      key: "AWAKEN-123",
      user_id: null,
      action: "generated",
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
  ]);
  console.log("📜 Key logs seeded.");

  console.log("🌟 DevSeeder completed.");
}
