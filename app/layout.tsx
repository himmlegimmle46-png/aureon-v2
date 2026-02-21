import "./globals.css";
import { Navbar } from "../components/navbar";
import { RouteTransition } from "../components/route-transition";

export const metadata = {
  title: "Aureon V2",
  description: "Aureon V2 storefront",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div aria-hidden className="ac-bg">
  <div className="ac-grid" />
  <div className="ac-stars" />
  <div className="ac-stars2" />
  <div className="ac-aurora" />
  <div className="ac-vignette" />
</div>

        <Navbar />

        <main className="container py-10">
          <RouteTransition>{children}</RouteTransition>
        </main>

        <footer className="container pb-10 pt-4 text-xs text-white/50">
          © {new Date().getFullYear()} Aureon V2
        </footer>
      </body>
    </html>
  );
}