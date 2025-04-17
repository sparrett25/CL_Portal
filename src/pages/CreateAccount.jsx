import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function CreateAccount() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });
  const [codexKey, setCodexKey] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWhisper, setShowWhisper] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedKey = sessionStorage.getItem("codexKey");
    if (storedKey) {
      setCodexKey(storedKey);
    } else {
      setError("❌ No Codex Key found. Please return to the Portal.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!codexKey) {
      setError("Codex Key missing. Return to /portal and begin again.");
      setLoading(false);
      return;
    }

    const { email, password, first_name, last_name } = formData;

    // Step 1: Sign up
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Step 2: Immediately log them in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError("Signup succeeded, but sign-in failed: " + signInError.message);
      setLoading(false);
      return;
    }

    // ✅ Step 3: Get the user_id from the current session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const user_id = sessionData?.session?.user?.id;

    if (!user_id) {
      setError("Could not retrieve authenticated user. Please try again.");
      setLoading(false);
      return;
    }

    // Step 4: Insert profile row
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user_id,
        first_name,
        last_name,
        codex_key_used: codexKey,
        has_onboarded: false
      }
    ]);

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    // Step 5: Mark invite key as used
    await supabase
      .from("invite_keys")
      .update({
        is_active: false,
        used_by: user_id,
        used_at: new Date().toISOString()
      })
      .eq("key_value", codexKey);

    // Step 6: Onboarding transition
    setShowWhisper(true);
    setTimeout(() => {
      setTransitioning(true);
      setTimeout(() => {
        navigate("/onboarding/welcome");
      }, 900);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 space-y-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-lg">
        <h1 className="text-2xl font-semibold text-indigo-300 text-center">✨ Create Your Account</h1>

        {codexKey && (
          <p className="text-sm text-center text-green-400">
            Your Codex Key: <code className="text-green-300">{codexKey}</code>
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-black/70 text-white border border-white/10 placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-black/70 text-white border border-white/10 placeholder-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-black/70 text-white border border-white/10 placeholder-gray-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-black/70 text-white border border-white/10 placeholder-gray-400"
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-all font-bold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {showWhisper && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-indigo-300 text-sm pt-4 italic"
          >
            “The flame within you has been seen. Your journey begins now.”
          </motion.div>
        )}
      </div>

      {transitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
        >
          <img
            src="/assets/glyphs/codex-sigil.svg"
            alt="Codex Glyph"
            className="w-32 h-32 animate-pulse-slow opacity-90"
          />
        </motion.div>
      )}
    </div>
  );
}
