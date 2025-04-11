import { useState } from "react";

export default function CodexKeyEntry({ onSubmit }) {
  const [key, setKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(key);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-zinc-800 rounded-lg shadow-md">
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter your Codex Key"
        required
        className="w-full px-4 py-2 rounded bg-zinc-900 text-white placeholder-zinc-500"
      />
      <button
        type="submit"
        className="w-full py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition"
      >
        Enter
      </button>
    </form>
  );
}
