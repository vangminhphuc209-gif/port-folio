import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vàng Minh Phúc — Creative Developer & STEM Maker",
  description:
    "Portfolio của Vàng Minh Phúc (VMP.) — 12th-grade tech maker, STEM enthusiast và vibe coder từ Lai Châu. Chuyên xây dựng modern web apps, tương tác chuyển động và sáng tạo kỹ thuật.",
  metadataBase: new URL("https://vangminhphuc.dev"),
  keywords: [
    "Vàng Minh Phúc",
    "Creative Developer",
    "Tech Maker",
    "STEM",
    "Next.js",
    "React",
    "Motion",
    "Vibe Coding",
  ],
  authors: [{ name: "Vàng Minh Phúc", url: "https://github.com/vangminhphuc209-gif" }],
  openGraph: {
    title: "Vàng Minh Phúc — Creative Developer & STEM Maker",
    description:
      "A dark, interactive portfolio featuring reactive portrait poses, smooth 60fps motion, and provincial award-winning STEM innovations.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vàng Minh Phúc - Creative Developer & Tech Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vàng Minh Phúc — Creative Developer & STEM Maker",
    description: "Creative Developer & STEM Maker portfolio with multi-pose interactive hero.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/icons/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
