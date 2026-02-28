import { getPrisma } from "@/lib/prisma";
import { isValidDeliveryToken } from "@/lib/delivery-access";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; t?: string };
}) {
  const prisma = getPrisma();

  const sessionId = searchParams.session_id;
  const token = searchParams.t;

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

  if (!delivery) {
    return (
      <div className="max-w-2xl mx-auto p-6 grid gap-4">
        <h1 className="text-2xl font-semibold">Payment successful</h1>
        <p className="text-white/70">
          We’re processing your order. If you don’t see your key in a minute, check your email.
        </p>
      </div>
    );
  }

  const hasAccess = isValidDeliveryToken(token, sessionId, delivery.customerEmail);

  return (
    <div className="max-w-2xl mx-auto p-6 grid gap-4">
      <h1 className="text-2xl font-semibold">Payment successful</h1>

      {!hasAccess ? (
        <div className="rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-5 grid gap-2">
          <p className="text-sm text-yellow-100 font-medium">Secure delivery link required</p>
          <p className="text-sm text-yellow-50/90">
            For privacy, we only show your key/account info through the secure link sent to your
            checkout email.
          </p>
          <p className="text-xs text-yellow-50/80">Check your inbox for the delivery email.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 grid gap-3">
          <div className="text-white/70 text-sm">
            Product: <span className="text-white">{delivery.product.name}</span>
          </div>

          <div className="text-white/70 text-sm">Your key / account info:</div>
          <pre className="whitespace-pre-wrap break-words rounded-xl bg-black/50 p-4 text-sm">
            {delivery.deliveredKey}
          </pre>

          <p className="text-white/60 text-xs">Usage instructions are included in your email.</p>
        </div>
      )}
    </div>
  );
}