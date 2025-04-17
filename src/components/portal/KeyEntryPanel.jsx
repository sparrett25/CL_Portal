import { useState } from "react";

export default function KeyEntryPanel({ onKeySubmit }) {
  const [key, setKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onKeySubmit || typeof onKeySubmit !== "function") {
      console.error("❌ onKeySubmit prop is not defined or not a function.");
      return;
    }

    onKeySubmit(key);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter your access key..."
        className="w-full px-4 py-3 rounded-lg bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
      >
        Unlock Portal
      </button>
    </form>
  );
}
