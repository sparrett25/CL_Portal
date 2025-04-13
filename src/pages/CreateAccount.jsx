import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import PortalLayout from "@/layouts/PortalLayout";

export default function CreateAccount() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🌀 Update form values on user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔐 Handle registration + Supabase profile sync
  const handleSubmit = async () => {
    const { firstName, lastName, email, password } = form;
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const inviteKey = localStorage.getItem("codex_invite_key") || null;

    // 📝 Update Supabase profile with Codex context
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        invite_key_used: inviteKey,
      })
      .eq("id", authData.user?.id);

    if (profileError) {
      setError("Failed to update user profile.");
      setLoading(false);
      return;
    }

    // ✅ Proceed to confirmation screen
    navigate("/create-account/confirmation");
  };

  return (
    <PortalLayout
      title="Create Your Codex Identity"
      subtitle="This name will echo in the halls of the Codex."
    >
      <div className="space-y-4 text-left">
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-indigo-500 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-indigo-500 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-indigo-500 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-indigo-500 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {error && (
          <p className="text-red-400 text-sm mt-2">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-all"
        >
          {loading ? "Creating..." : "Continue into the Codex"}
        </button>
      </div>
    </PortalLayout>
  );
}
