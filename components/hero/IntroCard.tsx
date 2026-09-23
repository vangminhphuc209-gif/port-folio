"use client";

import { motion } from "motion/react";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { portfolio } from "@/data/portfolio";
import { SocialButton } from "@/components/ui/SocialButton";

export function IntroCard() {
  return (
    <motion.div
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card glass-card-hover relative max-w-[425px] rounded-[24px] p-5 sm:p-6 border border-white/[0.12] shadow-soft backdrop-blur-xl"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-accent-cyan">01</span>
          <p className="text-sm font-bold text-white">Hi, I&apos;m {portfolio.name}.</p>
        </div>
        <span className="flex h-2 w-2 items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
        </span>
      </div>
      <p className="text-[14px] leading-relaxed text-slate-300/90 sm:text-[15px]">{portfolio.intro}</p>
      <div className="mt-6 flex items-center gap-3">
        {portfolio.social.github && (
          <SocialButton href={portfolio.social.github} label="GitHub" icon={FaGithub} />
        )}
        <SocialButton href={portfolio.social.facebook} label="Facebook" icon={FaFacebookF} />
        <SocialButton href={portfolio.social.instagram} label="Instagram" icon={FaInstagram} />
        <SocialButton href={`mailto:${portfolio.email}`} label="Email" icon={HiOutlineEnvelope} external={false} />
      </div>
    </motion.div>
  );
}
