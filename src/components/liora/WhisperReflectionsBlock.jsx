import React from 'react';
import WhisperReveal from './WhisperReveal';
import { lensDeliveryStyles } from '@/config/lens_delivery_styles';
import { lensVisuals } from '@/config/belief_lens_visuals';

const WhisperReflectionBlock = ({
  text = '',
  lens = 'default',
  speed = 'default',
  showMeta = false,
  sound = 'veil-breath',
}) => {
  const delivery = lensDeliveryStyles[lens] || lensDeliveryStyles.default;
  const visual = lensVisuals[lens] || {};

  return (
    <div className="relative bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow-lg space-y-4 border dark:border-zinc-700 transition-all">
      {/* Optional Lens Icon */}
      {visual?.icon && (
        <div className="absolute top-4 right-4 text-4xl opacity-10 pointer-events-none">
          {visual.icon}
        </div>
      )}

      {/* Whispered Affirmation */}
      <WhisperReveal
        text={text}
        autoPlay
        speed={speed}
        sound={sound}
      />

      {/* Optional Delivery Metadata */}
      {showMeta && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 space-y-1">
          <p><strong>Tone:</strong> {delivery.tone}</p>
          <p><strong>Cadence:</strong> {delivery.cadence}</p>
          <p><strong>Voice:</strong> {delivery.voice}</p>
          <p><strong>Delivery:</strong> {delivery.delivery}</p>
        </div>
      )}
    </div>
  );
};

export default WhisperReflectionBlock;
