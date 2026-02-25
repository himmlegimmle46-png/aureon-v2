export function skuFromPriceId(priceId: string): string | null {
  // Replace these with YOUR real Stripe price IDs
  switch (priceId) {
    case "price_REPLACE_ME_RUST_0_100":
      return "rust-0-100";
    case "price_REPLACE_ME_RUST_100_500":
      return "rust-100-500";
    case "price_REPLACE_ME_RUST_500_1000":
      return "rust-500-1000";
    default:
      return null;
  }
}