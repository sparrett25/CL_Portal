import { useEffect, useState, useRef } from "react";
import { useUserSync } from "@/context/UserSyncContext";
import {
  getJournalEntries,
  insertJournalEntry,
  updateJournalEntry,
} from "@/services/journalService";
import { motion } from "framer-motion";
import PageFrame from "@/components/layout/PageFrame";
import JournalList from "@/components/JournalList";
import JournalCalendarMap from "@/components/JournalCalendarMap";
import LioraWhisperCard from "@/components/liora/LioraWhisperCard";

export default function JournalPage() {
  const { user } = useUserSync();
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [toneEcho, setToneEcho] = useState("");
  const [toneTags, setToneTags] = useState([]);
  const [showWhisper, setShowWhisper] = useState(false);
  const [filterDays, setFilterDays] = useState(7);
  const [showComposer, setShowComposer] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const chartRef = useRef(null);

  useEffect(() => {
    if (!user?.id) return;
    getJournalEntries(user.id).then((data) => setEntries(data));
  }, [user]);

  useEffect(() => {
    // Priority: dailyReflection > codexReflection > unsaved draft
    const daily = sessionStorage.getItem("dailyReflection");
    const codex = sessionStorage.getItem("codexReflection");
    const draft = localStorage.getItem("unsavedJournalEntry");

    if (daily) {
      const { date, archetype, energy, phase, affirmation, ritual, whisper } =
        JSON.parse(daily);

      const prefilled = `✨ **Daily Alignment: ${date}**
🔹 **Archetype:** ${archetype}
🔹 **Energy:** ${energy}
🔹 **Phase:** ${phase}

💬 *Affirmation:* "${affirmation}"
🌀 *Ritual Prompt:* ${ritual}
🌬️ *Liora Whisper:* "${whisper}"

📝 Reflection: `;

      setNewEntry(prefilled);
      sessionStorage.removeItem("dailyReflection");
    } else if (codex) {
      const { energy, tone, archetype, seeking } = JSON.parse(codex);

      const prefilled = `✨ **Your Sacred Reflection**
🔹 **Energy Present:** ${energy || ""}
🔹 **Tone:** ${tone || ""}
🔹 **Archetype Resonance:** ${archetype || ""}
🔹 **Seeking:** "${seeking || ""}"

📝 Reflection: `;

      setNewEntry(prefilled);
    } else if (draft) {
      setNewEntry(draft);
    }

    setShowComposer(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSaveEntry = async () => {
    if (!newEntry.trim()) return;
    const tone = generateToneEcho(newEntry);

    if (editingEntryId) {
      await updateJournalEntry(editingEntryId, newEntry);
    } else {
      await insertJournalEntry(user.id, newEntry, "user", tone.tags);
    }

    setToneEcho(tone.message);
    setToneTags(tone.tags);
    setNewEntry("");
    setEditingEntryId(null);
    setShowComposer(true);

    // 🔁 Clear saved draft
    localStorage.removeItem("unsavedJournalEntry");

    // 🔮 Show whisper only after the first journal of the day
    const refreshed = await getJournalEntries(user.id);
    setEntries(refreshed);

    const today = new Date().toDateString();
    const firstToday = refreshed.filter(
      (entry) =>
        new Date(entry.created_at).toDateString() === today
    );

    if (firstToday.length === 1) {
      setShowWhisper(true);
    }

    setTimeout(() => {
      chartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const generateToneEcho = (text) => {
    const words = text.toLowerCase();
    const tags = [];
    let message =
      "Your reflection carries presence. A step toward deeper awareness.";

    if (words.includes("joy") || words.includes("peace")) {
      message = "There is a calm radiance in your energy today.";
      tags.push("joy", "peace");
    }
    if (words.includes("fear") || words.includes("conflict")) {
      message = "Liora senses storm winds beneath the words. Breathe.";
      tags.push("fear", "conflict");
    }
    if (words.includes("clarity") || words.includes("vision")) {
      message = "Your message sharpens like light through crystal.";
      tags.push("clarity", "vision");
    }

    return { message, tags };
  };

  const recentEntries = entries.filter((entry) => {
    const created = new Date(entry.created_at);
    return (new Date() - created) / (1000 * 60 * 60 * 24) <= filterDays;
  });

  const handleDeleteEntry = async (id) => {
    const { deleteJournalEntry } = await import("@/services/journalService");
    await deleteJournalEntry(id);
    const refreshed = await getJournalEntries(user.id);
    setEntries(refreshed);
  };

  const handleSelectDate = (selectedDate) => {
    const filteredEntries = entries.filter(
      (entry) =>
        new Date(entry.created_at).toDateString() ===
        selectedDate.toDateString()
    );
    setEntries(filteredEntries);
  };

  return (
    <PageFrame
      title="✧ Daily Reflections Journal ✧"
      subtitle="Liora is here to guide you… whispering between each word you release."
    >
      {showWhisper && (
        <LioraWhisperCard toneEcho={toneEcho} toneTags={toneTags} />
      )}

      {showComposer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-indigo-700/60 rounded-2xl shadow-xl p-8 mb-10 backdrop-blur-md"
        >
          <h2 className="text-xl font-semibold text-indigo-300 mb-4">
            {editingEntryId ? "Edit Reflection" : "Write a New Reflection"}
          </h2>
          <textarea
            className="w-full bg-zinc-950 text-indigo-100 placeholder-zinc-400 border border-indigo-600 p-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 caret-white font-mono text-sm leading-relaxed tracking-wide"
            rows={10}
            placeholder="Let your thoughts flow..."
            value={newEntry}
            onChange={(e) => {
              const val = e.target.value;
              setNewEntry(val);
              localStorage.setItem("unsavedJournalEntry", val);
            }}
            maxLength={1000}
          />
          <button
            onClick={handleSaveEntry}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Save Entry
          </button>
        </motion.div>
      )}

      <div className="mb-8">
        <JournalList entries={recentEntries} onDelete={handleDeleteEntry} />
      </div>

      {showCalendar && (
        <JournalCalendarMap
          entries={entries}
          onSelectDate={handleSelectDate}
        />
      )}
    </PageFrame>
  );
}
