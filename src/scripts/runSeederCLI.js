const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runSeeder() {
  console.log("🌱 Starting CLI DevSeeder...");

  const targetEmail = "sparrett@usa.net";
  const password = "codexlumina";

  const { data: list, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error("❌ Error listing users:", listError.message);
    return;
  }

  const existingUser = list.users.find((u) => u.email === targetEmail);
  let userId;

  if (existingUser) {
    userId = existingUser.id;
    console.log("✅ Found existing user:", targetEmail, "→", userId);
  } else {
    const { data: newUserData, error: createError } = await supabase.auth.admin.createUser({
      email: targetEmail,
      password,
      email_confirm: true,
    });

    if (createError) {
      console.error("❌ Error creating user:", createError.message);
      return;
    }

    userId = newUserData.user.id;
    console.log("✅ New user created:", userId);
  }

  await supabase.from("profiles").upsert({
    id: userId,
    nickname: "Scott Parrett",
    phase: "Awakening",
    energy: "Light",
    archetype: "The Visionary",
    has_onboarded: true,
  });
  console.log("✅ Profile synced.");

  // ✅ FIXED: Changed to invite_keys and key_value
  await supabase.from("invite_keys").upsert([
    {
      key_value: "INITIATE-333",
      is_active: true,
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
    content: "CLI journal seeded for testing reflection sync.",
    tone: "Light",
    created_at: new Date().toISOString(),
  });
  console.log("✅ Journal entry added.");

  await supabase.from("key_logs").insert([
    {
      key: "INITIATE-333",
      action: "claimed",
      timestamp: new Date().toISOString(),
    },
    {
      key: "FLAMEKEY-777",
      user_id: userId,
      action: "revoked",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      key: "AWAKEN-123",
      user_id: userId,
      action: "generated",
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
  ]);
  console.log("📜 Key logs written.");

  console.log("🌟 Seeder complete for user:", targetEmail);
}

runSeeder();
