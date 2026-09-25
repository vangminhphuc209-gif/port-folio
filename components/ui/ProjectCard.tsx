"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || isTouch) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotateY: px * 12,
        rotateX: -py * 10,
        y: -6,
        scale: 1.02,
        duration: 0.35,
        ease: "power2.out",
        transformPerspective: 1000,
        transformOrigin: "center center",
        overwrite: "auto",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  const href = project.href || `/projects/${project.slug}`;

  return (
    <Link
      ref={cardRef}
      href={href}
      data-cursor="view"
      className={`group relative block aspect-[1.48/1] w-[280px] overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#161c28] shadow-[0_24px_70px_rgba(0,0,0,.6)] transition-colors duration-500 hover:border-sky-400/40 sm:w-[330px] ${className}`}
      aria-label={`View ${project.title}`}
      style={{ willChange: "transform" }}
    >
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        fill
        sizes="330px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14]/90 via-[#0b0e14]/25 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4.5">
        <div>
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-accent-cyan/90">{project.id}</span>
          <h3 className="mt-1 text-base font-bold tracking-[-0.03em] text-white transition-colors group-hover:text-sky-200">
            {project.title}
          </h3>
        </div>
        <span className="rounded-full border border-sky-400/25 bg-sky-500/15 px-2.5 py-1 text-[9.5px] font-semibold text-sky-200 backdrop-blur-md">
          {project.tech[0]}
        </span>
      </div>
    </Link>
  );
}
