import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft, HiArrowUpRight } from "react-icons/hi2";
import { FiGithub, FiCheckCircle, FiActivity } from "react-icons/fi";
import { portfolio } from "@/data/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return portfolio.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found — Vàng Minh Phúc",
    };
  }

  return {
    title: `${project.title} — Case Study by Vàng Minh Phúc`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study by Vàng Minh Phúc`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#07090e] text-[#e8ecf4] selection:bg-sky-500/30 selection:text-white">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-sky-500/[0.04] blur-[150px]"
      />

      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-20 lg:px-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-8">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-sky-400/50 hover:bg-white/[0.08] hover:text-white"
          >
            <HiArrowLeft className="text-base transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to portfolio</span>
          </Link>

          <span className="font-mono text-xs font-bold tracking-[0.25em] text-accent-cyan/90">
            CASE STUDY #{project.id}
          </span>
        </div>

        {/* Project Header */}
        <header className="mt-12 sm:mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-200">
              {project.role || "Lead Developer"}
            </span>
            {project.timeline && (
              <span className="font-mono text-xs text-slate-400">
                Timeline: {project.timeline}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-[clamp(2.5rem,5.5vw,5rem)] font-black leading-[0.95] tracking-[-0.04em] text-white">
            {project.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300/90 sm:text-xl">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.1]"
              >
                <FiGithub className="text-base" />
                <span>GitHub Repository</span>
              </a>
            )}
            <a
              href="#overview"
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-200 transition-all duration-300 hover:bg-sky-500/30"
            >
              <span>Explore Architecture</span>
              <HiArrowUpRight className="text-base" />
            </a>
          </div>
        </header>

        {/* Hero Image Showcase */}
        <div className="mt-12 overflow-hidden rounded-[28px] border border-white/[0.1] bg-[#111622] shadow-[0_24px_80px_rgba(0,0,0,0.8)] sm:mt-16">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.image}
              alt={`${project.title} detailed preview`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/80 via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Metrics Banner */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center backdrop-blur-md"
              >
                <div className="text-3xl font-black tracking-tight text-accent-cyan sm:text-4xl">
                  {metric.value}
                </div>
                <div className="mt-1 font-mono text-xs font-medium uppercase tracking-wider text-slate-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bento Grid: Architecture, Challenge & Solution */}
        <section id="overview" className="mt-16 grid grid-cols-1 gap-6 sm:mt-24 lg:grid-cols-2">
          {/* Challenge Box */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber-400/20 bg-amber-500/10 text-amber-300">
                <FiActivity className="text-xl" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">The Challenge</h2>
            </div>
            <p className="mt-5 text-base leading-relaxed text-slate-300/80">
              {project.challenge ||
                "Designing and delivering a performant, scalable architecture while maintaining ultra-low latency and seamless user interactions."}
            </p>
          </div>

          {/* Solution Box */}
          <div className="relative overflow-hidden rounded-[24px] border border-sky-400/20 bg-sky-500/[0.03] p-8 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-sky-400/25 bg-sky-500/15 text-sky-200">
                <FiCheckCircle className="text-xl" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">The Solution</h2>
            </div>
            <p className="mt-5 text-base leading-relaxed text-slate-300/80">
              {project.solution ||
                "Implemented specialized algorithmic optimizations, modular React 19 architecture, and dedicated hardware acceleration passes."}
            </p>
          </div>

          {/* Key Features List */}
          {project.features && project.features.length > 0 && (
            <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-md lg:col-span-2">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Key Features & Innovations
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_8px_#38bdf8]" />
                    <span className="text-sm leading-relaxed text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Breakdown */}
          <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-md lg:col-span-2">
            <h2 className="text-xl font-bold tracking-tight text-white">Technologies & Tools</h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/[0.08] pt-12 sm:flex-row">
          <Link
            href="/#work"
            className="text-sm font-semibold text-slate-400 transition-colors hover:text-sky-300"
          >
            ← View all projects
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-6 py-2.5 text-sm font-semibold text-sky-200 transition-all hover:bg-sky-500/20"
          >
            <span>Discuss collaboration with Vàng Minh Phúc</span>
            <HiArrowUpRight className="text-base" />
          </Link>
        </div>
      </div>
    </main>
  );
}
