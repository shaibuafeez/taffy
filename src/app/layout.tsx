import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Newsreader, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Motion, SmoothScroll } from "@/components/Motion";
import { brand } from "@/content";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", axes: ["opsz", "wdth"] });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["normal", "italic"], axes: ["opsz"] });
const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--font-permanent-marker" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: { default: `${brand.name}: ${brand.tagline}`, template: `%s · ${brand.name}` },
  description: brand.description,
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f2ede3",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} ${marker.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Mark JS before first paint so reveal states never flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper-2">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <Motion />
      </body>
    </html>
  );
}
