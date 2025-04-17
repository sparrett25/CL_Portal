import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('🔐 Attempting to create your Codex entry...');

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
      setStatusMessage('✨ Please check your inbox to confirm your account and begin your journey.');
    } else if (data?.session) {
      navigate('/onboarding'); // Fallback in case confirmation is disabled
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <div className="w-full max-w-sm space-y-6 bg-white/5 border border-indigo-500/20 p-6 rounded-2xl shadow-xl backdrop-blur">
        <h1 className="text-3xl font-semibold text-center text-indigo-300">Join Codex Lumina</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            className="w-full px-4 py-3 bg-zinc-900 border border-indigo-400 rounded text-white placeholder:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            placeholder="you@luminaverse.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-3 bg-zinc-900 border border-indigo-400 rounded text-white placeholder:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            placeholder="Create a secure passphrase"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold transition"
          >
            {loading ? 'Creating...' : 'Begin Your Codex Journey'}
          </button>
        </form>

        {statusMessage && (
          <p className="mt-4 text-center text-sm text-indigo-300">{statusMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
