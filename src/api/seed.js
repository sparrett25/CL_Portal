const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const email = "sparrett@usa.net";

  const { data: list, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    return res.status(500).send("❌ Failed to list users.");
  }

  const user = list.users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).send("❌ User not found.");
  }

  const userId = user.id;

  await supabase.from("profiles").upsert({
    id: userId,
    nickname: "Scott Parrett",
    energy: "Light",
    archetype: "The Visionary",
    phase: "Awakening",
    has_onboarded: true,
  });

  await supabase.from("key_logs").insert([
    {
      key: "PORTAL-KEY-1",
      user_id: userId,
      action: "claimed",
      timestamp: new Date().toISOString(),
    },
  ]);

  return res.status(200).send("✅ Key logs seeded for: " + email);
}
