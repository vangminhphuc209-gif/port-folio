"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PORTRAIT_POSE_EVENT, type PortraitPose } from "@/lib/portraitPose";

const poseImages: Record<PortraitPose, string> = {
  idle: "/profile/poses/portrait-idle.png",
  "look-left": "/profile/poses/portrait-look-left.png",
  "look-right": "/profile/poses/portrait-look-right.png",
  "lean-left": "/profile/poses/portrait-lean-left.png",
  "arms-crossed": "/profile/poses/portrait-arms-crossed.png",
  "point-right": "/profile/poses/portrait-point-right.png",
};

export function HeroPortrait() {
  const reducedMotion = useReducedMotion();
  const [pose, setPose] = useState<PortraitPose>("idle");
  const forcedPose = useRef<PortraitPose | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 75, damping: 20, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 75, damping: 20, mass: 0.8 });

  useEffect(() => {
    const onPose = (event: Event) => {
      const detail = (event as CustomEvent<{ pose: PortraitPose | null }>).detail;
      forcedPose.current = detail?.pose ?? null;
      setPose(detail?.pose ?? "idle");
    };

    window.addEventListener(PORTRAIT_POSE_EVENT, onPose);
    return () => window.removeEventListener(PORTRAIT_POSE_EVENT, onPose);
  }, []);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;

      x.set(nx * 20);
      y.set(ny * 10);

      if (forcedPose.current) return;

      const normalizedX = event.clientX / window.innerWidth;
      const normalizedY = event.clientY / window.innerHeight;

      if (normalizedX < 0.16 && normalizedY > 0.28) {
        setPose("lean-left");
      } else if (normalizedX < 0.39) {
        setPose("look-left");
      } else if (normalizedX > 0.63) {
        setPose("look-right");
      } else {
        setPose("idle");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion, x, y]);

  return (
    <motion.div
      initial={reducedMotion ? false : { y: 32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.95, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto flex h-[72svh] max-h-[860px] min-h-[520px] items-end justify-center sm:h-[78svh] lg:h-[84svh]"
    >
      <motion.div style={{ x: sx, y: sy }} className="relative h-full w-full max-w-[680px]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={pose}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.992, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 1.006, filter: "blur(3px)" }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={poseImages[pose]}
              alt={`Vàng Minh Phúc — ${pose.replaceAll("-", " ")} pose`}
              fill
              priority={pose === "idle"}
              sizes="(max-width: 768px) 90vw, 680px"
              className="object-contain object-bottom drop-shadow-[0_30px_55px_rgba(0,0,0,.55)]"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
