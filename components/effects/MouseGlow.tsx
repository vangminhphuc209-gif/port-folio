"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = glowRef.current;
    if (isTouch || reducedMotion || !el) {
      return;
    }

    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const glowX = gsap.quickTo(el, "x", { duration: 0.65, ease: "power2.out" });
    const glowY = gsap.quickTo(el, "y", { duration: 0.65, ease: "power2.out" });

    let isVisible = false;

    const onMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to(el, { autoAlpha: 1, duration: 0.5, overwrite: "auto" });
      }
      glowX(e.clientX);
      glowY(e.clientY);
    };

    const onLeave = () => {
      isVisible = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.5, overwrite: "auto" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[2] hidden h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.065)_0%,rgba(129,140,248,0.035)_40%,transparent_70%)] blur-2xl opacity-0 md:block"
      style={{ willChange: "transform" }}
    />
  );
}
