import "./globals.css";
import { Navbar } from "../components/navbar";
import IntroOverlay from "../components/intro-overlay";
import { RouteTransition } from "../components/route-transition";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <div aria-hidden className="ac-bg">
  <div className="ac-nebula" />
  <div className="ac-ring" />
  <div className="ac-stars" />
  <div className="ac-stars2" />
  <div className="ac-stars3" />
  <div className="ac-aurora" />
  <div className="ac-shooting" />
  <div className="ac-grain" />
  <div className="ac-vignette" />
</div>

        <IntroOverlay />

        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1 w-full px-4 pt-16 sm:pt-20 pb-20">
            <div className="mx-auto w-full max-w-6xl">
              <RouteTransition>{children}</RouteTransition>
            </div>
          </main>

          <footer className="px-4 pb-8">
            <div className="mx-auto w-full max-w-6xl text-xs text-white/35">
              © {new Date().getFullYear()} Aureon
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}