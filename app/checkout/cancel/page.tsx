import { Button, Card } from "../../../components/ui";

export default function CancelPage() {
  return (
    <div className="grid place-items-center">
      <Card className="p-6 max-w-md w-full text-center">
        <h1 className="text-xl font-semibold">Checkout canceled</h1>
        <p className="text-sm text-white/60 pt-2">
          You can try again anytime.
        </p>

        <div className="pt-5 flex justify-center gap-3">
          <Button href="/accounts">Try Again</Button>
          <Button href="/" variant="ghost">Home</Button>
        </div>
      </Card>
    </div>
  );
}