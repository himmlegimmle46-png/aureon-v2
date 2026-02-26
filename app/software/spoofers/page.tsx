"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Card, Button } from "../../../components/ui";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

type Variant = {
  id: string;
  label: string;
  priceLabel: string;
  priceId: string;
  inStock: boolean;
};

const OTHER_SOFTWARE_VARIANTS: Variant[] = [
  {
    id: "Exception Spoofer 1",
    label: "Exception Spoofer 1 day",
    priceLabel: "$5.00",
    priceId: "price_1T3vegISP3QHCCrM51PKxVzz",
    inStock: true,
  },
  {
    id: "Exception Spoofer 7",
    label: "Exception Spoofer 7 days",
    priceLabel: "$12.00",
    priceId: "price_1T3vezISP3QHCCrMI6dMjXDn",
    inStock: true,
  },
  {
    id: "Exception Spoofer 30",
    label: "Exception Spoofer 30 days",
    priceLabel: "$22.00",
    priceId: "price_1T3vfLISP3QHCCrMju6wy42g",
    inStock: true,
  },
];


type CheckoutResponse = { url?: string; error?: string; codes?: string[] };

export default function SoftwareLicensePage() {
  const siteKey = "0x4AAAAAAChGqqGvElmFs8B-";

  const tsRef = useRef<TurnstileInstance | null>(null);

  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const pendingRef = useRef<{ priceId: string; key: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function setPendingJob(next: { priceId: string; key: string } | null) {
    pendingRef.current = next;
  }

  async function callCheckout(priceId: string, token: string) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ priceId, captchaToken: token }),
    });

    const data = (await res.json().catch(() => ({}))) as CheckoutResponse;

    if (!res.ok) {
      const msg =
        data?.error ||
        (data?.codes?.length ? `Checkout failed: ${data.codes.join(", ")}` : "Checkout failed.");
      throw new Error(msg);
    }

    if (!data.url) throw new Error("Checkout failed (missing Stripe URL).");
    window.location.assign(data.url);
  }

  function resetAfterFailure(msg: string) {
    setError(msg);
    setLoadingKey(null);
    setPendingJob(null);
    tsRef.current?.reset?.(); // one-time token -> reset after failure
  }

  function begin(priceId: string, key: string) {
    setError(null);
    if (!siteKey) return resetAfterFailure("Missing Turnstile site key.");
    if (loadingKey) return;

    setLoadingKey(key);
    setPendingJob({ priceId, key });

    // ✅ fresh token per click (fixes timeout-or-duplicate)
    tsRef.current?.reset?.();
    tsRef.current?.execute?.();
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Software License</h1>
          <p className="text-sm text-white/60 pt-1">Instant delivery</p>
        </div>

        <Link
          className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          href="/software"
        >
          Back
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-100">
          {error}
        </div>
      )}

      <Card className="p-5">
        <div className="grid gap-1">
          <div className="text-lg font-semibold">Available options</div>
          <div className="text-sm text-white/60">Choose an option below.</div>
          <div className="pt-2 text-xs text-white/45">
            Delivery instructions are shown after checkout.
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs text-white/60 pb-2">Verification required to purchase</div>

          <Turnstile
            ref={tsRef}
            siteKey={siteKey}
            options={{ appearance: "execute", action: "checkout" }}
            onSuccess={async (token: string) => {
              const job = pendingRef.current;
              if (!job) {
                tsRef.current?.reset?.();
                return;
              }

              try {
                await callCheckout(job.priceId, token);
              } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : "Checkout failed. Try again.";
                resetAfterFailure(msg);
              }
            }}
            onExpire={() => resetAfterFailure("Captcha expired. Click purchase again.")}
            onError={() => resetAfterFailure("Captcha failed to load. Refresh and try again.")}
          />

          <div className="pt-2 text-xs text-white/50">
            Click <b>Purchase</b> to verify and start checkout.
          </div>
        </div>

        <div className="mt-4 grid divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          {OTHER_SOFTWARE_VARIANTS.map((v) => {
            const key = `software:${v.id}`;
            const isLoading = loadingKey === key;

            return (
              <div key={v.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={
                      "h-2.5 w-2.5 rounded-sm " + (v.inStock ? "bg-emerald-400" : "bg-red-400")
                    }
                    aria-hidden
                  />
                  <div className="min-w-0 text-sm text-white/90 truncate">
                    <span className="font-semibold">{v.priceLabel}</span>{" "}
                    <span className="text-white/60">/</span>{" "}
                    <span className="text-white/70">{v.label}</span>
                  </div>
                </div>

                <Button
                  className="shrink-0"
                  disabled={!v.inStock || !!loadingKey}
                  onClick={() => begin(v.priceId, key)}
                >
                  {!v.inStock ? "Sold out" : isLoading ? "Starting…" : "Purchase"}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}