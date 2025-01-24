"use client";

import { useGetMarketDataQuery } from "@/lib/cryptoApi";
const MarketData = () => {
  const { data, isLoading } = useGetMarketDataQuery();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data?.data.total_volume["btc"]}</h1>
      <p>Hello</p>
    </div>
  );
};

export default MarketData;
