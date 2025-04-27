import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { marketData } from "./types/marketData";
import { queryCoin, searchCoins } from "./types/searchCoin";
import { Currency } from "./currencySlice";
import { chartCoin } from "./types/chartCoin";

import { BatchedCoin } from "./types/batchedCoin";
import { rate } from "./types/rate";

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
    getExhangeRates: build.query<
      rate,
      { currency1: string; currency2: string }
    >({
      query: ({ currency1, currency2 }) =>
        `api/convertor/?c1=${currency1}&c2=${currency2}`,
    }),
    getGraphExhangeRates: build.query<
      graphExchange,
      { coin1Id: string; coin2Id: string }
    >({
      query: ({ coin1Id, coin2Id }) =>
        `api/convertorGraph/?c1=${coin1Id}&c2=${coin2Id}`,
    }),
  }),
  keepUnusedDataFor: 60 * 10,
});

type graphExchange = [string, number][];

export const {
  useGetMarketDataQuery,
  useGetAllCurrenciesQuery,
  useGetTop10CurrenciesQuery,
  useGetCoinChartDataQuery,
  useGetExhangeRatesQuery,
  useGetGraphExhangeRatesQuery,
  useGetCoinsByIdsQuery,
  usePrefetch,
} = cryptoApi;
