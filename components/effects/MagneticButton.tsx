"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";
import gsap from "gsap";

export function MagneticButton({
  children,
  strength = 18,
  className = "",
}: PropsWithChildren<{ strength?: number; className?: string }>) {
  const buttonRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || isTouch) return;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;

      gsap.to(el, {
        x,
        y,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onPointerLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1.15, 0.35)",
        overwrite: "auto",
      });
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <span
      ref={buttonRef}
      className={`inline-flex will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
