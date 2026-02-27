export function skuFromPriceId(priceId: string): string | null {
  switch (priceId) {
    case "price_1T3wS5ISP3QHCCrM9Mhuiwau":
      return "rust-account-0-1500";

    case "price_1T3vrzISP3QHCCrMvWLlPKkC":
      return "serenity-cheat-1";
    case "price_1T3vsAISP3QHCCrMTE9MiEht":
      return "serenity-cheat-7";
    case "price_1T3vsOISP3QHCCrMC4MLqFWv":
      return "serenity-cheat-30";

    case "price_1T3vegISP3QHCCrM51PKxVzz":
      return "exception-spoofer-1";
    case "price_1T3vezISP3QHCCrMI6dMjXDn":
      return "exception-spoofer-7";
    case "price_1T3vfLISP3QHCCrMju6wy42g":
      return "exception-spoofer-30";

    case "price_1T3vdNISP3QHCCrMxL6U5ByH":
      return "evade-scripts-30";
    case "price_1T3vdnISP3QHCCrMWQMTjRk0":
      return "evade-scripts-90";
    case "price_1T3veCISP3QHCCrM9Dj1oxM3":
      return "evade-scripts-lifetime";

    default:
      return null;
  }
}