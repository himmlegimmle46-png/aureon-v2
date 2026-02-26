import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPrisma } from "@/lib/prisma";
const prisma = getPrisma();

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sku: string }> }
) {
  const { sku } = await params;

  const product = await prisma.product.findUnique({ where: { sku } });
  if (!product) return NextResponse.json({ sku, remaining: 0 });

  const remaining = await prisma.stockItem.count({
    where: { productId: product.id, claimedAt: null },
  });

  return NextResponse.json({ sku, remaining });
}