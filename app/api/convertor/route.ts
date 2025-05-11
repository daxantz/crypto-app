import { formatWithDashes } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const curr1 = formatWithDashes(params.get("c1")?.toLowerCase());
    const curr2 = formatWithDashes(params.get("c2")?.toLowerCase());

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_CRYPTO_URL}simple/price?ids=${curr1},${curr2}&vs_currencies=btc`,
      {
        next: { revalidate: 3600 },
        cache: "force-cache",
      }
    );
    if (!res.ok) {
      throw new Error("failed to get market data");
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
