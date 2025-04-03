import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/home"); // Or your desired route after login
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto mt-20">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-700 rounded bg-black text-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border border-gray-700 rounded bg-black text-white"
      />
      <button
        type="submit"
        className="w-full bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-4 rounded transition"
      >
        Login
      </button>
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </form>
  );
}
