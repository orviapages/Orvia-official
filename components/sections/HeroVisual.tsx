"use client";

import { useEffect, useRef } from "react";

export function HeroVisual() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      video.pause();
      video.removeAttribute("loop");
    }
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div className="animate-fade-in overflow-hidden border border-mist bg-paper shadow-lift">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 border-b border-mist px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-mist" />
          <span className="h-2 w-2 rounded-full bg-mist" />
          <span className="h-2 w-2 rounded-full bg-mist" />
          <div className="ml-3 h-4 flex-1 rounded-sm bg-mist/60" />
        </div>

        {/* video real, recortado (no se ve el cuadro completo) y en blanco y negro */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full scale-[1.35] object-cover object-[68%_35%] grayscale contrast-[1.05]"
            autoPlay
            muted
            loop
            playsInline
            poster="/video/hero-desk-poster.jpg"
          >
            <source src="/video/hero-desk.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
          />
        </div>
      </div>

      {/* floating detail card */}
      <div className="absolute -bottom-6 -right-4 hidden w-40 border border-mist bg-paper p-4 shadow-lift sm:block">
        <div className="mb-2 h-1.5 w-10 bg-ink" />
        <div className="h-2 w-full bg-mist" />
        <div className="mt-1.5 h-2 w-3/4 bg-mist" />
      </div>
    </div>
  );
}
