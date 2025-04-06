import { useEffect, useState, useRef } from "react";
import { useUserSync } from "@/context/UserSyncContext";
import { getJournalEntries, insertJournalEntry, updateJournalEntry, deleteJournalEntry } from "@/services/journalService";
import { motion } from "framer-motion";
import LioraAvatar from "@/components/LioraAvatar";
import { Volume2 } from "lucide-react";

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
  const [expandedEntryId, setExpandedEntryId] = useState(null);

  const chartRef = useRef(null);

  useEffect(() => {
    if (!user?.id) return;
    getJournalEntries(user.id).then((data) => {
      setEntries(data);
    });
  }, [user]);

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

  const handleExpand = (id) => {
    setExpandedEntryId(expandedEntryId === id ? null : id);
  };

  const generateToneEcho = (text) => {
    const words = text.toLowerCase();
    const tags = [];
    let message = "Your reflection carries presence. A step toward deeper awareness.";

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

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 bg-gradient-to-br from-black via-zinc-900 to-black text-white font-inter relative">
      
      {/* Avatar and side effects container */}
      <div className="relative z-30 flex flex-col items-center mx-auto my-4">
        <div className="w-full max-w-screen-sm bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 rounded-xl flex justify-center items-center mx-auto my-8 relative overflow-hidden">
          
          {/* Left Side Effect */}
          <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-tl from-indigo-400 via-purple-500 to-indigo-700 opacity-50 animate-glow"></div>

          {/* Right Side Effect */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-tr from-indigo-400 via-purple-500 to-indigo-700 opacity-50 animate-glow"></div>

          {/* Liora Avatar */}
          <LioraAvatar toneTags={toneTags} toneEcho={toneEcho} />
          
          {/* Glyphs */}
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20">
            {/* Animated glyphs */}
            <div className="glyph-container">
              <div className="glyph-deco-left animate-sigil"></div>
              <div className="glyph-deco-right animate-sigil"></div>
            </div>
          </div>

        </div>
      </div>

      <h1 className="relative text-3xl font-bold text-center mb-8 text-indigo-200 z-10 drop-shadow-0g">
        ✧ Daily Reflections Journal ✧
      </h1>

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

      {showComposer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950 border border-indigo-700 rounded-xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-indigo-300 mb-4">
            {editingEntryId ? "Edit Reflection" : "Write a New Reflection"}
          </h2>
          <textarea
            className="w-full bg-zinc-900 text-white placeholder-zinc-400 border border-zinc-700 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 caret-white"
            rows={5}
            placeholder="Let your thoughts flow..."
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            maxLength={300}
          />
          <button
            onClick={handleSaveEntry}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Save Entry
          </button>
        </motion.div>
      )}

      <div className="space-y-4 mb-10">
        {recentEntries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 p-4 rounded-xl shadow relative flex flex-col gap-2"
          >
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>{new Date(entry.created_at).toLocaleDateString()}</span>
            </div>
            <div className="text-sm text-zinc-300 whitespace-pre-line">
              {entry.content.length > 100
                ? `${entry.content.substring(0, 100)}...`
                : entry.content}
            </div>
            {entry.content.length > 100 && (
              <button
                className="text-xs text-indigo-400 hover:underline mt-2"
                onClick={() => handleExpand(entry.id)}
              >
                {expandedEntryId === entry.id ? "Show less" : "Read more"}
              </button>
            )}
            {expandedEntryId === entry.id && (
              <div className="mt-2 text-sm text-zinc-300">{entry.content}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
