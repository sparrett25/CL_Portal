// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Use environment variables for security and flexibility
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase environment variables are missing!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
