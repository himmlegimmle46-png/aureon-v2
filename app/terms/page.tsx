import { Card } from "../../components/ui";

export default function TermsPage() {
  const lastUpdated = "Feb 21, 2026"; // change whenever you update terms

  return (
    <div className="mx-auto w-full max-w-5xl grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Terms of Service</h1>
        <p className="text-sm text-white/60 pt-1">Last updated: {lastUpdated}</p>
      </div>

      <Card className="p-6 grid gap-6">
        <p className="text-sm text-white/70 leading-relaxed">
          By accessing this website or purchasing any product or service from Aureon (“Aureon”, “we”, “us”),
          you agree to these Terms of Service (“Terms”). If you do not agree, do not use the site.
        </p>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">1. Eligibility</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            You must be able to form a legally binding agreement in your jurisdiction to use this website.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">2. Orders & Delivery</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            After checkout, delivery instructions will be shown on-screen and/or provided via the contact
            method you supply. You are responsible for providing accurate information.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">3. Refunds</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Refund eligibility depends on the product/service and whether delivery has occurred. If you
            believe there is an issue with your order, contact support as soon as possible.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">4. Prohibited Use</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            You agree not to misuse the website, attempt unauthorized access, disrupt the service, or use
            the site for unlawful activity.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">5. Limitation of Liability</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            To the maximum extent permitted by law, Aureon is not liable for indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or revenue.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">6. Changes</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We may update these Terms from time to time. Continued use of the site after changes means you
            accept the updated Terms.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">7. Contact</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            For questions about these Terms or an order, use the Contact page.
          </p>
        </div>
      </Card>
    </div>
  );
}