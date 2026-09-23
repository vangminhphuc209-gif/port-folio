"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { HiArrowUpRight, HiBars2, HiXMark } from "react-icons/hi2";
import { portfolio } from "@/data/portfolio";
import { setPortraitPose, type PortraitPose } from "@/lib/portraitPose";
import { MagneticButton } from "@/components/effects/MagneticButton";

const links: { label: string; href: string; pose: PortraitPose }[] = [
  { label: "About", href: "#about", pose: "arms-crossed" },
  { label: "Work", href: "#work", pose: "point-right" },
  { label: "Skills", href: "#skills", pose: "arms-crossed" },
  { label: "Contact", href: "#contact", pose: "look-right" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
      >
        <div
          className={`mx-auto flex h-14 max-w-[1480px] items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "border border-white/[0.12] bg-[#0c101a]/80 shadow-soft backdrop-blur-2xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="display flex items-center text-xl font-black tracking-[-0.06em]" data-cursor="link">
            {portfolio.shortName.replace(".", "")}
            <span className="text-accent-cyan">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setPortraitPose(link.pose)}
                onMouseLeave={() => setPortraitPose(null)}
                className="group relative py-1 text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-white"
                data-cursor="link"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <MagneticButton strength={15}>
              <a
                href={`mailto:${portfolio.email}`}
                onMouseEnter={() => setPortraitPose("look-right")}
                onMouseLeave={() => setPortraitPose(null)}
                className="group inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/[0.08] px-4 py-2 text-sm font-semibold text-sky-200 backdrop-blur-md transition-all duration-300 hover:border-transparent hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                data-cursor="open"
              >
                Let&apos;s talk
                <HiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 md:hidden"
            aria-label="Open menu"
          >
            <HiBars2 className="text-xl" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="ml-auto flex h-full w-[86%] max-w-sm flex-col border-l border-white/10 bg-[#0f1422] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="display flex items-center text-xl font-black">
                  {portfolio.shortName.replace(".", "")}
                  <span className="text-accent-cyan">.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-200"
                  aria-label="Close menu"
                >
                  <HiXMark className="text-2xl" />
                </button>
              </div>

              <nav className="mt-16 flex flex-col" aria-label="Mobile navigation">
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ x: 28, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * index + 0.1 }}
                    className="flex items-center justify-between border-b border-white/[0.08] py-5 text-3xl font-semibold tracking-[-0.04em] text-slate-200"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-accent-cyan">0{index + 1}</span>
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-white/[0.08]">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">Get in touch</p>
                <a href={`mailto:${portfolio.email}`} className="mt-2 block text-sm font-medium text-sky-300">
                  {portfolio.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
