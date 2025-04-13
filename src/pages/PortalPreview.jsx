import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateInviteKey } from "@/services/inviteAuthService";
import VeilUnlock from "@/components/VeilUnlock"; // ✨ Shimmer veil unlock animation
import PortalLayout from "@/layouts/PortalLayout"; // Sacred Codex UI wrapper

export default function PortalPreview() {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState(null); // "success", "error", or null
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Preload next route for a smooth veil transition
    if (status === "success") {
      setTimeout(() => {
        navigate("/home");
      }, 2400); // Sync with VeilUnlock duration
    }
  }, [status, navigate]);

  const handleKeySubmit = async () => {
    setLoading(true);
    const response = await validateInviteKey(key);

    if (response.success) {
      localStorage.setItem("codex_portal_passed", "true");
      setStatus("success");
    } else {
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <PortalLayout
      title="🔐 Portal Preview"
      subtitle="Enter your invite key to access the Codex."
    >
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter Codex Key"
        className="w-full px-4 py-2 mb-4 rounded-lg 
                   bg-zinc-900 text-white 
                   border border-indigo-400 
                   placeholder-zinc-500 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   transition duration-200"
      />

      <button
        onClick={handleKeySubmit}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white 
                   font-medium py-2 rounded-lg transition-all"
      >
        {loading ? "Verifying..." : "Enter the Codex"}
      </button>

      {/* ✅ Access States */}
      {status === "success" && (
        <p className="mt-4 text-green-400 text-center animate-fade-in">
          ✅ Access granted... preparing the veil
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-400 text-center animate-fade-in">
          ❌ Invalid or expired Codex Key.
        </p>
      )}

      {/* ✨ Veil Unlock Sequence */}
      {status === "success" && <VeilUnlock />}
    </PortalLayout>
  );
}
