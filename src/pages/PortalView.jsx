import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function PortalView() {
  const [searchParams] = useSearchParams();
  const [keyInput, setKeyInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlKey = searchParams.get("key");
    if (urlKey) {
      setKeyInput(urlKey);
      validateKey(urlKey);
    }
  }, [searchParams]);

  const validateKey = async (enteredKey) => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("invite_keys") // ✅ Corrected
      .select("*")
      .eq("key_value", enteredKey.trim()) // ✅ Corrected
      .single();

    if (!data || !data.is_active) {
      setError("This key is invalid, expired, or already used.");
      setLoading(false);
      return;
    }

    try {
      new Audio("/assets/audio/veil-entry.mp3").play();
    } catch (err) {
      console.warn("🔇 Audio failed:", err.message);
    }

    sessionStorage.setItem("codexKey", enteredKey);
    navigate("/create-account");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateKey(keyInput);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-900 to-black text-white flex flex-col items-center justify-center p-6 relative">
      {/* 🔮 Floating Glyph Overlay */}
      <img
        src="/assets/glyphs/codex-sigil.svg"
        alt="Codex Sigil"
        className="absolute w-44 h-44 opacity-5 animate-pulse pointer-events-none"
      />

      <div className="max-w-md w-full bg-white/5 border border-indigo-500/30 backdrop-blur-md p-6 rounded-xl shadow-xl z-10">
        <h1 className="text-2xl font-bold text-center mb-4 text-indigo-300">Enter Your Codex Key</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="EX: INITIATE-777"
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white border border-indigo-400 placeholder:text-indigo-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
          >
            {loading ? "Validating..." : "Continue"}
          </button>
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        </form>

        <p className="mt-6 text-sm text-indigo-300 text-center">
          Already initiated?{" "}
          <a href="/login" className="underline hover:text-white transition">
            Sign In Here
          </a>
        </p>
      </div>
    </div>
  );
}
