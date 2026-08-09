import type { Metadata } from "next";
import { Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GIGACHAD OP METER — The Original Aura Calculator",
  description:
    "A 50-question psychometric examination that measures your presence, composure and instinct velocity. Five phases. Five tiers. Zero colours. Pure measurement.",
  keywords: [
    "aura",
    "gigachad",
    "personality test",
    "psychometric",
    "op meter",
    "aura calculator",
    "tier list",
    "instinct velocity",
  ],
  openGraph: {
    title: "GIGACHAD OP METER — The Original Aura Calculator",
    description:
      "A 50-question psychometric examination that measures your presence, composure and instinct velocity.",
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
      className={`${playfair.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--paper)] text-[var(--ink)] font-[var(--font-body)] antialiased">
        {/* Hidden SVG for hand-drawn roughness filter */}
        <svg
          className="absolute h-0 w-0"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter id="rough">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.045"
                numOctaves="2"
                result="noise"
                seed="7"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
        <SmoothScroll>
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
