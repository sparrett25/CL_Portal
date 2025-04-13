import { supabase } from "@/lib/supabase"; // adjust path if needed
import { v4 as uuidv4 } from "uuid"; // ensure uuid package is installed

const keyTypes = [
  { prefix: "TEST", uses: 5, type: "beta" },
  { prefix: "BETA", uses: 10, type: "internal" },
  { prefix: "GUEST", uses: 1, type: "limited" },
];

function generateKey(prefix) {
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `${prefix}-${uuidv4().split("-")[0].toUpperCase()}${random}`;
}

async function createInviteKeysBatch(count = 5) {
  const newKeys = [];

  for (let i = 0; i < count; i++) {
    const style = keyTypes[i % keyTypes.length];
    const newKey = {
      key: generateKey(style.prefix),
      uses_left: style.uses,
      type: style.type,
      created_by: "auto-script",
    };
    newKeys.push(newKey);
  }

  const { data, error } = await supabase
    .from("invite_keys")
    .insert(newKeys)
    .select();

  if (error) {
    console.error("Error inserting invite keys:", error.message);
  } else {
    console.log("✅ Invite keys generated:", data.map((k) => k.key));
  }
}

createInviteKeysBatch(9);
