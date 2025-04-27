import {
  fetchCoinGraphPrices,
  formatWithDashes,
  getMonthlyAverages,
} from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    let coin1Prices;
    let coin2Prices;
    let coin1MonthlyAverage: [string, number][] | undefined;
    let coin2MonthlyAverage: [string, number][] | undefined;

    const params = req.nextUrl.searchParams;
    const curr1 = formatWithDashes(params.get("c1")?.toLowerCase());
    const curr2 = formatWithDashes(params.get("c2")?.toLowerCase());
    if (curr1 != null && curr2 != null) {
      // Fetch both coin prices concurrently using Promise.all
      const [coin1PricesData, coin2PricesData] = await Promise.all([
        fetchCoinGraphPrices(curr1, "365"),
        fetchCoinGraphPrices(curr2, "365"),
      ]);

      coin1Prices = coin1PricesData;
      coin2Prices = coin2PricesData;

      // Process monthly averages for both coins
      coin1MonthlyAverage = getMonthlyAverages(coin1Prices);
      coin2MonthlyAverage = getMonthlyAverages(coin2Prices);
    }

    const avg = coin1MonthlyAverage?.map(([month, price], index) => {
      if (coin2MonthlyAverage) {
        return [month, price / coin2MonthlyAverage[index][1]];
      }
    });

    return Response.json(avg);
  } catch (error) {
    if (error instanceof Error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
  }
}
