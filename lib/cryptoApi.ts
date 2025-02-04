import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { marketData } from "./types/marketData";
import { searchCoins } from "./types/searchCoin";
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
  }),
});
export const { useGetMarketDataQuery, useGetAllCurrenciesQuery } = cryptoApi;
