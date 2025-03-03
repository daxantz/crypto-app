"use client";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TableItem from "./TableItem";

export type CoinMarketData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
};

const CoinTable = () => {
  const [coins, setCoins] = useState<CoinMarketData[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>("");
  function fetchData() {
    async function fetchCoins() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page.toString()}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        const data = await res.json();
        setCoins((coins) => [...coins, ...data]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
    fetchCoins();
    setPage((page) => page + 1);
  }

  return (
    <table className=" w-full border-collapse">
      <thead>
        <tr className="flex gap-5 justify-around py-4 px-5">
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>1h%</th>
          <th>24h%</th>
          <th>7d%</th>
          <th>24h volume / Market Cap</th>
          <th>Circulating / Total supply</th>
          <th>Last 7d</th>
        </tr>
      </thead>

      <tbody>
        <InfiniteScroll
          className="flex flex-col gap-2"
          dataLength={coins.length}
          next={fetchData}
          hasMore={true}
          loader={
            <tr>
              <td colSpan={9} className="text-center">
                Loading...
              </td>
            </tr>
          }
          endMessage={
            <tr>
              <td colSpan={9} className="text-center">
                <b>Yay! You have seen it all</b>
              </td>
            </tr>
          }
        >
          {coins.map((coin, index) => (
            <TableItem coin={coin} key={coin.id} index={index} />
          ))}
        </InfiniteScroll>
      </tbody>
      {error !== null && <p>{error}</p>}
    </table>
  );
};

export default CoinTable;
