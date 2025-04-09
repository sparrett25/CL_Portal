import { useState, useMemo } from "react";
import JournalEntryCard from "./JournalEntryCard";
import JournalCalendarMap from "./JournalCalendarMap"; // ✅ Import Calendar

export default function JournalList({ entries = [], onDelete }) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTag, setSelectedTag] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); // ✅ Calendar toggle
  const [startDate, setStartDate] = useState(""); // ✅ Start date filter
  const [endDate, setEndDate] = useState(""); // ✅ End date filter

  // 🔎 Extract available tags from entries
  const allTags = Array.from(
    new Set(entries.flatMap((e) => e.tags || []))
  ).sort();

  // 🔮 Apply filter + sort
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((e) =>
        e.content.toLowerCase().includes(q)
      );
    }

    // Tag filter
    if (selectedTag) {
      result = result.filter((e) =>
        (e.tags || []).includes(selectedTag)
      );
    }

    // Date range filter
    if (startDate) {
      result = result.filter((e) => new Date(e.created_at) >= new Date(startDate));
    }
    if (endDate) {
      result = result.filter((e) => new Date(e.created_at) <= new Date(endDate));
    }

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    return result;
  }, [entries, searchQuery, selectedTag, sortBy, startDate, endDate]);

  const visibleEntries = showAll ? filteredEntries : filteredEntries.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 🔍 Search + Filter UI */}
      <div className="bg-zinc-900 border border-zinc-700 p-4 rounded-xl mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search reflections..."
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 text-white rounded-md placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-sm">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full border ${
                  selectedTag === tag
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-800 text-zinc-300 border-zinc-600"
                } hover:bg-indigo-500 transition`}
                onClick={() => setSelectedTag((prev) => (prev === tag ? null : tag))}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-end items-center gap-2">
          <label className="text-sm text-zinc-400">Sort by:</label>
          <select
            className="bg-zinc-800 text-white border border-zinc-600 px-2 py-1 rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex gap-4 mt-4">
          <div>
            <label className="block text-sm text-zinc-400">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-zinc-800 text-white border border-zinc-600 px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-zinc-800 text-white border border-zinc-600 px-3 py-2 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Calendar View Toggle */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowCalendar((prev) => !prev)}
          className="text-sm text-indigo-400 hover:underline"
        >
          {showCalendar ? "Hide Calendar View" : "Show Calendar View"}
        </button>
      </div>

      {/* ✨ Filtered Entry Cards */}
      {showCalendar ? (
        <JournalCalendarMap entries={filteredEntries} />
      ) : (
        visibleEntries.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} onDelete={onDelete} />
        ))
      )}

      {filteredEntries.length > 5 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm text-indigo-400 hover:underline"
          >
            {showAll ? "Show Less" : "View All Reflections"}
          </button>
        </div>
      )}
    </div>
  );
}
