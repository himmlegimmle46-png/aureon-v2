import { Card } from "../../components/ui";

export default function TermsPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Terms of Service</h1>

      <Card className="p-5 space-y-3 text-sm text-white/70">
        <p>
          This is a template. Replace this with your real terms.
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