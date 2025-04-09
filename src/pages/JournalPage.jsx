import { useEffect, useState, useRef } from "react";
import { useUserSync } from "@/context/UserSyncContext";
import {
  getJournalEntries,
  insertJournalEntry,
  updateJournalEntry,
} from "@/services/journalService";
import { motion } from "framer-motion";
import LioraAvatar from "@/components/LioraAvatar";
import JournalList from "@/components/JournalList"; // ✅ Import Journal List
import JournalCalendarMap from "@/components/JournalCalendarMap"; // ✅ Import Calendar

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
  const [startDate, setStartDate] = useState(""); // Date range filter state
  const [endDate, setEndDate] = useState(""); // Date range filter state
  const [showCalendar, setShowCalendar] = useState(false); // Calendar view toggle

  const chartRef = useRef(null);

  useEffect(() => {
    if (!user?.id) return;
    getJournalEntries(user.id).then((data) => setEntries(data));
  }, [user]);

  useEffect(() => {
    const stored = sessionStorage.getItem("dailyReflection");
    if (stored) {
      const { date, archetype, energy, phase, affirmation, ritual, whisper } =
        JSON.parse(stored);

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
      setShowComposer(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
    setShowWhisper(true);

    const refreshed = await getJournalEntries(user.id);
    setEntries(refreshed);

    setShowComposer(true);
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
      (entry) => new Date(entry.created_at).toDateString() === selectedDate.toDateString()
    );
    setEntries(filteredEntries);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 bg-gradient-to-br from-black via-zinc-900 to-black text-white font-inter relative">
      {/* Liora and Glow */}
      <div className="relative z-30 flex flex-col items-center mx-auto mb-8">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800 rounded-xl p-6 w-full max-w-xl shadow-xl relative overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full opacity-40 bg-gradient-to-tr from-purple-500 via-indigo-400 to-purple-700 animate-pulse rounded-xl"></div>
          <div className="relative z-10 flex flex-col items-center">
            <img
              src="/avatars/liora-default.jpg"
              alt="Liora Avatar"
              className="w-24 h-24 rounded-full border-4 border-indigo-400 shadow-md mb-3"
            />
            <p className="text-indigo-200 italic text-sm">
              Liora is here to guide you...
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-200 z-10 drop-shadow-xl">
        ✧ Daily Reflections Journal ✧
      </h1>

      {/* Liora Whisper */}
      {showWhisper && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm text-purple-300 italic text-center mb-6"
        >
          ✦ “You are not lost, only unfolding.”
          <div className="text-xs text-indigo-400 mt-1">
            “Like moonlight on still water, your clarity is returning.”
          </div>
        </motion.div>
      )}

      {/* Composer */}
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
            onChange={(e) => setNewEntry(e.target.value)}
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

      {/* Modular Journal List and Calendar View */}
      <div className="mb-8">
        <JournalList entries={recentEntries} onDelete={handleDeleteEntry} />
      </div>

      {/* Calendar Toggle */}
      {showCalendar && (
        <JournalCalendarMap
          entries={entries}
          onSelectDate={handleSelectDate}
        />
      )}
    </div>
  );
}
