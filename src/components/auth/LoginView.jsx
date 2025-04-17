import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        sessionStorage.removeItem("disableAutoPortalRedirect"); // Clear any flag
        navigate("/home");
      }
    } catch (err) {
      setError("Unexpected error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-indigo-950 text-white font-inter flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/5 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-300">Log In to Codex Lumina</h1>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-indigo-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="you@luminaverse.org"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-indigo-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 rounded-md bg-gray-900 text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              {loading ? "Logging in..." : "Enter the Codex"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
