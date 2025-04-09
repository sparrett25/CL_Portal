import React from "react";

export default function JournalCalendarMap({ entries = [], month = new Date().getMonth(), year = new Date().getFullYear(), onSelectDate }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getDayEntries = (day) => {
    return entries.filter((entry) => {
      const date = new Date(entry.created_at);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      );
    });
  };

  const handleClick = (day) => {
    const selectedDate = new Date(year, month, day);
    if (onSelectDate) {
      onSelectDate(selectedDate);
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mb-8 border border-indigo-700/40 text-white">
      <h3 className="text-lg font-semibold text-indigo-300 mb-4">📆 Reflection Calendar</h3>

      <div className="grid grid-cols-7 gap-3 text-sm">
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const entriesForDay = getDayEntries(day);
          const hasEntry = entriesForDay.length > 0;

          return (
            <div
  key={day}
  onClick={() => handleClick(day)}
  className={`w-full aspect-square flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${hasEntry
    ? "bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700"
    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}
  title={hasEntry ? `${entriesForDay.length} entry${entriesForDay.length === 1 ? "" : "s"}` : "No entry"}
>
  {day}
</div>

          );
        })}
      </div>
    </div>
  );
}
