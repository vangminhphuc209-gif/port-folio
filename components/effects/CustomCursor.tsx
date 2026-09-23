"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [cursorMode, setCursorMode] = useState<"default" | "link" | "view" | "explore" | "open">("default");

  useEffect(() => {
    // Only enable on desktop pointer with hover support and without reduced motion
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const aura = auraRef.current;

    if (!hasPointer || !hasHover || reducedMotion || !dot || !ring || !aura) {
      return;
    }

    document.documentElement.style.cursor = "none";

    // GSAP quickTo functions for 60fps transform-based tracking
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.36, ease: "power2.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.36, ease: "power2.out" });

    const auraX = gsap.quickTo(aura, "x", { duration: 0.65, ease: "power1.out" });
    const auraY = gsap.quickTo(aura, "y", { duration: 0.65, ease: "power1.out" });

    // Initial position offscreen & centered
    gsap.set([dot, ring, aura], {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
    });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring, aura], {
          autoAlpha: 1,
          duration: 0.3,
          overwrite: "auto",
        });
      }

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      auraX(e.clientX);
      auraY(e.clientY);
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to([dot, ring, aura], {
        autoAlpha: 0,
        duration: 0.35,
        overwrite: "auto",
      });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.82, duration: 0.15, overwrite: "auto" });
      gsap.to(dot, { scale: 0.6, duration: 0.15, overwrite: "auto" });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.25, ease: "back.out(2)", overwrite: "auto" });
      gsap.to(dot, { scale: 1, duration: 0.25, overwrite: "auto" });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest?.("[data-cursor]") as HTMLElement | null;

      if (cursorTarget) {
        const mode = cursorTarget.dataset.cursor as "view" | "explore" | "open" | "link";
        setCursorMode(mode || "link");
      } else if (target?.closest("a, button, [role='button'], input, textarea, select")) {
        setCursorMode("link");
      } else {
        setCursorMode("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      gsap.killTweensOf([dot, ring, aura]);
    };
  }, []);

  // Update ring size, borders, and text based on cursorMode using GSAP
  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    if (cursorMode === "view") {
      gsap.to(ring, {
        width: 86,
        height: 86,
        borderColor: "rgba(56, 189, 248, 0.75)",
        backgroundColor: "rgba(56, 189, 248, 0.14)",
        boxShadow: "0 0 25px rgba(56, 189, 248, 0.35)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    } else if (cursorMode === "explore") {
      gsap.to(ring, {
        width: 94,
        height: 94,
        borderColor: "rgba(52, 211, 153, 0.75)",
        backgroundColor: "rgba(52, 211, 153, 0.12)",
        boxShadow: "0 0 25px rgba(52, 211, 153, 0.35)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    } else if (cursorMode === "open") {
      gsap.to(ring, {
        width: 80,
        height: 80,
        borderColor: "rgba(129, 140, 248, 0.75)",
        backgroundColor: "rgba(129, 140, 248, 0.14)",
        boxShadow: "0 0 25px rgba(129, 140, 248, 0.35)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    } else if (cursorMode === "link") {
      gsap.to(ring, {
        width: 48,
        height: 48,
        borderColor: "rgba(255, 255, 255, 0.55)",
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.15)",
        duration: 0.25,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0.5, opacity: 0.6, duration: 0.2 });
    } else {
      gsap.to(ring, {
        width: 32,
        height: 32,
        borderColor: "rgba(255, 255, 255, 0.28)",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
    }
  }, [cursorMode]);

  return (
    <>
      {/* Ambient soft glow trailing behind */}
      <div
        ref={auraRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[98] hidden h-28 w-28 rounded-full bg-sky-400/[0.08] blur-xl opacity-0 md:block"
        style={{ willChange: "transform" }}
      />

      {/* Outer Follower Ring with Dynamic Action Badges */}
      <div
        ref={ringRef}
        data-custom-cursor="true"
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden place-items-center rounded-full border backdrop-blur-[2px] opacity-0 md:grid"
        style={{ width: 32, height: 32, willChange: "transform" }}
      >
        <span
          ref={textRef}
          className="select-none text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          {cursorMode === "view"
            ? "VIEW"
            : cursorMode === "explore"
            ? "EXPLORE"
            : cursorMode === "open"
            ? "OPEN"
            : null}
        </span>
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        data-custom-cursor="true"
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden opacity-0 md:block"
        style={{ willChange: "transform" }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
      </div>
    </>
  );
}
