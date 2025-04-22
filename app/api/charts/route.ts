import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const coinId = request.nextUrl.searchParams.get("coinId");
    const days = request.nextUrl.searchParams.get("days");
    const currency = request.nextUrl.searchParams.get("currency");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_CRYPTO_URL}coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`,
      { next: { revalidate: 3600 }, cache: "force-cache" }
    );
    if (!res.ok) {
      throw new Error(`failed to get ${coinId}'s chart data`);
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
  }
}
