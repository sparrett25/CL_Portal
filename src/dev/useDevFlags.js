// src/dev/useDevFlags.js

// Static dev flags
const devFlags = {
  simulateProd: false,
  showWhisperPreview: true,
  toneEchoDebug: true,
};

// ✅ Single flag access
export const getDevFlag = (flagName) => devFlags[flagName];

// 🔁 Access all flags at once
export const getAllDevFlags = () => devFlags;

// (Optional) retain the hook if needed elsewhere in the UI
export function useDevFlags() {
  return devFlags;
}
