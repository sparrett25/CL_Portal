import { useEffect, useState } from 'react';

const DEFAULT_FLAGS = {
  simulateProd: false,
  showWhisperPreview: true,
  toneEchoDebug: true,
};

const STORAGE_KEY = 'codex_dev_flags';

export function getStoredFlags() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : DEFAULT_FLAGS;
}

export function saveFlagsToStorage(flags) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
}

export function toggleDevFlag(flagKey) {
  const current = getStoredFlags();
  const updated = {
    ...current,
    [flagKey]: !current[flagKey],
  };
  saveFlagsToStorage(updated);
  window.dispatchEvent(new Event('devFlagsUpdated'));
}

export function useDevFlags() {
  const [flags, setFlags] = useState(getStoredFlags());

  useEffect(() => {
    const update = () => setFlags(getStoredFlags());
    window.addEventListener('devFlagsUpdated', update);
    return () => window.removeEventListener('devFlagsUpdated', update);
  }, []);

  return flags;
}
