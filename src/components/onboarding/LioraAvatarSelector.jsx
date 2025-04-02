import React, { useState } from 'react';
import classNames from 'classnames';
import lioraAvatars from '../../data/lioraAvatars'; // Image data array

export default function LioraAvatarSelector({ selectedAvatar, setSelectedAvatar }) {
  return (
    <div className="text-white space-y-4">
      <h2 className="text-xl font-semibold text-purple-300">Choose how Liora appears to you:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {lioraAvatars.map((avatar, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedAvatar(avatar)}
            className={classNames(
              "cursor-pointer rounded-lg p-1 border-2 transition-all duration-300",
              selectedAvatar === avatar
                ? "border-lime-400 shadow-xl scale-105"
                : "border-transparent hover:border-white/30"
            )}
          >
            <img
              src={avatar.src}
              alt={avatar.label}
              className="w-full h-auto rounded-md object-cover"
            />
            <p className="text-center text-sm mt-2 text-white/80">{avatar.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
