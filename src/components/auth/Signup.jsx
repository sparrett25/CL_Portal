import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Check your email for the login link!");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4 p-6 bg-zinc-800 rounded-lg shadow-md w-full max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-2 rounded bg-zinc-900 text-white placeholder-zinc-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-4 py-2 rounded bg-zinc-900 text-white placeholder-zinc-500"
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded text-white transition ${
          loading ? "bg-zinc-600" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Signing up…" : "Sign Up"}
      </button>
    </form>
  );
}
