"use client";

import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Keying by pathname makes the animation re-run on navigation.
  return (
    <div key={pathname} className="ac-page">
      {children}
    </div>
  );
}