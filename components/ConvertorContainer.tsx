"use client";

import React, { useState } from "react";
import CoinConvertor from "./CoinConvertor";
import ConvertorChart from "./ConvertorChart";
import { searchCoins } from "@/lib/types/searchCoin";
import { useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { useGetExhangeRatesQuery } from "@/lib/cryptoApi";

const ConvertorContainer = ({ data }: { data: searchCoins[] }) => {
  const [convertQuantity, setConvertQuantity] = useState(0);
  const coin1 = useSelector((state: RootState) => state.convertor.coin1);
  const coin2 = useSelector((state: RootState) => state.convertor.coin2);
  const { data: exchangeRate } = useGetExhangeRatesQuery({
    currency1: coin1.id,
    currency2: coin2.id,
  });

  const coin1ToBtc = exchangeRate?.[coin1?.id]?.["btc"];
  const btcToCoin2 =
    convertQuantity / (exchangeRate ? exchangeRate?.[coin2?.id]?.["btc"] : 0);
  const finalPrice = coin1ToBtc != undefined ? coin1ToBtc * btcToCoin2 : 0;

  return (
    <div className="mt-6">
      <div className="flex flex-1 gap-6">
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
