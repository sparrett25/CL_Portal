// src/lib/supabase.js

import { createClient } from '@supabase/supabase-js';

// Use VITE_ prefixed environment variables for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Correct the key name here

// Ensure both supabaseUrl and supabaseKey are available
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be set in environment variables.");
}

// Create and export the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey);
