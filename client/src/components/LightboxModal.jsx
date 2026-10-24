import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({ images, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrev, onNext]);

  if (activeIndex === null || !images || images.length === 0) return null;

  const current = images[activeIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in"
      onClick={onClose}
    >
      {/* Top Toolbar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-20">
        <div className="text-xs tracking-widest uppercase text-gold-400 font-mono">
          {activeIndex + 1} / {images.length}
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white hover:text-gold-400 transition-colors border border-navy-700"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white hover:text-gold-400 transition-colors border border-navy-700 z-20"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white hover:text-gold-400 transition-colors border border-navy-700 z-20"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image Container */}
      <div 
        className="max-w-5xl max-h-[82vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.url}
          alt={current.caption || current.title || 'Hotel Photograph'}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-navy-800"
        />
        
        {/* Caption */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <h4 className="font-serif text-lg text-white font-medium">
            {current.title || current.caption}
          </h4>
          {current.caption && current.title && (
            <p className="text-xs text-slate-400 mt-1">{current.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
}
