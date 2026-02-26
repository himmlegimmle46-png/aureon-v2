import { NextResponse } from "next/server";
import { Webhook } from "svix";

export const runtime = "nodejs";

function mustGetEnv(name: string) {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

type ResendEvent = {
  type: string;
  data?: {
    to?: string[];
    subject?: string;
    email_id?: string;
    from?: string;
  };
};

export async function POST(req: Request) {
  try {
    const secret = mustGetEnv("RESEND_WEBHOOK_SECRET");
    const discordUrl = mustGetEnv("DISCORD_WEBHOOK_URL");

    const payload = await req.text();

    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
      return new NextResponse("Missing Svix headers", { status: 400 });
    }

    const wh = new Webhook(secret);
    const evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ResendEvent;

    const allowed = new Set(["email.delivered", "email.failed", "email.complained", "email.opened"]);
    if (!allowed.has(evt.type)) return NextResponse.json({ ok: true });

    const to = evt.data?.to?.join(", ") ?? "unknown";
    const subject = evt.data?.subject ?? "(no subject)";
    const emailId = evt.data?.email_id ?? "(no id)";

    const content =
      `**Resend:** \`${evt.type}\`\n` +
      `**To:** ${to}\n` +
      `**Subject:** ${subject}\n` +
      `**Email ID:** ${emailId}`;

    const r = await fetch(discordUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!r.ok) return NextResponse.json({ ok: false, error: "Discord webhook failed" }, { status: 502 });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}