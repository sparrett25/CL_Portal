import React, { createContext, useContext, useState } from 'react';

const ToneContext = createContext();

export const ToneProvider = ({ children }) => {
  const [tone, setTone] = useState(null); // e.g., 'hopeful', 'reflective', 'grateful'
  const [toneIntensity, setToneIntensity] = useState(0); // Optional: numeric value

  const updateTone = (newTone, intensity = 0) => {
    setTone(newTone);
    setToneIntensity(intensity);
  };

  return (
    <ToneContext.Provider value={{ tone, toneIntensity, setTone, setToneIntensity, updateTone }}>
      {children}
    </ToneContext.Provider>
  );
};

export const useToneContext = () => useContext(ToneContext);
