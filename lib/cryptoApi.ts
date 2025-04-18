import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { marketData } from "./types/marketData";
import { queryCoin, searchCoins } from "./types/searchCoin";
import { Currency } from "./currencySlice";
import { chartCoin } from "./types/chartCoin";

import { BatchedCoin } from "./types/batchedCoin";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (build) => ({
    getMarketData: build.query<marketData, void>({
      query: () => "api/marketData",
    }),
    getAllCurrencies: build.query<queryCoin[], string>({
      query: (query) => `api/search?search=${query}`,
    }),
    getTop10Currencies: build.query<searchCoins[], Currency>({
      query: (currency: Currency) => `api/top10?currency=${currency}`,
    }),
    getCoinChartData: build.query<
      chartCoin,
      { coinId: string; currency: Currency; days: string }
    >({
      query: ({ coinId, currency, days }) =>
        `api/charts?currency=${currency}&coinId=${coinId}&days=${days}`,
    }),

    getCoinsByIds: build.query<
      BatchedCoin[],
      { idString: string; currency: string }
    >({
      query: ({ idString, currency }) =>
        `api/portfolio/?currency=${currency}&ids=${idString}`,
    }),
  }),
  keepUnusedDataFor: 60 * 10,
});
export const {
  useGetMarketDataQuery,
  useGetAllCurrenciesQuery,
  useGetTop10CurrenciesQuery,
  useGetCoinChartDataQuery,

  useGetCoinsByIdsQuery,
  usePrefetch,
} = cryptoApi;
