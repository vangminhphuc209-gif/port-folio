"use client";

import type { IconType } from "react-icons";
import { motion } from "motion/react";

import { MagneticButton } from "@/components/effects/MagneticButton";

export function SocialButton({
  href,
  label,
  icon: Icon,
  external = true,
}: {
  href?: string;
  label: string;
  icon: IconType;
  external?: boolean;
}) {
  const configured = Boolean(href && href.trim());

  if (!configured) {
    return (
      <span
        className="inline-flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-500"
        aria-label={`${label} link not configured`}
        title={`Add your ${label} URL in data/portfolio.ts`}
      >
        <Icon className="text-[18px]" />
      </span>
    );
  }

  return (
    <MagneticButton strength={12}>
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={label}
        data-cursor="open"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-sky-400/40 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]"
      >
        <Icon className="text-[18px]" />
      </motion.a>
    </MagneticButton>
  );
}
