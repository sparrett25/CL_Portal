// src/pages/CreateAccount.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
    } else {
      // 🧠 Insert profile into the `profiles` table
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          has_onboarded: false,
        },
      ]);

      // 🔔 Optional tone
      try {
        new Audio("/assets/audio/veil-entry.mp3").play();
      } catch (err) {}

      // 🌀 Navigate to confirmation screen
      navigate("/create-account/confirmation");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white flex items-center justify-center">
      <div className="relative w-full max-w-md bg-black/60 border border-indigo-500 p-8 rounded-2xl shadow-lg">

        {/* ✨ Floating Sigil */}
        <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2">
          <img
            src="/assets/glyphs/codex-sigil.svg"
            alt="Codex Sigil"
            className="w-16 h-16 opacity-80 animate-pulse drop-shadow-lg"
          />
        </div>

        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold text-indigo-200 mb-2">Create Your Codex Identity</h2>
          <p className="text-sm text-gray-400 mb-6">This name will echo in the halls of the Codex.</p>
        </div>

        {/* 🕯️ Form Fields */}
        <div className="space-y-4">
          <input
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <input
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <input
            name="email"
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/90 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all"
        >
          Continue into the Codex
        </button>
      </div>
    </div>
  );
}
