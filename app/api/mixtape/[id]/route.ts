import { NextRequest, NextResponse } from "next/server";
import { getMixtape } from "@/lib/spotify";

export const revalidate = 3600; // 1 hour

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const mixtape = await getMixtape(id);
  if (!mixtape) {
    return NextResponse.json(null, { status: 404 });
  }
  return NextResponse.json(mixtape, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
