// phaseShiftEngine.js
// 🌀 Phase Shift Detection Engine — Codex Lumina

import { getUserJournalToneHistory } from "@/services/journalService";
import { getUserRitualActivity } from "@/services/ritualService";
import { differenceInDays } from "date-fns";

export async function calculatePhaseShiftReadiness(userId, profile) {
  const toneScore = await analyzeToneTrends(userId);
  const ritualScore = await evaluateRitualEngagement(userId);
  const timeScore = evaluateTimeSinceLastShift(profile?.lastPhaseShiftDate);

  // Weighted calculation
  const totalScore = (toneScore * 0.5) + (ritualScore * 0.3) + (timeScore * 0.2);
  return Math.round(totalScore);
}

export async function shouldPromptPhaseShift(userId, profile) {
  const readinessScore = await calculatePhaseShiftReadiness(userId, profile);
  return readinessScore >= 75;
}

// -----------------------------
// 🧠 Sub-Scoring Functions
// -----------------------------

export async function analyzeToneTrends(userId) {
  const tones = await getUserJournalToneHistory(userId); // Ex: ["struggle", "struggle", "hopeful", "curious", "breakthrough"]

  const weightMap = {
    struggle: -2,
    uncertain: -1,
    calm: 1,
    curious: 2,
    hopeful: 3,
    focused: 4,
    breakthrough: 5,
  };

  if (!tones || tones.length === 0) return 0;

  const scores = tones.map(t => weightMap[t] || 0);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.max(0, Math.min((avg + 2) * 10, 100)); // Normalize to 0–100
}

export async function evaluateRitualEngagement(userId) {
  const rituals = await getUserRitualActivity(userId); // Example: [{ type: "breath", date: "2024-04-02" }, ...]

  const countLast7Days = rituals.filter(r =>
    differenceInDays(new Date(), new Date(r.date)) <= 7
  ).length;

  if (countLast7Days >= 5) return 100;
  if (countLast7Days >= 3) return 75;
  if (countLast7Days >= 1) return 50;
  return 20;
}

export function evaluateTimeSinceLastShift(dateStr) {
  if (!dateStr) return 40; // Encourage first-time transition

  const daysSince = differenceInDays(new Date(), new Date(dateStr));
  if (daysSince > 30) return 100;
  if (daysSince > 14) return 75;
  if (daysSince > 7) return 50;
  return 20;
}
