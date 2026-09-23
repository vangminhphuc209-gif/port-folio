"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa6";
import { HiArrowUpRight, HiOutlineEnvelope } from "react-icons/hi2";
import { portfolio } from "@/data/portfolio";
import { SocialButton } from "@/components/ui/SocialButton";
import { MagneticButton } from "@/components/effects/MagneticButton";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set([titleRef.current, contentRef.current], { autoAlpha: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 40, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" }
    ).fromTo(
      contentRef.current,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.75, ease: "power2.out" },
      "-=0.5"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.08] bg-gradient-to-b from-[#0c101a] via-[#0e1322] to-[#070a12] py-24 sm:py-32 lg:py-40"
    >
      {/* Soft Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-15%] h-[550px] bg-[radial-gradient(ellipse_at_50%_100%,rgba(56,189,248,0.12),rgba(129,140,248,0.06)_40%,transparent_75%)]"
      />

      <div className="section-shell relative z-10">
        <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(56,189,248,0.9)] animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
            05 / Contact
          </span>
        </div>

        <h2
          ref={titleRef}
          className="display mt-8 max-w-[1200px] text-[clamp(4rem,12vw,11rem)] font-black leading-[0.78] tracking-[-0.075em] text-white"
        >
          LET&apos;S BUILD
          <span className="block bg-gradient-to-r from-sky-400/40 via-indigo-300/30 to-slate-600/30 bg-clip-text text-transparent">
            SOMETHING.
          </span>
        </h2>

        <div
          ref={contentRef}
          className="mt-12 flex flex-col justify-between gap-10 border-t border-white/[0.08] pt-8 sm:mt-16 lg:flex-row lg:items-end"
        >
          <div>
            <p className="text-sm font-medium text-slate-300/80">Available for innovative ideas, experiments and future projects.</p>
            <MagneticButton strength={20}>
              <a
                href={`mailto:${portfolio.email}`}
                data-cursor="open"
                className="group mt-5 inline-flex items-center gap-3 text-lg font-semibold text-white underline decoration-sky-400/40 underline-offset-8 transition-colors hover:text-sky-300 hover:decoration-sky-400 sm:text-2xl"
              >
                {portfolio.email}
                <HiArrowUpRight className="text-sky-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </MagneticButton>
          </div>

          <div className="flex items-center gap-3">
            {portfolio.social.github && (
              <SocialButton href={portfolio.social.github} label="GitHub" icon={FaGithub} />
            )}
            <SocialButton href={portfolio.social.facebook} label="Facebook" icon={FaFacebookF} />
            <SocialButton href={portfolio.social.instagram} label="Instagram" icon={FaInstagram} />
            <SocialButton href={`mailto:${portfolio.email}`} label="Email" icon={HiOutlineEnvelope} external={false} />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>{portfolio.name} © {year}</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-accent-emerald" />
            {portfolio.location}
          </span>
          <span className="text-slate-500">Built with Next.js & GSAP</span>
        </div>
      </div>
    </footer>
  );
}
