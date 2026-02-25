import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  context: { params: { sku: string } }
) {
  const sku = context.params.sku;

  const product = await prisma.product.findUnique({ where: { sku } });
  if (!product) return NextResponse.json({ sku, remaining: 0 });

  const remaining = await prisma.stockItem.count({
    where: { productId: product.id, claimedAt: null },
  });

  return NextResponse.json({ sku, remaining });
}