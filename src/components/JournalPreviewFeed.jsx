// components/JournalPreviewFeed.jsx

import { useLatestJournalEntry } from "@/hooks/useLatestJournalEntry";
import { motion } from "framer-motion";

export default function JournalPreviewFeed({ profile }) {
  const { entry, loading } = useLatestJournalEntry(profile?.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-neutral-900 p-4 rounded-xl text-white shadow-md"
    >
      <h2 className="text-xl font-bold mb-2">📓 Your Reflections</h2>
      <p className="text-sm text-gray-300 mb-4">
        Here's a preview of your most recent journal entries.
      </p>

      <div className="border border-neutral-700 rounded-lg p-3 bg-neutral-800">
        {loading && (
          <p className="text-sm italic text-gray-500">Loading latest entry...</p>
        )}

        {!loading && entry?.content ? (
          <>
            <p className="text-sm italic text-gray-300">“{entry.content}”</p>
            <p className="text-xs text-right text-gray-500 mt-2">
              — You, {entry.created_at?.slice(0, 10)}
            </p>
          </>
        ) : (
          <p className="text-sm italic text-gray-500">No journal entries found yet.</p>
        )}
      </div>

      <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
        Open Full Journal
      </button>
    </motion.div>
  );
}
