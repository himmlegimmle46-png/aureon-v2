import { getPrisma } from "@/lib/prisma";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const prisma = getPrisma();

  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Success</h1>
        <p className="text-white/70 mt-2">Missing session id.</p>
      </div>
    );
  }

  const delivery = await prisma.delivery.findUnique({
    where: { sessionId },
    include: { product: true },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 grid gap-4">
      <h1 className="text-2xl font-semibold">Payment successful</h1>

      {!delivery ? (
        <p className="text-white/70">
          We’re processing your order. If you don’t see your key in a minute, check your email.
        </p>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 grid gap-3">
          <div className="text-white/70 text-sm">
            Product: <span className="text-white">{delivery.product.name}</span>
          </div>

          <div className="text-white/70 text-sm">Your key:</div>
          <pre className="whitespace-pre-wrap wrap-break-word rounded-xl bg-black/50 p-4 text-sm">
            {delivery.deliveredKey}
          </pre>

          <p className="text-white/60 text-xs">
            We also emailed it to: {delivery.customerEmail}
          </p>
        </div>
      )}
    </div>
  );
}