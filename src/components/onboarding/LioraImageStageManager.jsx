// LioraImageStageManager.jsx
import React, { useEffect, useState } from 'react';
import liora1 from '../../assets/images/liora-transition1.png';
import liora2 from '../../assets/images/liora-transition2.png';
import liora3 from '../../assets/images/liora-transition3.png';
import classNames from 'classnames';

export default function LioraImageStageManager({ step, totalSteps }) {
  const [currentImage, setCurrentImage] = useState(liora1);
  const [fadeClass, setFadeClass] = useState('opacity-0');

  useEffect(() => {
    setFadeClass('opacity-0');

    const transitionDelay = setTimeout(() => {
      if (step >= totalSteps - 1) {
        setCurrentImage(liora3);
      } else if (step >= 1) {
        setCurrentImage(liora2);
      } else {
        setCurrentImage(liora1);
      }
      setFadeClass('opacity-100');
    }, 300);

    return () => clearTimeout(transitionDelay);
  }, [step, totalSteps]);

  return (
    <div className="flex justify-center mt-4">
      <div
        className={classNames(
          'transition-all duration-1000 ease-in-out transform scale-100',
          fadeClass
        )}
      >
        {/* 🌀 Display ~70% with soft fade */}
        <div className="h-64 w-64 overflow-hidden rounded-full shadow-2xl border border-white/20 ring-2 ring-purple-500/30 animate-softpulse">
          <img
            src={currentImage}
            alt="Liora"
            className="w-full h-auto object-top object-cover"
          />
        </div>
      </div>
    </div>
  );
}
