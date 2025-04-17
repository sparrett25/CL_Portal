import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase"; // ✅ Unified import

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({
        type: "success",
        text: "A sacred link has been sent. Please check your email to complete entry.",
      });

      // Optional: Redirect after a delay
      // setTimeout(() => navigate("/login"), 5000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-indigo-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/5 border border-indigo-500/20 rounded-2xl p-6 backdrop-blur-lg shadow-xl text-white font-inter">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-300">Create Your Codex Account</h1>

        {message && (
          <p
            className={`text-sm text-center mb-4 ${
              message.type === "error" ? "text-red-500" : "text-green-400"
            }`}
          >
            {message.text}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
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
              className="w-full mt-1 p-3 rounded-md bg-gray-900 text-white border border-white/10 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none"
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
              className="w-full mt-1 p-3 rounded-md bg-gray-900 text-white border border-white/10 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Create a secure passphrase"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              {loading ? "Sending Sacred Link..." : "Begin Your Codex Journey"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
