import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { CustomCursor } from "@/components/effects/CustomCursor";

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <MouseGlow />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
