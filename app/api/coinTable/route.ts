import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const currency = request.nextUrl.searchParams.get("curr");
    const page = request.nextUrl.searchParams.get("page");

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_CRYPTO_URL
      }coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=${page?.toString()}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
      { next: { revalidate: 3600 }, cache: "force-cache" }
    );
    if (!res.ok) {
      throw new Error("failed to get coin data");
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
