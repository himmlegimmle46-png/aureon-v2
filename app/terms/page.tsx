import { Card } from "../../components/ui";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 text-sm text-white/70 leading-relaxed space-y-1">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}

export default function TermsPage() {
  const lastUpdated = "Feb 28, 2026"; // change whenever you update terms

  return (
    <div className="mx-auto w-full max-w-5xl grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Terms of Service</h1>
        <p className="text-sm text-white/60 pt-1">Last updated: {lastUpdated}</p>
      </div>

      <Card className="p-6 grid gap-6">
        <p className="text-sm text-white/70 leading-relaxed">
          These Terms of Service (“Terms”) govern your access to and use of this website and any products
          or services offered by Aureon (“Aureon”, “we”, “us”, or “our”). By accessing the website or
          completing a purchase, you agree to be legally bound by these Terms. If you do not agree, do not
          use the site.
        </p>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">1. Eligibility</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            You must be at least 18 years old, or the age of majority in your jurisdiction, and able to
            form a legally binding agreement to access the website or make a purchase. By placing an
            order, you represent that you meet these requirements.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">2. Digital Products &amp; Delivery</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            All items sold are digital goods and/or digital services. Delivery may be automated or manual.
            Delivery timelines can vary depending on availability, verification steps, fraud screening, or
            technical issues. Delivery is considered complete once the product, access credentials, or
            service has been made available to the email address or account details you provide at
            checkout.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            You are responsible for providing accurate information (including email address and any
            required details). We are not responsible for failed delivery caused by incorrect information
            submitted by the customer.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">3. Order Accuracy &amp; Customer Responsibility</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Before completing checkout, you are responsible for reviewing the product selection, pricing,
            and any compatibility or requirements stated on the product page.
          </p>
          <Bullets
            items={[
              "Verify you selected the correct product/variant.",
              "Confirm you understand what is included and any requirements or limitations.",
              "Review pricing and billing information before submitting payment.",
              "Ensure your intended use complies with applicable laws and any relevant platform rules.",
            ]}
          />
          <p className="text-sm text-white/70 leading-relaxed">
            Mistaken purchases, misunderstandings of product descriptions, or failure to review
            compatibility do not qualify as valid grounds for a refund.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">4. Payments</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Payments are processed through third-party payment processors (e.g., Stripe or other
            providers). We do not store full payment card details on our servers. By submitting payment,
            you authorize us and our payment processor to charge the total amount shown at checkout.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            Orders may be delayed, held, or canceled if flagged for fraud, risk review, or verification.
            If an order is canceled after payment, we will issue a refund for the amount paid (where
            applicable).
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">5. Refund Policy</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Due to the nature of digital goods, purchases are generally final once delivery has begun or
            access has been granted, except where required by law. Refunds may be issued at our discretion
            only when:
          </p>
          <Bullets
            items={[
              "A verified technical failure on our side prevents access or delivery.",
              "We are unable to complete delivery after reasonable attempts.",
              "A refund is required by applicable law.",
            ]}
          />
          <p className="text-sm text-white/70 leading-relaxed">
            Refunds will not be issued for:
          </p>
          <Bullets
            items={[
              "Customer error or mistaken purchases.",
              "Change of mind after purchase.",
              "Failure to review product details or requirements before checkout.",
              "Incompatibility not stated in the product description.",
              "Consequences arising from customer actions, including platform bans/suspensions or rule violations.",
            ]}
          />
          <p className="text-sm text-white/70 leading-relaxed">
            If you believe there is an issue with your order, contact support as soon as possible. We may
            request reasonable information to verify eligibility and resolve the issue.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">6. Chargebacks &amp; Disputes</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Do not initiate a chargeback or payment dispute as a first step. You agree to contact support
            and provide us a reasonable opportunity to resolve your issue before filing a dispute with
            your payment provider.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            If you open a dispute without contacting us first, we may refuse future service. We may submit
            transaction records and delivery/fulfillment evidence to the payment processor. Fraudulent or
            abusive disputes may result in a permanent ban from future purchases.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">7. User Conduct</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            You agree not to misuse the website or products, including attempting unauthorized access,
            disrupting the service, using the site for unlawful activity, or abusing refund/dispute
            systems.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            We reserve the right to refuse service, suspend access, or cancel orders if we reasonably
            believe fraud, abuse, or violation of these Terms has occurred.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">8. Availability &amp; Errors</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            Product availability, pricing, and descriptions may change at any time. If an order is
            affected by a listing error, stock issue, or technical problem, we may cancel the order and
            issue a refund where applicable.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">9. Limitation of Liability</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            To the maximum extent permitted by law, Aureon is not liable for indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or revenue arising from your use of
            the website or products.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            Our total liability for any claim relating to a purchase shall not exceed the amount you paid
            for the specific product or service giving rise to the claim.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            Products are provided “as is” and “as available” without warranties of any kind except where
            required by law.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">10. Third-Party Platforms</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We are not responsible for actions taken by third-party platforms or services, including but
            not limited to account suspensions, bans, policy enforcement, or service changes. Use of any
            product is at your own risk.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">11. Changes to These Terms</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            We may update these Terms at any time. The “Last updated” date will reflect changes. Continued
            use of the site after changes means you accept the updated Terms.
          </p>
        </div>

        <div className="grid gap-2">
          <h2 className="text-base font-semibold text-white">12. Contact</h2>
          <p className="text-sm text-white/70 leading-relaxed">
            For questions about these Terms or an order, contact us at{" "}
            <a
              className="text-white underline underline-offset-4 hover:text-white/90"
              href="mailto:redacted@aureon-collective.xyz"
            >
              redacted@aureon-collective.xyz
            </a>
            .
          </p>
        </div>
      </Card>
    </div>
  );
}