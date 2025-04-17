import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ import Link from react-router-dom
import { supabase } from "@/lib/supabase";
import KeyEntryPanel from "@/components/portal/KeyEntryPanel";

export default function PortalView() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      const skipRedirect = sessionStorage.getItem("disableAutoPortalRedirect");
      if (session && !skipRedirect) {
        console.log("🔒 User already authenticated. Redirecting...");
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handleKeySubmit = async (submittedKey) => {
    console.log("🔍 Validating invite key:", submittedKey);

    const { data, error } = await supabase
      .from("invite_keys")
      .select("*")
      .eq("key_value", submittedKey)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      console.error("❌ Invalid key:", error);
      alert("Invalid or expired invite key.");
      return;
    }

    sessionStorage.setItem("codex_key", submittedKey);
    console.log("✅ Key accepted — navigating to /create-account");
    navigate("/create-account");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-900 to-indigo-950 flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Enter the Codex</h2>
        <p className="text-sm text-indigo-200 text-center mb-6">
          You’ve been invited. Use your unique Key Code below to begin the journey into Codex Lumina.
        </p>

        <KeyEntryPanel onKeySubmit={handleKeySubmit} />

        <div className="mt-8 text-center space-y-3">
          <p className="text-sm text-indigo-300">
            Already have an account?{" "}
            <Link to="/login" className="underline text-indigo-200 hover:text-white transition duration-150">
              Sign In Here
            </Link>
          </p>
          <p className="text-sm text-indigo-300">
            Need to create an account?{" "}
            <Link to="/signup" className="underline text-indigo-200 hover:text-white transition duration-150">
              Sign Up
            </Link>
          </p>
        </div>

        {/* 🔄 Authenticated fallback */}
        {session && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/home")}
              className="text-indigo-300 hover:text-white underline transition duration-150"
            >
              🔮 Continue to Codex
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
