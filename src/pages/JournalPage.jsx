import { useEffect, useState } from "react";
import PageFrame from "@/components/layout/PageFrame";
import JournalList from "@/components/journal/JournalList";
import JournalCalendarMap from "@/components/journal/JournalCalendarMap";
import LioraWhisperCard from "@/components/journal/LioraWhisperCard";
import { supabase } from "@/lib/supabase";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [sortBy, setSortBy] = useState("Newest");
  const [reflection, setReflection] = useState("");
  const [whisper, setWhisper] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) return;

    const { data, error } = await supabase
      .from("journal_entries")
      .select("id, content, created_at, tone")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setEntries(data);
    }
  };

  const handleSave = async () => {
    if (!reflection.trim()) return;
    setSubmitting(true);

    const tone = "Neutral"; // Placeholder tone logic for now

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;
    if (!user) {
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("journal_entries").insert({
      user_id: user.id,
      content: reflection.trim(),
      tone,
    });

    if (!error) {
      setReflection("");
      setWhisper("You’ve just etched a thought into the Codex.");
      fetchEntries();
    }

    setSubmitting(false);
  };

  const sortedEntries = [...entries].sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.created_at) - new Date(b.created_at);
    if (sortBy === "Tone: Light → Dark") return (a.tone || '').localeCompare(b.tone || '');
    if (sortBy === "Tone: Dark → Light") return (b.tone || '').localeCompare(a.tone || '');
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <PageFrame title="Journal" subtitle="Write your reflection below and whisper it into the Codex...">
      <div className="mb-6">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Let your thoughts flow..."
          rows={6}
          className="w-full rounded-lg p-4 text-white bg-black border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-zinc-400 caret-white"
        />
        <button
          onClick={handleSave}
          disabled={submitting}
          className="mt-3 px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white"
        >
          Save Entry
        </button>
        {whisper && (
          <div className="mt-4 text-indigo-300 italic text-sm animate-fadeInSlow">“{whisper}”</div>
        )}
      </div>

      <div className="mb-6">
        <LioraWhisperCard />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-indigo-300">Your Past Reflections</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label htmlFor="sortBy" className="text-sm text-indigo-300">Sort by:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-black border border-indigo-700 rounded px-3 py-1 text-white text-sm"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Tone: Light → Dark</option>
            <option>Tone: Dark → Light</option>
          </select>
        </div>
      </div>

      <JournalList entries={sortedEntries} />

      <div className="mt-10">
        <JournalCalendarMap entries={entries} />
      </div>
    </PageFrame>
  );
}
