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

const TOOL_KEY_VARIANTS: Variant[] = [
  {
    id: "arc-serenity-1",
    label: "Serenity Cheat 1 day",
    priceLabel: "$4.00",
    checkoutUrl: "https://buy.stripe.com/4gM14o05g30j2eKfsH9IQ04",
    inStock: true,
  },
  {
    id: "arc-serenity-7",
    label: "Serenity Cheat 7 days",
    priceLabel: "$20.00",
    checkoutUrl: "https://buy.stripe.com/28E8wQ8BMeJ11aG0xN9IQ03",
    inStock: true,
  },
  {
    id: "arc-serenity-30",
    label: "Serenity Cheat 30 days",
    priceLabel: "$40.00",
    checkoutUrl: "https://buy.stripe.com/9B6cN6cS27gz4mS80f9IQ02",
    inStock: true,
  },
];

export default function ArcRaidersPage() {
  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Arc Raiders Cheat</h1>
          <p className="pt-1 text-sm text-white/60">Direct Stripe checkout</p>
        </div>
        <Link className="text-sm text-white/70 underline underline-offset-4 hover:text-white" href="/software">
          Back
        </Link>
      </div>

      <Card className="p-5 space-y-4">
        <div className="text-lg font-semibold">Choose your plan</div>

        <div className="grid gap-2">
          {TOOL_KEY_VARIANTS.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">{v.label}</div>
                <div className="text-sm text-white/70">{v.priceLabel}</div>
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
      </Card>
    </div>
  );
}