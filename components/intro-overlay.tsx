"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden
      className={[
        "fixed inset-0 z-[80] grid place-items-center transition-opacity duration-500",
        show ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* dark glass */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* glow */}
      <div className="absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(140,90,255,0.22),transparent_60%)] blur-2xl" />
      <div className="absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(80,200,255,0.14),transparent_60%)] blur-2xl" />

      {/* logo */}
      <div className="relative">
        <Image
          src="/ac-logo.png"
          alt="Aureon"
          width={220}
          height={220}
          priority
          className={show ? "animate-[introPop_700ms_cubic-bezier(.2,.8,.2,1)_forwards]" : ""}
        />
      </div>

      <style>{`
        @keyframes introPop {
          0% { transform: translateY(14px) scale(.92); opacity: 0; filter: blur(10px); }
          60% { transform: translateY(0) scale(1.03); opacity: 1; filter: blur(0); }
          100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[introPop_700ms_cubic-bezier(.2,.8,.2,1)_forwards] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}