import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function KeyEntryView() {
  const [keyInput, setKeyInput] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleKeyCheck = async () => {
    if (!keyInput.trim()) return;

    setStatus("🔍 Validating Key...");
    setLoading(true);

    const { data, error } = await supabase
      .from("invite_keys") // ✅ CORRECT TABLE
      .select("*")
      .eq("key_value", keyInput.trim()) // ✅ CORRECT COLUMN
      .single();

    if (error || !data) {
      setStatus("❌ This key is invalid, expired, or already used.");
      setLoading(false);
      return;
    }

    if (!data.is_active) {
      setStatus("⚠️ This key has already been used or is no longer active.");
      setLoading(false);
      return;
    }

    // 🧠 Store key for use during onboarding/account creation
    sessionStorage.setItem("codexKey", keyInput.trim());
    sessionStorage.setItem("codexKeyId", data.id);
    sessionStorage.setItem("inviteType", data.invite_type || "");

    setStatus("✅ Key accepted. Welcome.");
    setTimeout(() => {
      navigate("/create-account");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 space-y-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-lg">
        <h1 className="text-2xl font-semibold text-indigo-300 text-center">🔑 Enter Your Codex Key</h1>
        <p className="text-sm text-center text-zinc-400">This key was gifted to you. Treat it with care.</p>

        <input
          type="text"
          placeholder="e.g. INITIATE-888"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-black/70 text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleKeyCheck}
          disabled={loading}
          className={`w-full py-3 rounded-full font-bold transition-all ${
            loading ? "bg-zinc-700 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Checking..." : "Continue"}
        </button>

        {status && (
          <p className={`text-center text-sm ${status.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
            {status}
          </p>
        )}

        <p className="text-sm text-center text-zinc-500 pt-2">
          Already initiated?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Sign In Here
          </a>
        </p>
      </div>
    </div>
  );
}
