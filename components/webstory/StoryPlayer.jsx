"use client";

/**
 * StoryPlayer — full-screen, tappable, auto-advancing web-story viewer.
 *
 * Renders a single story's slides like Instagram/Google Web Stories:
 *  - Tap right half → next slide, tap left half → previous slide
 *  - Auto-advances every SLIDE_MS; progress bars fill at the top
 *  - Hold (pointer down) pauses progress; release resumes
 *  - Keyboard: ←/→ to navigate, space to pause
 *  - "exitHref" sends the viewer back to the listing
 *
 * Plain <img> is used (not next/image) so this works without configuring
 * remote image domains in next config.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const SLIDE_MS = 6000;

export default function StoryPlayer({ story, exitHref = "/web-stories", accent = "#0d9488" }) {
  const slides = Array.isArray(story?.slides) ? story.slides : [];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 of the active slide
  const rafRef   = useRef(null);
  const startRef = useRef(null);

  const total = slides.length;

  const go = useCallback((idx) => {
    if (idx < 0) return;
    if (idx >= total) return;
    setCurrent(idx);
    setProgress(0);
    startRef.current = null;
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => {
      if (c + 1 >= total) return c; // stay on last slide
      return c + 1;
    });
    setProgress(0);
    startRef.current = null;
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => Math.max(0, c - 1));
    setProgress(0);
    startRef.current = null;
  }, []);

  // Auto-advance timer driven by requestAnimationFrame for smooth bars.
  useEffect(() => {
    if (total === 0) return;
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      return;
    }

    const tick = (ts) => {
      if (startRef.current == null) startRef.current = ts - progress * SLIDE_MS;
      const elapsed = ts - startRef.current;
      const p = Math.min(1, elapsed / SLIDE_MS);
      setProgress(p);

      if (p >= 1) {
        if (current + 1 >= total) {
          setPaused(true); // reached the end — stop
          return;
        }
        setCurrent((c) => c + 1);
        setProgress(0);
        startRef.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, paused, total]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (total === 0) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-lg font-semibold">This story has no slides.</p>
          <Link href={exitHref} className="mt-4 inline-block underline text-white/80">← Back to stories</Link>
        </div>
      </div>
    );
  }

  const slide = slides[current];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black select-none"
      onPointerDown={() => setPaused(true)}
      onPointerUp={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Story canvas — portrait 9:16, centered */}
      <div className="relative h-full w-full max-w-[480px] overflow-hidden bg-neutral-900">
        {/* Background image */}
        {slide.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={slide.image} alt={slide.heading || ""} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}, #0f172a)` }} />
        )}

        {/* Readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />

        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3">
          {slides.map((_, i) => (
            <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: i < current ? "100%" : i === current ? `${progress * 100}%` : "0%" }}
              />
            </div>
          ))}
        </div>

        {/* Top bar: brand + close */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-6 pb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-white/90 drop-shadow">{story.title}</span>
          <Link href={exitHref} aria-label="Close story"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur hover:bg-black/50">
            ✕
          </Link>
        </div>

        {/* Slide text content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 space-y-3 p-6 pb-10">
          {slide.heading && (
            <h2 className="text-2xl font-black leading-tight text-white drop-shadow-lg">{slide.heading}</h2>
          )}
          {slide.body && (
            <p className="text-sm leading-relaxed text-white/85 drop-shadow">{slide.body}</p>
          )}
          {slide.cta?.label && slide.cta?.url && (
            <a href={slide.cta.url} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              className="mt-2 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-neutral-900 shadow-lg transition hover:scale-105"
              style={{ color: accent }}>
              {slide.cta.label} →
            </a>
          )}
        </div>

        {/* Tap zones (below text/cta in z-order) */}
        <button aria-label="Previous slide"
          className="absolute left-0 top-0 z-10 h-full w-1/3"
          onClick={(e) => { e.stopPropagation(); prev(); }} />
        <button aria-label="Next slide"
          className="absolute right-0 top-0 z-10 h-full w-2/3"
          onClick={(e) => { e.stopPropagation(); next(); }} />

        {/* Desktop arrows */}
        <button aria-label="Previous slide" onClick={(e) => { e.stopPropagation(); prev(); }}
          disabled={current === 0}
          className="absolute left-2 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur hover:bg-black/50 disabled:opacity-0 md:flex">
          ‹
        </button>
        <button aria-label="Next slide" onClick={(e) => { e.stopPropagation(); next(); }}
          disabled={current === total - 1}
          className="absolute right-2 top-1/2 z-30 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur hover:bg-black/50 disabled:opacity-0 md:flex">
          ›
        </button>
      </div>
    </div>
  );
}
