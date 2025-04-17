// src/lib/checkCodexKey.js

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function checkCodexKey(key) {
  const endpoint = `${SUPABASE_URL}/rest/v1/invite_keys?select=*&key_value=eq.${key}`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Accept: "application/json", // ✅ Fixes 406 error
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("❌ Supabase error:", error);
      return { success: false, error: error.message || "Request failed" };
    }

    const data = await res.json();
    if (data.length === 0) {
      return { success: false, error: "Invalid or expired key" };
    }

    return { success: true, keyData: data[0] };
  } catch (err) {
    console.error("❌ Network or unexpected error:", err);
    return { success: false, error: err.message };
  }
}
