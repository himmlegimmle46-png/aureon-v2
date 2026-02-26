import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
const prisma = getPrisma();

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData();

  const adminKey = String(form.get("adminKey") ?? "");
  const sku = String(form.get("sku") ?? "").trim();
  const keysRaw = String(form.get("keys") ?? "");

  const expected = process.env.ADMIN_STOCK_KEY;
  if (!expected) return NextResponse.json({ error: "Missing ADMIN_STOCK_KEY" }, { status: 500 });

  if (adminKey !== expected) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sku) return NextResponse.json({ error: "Missing sku" }, { status: 400 });

  const keys = keysRaw
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (keys.length === 0) return NextResponse.json({ error: "No keys provided" }, { status: 400 });

  const product = await prisma.product.upsert({
    where: { sku },
    update: {},
    create: { sku, name: sku },
  });

  await prisma.stockItem.createMany({
    data: keys.map((k) => ({ productId: product.id, key: k })),
  });

  return NextResponse.redirect(new URL("/admin/stock", req.url));
}