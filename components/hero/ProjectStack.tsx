"use client";

import { motion } from "motion/react";
import { portfolio } from "@/data/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { setPortraitPose } from "@/lib/portraitPose";

const resting = ["-rotate-[7deg]", "rotate-[1.5deg]", "rotate-[8deg]"];
const positions = [
  "translate-x-[-10px] translate-y-0",
  "translate-x-[24px] -translate-y-[88px]",
  "translate-x-[-4px] -translate-y-[174px]",
];

export function ProjectStack() {
  return (
    <motion.div
      initial={{ x: 42, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setPortraitPose("point-right")}
      onMouseLeave={() => setPortraitPose(null)}
      className="absolute right-[2%] top-[42%] z-40 hidden w-[355px] lg:block xl:right-[5%]"
    >
      {portfolio.projects.slice(0, 3).map((project, index) => (
        <div key={project.id} className={`relative ${positions[index]}`} style={{ zIndex: index + 1 }}>
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 110, delay: 0.72 + index * 0.12 }}
          >
            <div className={resting[index]}>
              <ProjectCard project={project} />
            </div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
