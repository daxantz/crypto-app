"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetTop10CurrenciesQuery, usePrefetch } from "@/lib/cryptoApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Humanize from "humanize-plus";

import IntervalSelector from "./IntervalSelector";
import CompareButton from "./CompareButton";
import { setSelectedCoin, setSelectedCoins } from "@/lib/coinSlice";
import { searchCoins } from "@/lib/types/searchCoin";
import { Currency } from "@/lib/currencySlice";
import ChartContainer from "./ChartContainer";
const CoinCarousel = () => {
  const dispatch = useDispatch();
  const [days, setDays] = useState("30");

  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.currency
  );
  const selectedCoin = useSelector(
    (state: RootState) => state.coins.selectedCoin
  );

  const { data, isLoading } = useGetTop10CurrenciesQuery(selectedCurrency, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    if (data && data.length > 0 && !selectedCoin) {
      dispatch(setSelectedCoin(data[0]));
      dispatch(setSelectedCoins(data[0]));
    }
  }, [data, selectedCoin, dispatch]);

  if (isLoading) return "loading...";

  return (
    <div>
      <Carousel className="mt-20">
        <div className="flex justify-between">
          <p className="self-end">Select the currency to view statistics</p>
          <CompareButton />
        </div>
        <CarouselContent className="flex gap-4 p-4 ">
          {data?.map((coin) => (
            <CoinCard
              coin={coin}
              days={days}
              data={data}
              selectedCurrency={selectedCurrency}
              isLoading={isLoading}
              key={coin.id}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <ChartContainer days={days} />
      <IntervalSelector setDays={setDays} days={days} />
    </div>
  );
};

export default CoinCarousel;

type CoinCardProps = {
  coin: searchCoins;
  days: string;
  data: searchCoins[];
  selectedCurrency: Currency;
  isLoading: boolean;
};
const CoinCard = ({
  coin,
  days,
  data,
  selectedCurrency,
  isLoading,
}: CoinCardProps) => {
  const prefetchChartData = usePrefetch("getCoinChartData");
  const dispatch = useDispatch();
  const isComparing = useSelector(
    (state: RootState) => state.coins.isComparing
  );
  const selectedCoin = useSelector(
    (state: RootState) => state.coins.selectedCoin
  );
  const selectedCoins = useSelector(
    (state: RootState) => state.coins.compareCoins
  );

  function handleClick(coinId: string) {
    if (selectedCoin && isComparing) {
      const compareCoin = data?.find((coin) => coin.id === coinId);

      if (compareCoin) dispatch(setSelectedCoins(compareCoin));

      return;
    }

    dispatch(setSelectedCoin(data?.find((coin) => coin.id === coinId)));
  }
  return (
    <CarouselItem
      onMouseOver={() =>
        prefetchChartData({
          days: days,
          coinId: coin.id,
          currency: selectedCurrency,
        })
      }
      onClick={() => {
        handleClick(coin.id);
      }}
      className={`flex basis-1/5 gap-4 py-4 px-8 rounded-md bg-[#191925] 
    ${selectedCoin?.id === coin.id ? "bg-[#6161D680] btn " : ""}
    ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${
      isComparing && selectedCoins[1]?.id === coin.id
        ? "bg-[#6161D680] btn"
        : ""
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
  );
};
