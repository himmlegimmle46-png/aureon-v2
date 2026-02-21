import { Card } from "../../components/ui";

export default function TermsPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Terms of Service</h1>

      <Card className="p-5 space-y-3 text-sm text-white/70">
        <p>
          **Aureon — Terms of Service**

Last updated: [2/21/2026]

Welcome to Aureon (“we,” “us,” or “our”). By accessing this website or purchasing any product or service, you agree to the following Terms of Service.

---

### 1. Digital Products and Services

All items sold through Aureonare digital products or services. Delivery methods and timelines may vary depending on availability, verification steps, or technical requirements.

We reserve the right to modify or discontinue any product at any time without prior notice.

---

### 2. Payments

Payments are securely processed through third-party payment providers such as Stripe. By completing a purchase, you authorize the listed payment amount for the selected product.

We do not store or process full payment card details on our servers.

---

### 3. Refund Policy

Due to the nature of digital goods, all sales are generally considered final once delivery has begun, unless required otherwise by applicable law. If you experience an issue with your purchase, contact support before initiating disputes or chargebacks.

---

### 4. Chargebacks and Disputes

Initiating fraudulent chargebacks or payment disputes may result in suspension of access to services and refusal of future transactions. Customers agree to contact Aureon 
support first to resolve any concerns.

---

### 5. User Responsibilities

You are responsible for:

* Providing accurate purchase information
* Maintaining account security
* Complying with applicable laws and third-party platform rules

Aureon is not responsible for misuse of purchased products or violations of external platform policies.

---

### 6. Availability and Errors

We attempt to keep product listings accurate, but pricing, availability, or descriptions may occasionally contain errors. We reserve the right to cancel or refund orders affected by incorrect listings.

---

### 7. Limitation of Liability

To the maximum extent permitted by law, Aureon shall not be liable for indirect, incidental, or consequential damages arising from the use of this website or purchased products.

---

### 8. Changes to These Terms

We may update these Terms of Service at any time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.

---

### 9. Contact

For support or inquiries, contact Aureon 
through the official support channel listed on the website.

        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>No refunds once delivery has begun unless required by law.</li>
          <li>Don’t chargeback — contact support first.</li>
          <li>By purchasing you agree to these terms.</li>
        </ul>
      </Card>
    </div>
  );
}