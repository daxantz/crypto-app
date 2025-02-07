import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { marketData } from "./types/marketData";
import { searchCoins } from "./types/searchCoin";
import { Currency } from "./currencySlice";
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
  }),
});
export const {
  useGetMarketDataQuery,
  useGetAllCurrenciesQuery,
  useGetTop10CurrenciesQuery,
} = cryptoApi;
