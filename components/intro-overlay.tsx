"use client";

import { useEffect, useState } from "react";

export function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Plays on every fresh load. (If you want “once per session”, tell me.)
    const t = setTimeout(() => setShow(false), 1700);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="ac-intro" role="presentation" aria-hidden>
      <div className="ac-intro-inner">
        <div className="ac-intro-mark">
          <div className="ac-intro-title">
            <span className="ac-intro-glow">Aureon</span>{" "}
            <span className="ac-intro-v2">V2</span>
          </div>
          <div className="ac-intro-sub">Space storefront • clean checkout</div>
        </div>
      </div>
    </div>
  );
}