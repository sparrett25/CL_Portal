// src/pages/PortalPreview.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import PortalLayout from "@/components/layout/PortalLayout";

export default function PortalPreview() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!key) return;

    // ✅ Fixed table name: invite_keys
    const { data, error } = await supabase
      .from("invite_keys")
      .select("*")
      .eq("key", key)
      .single();

    if (data && (data.uses_left === null || data.uses_left > 0)) {
      try {
        new Audio("/assets/audio/veil-entry.mp3").play();
      } catch (err) {
        console.warn("Audio could not play:", err);
      }

      setUnlocked(true);

      setTimeout(async () => {
        if (data.uses_left !== null) {
          await supabase
            .from("invite_keys")
            .update({ uses_left: data.uses_left - 1 })
            .eq("id", data.id);
        }

        navigate("/create-account");
      }, 1200);
    } else {
      alert("Invalid or inactive Codex Key.");
    }
  };

  return (
    <PortalLayout>
      {/* 🌀 Floating Codex Glyph */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/assets/glyphs/codex-sigil.svg"
          alt="Codex Glyph"
          className="w-48 h-48 opacity-10 animate-spin-slow"
        />
      </div>

      {/* 🌫️ Key Input Block with Veil Logic */}
      <div
        className={`transition-opacity duration-1000 ease-out ${
          unlocked ? "opacity-0 blur-sm" : "opacity-100"
        } w-full z-10`}
      >
        <div className="space-y-4 text-center">
          <label className="block text-lg font-semibold text-white">
            Enter Your Codex Key
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="EX: INITIATE-777"
            className="w-full px-4 py-3 rounded-xl bg-white/90 border border-indigo-400 text-indigo-800 placeholder:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </PortalLayout>
  );
}
