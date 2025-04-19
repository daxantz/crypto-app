"use client";

import React from "react";
import CoinConvertor from "./CoinConvertor";
import ConvertorChart from "./ConvertorChart";
import { searchCoins } from "@/lib/types/searchCoin";
import { useSelector } from "react-redux";

import { RootState } from "@/lib/store";

const ConvertorContainer = ({ data }: { data: searchCoins[] }) => {
  const coin1 = useSelector((state: RootState) => state.convertor.coin1);
  const coin2 = useSelector((state: RootState) => state.convertor.coin2);

  return (
    <div>
      <div className="flex flex-1 border border-red-500 gap-6">
        <CoinConvertor
          color="#191932"
          sellOrBuy="sell"
          coins={data}
          selectedCoin={coin1}
        />
        <CoinConvertor
          color="#1E1932"
          sellOrBuy="buy"
          coins={data}
          selectedCoin={coin2}
        />
      </div>
      <ConvertorChart coin1={coin1} coin2={coin2} />
    </div>
  );
};

export default ConvertorContainer;
