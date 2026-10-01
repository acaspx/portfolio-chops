import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces/full.css";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CaseGateOverlay from "@/components/CaseGateOverlay";

export const metadata: Metadata = {
  metadataBase: new URL("https://studioacas.com"),
  title: "Anton Castro · Product Engineer & Designer",
  description:
    "Anton Castro designs AI products that ship and scale: from first prototype to design system to enterprise contract. SF-based, 0→1 four times across healthcare, fintech, and govtech AI.",
  openGraph: {
    title: "Anton Castro · Product Engineer & Designer",
    description:
      "AI-native product designer who prototypes in code. 0→1 four times across healthcare, fintech, and govtech.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
