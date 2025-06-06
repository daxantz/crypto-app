"use client";

import React, { useState } from "react";
import CoinConvertor from "./CoinConvertor";
import ConvertorChart from "./ConvertorChart";
import { searchCoins } from "@/lib/types/searchCoin";
import { useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { useGetExhangeRatesQuery } from "@/lib/cryptoApi";
import { Skeleton } from "./ui/skeleton";

const ConvertorContainer = ({ data }: { data: searchCoins[] }) => {
  const [convertQuantity, setConvertQuantity] = useState(0);
  const coin1 = useSelector((state: RootState) => state.convertor.coin1);
  const coin2 = useSelector((state: RootState) => state.convertor.coin2);
  const { data: exchangeRate, isLoading } = useGetExhangeRatesQuery({
    currency1: coin1.id,
    currency2: coin2.id,
  });

  const coin1ToBtc = exchangeRate?.[coin1?.id]?.["btc"];
  const btcToCoin2 =
    convertQuantity / (exchangeRate ? exchangeRate?.[coin2?.id]?.["btc"] : 0);
  const finalPrice = coin1ToBtc != undefined ? coin1ToBtc * btcToCoin2 : 0;
  if (isLoading)
    return (
      <div className="bg-white dark:bg-[#191932] flex flex-col gap-6 p-6 mt-10 rounded-xl">
        {/* Title Skeleton */}
        <Skeleton className="h-6 sm:h-8 w-[60%]" />

        {/* Chart Area Skeleton */}
        <div className="h-[250px] sm:h-[500px] flex">
          <Skeleton className="w-full rounded-md" />
        </div>
      </div>
    );
  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row sm:flex-1 gap-6">
        <CoinConvertor
          color="#191932"
          sellOrBuy="sell"
          coins={data}
          selectedCoin={coin1}
          convertQuantity={convertQuantity}
          setConvertQuantity={setConvertQuantity}
        />
        <CoinConvertor
          color="#1E1932"
          sellOrBuy="buy"
          coins={data}
          selectedCoin={coin2}
          price={finalPrice}
        />
      </div>
      <ConvertorChart coin1={coin1} coin2={coin2} />
    </div>
  );
};

export default ConvertorContainer;
