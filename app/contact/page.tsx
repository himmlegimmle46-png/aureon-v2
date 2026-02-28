// app/contact/page.tsx
import Link from "next/link";

const EMAIL = "REDACTED@aureon-collective.xyz";
const DISCORD_INVITE = "https://discord.gg/aureoncl";
const DISCORD_USERS = "redacted21314 (sfv) & REDACTED01234535";

function Row({
  label,
  value,
  action,
}: {
  label: string;
  value: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 border-b border-white/10 py-4 sm:grid-cols-[160px_1fr_auto] sm:items-center">
      <div className="text-sm text-white/55">{label}</div>
      <div className="text-sm font-medium text-white/85">{value}</div>
      {action ? <div className="sm:text-right">{action}</div> : <div />}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
      <div className="mb-7">
        <h1 className="text-2xl font-semibold text-white/95">Contact</h1>
        <p className="mt-1 text-sm text-white/60">
          Questions about orders, delivery, or support.
        </p>
      </div>

      <div
        className={[
          "relative overflow-hidden rounded-3xl",
          "border border-white/10 bg-white/[0.035]",
          "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_18px_70px_rgba(0,0,0,0.55)]",
        ].join(" ")}
      >
        {/* subtle highlight */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 left-1/2 h-56 w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(90,240,255,0.10),transparent_65%)] blur-2xl" />
          <div className="absolute -bottom-32 left-1/3 h-56 w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(170,120,255,0.09),transparent_65%)] blur-2xl" />
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-semibold tracking-[0.22em] text-white/55">
                SUPPORT CHANNELS
              </div>
              <div className="mt-2 text-sm text-white/60">
                Fastest support is usually through Discord tickets after purchase.
              </div>
            </div>

            <Link
              href={DISCORD_INVITE}
              target="_blank"
              rel="noreferrer"
              className={[
                "inline-flex w-fit items-center gap-2 rounded-xl",
                "border border-white/12 bg-white/[0.05] px-4 py-2.5",
                "text-sm font-semibold text-white/85",
                "transition hover:bg-white/[0.08] active:translate-y-[1px]",
              ].join(" ")}
            >
              Join Discord <span className="opacity-80">→</span>
            </Link>
          </div>

          <div className="mt-6">
            <Row label="Email" value={EMAIL} />
            <Row
              label="Discord Server"
              value="Aureon Support"
              action={
                <Link
                  href={DISCORD_INVITE}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 underline decoration-white/20 underline-offset-4 transition hover:text-white/95 hover:decoration-cyan-300/50"
                >
                  Join Server <span className="opacity-80">→</span>
                </Link>
              }
            />
            <Row label="Discord Username" value={DISCORD_USERS} />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4 text-xs text-white/55">
            Tip: if you’re messaging about an order, include the email used at checkout and the product name so we can help faster.
          </div>
        </div>
      </div>
    </div>
  );
}