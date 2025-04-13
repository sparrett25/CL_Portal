import meta from "@/content/sanctum/whispers/meta.json";

const whisperFiles = import.meta.glob("/src/content/sanctum/whispers/*.md", {
  as: "raw",
  eager: true,
});

export async function readWhisperById(id) {
  const whisperMeta = meta.whispers.find((w) => w.id === id);
  if (!whisperMeta) return null;

  const filepath = `/src/content/sanctum/whispers/${whisperMeta.filename}`;
  const content = whisperFiles[filepath] || "Whisper content not found.";

  return {
    ...whisperMeta,
    content,
  };
}
