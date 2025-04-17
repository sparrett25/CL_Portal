import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import PortalLayout from "@/components/layout/PortalLayout";
import { Eye, EyeOff } from "lucide-react";

export default function PortalSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      // 🔁 Reload to trigger updated session + profile context
      window.location.href = "/home";
    }
  };

  return (
    <PortalLayout>
      <div className="text-center space-y-6 max-w-md mx-auto">
        <img
          src="/assets/glyphs/codex-sigil.svg"
          alt="Codex Glyph"
          className="w-16 h-16 opacity-90 mx-auto animate-pulse"
        />

        <h2 className="text-xl font-semibold text-indigo-300">Return to the Codex</h2>
        <p className="text-sm text-gray-400 mb-4">
          Welcome back, traveler. Enter your credentials to resume the journey.
        </p>

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="relative w-full mt-3">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-xl bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 hover:text-gray-800"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errorMsg && (
          <p className="text-sm text-red-400 mt-2">{errorMsg}</p>
        )}

        <button
          onClick={handleSignIn}
          disabled={loading}
          className={`mt-4 w-full px-6 py-3 rounded-xl font-bold transition-all ${
            loading
              ? "bg-indigo-400 cursor-wait"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Entering..." : "Enter the Codex"}
        </button>

        <p className="text-sm text-indigo-400 mt-4">
          Not yet initiated?{" "}
          <a href="/portal" className="underline hover:text-white">
            Request Access
          </a>
        </p>
      </div>
    </PortalLayout>
  );
}
