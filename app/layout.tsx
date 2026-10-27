import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@fontsource-variable/fraunces/full.css";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CaseGateOverlay from "@/components/CaseGateOverlay";

// Geist and Geist Mono were drawn as a pair, so body text and the mono labels
// (section heads, outcomes column, links, footer) share proportions and stroke
// weight. next/font self-hosts both at build time; no runtime Google request.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://studioacas.com"),
  title: "Anton Castro · Design Engineer",
  description:
    "Anton Castro, Design Engineer. Designs and builds AI products from first prototype to shipped code: four 0→1s across healthcare, fintech, and govtech.",
  openGraph: {
    title: "Anton Castro · Design Engineer",
    description:
      "Design engineer building AI products in code. Four 0→1s across healthcare, fintech, and govtech.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <CustomCursor />
        <CaseGateOverlay />
        <BottomNav />
        {/* The nav floats at the bottom now, so the page starts at the top edge. */}
        <main id="main" className="flex-1 pt-8 sm:pt-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
