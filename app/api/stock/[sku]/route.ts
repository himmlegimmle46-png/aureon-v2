import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { sku: string } }
) {
  const prisma = getPrisma();
  const { sku } = params;

  const product = await prisma.product.findUnique({ where: { sku } });
  if (!product) return NextResponse.json({ sku, remaining: 0 });

  const remaining = await prisma.stockItem.count({
    where: { productId: product.id, claimedAt: null },
  });

  return NextResponse.json({ sku, remaining });
}