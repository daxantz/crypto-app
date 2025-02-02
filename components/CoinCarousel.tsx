"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetTop10CurrenciesQuery } from "@/lib/cryptoApi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import Humanize from "humanize-plus";
const CoinCarousel = () => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.currency
  );
  const { data, isLoading } = useGetTop10CurrenciesQuery(selectedCurrency);
  if (isLoading) return "loading...";

  return (
    <Carousel>
      <CarouselContent className="flex gap-4 ">
        {data?.map((coin) => (
          <CarouselItem
            className="flex basis-1/8 gap-4 py-4 px-8 rounded-md   bg-[#6161D680]"
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
  );
};

export default CoinCarousel;
