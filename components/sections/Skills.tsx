"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolio } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Skills() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const list = listRef.current;
    if (!list) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = list.querySelectorAll(".skill-row");

    if (reducedMotion) {
      gsap.set(rows, { autoAlpha: 1, y: 0 });
      return;
    }

    const st = ScrollTrigger.create({
      trigger: list,
      start: "top 84%",
      end: "bottom 16%",
      toggleActions: "play none none reverse",
      animation: gsap.fromTo(
        rows,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.65,
          ease: "power2.out",
        }
      ),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#0e1320] via-[#111726] to-[#131a2c] py-24 sm:py-32 lg:py-40"
    >
      {/* Ambient background aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.04] blur-[120px]"
      />

      <div className="section-shell relative z-10">
        <SectionTitle eyebrow="03 / Toolkit" title="SKILLS" />

        <div ref={listRef} className="border-t border-white/[0.1]">
          {portfolio.skills.map((skill, index) => (
            <div
              key={skill.label}
              className="skill-row group grid gap-4 border-b border-white/[0.08] px-3 py-6 transition-all duration-300 hover:bg-white/[0.025] hover:border-sky-500/20 rounded-xl sm:grid-cols-[70px_minmax(240px,0.85fr)_1.15fr] sm:items-center sm:gap-8 sm:px-5"
            >
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent-cyan/60 transition-colors duration-300 group-hover:text-accent-cyan">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display text-3xl font-bold tracking-[-0.04em] text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-sky-300 sm:text-4xl">
                {skill.label}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-300/80 transition-colors duration-300 group-hover:text-slate-100 sm:text-[15px]">
                {skill.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
