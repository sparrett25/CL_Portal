// ritualService.js
// 🔮 Mock ritual activity fetcher

export async function getUserRitualActivity(userId) {
  // Later: Pull from Supabase rituals log table
  // For now: return mock recent ritual dates
  return [
    { type: "breath", date: "2025-04-02" },
    { type: "ritual", date: "2025-04-03" },
    { type: "ritual", date: "2025-04-05" },
  ];
}
