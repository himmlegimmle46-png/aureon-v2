import { Card } from "../../components/ui";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <div className="text-sm text-white/70 leading-relaxed">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  const lastUpdated = "Feb 21, 2026"; // change whenever you update terms

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-2xl font-semibold">Terms of Service</h1>
        <p className="text-sm text-white/60 pt-1">Last updated: {lastUpdated}</p>
      </div>

      <Card className="p-6 grid gap-6">
        <p className="text-sm text-white/70 leading-relaxed">
          By accessing this website or purchasing any product or service from Aureon
          (“we”, “us”, “our”), you agree to the terms below.
        </p>

        <Section title="1) Digital Products">
          All items sold are digital goods or digital services. Delivery timelines can
          vary depending on availability and verification steps.
        </Section>

        <Section title="2) Payments">
          Payments are processed through third-party providers (e.g., Stripe). We do not
          store full payment card details on our servers.
        </Section>

        <Section title="3) Refunds">
          Because digital goods can’t be “returned”, purchases are generally final once
          delivery has started, except where required by law. If you have an issue,
          contact support first and we’ll try to resolve it.
        </Section>

        <Section title="4) Chargebacks & Disputes">
          Don’t chargeback as a first step. If you open a dispute without contacting
          us, we may refuse future service. Fraudulent disputes may result in a ban
          from future purchases.
        </Section>

        <Section title="5) User Responsibilities">
          You are responsible for keeping your accounts secure and complying with any
          relevant platform rules and laws. We are not responsible for consequences of
          misuse or rule violations.
        </Section>

        <Section title="6) Availability & Errors">
          Product availability, pricing, and descriptions may change. If an order is
          affected by an error or stock issue, we may cancel and refund it.
        </Section>

        <Section title="7) Limitation of Liability">
          To the maximum extent permitted by law, Aureon is not liable for indirect
          or consequential damages related to use of the website or products.
        </Section>

        <Section title="8) Changes">
          We may update these terms at any time. Continued use of the site after updates
          means you accept the new terms.
        </Section>

        <div className="pt-2 border-t border-white/10">
          <p className="text-sm text-white/70 pt-4">
            Support: use the official support contact listed on this website.
          </p>
        </div>
      </Card>
    </div>
  );
}