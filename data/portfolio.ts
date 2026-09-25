export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  role?: string;
  timeline?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  metrics?: { label: string; value: string }[];
  href?: string;
  github?: string;
};

export const portfolio = {
  name: "Vàng Minh Phúc",
  shortName: "VMP.",
  role: "Creative Developer & Tech Maker",
  heroLineOne: "Creative Developer.",
  heroLineTwo: "Tech & STEM Maker.",
  location: "Mường Tè, Lai Châu, Vietnam",
  birthday: "2009-11-05",
  email: "vangminhphuc209@gmail.com",
  intro:
    "A 12th-grade tech maker, STEM enthusiast, and vibe coder from Lai Chau. I build hands-on digital projects, explore how things work, and stay driven by sports and a passion for military technology.",
  about:
    "I'm Vang Minh Phuc, a high school student from Muong Te, Lai Chau with a curious mind, a bold personality, and a relentless urge to build things. I specialize in rapid prototyping and vibe coding—turning creative concepts into real software and STEM innovations. Over the years, my curiosity has earned 1st Prize in Provincial STEM (Grade 12), 3rd Prize in Provincial Informatics (Grade 11), 4th Prize in Science & Technology (Grade 10), and a District Badminton runner-up medal. Outside the screen, you'll find me on the volleyball court, playing badminton, or tinkering with tech hardware. Driven by discipline and technology, my goal is to enter the Military Technical Academy (MTA) to build impactful solutions.",
  social: {
    github: "https://github.com/vangminhphuc209-gif/",
    facebook: "https://web.facebook.com/phuc.cc.520",
    instagram: "https://www.instagram.com/mihnpuhc/",
  },
  futureGoals: "Military Technical Academy (MTA)",
  achievements: [
    { level: "Grade 12", title: "1st Prize – Provincial STEM Competition" },
    { level: "Grade 11", title: "3rd Prize – Provincial Informatics Competition" },
    { level: "Grade 10", title: "4th Prize – Science & Technology Competition (KHKT)" },
    { level: "Grade 9", title: "2nd Prize – District Badminton (Men's Doubles, HKPĐ)" },
    { level: "Grade 6", title: "2nd Prize – District English Competition" },
  ],
  skills: [
    { label: "Vibe Coding & AI", detail: "Rapid prototyping, prompt-driven engineering, and shipping functional modern apps fast." },
    { label: "STEM & Hardware", detail: "Hands-on tech experiments, creative problem-solving, and provincial 1st-prize STEM innovations." },
    { label: "Competitive Informatics", detail: "Algorithmic thinking, structured problem solving, and Provincial 3rd Prize level informatics." },
    { label: "React & Next.js", detail: "Modern App Router, component architecture, and responsive interactive web experiences." },
    { label: "TypeScript & Web APIs", detail: "Type-safe interfaces, modern JavaScript standards, and clean maintainable logic." },
    { label: "Tailwind CSS", detail: "Fast, sleek, responsive styling with polished editorial and dark-mode aesthetics." },
    { label: "Sports & Athletics", detail: "Volleyball and competitive badminton (District 2nd Prize)—fostering reflexes, stamina, and discipline." },
    { label: "Git & GitHub", detail: "Version control, project management, and collaborative development workflows." },
  ],
  projects: [
    {
      id: "01",
      slug: "motion-portfolio",
      title: "Motion Portfolio",
      description:
        "A dark editorial portfolio concept focused on smooth cursor interactions, layered composition and performance-friendly motion.",
      tech: ["Next.js", "TypeScript", "Motion", "GSAP"],
      image: "/projects/project-01.png",
      role: "Lead Creative Developer & Designer",
      timeline: "2024 – 2025",
      challenge:
        "Rendering multi-layered 3D perspective animations, dynamic cursor tracking, and multi-pose hero transitions without causing frame drops or high CPU load.",
      solution:
        "Utilized hardware-accelerated transforms, Lenis smooth scrolling, GSAP ScrollTrigger batches, and isolated state triggers to maintain consistent 60fps.",
      features: [
        "Interactive 6-pose reactive portrait responding to mouse coordinates",
        "Fluid magnetic buttons and dual-ring custom cursor tracking",
        "Editorial dark typography with ambient specular highlights",
        "Accessible fallback for prefers-reduced-motion and touch devices",
      ],
      metrics: [
        { label: "Lighthouse Performance", value: "98/100" },
        { label: "Render Framerate", value: "60 FPS" },
        { label: "Asset Compression", value: "-65%" },
      ],
      href: "/projects/motion-portfolio",
      github: "https://github.com/vangminhphuc209-gif/vang-minh-phuc-portfolio",
    },
    {
      id: "02",
      slug: "stem-innovation-hub",
      title: "STEM Innovation Hub",
      description:
        "A clean learning and project showcase interface organizing lessons, hardware experiments and award-winning STEM activities.",
      tech: ["React", "Tailwind CSS", "IoT / Hardware", "STEM"],
      image: "/projects/project-02.png",
      role: "Maker & Embedded System Developer",
      timeline: "2024",
      challenge:
        "Presenting complex microcontroller circuitry diagrams, sensor telemetry data, and provincial award-winning projects in an intuitive digital showcase.",
      solution:
        "Built a modular component architecture with live hardware simulation, sensor data feeds, and interactive telemetry dashboards.",
      features: [
        "Real-time sensor telemetry visualizer and status indicators",
        "Interactive microcontroller circuit schematics (ESP32 / STM32)",
        "Documentation catalog of Provincial 1st Prize STEM innovations",
        "Responsive dark mode UI built with Tailwind CSS and glassmorphism",
      ],
      metrics: [
        { label: "Provincial Recognition", value: "1st Prize" },
        { label: "Sensor Latency", value: "< 50ms" },
        { label: "Hardware Nodes", value: "12+ Devices" },
      ],
      href: "/projects/stem-innovation-hub",
      github: "https://github.com/vangminhphuc209-gif",
    },
    {
      id: "03",
      slug: "interactive-dashboard",
      title: "Interactive Dashboard",
      description:
        "A data-oriented dashboard concept with modular cards, responsive layout and subtle micro-interactions.",
      tech: ["Next.js", "TypeScript", "Charts", "Algorithms"],
      image: "/projects/project-03.png",
      role: "Frontend & Algorithm Developer",
      timeline: "2024",
      challenge:
        "Visualizing algorithmic data streams, memory metrics, and competition execution graphs in real time without lagging the main thread.",
      solution:
        "Implemented lightweight vector canvas charts, Web Workers for mock data stream generation, and optimized re-renders with React 19.",
      features: [
        "Real-time signal analytics and anomaly detection graphs",
        "Algorithmic code runner console with execution time metrics",
        "Customizable widget layout with drag-and-drop capability",
        "High-contrast dark editorial theme with purple neon accents",
      ],
      metrics: [
        { label: "Update Rate", value: "120 updates/s" },
        { label: "Memory Footprint", value: "< 18MB" },
        { label: "Code Coverage", value: "95%" },
      ],
      href: "/projects/interactive-dashboard",
      github: "https://github.com/vangminhphuc209-gif",
    },
  ] as Project[],
};
