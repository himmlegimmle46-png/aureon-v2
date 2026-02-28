"use client";

import Link from "next/link";
import { Card, Button } from "../../../components/ui";

type Variant = {
  id: string;
  label: string;
  priceLabel: string;
  checkoutUrl: string;
  inStock: boolean;
};

const RUST_VARIANTS: Variant[] = [
  {
    id: "0-1500",
    label: "Rust  NFA accounts with 0–1500 hours",
    priceLabel: "$2.00",
    checkoutUrl: "https://buy.stripe.com/00wdRabNYasL1aGcgv9IQ01",
    inStock: true,
  },
];

export default function RustAccountsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Rust Accounts</h1>
          <p className="text-sm text-white/60 pt-1">Steam • hours-based options</p>
        </div>

        <Link className="text-sm text-white/70 hover:text-white underline underline-offset-4" href="/accounts">
          Back
        </Link>
      </div>

      <Card className="p-5">
        <div className="grid gap-1">
          <div className="text-lg font-semibold">Rust NFA Account</div>
          <div className="text-sm text-white/60">Choose an option below.</div>
          <div className="pt-2 text-xs text-white/45">OS: All • Game client: Steam</div>
        </div>

        <div className="mt-4 grid divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          {RUST_VARIANTS.map((v) => (
            <div key={v.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={"h-2.5 w-2.5 rounded-sm " + (v.inStock ? "bg-emerald-400" : "bg-red-400")}
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
                disabled={!v.inStock}
                onClick={() => window.location.assign(v.checkoutUrl)}
              >
                {!v.inStock ? "Sold out" : "Purchase"}
              </Button>
            </div>
          ))}
        </div>

        <div className="pt-3 text-xs text-white/45">Delivery instructions are shown after checkout.</div>
      </Card>
    </div>
  );
}
