"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { iframe } from "framer-motion/client";

export default function FoodActionButtons({ videoUrl }: { videoUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert standard YouTube URL to Embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-900/20 group"
      >
        <span className="bg-black/10 p-2 rounded-full group-hover:bg-black/20 transition-colors">
          <Play size={20} fill="currentColor" />
        </span>
        Watch Video Tutorial
      </button>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-red-500/80 text-white transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>
              
              <iframe
                src={getEmbedUrl(videoUrl)}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}