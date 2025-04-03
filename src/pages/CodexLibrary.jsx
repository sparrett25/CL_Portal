import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Make sure supabase client is properly initialized

export default function CodexLibrary() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch entries from the 'library_entries' table
  useEffect(() => {
    async function loadEntries() {
      const { data, error } = await supabase
        .from("library_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load Codex Library:", error.message);
      } else {
        setEntries(data);
      }

      setLoading(false);
    }

    loadEntries();
  }, []); // Empty dependency array ensures this only runs on initial render

  return (
    <div className="p-6 max-w-4xl mx-auto text-white space-y-6">
      <h1 className="text-3xl font-bold mb-6 animate-fade-in-up">Codex Library</h1>

      {/* Loading State */}
      {loading ? (
        <p className="text-zinc-300 animate-pulse">Loading entries...</p>
      ) : entries.length === 0 ? (
        <p className="text-zinc-400">No content available yet. Please check back soon.</p>
      ) : (
        // Display each entry from the database
        entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-zinc-900 p-5 rounded-xl shadow border border-zinc-700 animate-fade-in-up"
          >
            <h2 className="text-xl font-semibold mb-2">{entry.title}</h2>
            <p className="text-sm text-zinc-300 whitespace-pre-wrap">{entry.body}</p>
          </div>
        ))
      )}
    </div>
  );
}
