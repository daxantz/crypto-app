"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  useGetCoinChartDataQuery,
  useGetTop10CurrenciesQuery,
} from "@/lib/cryptoApi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Humanize from "humanize-plus";
import { searchCoins } from "@/lib/types/searchCoin";
import Barchart from "./Barchart";
import Graphchart from "./Graphchart";
import IntervalSelector from "./IntervalSelector";
const CoinCarousel = () => {
  const [selectedCoin, setSelectedCoin] = useState<searchCoins | undefined>();
  const [days, setDays] = useState("24");

  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.currency
  );
  const { data, isLoading } = useGetTop10CurrenciesQuery(selectedCurrency, {
    refetchOnMountOrArgChange: false,
  });
  const {
    currentData: coinData,
    error: chartError,
    isLoading: isCoinDataLoading,
    isFetching,
  } = useGetCoinChartDataQuery(
    {
      coinId: selectedCoin?.id || "bitcoin",
      currency: selectedCurrency,
      days: days,
    },
    { skip: !selectedCoin?.id, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (data && data.length > 0 && !selectedCoin) {
      setSelectedCoin(data[0]);
    }
  }, [data, selectedCoin]);

  function handleClick(coinId: string) {
    setTimeout(() => {
      setSelectedCoin((coin) => {
        if (coin?.id === coinId) return coin;
        return data?.find((coin) => coin.id === coinId);
      });
    }, 100);
  }

  if (isLoading) return "loading...";
  return (
    <div>
      <Carousel className="mt-20">
        <p>Select the currency to view statistics</p>
        <CarouselContent className="flex gap-4 p-4 ">
          {data?.map((coin) => (
            <CarouselItem
              onClick={() => {
                if (!isFetching) handleClick(coin.id);
              }}
              className={`flex basis-1/5 gap-4 py-4 px-8 rounded-md bg-[#191925] 
                ${selectedCoin?.id === coin.id ? "bg-[#6161D680] btn " : ""}
                ${
                  isFetching
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
              key={coin.id}
            >
              <Image
                src={coin.image}
                width={50}
                height={35}
                alt={`${coin.name} image`}
                quality={100}
              />

              <div>
                <p>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </p>
                <span>
                  {Humanize.formatNumber(coin.total_supply)}{" "}
                  {selectedCurrency.toUpperCase()}
                </span>
                <span
                  className={`${
                    coin.price_change_percentage_24h < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {" "}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {selectedCoin && coinData && (
        <div className="flex gap-8">
          <Graphchart
            coinData={coinData}
            isLoading={isCoinDataLoading}
            error={chartError}
            selectedCoin={selectedCoin}
          />
          <Barchart
            coinData={coinData}
            isLoading={isCoinDataLoading}
            error={chartError}
          />
        </div>
      )}
      <IntervalSelector setDays={setDays} days={days} />
    </div>
  );
};

export default CoinCarousel;
