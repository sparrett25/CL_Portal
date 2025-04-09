// src/components/TagEditorModal.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TagEditorModal({ isOpen, onClose, initialTags = [], onSave }) {
  const [tags, setTags] = useState(initialTags);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    const cleaned = newTag.trim().toLowerCase();
    if (cleaned && !tags.includes(cleaned)) {
      setTags([...tags, cleaned]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    onSave(tags);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-zinc-950 border border-indigo-700/70 p-6 rounded-2xl max-w-md w-full shadow-xl text-white backdrop-blur-md"
          >
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">
              🏷️ Edit Tags
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-zinc-300 hover:text-red-400 ml-1 text-xs"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
                className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddTag}
                className="bg-indigo-600 px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
              >
                Add
              </button>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="text-sm text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
