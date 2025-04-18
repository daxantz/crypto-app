import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const currency = request.nextUrl.searchParams.get("currency");
    const idString = request.nextUrl.searchParams.get("ids");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_CRYPTO_URL}coins/markets?vs_currency=${currency}&ids=${idString}`,
      { next: { revalidate: 3600 }, cache: "force-cache" }
    );
    if (!res.ok) {
      throw new Error("couldnt find results");
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
