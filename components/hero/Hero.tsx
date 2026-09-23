"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HiArrowDown, HiArrowUpRight } from "react-icons/hi2";
import { portfolio } from "@/data/portfolio";
import { TextReveal } from "@/components/effects/TextReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { HeroPortrait } from "./HeroPortrait";
import { IntroCard } from "./IntroCard";
import { ProjectStack } from "./ProjectStack";
import { setPortraitPose } from "@/lib/portraitPose";

export function Hero() {
  const numberRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    // Subtle breathing pulse for scroll button
    if (scrollRef.current) {
      gsap.to(scrollRef.current, {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
      });
    }

    if (!window.matchMedia("(pointer: fine)").matches) return;

    // GSAP parallax tracking for background watermark
    const numX = gsap.quickTo(numberRef.current, "x", { duration: 0.8, ease: "power2.out" });
    const numY = gsap.quickTo(numberRef.current, "y", { duration: 0.8, ease: "power2.out" });

    const onMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      numX(nx * -24);
      numY(ny * -14);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (scrollRef.current) gsap.killTweensOf(scrollRef.current);
    };
  }, []);

  return (
    <section
      id="top"
      className="noise relative min-h-[100svh] overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#0b0e14] via-[#0e121b] to-[#101522]"
    >
      {/* Soft Ambient Luminous Aura Spotlights */}
      <div
        aria-hidden="true"
        className="ambient-aura pointer-events-none absolute left-[8%] top-[15%] h-[550px] w-[550px] rounded-full bg-sky-500/[0.07] blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="ambient-aura pointer-events-none absolute right-[10%] top-[30%] h-[600px] w-[600px] rounded-full bg-indigo-500/[0.06] blur-[130px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(56,189,248,0.06),transparent_45%)]"
      />

      {/* Subtle modern cyber-grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,#000_65%,transparent_100%)] opacity-35"
      />

      {/* Watermark 01 with GSAP parallax */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[10%] z-10 -translate-x-1/2 select-none sm:top-[6%] lg:top-[2%]"
      >
        <div
          ref={numberRef}
          className="display bg-gradient-to-b from-white/90 via-slate-400/40 to-white/[0.03] bg-clip-text text-[clamp(16rem,43vw,45rem)] font-black leading-[0.72] tracking-[-0.1em] text-transparent opacity-85 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          01
        </div>
      </div>

      <HeroPortrait />
      <ProjectStack />

      <div className="section-shell relative z-30 min-h-[100svh] pt-28 sm:pt-32">
        <div className="flex min-h-[calc(100svh-8rem)] flex-col justify-center pb-28 lg:max-w-[48%] lg:pb-16">
          <div className="max-w-[690px]">
            {/* Status pill badge */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-sky-500/20 bg-sky-500/[0.06] px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
              </span>
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-sky-200">
                PORTFOLIO • 2026
              </span>
            </div>

            <h1 className="display text-[clamp(3rem,6vw,6.9rem)] font-black leading-[0.88] tracking-[-0.065em]">
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
                <TextReveal delay={0.3}>{portfolio.heroLineOne}</TextReveal>
              </span>
              <span className="bg-gradient-to-r from-sky-300/90 via-slate-300 to-slate-400 bg-clip-text text-transparent">
                <TextReveal delay={0.42}>{portfolio.heroLineTwo}</TextReveal>
              </span>
            </h1>

            <div className="mt-8 sm:mt-10 lg:mt-8">
              <IntroCard />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <MagneticButton strength={22}>
                <a
                  href="#work"
                  data-cursor="explore"
                  onMouseEnter={() => setPortraitPose("point-right")}
                  onMouseLeave={() => setPortraitPose(null)}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:scale-[1.03]"
                >
                  <span className="relative z-10">View projects</span>
                  <HiArrowUpRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </MagneticButton>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs uppercase tracking-[0.16em] text-slate-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                Based in {portfolio.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <a
        ref={scrollRef}
        href="#about"
        data-cursor="link"
        className="absolute bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md transition-colors hover:border-sky-400/40 hover:text-white sm:flex"
      >
        Scroll
        <HiArrowDown className="text-accent-cyan" />
      </a>
    </section>
  );
}
