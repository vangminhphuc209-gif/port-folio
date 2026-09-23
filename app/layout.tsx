import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vàng Minh Phúc — Frontend Developer",
  description:
    "Personal portfolio of Vàng Minh Phúc, a frontend developer focused on modern interfaces, interactive experiences and web animation.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Vàng Minh Phúc — Frontend Developer",
    description:
      "A dark, interactive portfolio focused on modern frontend development, motion and creative digital experiences.",
    type: "website",
    images: ["/projects/project-01.png"],
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
