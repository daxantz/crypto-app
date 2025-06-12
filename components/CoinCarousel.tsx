"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetTop10CurrenciesQuery } from "@/lib/cryptoApi";
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
import { useRouter, useSearchParams } from "next/navigation";
import CardSkeleton from "./CardSkeleton";
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
    if (data && data.length > 0) {
      dispatch(setSelectedCoin(data[0]));
      dispatch(setSelectedCoins(data[0]));
    }
  }, [data, dispatch]);
  if (isLoading) return <CardSkeleton />;

  return (
    <div>
      <Carousel className="mt-20">
        <div className="flex justify-between">
          <p className="self-center text-xs text-black dark:text-[#E8E8E8]">
            Select the currency to view statistics
          </p>
          <CompareButton />
        </div>
        <CarouselContent className="flex gap-4 p-4 ">
          {data?.map((coin) => (
            <Suspense key={coin.id} fallback={<CardSkeleton />}>
              <CoinCard
                coin={coin}
                data={data}
                selectedCurrency={selectedCurrency}
                isLoading={isLoading}
                selectedCoin={selectedCoin}
              />
            </Suspense>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:inline-flex" />
        <CarouselNext className="hidden lg:inline-flex" />
      </Carousel>

      <ChartContainer days={days} />

      <IntervalSelector setDays={setDays} />
    </div>
  );
};

export default CoinCarousel;

type CoinCardProps = {
  coin: searchCoins;
  data: searchCoins[];
  selectedCurrency: Currency;
  isLoading: boolean;
  selectedCoin: searchCoins | null;
};

export const CoinCard = ({
  coin,
  data,
  selectedCurrency,
  isLoading,
}: CoinCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

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

    params.set("coinId", coinId);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <CarouselItem
      onClick={() => handleClick(coin.id)}
      className={`basis-[30%] flex gap-2 rounded-lg py-2 px-[10px]  dark:bg-[#181825] dark:border-none
        ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        
        md:flex md:gap-4 md:py-4 md:px-8 sm:basis-[40%] xl:basis-1/4 md:rounded-md bg-[#FFFFFF] border
        ${
          selectedCoin?.id === coin.id
            ? "dark:bg-[#6161D680] bg-[#6161D680]"
            : ""
        }
        ${
          isComparing && selectedCoins[1]?.id === coin.id
            ? "dark:bg-[#6161D680] bg-[#6161D680]"
            : ""
        }
      `}
      key={coin.id}
    >
      {/* <Image
        className="hidden md:block"
        src={coin.image}
        width={50}
        height={35}
        alt={`${coin.name} image`}
        quality={100}
      />
      <Image
        className=" md:hidden"
        src={coin.image}
        width={24}
        height={24}
        alt={`${coin.name} image`}
        quality={100}
      /> */}
      <div className="h-8 w-8 md:w-10 md:self-start self-center ">
        <Image
          src={coin.image}
          alt={`${coin.name} image`}
          width={100}
          height={50}
        />
      </div>

      <div>
        <p>
          <span className="hidden sm:inline">{coin.name}</span>{" "}
          <span className="hidden sm:inline">
            ({coin.symbol.toUpperCase()})
          </span>
          <span className="sm:hidden ">{coin.symbol.toUpperCase()}</span>
        </p>
        <span className="hidden lg:inline text-sm ">
          {Humanize.formatNumber(coin.current_price)}{" "}
          {selectedCurrency.toUpperCase()}
        </span>
        <span
          className={`hidden lg:inline ml-2 text-sm
            ${
              coin.price_change_percentage_24h < 0
                ? "md:text-red-600"
                : "md:text-green-600"
            }
          `}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>
    </CarouselItem>
  );
};
