"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowUpRight } from "react-icons/hi2";
import { portfolio, type Project } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/SectionTitle";

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const itemRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = itemRef.current;
    const imgFrame = imageFrameRef.current;
    if (!el || !imgFrame) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    // ScrollTrigger entrance & replay on scroll
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      end: "bottom 15%",
      toggleActions: "play none none reverse",
      animation: gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
      ),
    });

    if (isTouch) return () => st.kill();

    // 3D perspective tilt on hover
    const onMove = (e: MouseEvent) => {
      const rect = imgFrame.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(imgFrame, {
        rotateY: px * 9,
        rotateX: -py * 7,
        scale: 1.015,
        duration: 0.35,
        ease: "power1.out",
        transformPerspective: 1000,
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(imgFrame, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    imgFrame.addEventListener("mousemove", onMove);
    imgFrame.addEventListener("mouseleave", onLeave);

    return () => {
      st.kill();
      imgFrame.removeEventListener("mousemove", onMove);
      imgFrame.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(imgFrame);
    };
  }, []);

  return (
    <article ref={itemRef} className="group will-change-transform">
      <Link href={project.href || `/projects/${project.slug}`} data-cursor="view" className="block">
        <div className={`grid gap-8 lg:grid-cols-12 lg:items-center ${index % 2 ? "" : ""}`}>
          <div className={`${index % 2 ? "lg:order-2 lg:col-span-8" : "lg:col-span-8"}`}>
            <div
              ref={imageFrameRef}
              className="relative aspect-[16/10] overflow-hidden rounded-[26px] border border-white/[0.12] bg-[#141926] shadow-card transition-all duration-500 hover:border-sky-500/40 hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.25)]"
              style={{ willChange: "transform" }}
            >
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14]/70 via-transparent to-transparent opacity-80" />
            </div>
          </div>

          <div className={`${index % 2 ? "lg:order-1 lg:col-span-4" : "lg:col-span-4"} lg:py-4`}>
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-accent-cyan/80">{project.id}</span>
              <div className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.04] text-slate-300 transition-all duration-300 group-hover:border-sky-400/50 group-hover:bg-white group-hover:text-black">
                <HiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <h3 className="display mt-4 text-[clamp(2.3rem,4.8vw,4.8rem)] font-black leading-[0.92] tracking-[-0.05em] text-white transition-colors duration-300 group-hover:text-sky-200">
              {project.title}
            </h3>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300/80 sm:text-base">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-sky-400/20 bg-sky-500/[0.08] px-3.5 py-1.5 text-[10.5px] font-semibold text-sky-200 backdrop-blur-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function Projects() {
  return (
    <section
      id="work"
      className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#131a2c] via-[#101524] to-[#0c101a] py-24 sm:py-32 lg:py-40"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[15%] top-[30%] h-[550px] w-[550px] rounded-full bg-sky-500/[0.04] blur-[130px]"
      />

      <div className="section-shell relative z-10">
        <SectionTitle eyebrow="04 / Selected work" title="PROJECTS" />

        <div className="space-y-20 sm:space-y-28">
          {portfolio.projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
