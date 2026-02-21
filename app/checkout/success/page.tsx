import { Button, Card } from "../../../components/ui";

export default function SuccessPage() {
  return (
    <div className="grid place-items-center">
      <Card className="p-6 max-w-md w-full text-center">
        <h1 className="text-xl font-semibold">Payment successful ✅</h1>
        <p className="text-sm text-white/60 pt-2">
          If this were live, you’d now show instructions (Discord ticket, delivery steps, etc).
        </p>

        <div className="pt-5 flex justify-center gap-3">
          <Button href="/accounts">Back to Accounts</Button>
          <Button href="/" variant="ghost">Home</Button>
        </div>
      </Card>
    </div>
  );
}