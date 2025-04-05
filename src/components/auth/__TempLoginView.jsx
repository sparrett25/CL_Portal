import React, { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Correct Supabase import
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate('/home');  // Redirect to home after successful login
      }
    } catch (error) {
      setError('Error logging in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter flex items-center justify-center">
      <div className="max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Login to Codex Lumina</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              id="email"
              type="email"
              required
              className="w-full p-3 mt-2 bg-gray-800 text-white rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              id="password"
              type="password"
              required
              className="w-full p-3 mt-2 bg-gray-800 text-white rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-blue-600 text-white rounded-md"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
