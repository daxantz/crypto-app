import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { marketData } from "./types/marketData";
import { searchCoins } from "./types/searchCoin";
import { Currency } from "./currencySlice";
import { chartCoin } from "./types/chartCoin";
import { CoinDetails } from "./types/coinDetails";
import { BatchedCoin } from "./types/batchedCoin";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_CRYPTO_URL,
  }),
  endpoints: (build) => ({
    getMarketData: build.query<marketData, void>({
      query: () => "global",
    }),
    getAllCurrencies: build.query<searchCoins[], void>({
      query: () => "coins/list",
    }),
    getTop10Currencies: build.query<searchCoins[], Currency>({
      query: (currency: Currency) =>
        `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10`,
    }),
    getCoinChartData: build.query<
      chartCoin,
      { coinId: string; currency: Currency; days: string }
    >({
      query: ({ coinId, currency, days }) =>
        `coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`,
    }),
    getCoinById: build.query<CoinDetails, string>({
      query: (coinId) => `coins/${coinId}`,
    }),
    getCoinsByIds: build.query<
      BatchedCoin[],
      { idString: string; currency: string }
    >({
      query: ({ idString, currency }) =>
        `coins/markets?vs_currency=${currency}&ids=${idString}`,
    }),
  }),
});
export const {
  useGetMarketDataQuery,
  useGetAllCurrenciesQuery,
  useGetTop10CurrenciesQuery,
  useGetCoinChartDataQuery,
  useGetCoinByIdQuery,
  useGetCoinsByIdsQuery,
} = cryptoApi;
