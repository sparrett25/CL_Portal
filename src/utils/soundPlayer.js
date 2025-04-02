let currentAudio = null;

export const playSound = (url, { loop = false, volume = 1 } = {}) => {
  stopSound(); // Stop any existing audio
  currentAudio = new Audio(url);
  currentAudio.loop = loop;
  currentAudio.volume = volume;

  currentAudio.play().catch((err) => {
    console.warn('Unable to play sound:', err);
  });
};

export const stopSound = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

export const fadeOutSound = (duration = 1000) => {
  if (!currentAudio) return;

  const fadeInterval = 50;
  const step = currentAudio.volume / (duration / fadeInterval);

  const fade = setInterval(() => {
    if (currentAudio.volume > step) {
      currentAudio.volume -= step;
    } else {
      stopSound();
      clearInterval(fade);
    }
  }, fadeInterval);
};
