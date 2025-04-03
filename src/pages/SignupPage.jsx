import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatusMessage('Attempting to create your account...');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://www.codexlumina.com/onboarding',
      },
    });

    console.log('🔁 Signup Response:', { data, error });

    if (error) {
      setStatusMessage(`⚠️ Signup failed: ${error.message}`);
    } else if (data?.user && !data?.session) {
      setStatusMessage('✨ Please check your email to confirm your account.');
    } else if (data?.session) {
      // Rare case when email confirmation is disabled
      navigate('/onboarding');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-neutral-900 to-black text-white">
      <h1 className="text-3xl font-semibold mb-4">Join Codex Lumina</h1>
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
        <input
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded"
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold"
        >
          Begin
        </button>
      </form>
      {statusMessage && (
        <p className="mt-4 text-center text-sm text-indigo-300">{statusMessage}</p>
      )}
    </div>
  );
};

export default SignupPage;
