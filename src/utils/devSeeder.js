import { supabase } from '@/lib/supabase';

export async function seedCodexKey({
  key_value = 'TESTKEY-001',
  is_active = true,
  expires_at = null,
  used_by = null,
}) {
  const { data, error } = await supabase.from('key_value').insert([
    {
      key_value,
      is_active,
      expires_at,
      used_by,
    },
  ]);

  if (error) {
    console.error('❌ Failed to seed key:', error.message);
  } else {
    console.log('✅ Codex Key Seeded:', data);
  }

  return { data, error };
}

export async function createTestUser({
  email = 'test@example.com',
  password = 'password123',
  first_name = 'Test',
  last_name = 'User',
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('❌ User creation failed:', error.message);
    return { data, error };
  }

  // Attach profile
  const user_id = data.user?.id;
  if (user_id) {
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: user_id,
        first_name,
        last_name,
        nickname: first_name,
        phase: 'Awakening',
        energy: 'Neutral',
        archetype: 'The Seeker',
      },
    ]);

    if (profileError) {
      console.error('❌ Failed to create profile:', profileError.message);
    } else {
      console.log('✅ Profile created for test user');
    }
  }

  return { data, error };
}
