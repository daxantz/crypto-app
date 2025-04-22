import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const currency = request.nextUrl.searchParams.get("currency");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_CRYPTO_URL}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      throw new Error("failed to get top 10 coin data");
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    if (error instanceof Error) return Response.json({ error: error.message });
  }
}
