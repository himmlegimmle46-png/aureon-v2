"use client";

import { useEffect, useMemo, useRef } from "react";

type StreakEl = HTMLDivElement;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function RandomStreaks() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  // stable count (doesn't change per render)
  const count = useMemo(() => 14, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // create streak elements once
    const streaks: StreakEl[] = [];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "ac-streak-random";
      host.appendChild(el);
      streaks.push(el);
    }

    let alive = true;

    const fire = (el: StreakEl) => {
      // anywhere on screen (including offscreen starts)
      const top = `${rand(-10, 110)}%`;
      const left = `${rand(-30, 110)}%`;

      // length + thickness (slightly varied)
      const w = rand(240, 740);
      const h = rand(1.6, 3.2);

      // direction + travel
      const rot = `${rand(-18, 18)}deg`;
      const tx = `${rand(-420, 420)}px`;
      const ty = `${rand(120, 420)}px`;

      // timing (slower than before)
      const dur = `${rand(1400, 2600)}ms`;
      const delay = `${rand(0, 900)}ms`;
      const alpha = rand(0.7, 1.2).toFixed(2);

      el.style.setProperty("--top", top);
      el.style.setProperty("--left", left);
      el.style.setProperty("--w", w.toFixed(0));
      el.style.setProperty("--h", h.toFixed(1));
      el.style.setProperty("--rot", rot);
      el.style.setProperty("--tx", tx);
      el.style.setProperty("--ty", ty);
      el.style.setProperty("--dur", dur);
      el.style.setProperty("--delay", delay);
      el.style.setProperty("--alpha", alpha);

      // restart animation
      el.classList.remove("ac-streak-random--run");
      // force reflow
      void el.offsetWidth;
      el.classList.add("ac-streak-random--run");
    };

    // stagger initial
    streaks.forEach((el, i) => {
      setTimeout(() => alive && fire(el), 250 + i * 110);
    });

    // continuously re-fire random streaks
    const tick = () => {
      if (!alive) return;

      // pick 1–3 streaks to fire each cycle
      const burst = Math.floor(rand(1, 4));
      for (let i = 0; i < burst; i++) {
        const el = streaks[Math.floor(rand(0, streaks.length))];
        fire(el);
      }

      // random next interval (more natural)
      const next = rand(650, 1600);
      setTimeout(tick, next);
    };

    const start = setTimeout(tick, 900);

    return () => {
      alive = false;
      clearTimeout(start);
      // cleanup nodes
      streaks.forEach((el) => el.remove());
    };
  }, [count]);

  return <div ref={hostRef} className="ac-streak-random-host" aria-hidden="true" />;
}