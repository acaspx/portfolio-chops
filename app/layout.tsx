import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// Using system font stack (SF Pro on macOS) — see README to switch to
// next/font/google (Inter / JetBrains Mono) when building locally.

export const metadata: Metadata = {
  metadataBase: new URL("https://antoncastro.design"), // TODO(Anton): set your real domain
  title: "Anton Castro — Product Designer & Design Engineer",
  description:
    "Anton Castro designs AI products that ship and scale — from first prototype to design system to enterprise contract. SF-based, 0→1 four times across healthcare, fintech, and govtech AI.",
  openGraph: {
    title: "Anton Castro — Product Designer & Design Engineer",
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
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
