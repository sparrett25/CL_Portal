import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import whispersMeta from "@/content/sanctum/whispers/meta.json";
import { useUserSync } from "@/context/UserSyncContext";
import { readWhisperById } from "@/lib/readWhisper";
import { logWhisperUnlock } from "@/lib/logWhisperUnlock";

export default function WhisperVault() {
  const { user, codexReflection } = useUserSync();
  const [visibleWhispers, setVisibleWhispers] = useState([]);
  const unlockedIds = new Set();

  const matchTriggers = (w) => {
    if (w.trigger === "flame_lit" && codexReflection?.flameLit) return true;
    if (w.trigger === "tone_detected" && w.tone === codexReflection?.tone) return true;
    if (w.trigger === "journal_entry_detected" && codexReflection?.fromJournal) return true;
    if (w.trigger === "ritual_complete" && codexReflection?.ritualDone) return true;
    return false;
  };

  useEffect(() => {
    const loadWhispers = async () => {
      const eligible = whispersMeta.whispers.filter(
        (w) =>
          w.visibility === "private" &&
          (matchTriggers(w) ||
            w.archetype === user?.archetype ||
            w.phase === user?.phase ||
            w.energy === user?.energy)
      );

      const enriched = await Promise.all(
        eligible.map(async (w) => {
          const whisper = await readWhisperById(w.id);

          // Log if newly unlocked
          if (!unlockedIds.has(w.id) && user?.id) {
            unlockedIds.add(w.id);
            await logWhisperUnlock(user.id, w.id);
          }

          return whisper;
        })
      );

      setVisibleWhispers(enriched);
    };

    loadWhispers();
  }, [codexReflection, user]);

  return (
    <div className="w-64 bg-white/5 p-4 rounded-xl border border-indigo-500 shadow-lg backdrop-blur overflow-auto max-h-[500px] space-y-3">
      <h3 className="text-md font-semibold text-indigo-300">Whisper Vault</h3>

      {visibleWhispers.length === 0 ? (
        <p className="text-sm text-white/40 italic">No whispers yet. Light the flame or reflect deeply.</p>
      ) : (
        visibleWhispers.map((w) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border border-white/10 p-3 rounded-md bg-white/5"
          >
            <div className="text-sm text-indigo-400 font-semibold flex items-center gap-1">
              <span>{w.glyph}</span> {w.title}
            </div>
            <p className="text-xs text-white/70 mt-1 italic">
              {w.content.length > 100 ? w.content.slice(0, 100) + "…" : w.content}
            </p>
          </motion.div>
        ))
      )}
    </div>
  );
}
