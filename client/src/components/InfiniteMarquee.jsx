import React, { useRef, useEffect, useState } from 'react';
import { useHotel } from '../context/HotelContext';

// Verified Luxury Resort & Architectural Suites Imagery
const DEFAULT_IMAGES = [
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120544_94be5de4-0f4f-494c-bb78-c532290040a6.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120601_5c6e4705-b992-4227-9dff-9b000351c283.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120619_7bc65416-a3d7-4e8c-9929-743f233378fe.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120627_b40a97b0-c5fa-408c-a77e-dc8fa44f8584.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120635_515cde41-2dc6-48ce-a236-088a5bc74ca8.png&w=1920&q=85",
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120645_5a1170c6-145b-477b-abd2-f8620acccd8d.png&w=1920&q=85",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1920&q=85",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=85"
];

export default function ImageMarquee() {
  const { openInquiryModal } = useHotel();
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  // Duplicated once for seamless wrap loop ([...images, ...images])
  const duplicatedImages = [...DEFAULT_IMAGES, ...DEFAULT_IMAGES];

  // Motion physics refs
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const totalDragDistanceRef = useRef(0);
  const halfWidthRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);

  // Measure half-width of the track
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        halfWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const timer = setTimeout(updateDimensions, 400);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Animation Engine (requestAnimationFrame, NOT CSS marquee)
  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (trackRef.current) {
        trackRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
      return;
    }

    let animId;
    const SPEED = 0.8; // Constant SPEED = 0.8 px per frame (auto-scroll left)

    const tick = () => {
      const halfWidth = halfWidthRef.current;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.1) {
          offsetRef.current += velocityRef.current;
          velocityRef.current *= 0.95;
        } else {
          velocityRef.current = 0;
          offsetRef.current -= SPEED;
        }

        if (halfWidth > 0) {
          if (offsetRef.current <= -halfWidth) {
            offsetRef.current += halfWidth;
          } else if (offsetRef.current > 0) {
            offsetRef.current -= halfWidth;
          }
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Drag / Pointer Interaction with setPointerCapture
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}

    isDraggingRef.current = true;
    velocityRef.current = 0;
    startXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    totalDragDistanceRef.current = 0;
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const dx = e.clientX - lastXRef.current;

    totalDragDistanceRef.current += Math.abs(dx);

    velocityRef.current = (dx / dt) * 16;
    offsetRef.current = startOffsetRef.current + (e.clientX - startXRef.current);

    const halfWidth = halfWidthRef.current;
    if (halfWidth > 0) {
      if (offsetRef.current <= -halfWidth) {
        offsetRef.current += halfWidth;
        startOffsetRef.current += halfWidth;
      } else if (offsetRef.current > 0) {
        offsetRef.current -= halfWidth;
        startOffsetRef.current -= halfWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }

    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    velocityRef.current = Math.max(Math.min(velocityRef.current, 24), -24);
  };

  return (
    <section className="relative py-4 overflow-hidden bg-ivory-50 select-none">
      
      {/* TOP CURVED IVORY SVG MASK (pointer-events-none, z-10) */}
      <div className="absolute top-0 left-0 right-0 h-[80px] sm:h-[100px] pointer-events-none z-10 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0 0H1440V50C1440 50 1200 100 720 100C240 100 0 50 0 50V0Z"
            fill="#FDFBF7"
          />
        </svg>
      </div>

      {/* MARQUEE TRACK CONTAINER */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`w-full overflow-hidden touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-3 sm:gap-4 py-4 select-none will-change-transform"
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              onClick={() => {
                if (totalDragDistanceRef.current < 6) {
                  openInquiryModal();
                }
              }}
              className="w-60 h-80 sm:w-80 sm:h-[32rem] flex-shrink-0 rounded-2xl overflow-hidden bg-ivory-100 border border-ivory-200 shadow-luxury transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={src}
                alt={`Sanctuary Visual ${index + 1}`}
                loading="lazy"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80";
                }}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CURVED IVORY SVG MASK (mirror, pointer-events-none, z-10) */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] sm:h-[100px] pointer-events-none z-10 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z"
            fill="#FDFBF7"
          />
        </svg>
      </div>

    </section>
  );
}
