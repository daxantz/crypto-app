import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.search.split("=")[1];

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_CRYPTO_URL}search?query=${query}`,
      { next: { revalidate: 3600 }, cache: "force-cache" }
    );
    if (!res.ok) {
      throw new Error("couldnt find results");
    }

    const data = await res.json();

    return Response.json(data.coins);
  } catch (error) {
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
  }
}
