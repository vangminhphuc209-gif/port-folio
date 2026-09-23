"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SectionTitle({
  eyebrow,
  title,
  highlight,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set([badgeRef.current, textRef.current, lineRef.current], {
        autoAlpha: 1,
        y: 0,
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      badgeRef.current,
      { y: 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        textRef.current,
        { y: "105%", autoAlpha: 0.3 },
        { y: "0%", autoAlpha: 1, duration: 0.85, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="mb-12 sm:mb-16">
      <div
        ref={badgeRef}
        className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(56,189,248,0.9)] animate-pulse" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
          {eyebrow}
        </span>
      </div>

      <div className="overflow-hidden">
        <h2
          ref={textRef}
          className="display bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.82] tracking-[-0.07em] text-transparent"
        >
          {title}
          {highlight && (
            <span className="ml-3 text-accent-cyan/90">{highlight}</span>
          )}
        </h2>
      </div>

      <div
        ref={lineRef}
        className="mt-6 h-[1px] w-24 bg-gradient-to-r from-accent-cyan/60 via-accent-violet/40 to-transparent"
      />
    </div>
  );
}
