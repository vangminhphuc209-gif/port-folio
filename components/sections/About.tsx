"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";

const facts = [
  ["Name", portfolio.name],
  ["Role", portfolio.role],
  ["Based in", portfolio.location],
  ["Born", "November 5, 2009"],
  ["Email", portfolio.email],
  ["Target", portfolio.futureGoals],
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set([leftColRef.current, rightColRef.current], { autoAlpha: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        end: "bottom 18%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      leftColRef.current,
      { y: 35, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.85, ease: "power2.out" }
    ).fromTo(
      rightColRef.current,
      { y: 35, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.85, ease: "power2.out" },
      "-=0.6"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#101522] via-[#121826] to-[#0e1320] py-24 sm:py-32 lg:py-40"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-5%] top-[25%] h-[480px] w-[480px] rounded-full bg-sky-500/[0.05] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] bottom-[15%] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.04] blur-[100px]"
      />

      <div className="section-shell relative z-10">
        <SectionTitle eyebrow="02 / About" title="ABOUT ME" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Vision & Narrative */}
          <div ref={leftColRef} className="lg:col-span-7">
            <h3 className="display max-w-[980px] bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-[clamp(2.1rem,4.2vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.055em] text-transparent">
              Curious mind, hands-on maker, and builder of tech solutions with military precision.
            </h3>

            <div className="mt-8 space-y-5 max-w-2xl text-base leading-relaxed text-slate-300/85 sm:text-[17px]">
              <p>
                {portfolio.about.split("\n\n")[0]}
              </p>
              {portfolio.about.includes("\n\n") && (
                <p className="text-slate-400">
                  {portfolio.about.split("\n\n")[1]}
                </p>
              )}
            </div>

            {/* Core Values / Tags */}
            <div className="mt-10 flex flex-wrap gap-2.5">
              {[
                "STEM Innovation",
                "Rapid Vibe Coding",
                "Military Aspirations",
                "Athletic Spirit",
                "Continuous Discovery",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.09] bg-white/[0.035] px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-sky-400/40 hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Key Facts & Awards */}
          <div ref={rightColRef} className="lg:col-span-5 lg:pt-1">
            {/* Quick Facts Card */}
            <div className="rounded-2xl border border-white/[0.1] bg-[#161c28]/80 p-6 shadow-card backdrop-blur-xl transition-all duration-300 hover:border-sky-500/30">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300/90">
                Profile Overview
              </p>
              <div className="mt-4 divide-y divide-white/[0.06]">
                {facts.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[100px_1fr] gap-3 py-3.5 text-sm">
                    <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">{label}</span>
                    {label === "Email" ? (
                      <a
                        href={`mailto:${value}`}
                        className="break-all font-medium text-sky-300/90 transition-colors hover:text-sky-200"
                        data-cursor="link"
                      >
                        {value}
                      </a>
                    ) : label === "Target" ? (
                      <span className="font-semibold text-accent-cyan flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                        {value}
                      </span>
                    ) : (
                      <span className="font-medium text-slate-200">{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones Card */}
            {portfolio.achievements && (
              <div className="mt-6 rounded-2xl border border-white/[0.1] bg-[#161c28]/80 p-6 shadow-card backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300/90">
                    Recognitions & Awards
                  </p>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    Provincial / District
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {portfolio.achievements.map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex flex-col gap-1 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {item.level}
                      </span>
                      <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
