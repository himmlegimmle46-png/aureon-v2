import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import RouteTransition from "@/components/route-transition";
import RandomStreaks from "@/components/random-streaks";

export const metadata: Metadata = {
  title: "Aureon",
  description: "Aureon storefront",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* body must be relative so we can layer content above the bg */}
      <body className="min-h-screen bg-black text-white relative">
        {/* Persistent animated background across all pages (NO negative z-index) */}
        <div className="ac-bg" aria-hidden="true">
          <div className="ac-stars" />
          <div className="ac-stars2" />
          <div className="ac-nebula" />
          <div className="ac-aurora" />

          {/* TRUE random streaks (JS), always behind UI */}
          <RandomStreaks />
          <div className="ac-grain" />
          <div className="ac-vignette" />
        </div>

        {/* Everything real goes above the background */}
        <div className="relative z-10">
          <Navbar />

          {/* content below fixed navbar */}
          <main className="pt-16">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
              <RouteTransition>{children}</RouteTransition>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}