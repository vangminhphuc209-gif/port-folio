export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
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
      title: "Motion Portfolio",
      description:
        "A dark editorial portfolio concept focused on smooth cursor interactions, layered composition and performance-friendly motion.",
      tech: ["Next.js", "TypeScript", "Motion"],
      image: "/projects/project-01.png",
    },
    {
      id: "02",
      title: "STEM Innovation Hub",
      description:
        "A clean learning and project showcase interface organizing lessons, hardware experiments and award-winning STEM activities.",
      tech: ["React", "Tailwind CSS", "STEM"],
      image: "/projects/project-02.png",
    },
    {
      id: "03",
      title: "Interactive Dashboard",
      description:
        "A data-oriented dashboard concept with modular cards, responsive layout and subtle micro-interactions.",
      tech: ["Next.js", "Charts", "Responsive UI"],
      image: "/projects/project-03.png",
    },
  ] as Project[],
};
