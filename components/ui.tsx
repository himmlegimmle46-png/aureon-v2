"use client";

import Link from "next/link";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        /* base card */
        "aur-glow relative overflow-hidden rounded-2xl border border-white/10 bg-white/5",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        "transition duration-200",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
  href,
  disabled,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: "primary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    /* 👇 aur-glow added here = global glow everywhere */
    "aur-glow inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90"
      : "bg-white/0 text-white/80 hover:text-white hover:bg-white/5 border border-white/10";

  if (href) {
    return (
      <Link className={[base, styles, className].join(" ")} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[base, styles, className].join(" ")}
    >
      {children}
    </button>
  );
}