import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { marketData } from "./types/marketData";
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (build) => ({
    getMarketData: build.query<marketData, void>({
      query: () => "global",
    }),
  }),
});
export const { useGetMarketDataQuery } = cryptoApi;
