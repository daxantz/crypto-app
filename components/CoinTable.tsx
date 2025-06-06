"use client";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TableItem from "./TableItem";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

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
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page.toString()}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        const data = await res.json();
        setCoins((prev) => [...prev, ...data]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }

    fetchCoins();
    setPage((prev) => prev + 1);
  }

  return (
    <InfiniteScroll
      className="flex flex-col gap-2"
      dataLength={coins.length}
      next={fetchData}
      hasMore={true}
      loader={<Skeleton className="h-[500px] w-full" />}
      endMessage={
        <p className="text-center text-muted-foreground mt-4">
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <Table className="border-separate border-spacing-y-4">
        <TableHeader className="relative">
          <TableRow className="hidden sm:table-row">
            <TableHead className="w-1/9">#</TableHead>
            <TableHead className="w-1/9">Name</TableHead>
            <TableHead className="w-1/9">Price</TableHead>
            <TableHead className="w-1/9">1h%</TableHead>
            <TableHead className="w-1/9">24h%</TableHead>
            <TableHead className="w-1/9">7d%</TableHead>
            <TableHead>24h Vol / MCap</TableHead>
            <TableHead className="w-1/9">Supply</TableHead>
            <TableHead className="">Last 7d</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coins.map((coin, index) => (
            <TableItem key={coin.id} coin={coin} index={index} />
          ))}
        </TableBody>

        {error && (
          <tfoot>
            <TableRow>
              <TableCell colSpan={9} className="text-red-500 text-center">
                {error}
              </TableCell>
            </TableRow>
          </tfoot>
        )}
      </Table>
    </InfiniteScroll>
  );
};

export default CoinTable;
