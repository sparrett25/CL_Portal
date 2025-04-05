import { createClient } from '@supabase/supabase-js';

// Replace these values with your actual Supabase project URL and anon key
const supabaseUrl = 'https://llgnspwjiggiqhhfsukf.supabase.co';  // Replace with your actual Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZ25zcHdqaWdnaXFoaGZzdWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMTM5NDQsImV4cCI6MjA1ODY4OTk0NH0.qOKiPJFVvTQNU4A7jVGwHstwidU6UTyjmY7Qe4wasVY';  // Replace with your actual Supabase Key (use env variables for production)

// Create the Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey);

// Use these methods for login/logout

// Sign in method
export const signIn = async (email, password) => {
  const { data: user, error } = await supabase.auth.signIn({ email, password });  // Correct method for Supabase v2.x
  if (error) {
    console.error(error.message);
  }
  return user;
};

// Sign out method
export const signOut = async () => {
  await supabase.auth.signOut();
  window.location.href = '/login';  // Redirect to login page after sign out
};
