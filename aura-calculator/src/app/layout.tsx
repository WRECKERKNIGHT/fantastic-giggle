import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Aura Calculator — Discover Your Inner Light",
  description:
    "An interactive 50-question psycho-analytical quiz that reveals the five dimensions of your aura. Track cognitive depth, emotional resonance, intuitive flow, creative vision, and spiritual alignment.",
  keywords: [
    "aura",
    "personality",
    "psycho-analysis",
    "5D personality",
    "spiritual",
    "quiz",
    "inner light",
  ],
  openGraph: {
    title: "Aura Calculator — Discover Your Inner Light",
    description:
      "An interactive 50-question psycho-analytical quiz that reveals the five dimensions of your aura.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--cosmic-void)] text-[var(--star-white)] font-[var(--font-body)] antialiased">
        {children}
      </body>
    </html>
  );
}
