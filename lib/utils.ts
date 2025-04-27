import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { chartPrices } from "./types/chartCoin";
import { format } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWithDashes(
  string: string | undefined
): string | undefined {
  if (!string) return;
  //abort if string doesnt have a space
  if (!string.includes(" ")) return string;
  //split string with spaces into array
  const words = string.split(" ");
  //join words together with -
  const stringWithDashes = words.join("-");
  return stringWithDashes;
}

export async function fetchCoinGraphPrices(
  coinId: string,
  days: string
): Promise<[number, number][]> {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
    {
      cache: "force-cache",
    }
  );
  const data = await res.json();
  return data.prices;
}

type monthlyAverages = {
  [month: string]: number[];
};
export function getMonthlyAverages(
  prices: chartPrices[]
): [string, number][] | undefined {
  if (!prices) return undefined;
  const monthlyAverages: monthlyAverages = {};

  prices.forEach(([timestamp, price]) => {
    const month = format(new Date(timestamp), "MMM");

    if (!monthlyAverages[month]) {
      monthlyAverages[month] = [];
    }

    monthlyAverages[month].push(price);
  });

  const array = Object.entries(monthlyAverages);
  const avgArray = array.map((array) => {
    const avg =
      array[1].reduce((acc, curr) => {
        return (acc += curr);
      }, 0) / array[1].length;

    return [array[0], avg];
  });

  return avgArray as [string, number][];
}
