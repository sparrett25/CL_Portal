import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/onboarding`,
      },
    });

    if (error) {
      setMessage('There was an error sending the login email. Please try again.');
      console.error(error);
    } else {
      setMessage('Check your email for a magic link to log in.');
    }

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4 tracking-wide">Welcome to Codex Lumina</h1>
      <p className="mb-6 text-center text-lg">Enter your email to begin your journey.</p>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          className="w-full p-3 rounded bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-lime-400"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex justify-between items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 rounded bg-lime-500 hover:bg-lime-600 text-black font-semibold"
          >
            {isSubmitting ? 'Sending...' : 'Send Magic Link'}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-24 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
          >
            Reset
          </button>
        </div>
      </form>

      {message && <p className="mt-6 text-center text-sm text-lime-300">{message}</p>}
    </div>
  );
};

export default LoginView;
