"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa6";
import { HiArrowUpRight, HiOutlineEnvelope } from "react-icons/hi2";
import { FiCheckCircle, FiAlertCircle, FiSend } from "react-icons/fi";
import { portfolio } from "@/data/portfolio";
import { SocialButton } from "@/components/ui/SocialButton";
import { MagneticButton } from "@/components/effects/MagneticButton";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setFeedback("Vui lòng điền đầy đủ các trường thông tin.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gửi tin nhắn không thành công.");
      }

      setStatus("success");
      setFeedback(data.message || "Tin nhắn đã gửi thành công!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
      setFeedback(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-[24px] border border-white/[0.1] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl"
    >
      <h3 className="text-xl font-bold tracking-tight text-white">Send a Direct Message</h3>
      <p className="mt-1 text-xs text-slate-400">Tôi sẽ phản hồi bạn qua email trong thời gian sớm nhất.</p>

      {status === "success" && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-medium text-emerald-300">
          <FiCheckCircle className="shrink-0 text-base" />
          <span>{feedback}</span>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-medium text-rose-300">
          <FiAlertCircle className="shrink-0 text-base" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Họ và tên
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Nguyễn Văn A"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-sky-400 focus:bg-white/[0.07]"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Địa chỉ Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="you@domain.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1.5 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-sky-400 focus:bg-white/[0.07]"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Nội dung tin nhắn
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            placeholder="Chia sẻ ý tưởng, câu hỏi hoặc cơ hội hợp tác..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="mt-1.5 w-full resize-none rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-sky-400 focus:bg-white/[0.07]"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2.5 rounded-full border border-sky-400/30 bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-200 transition-all duration-300 hover:bg-sky-500/30 disabled:opacity-50"
        >
          {status === "loading" ? (
            <span>Đang gửi...</span>
          ) : (
            <>
              <span>Gửi tin nhắn</span>
              <FiSend className="text-sm" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

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
          className="mt-12 grid grid-cols-1 gap-12 border-t border-white/[0.08] pt-12 lg:grid-cols-12 lg:gap-16"
        >
          {/* Left Column: Info & Socials */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-base font-medium leading-relaxed text-slate-300/80">
                Available for innovative ideas, STEM projects, creative development, and future collaboration. Feel free to leave a direct message.
              </p>

              <div className="mt-8">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Direct Contact</span>
                <div className="mt-2">
                  <MagneticButton strength={15}>
                    <a
                      href={`mailto:${portfolio.email}`}
                      data-cursor="open"
                      className="group inline-flex items-center gap-3 text-lg font-semibold text-white underline decoration-sky-400/40 underline-offset-8 transition-colors hover:text-sky-300 hover:decoration-sky-400 sm:text-xl"
                    >
                      {portfolio.email}
                      <HiArrowUpRight className="text-sky-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Social Connections</span>
              <div className="mt-3 flex items-center gap-3">
                {portfolio.social.github && (
                  <SocialButton href={portfolio.social.github} label="GitHub" icon={FaGithub} />
                )}
                <SocialButton href={portfolio.social.facebook} label="Facebook" icon={FaFacebookF} />
                <SocialButton href={portfolio.social.instagram} label="Instagram" icon={FaInstagram} />
                <SocialButton href={`mailto:${portfolio.email}`} label="Email" icon={HiOutlineEnvelope} external={false} />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
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
