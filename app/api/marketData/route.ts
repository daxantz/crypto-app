export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_CRYPTO_URL}global`,
      { next: { revalidate: 3600 }, cache: "force-cache" }
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
