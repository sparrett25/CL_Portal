import React from "react";
import { motion } from "framer-motion";

export default function RitualPortal({ title, description, image, onEnter }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl border border-white/10 bg-gradient-to-br from-black via-zinc-900 to-black"
    >
      <div className="relative h-64 w-full">
        <img
          src={image}
          alt="Ritual Portal"
          className="object-cover w-full h-full opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-2xl font-bold text-lime-300 drop-shadow">{title}</h2>
            <p className="text-zinc-300 mt-2 text-sm">{description}</p>
            <button
              onClick={onEnter}
              className="mt-4 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition"
            >
              Enter Ritual
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
