"use client";

import React from "react";
import { Layers, Triangle } from "lucide-react";
import { CoinDetails } from "@/lib/types/coinDetails";

import Humanize from "humanize-plus";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
export type CardProps = {
  coin: CoinDetails | undefined;
};
const CoinPriceCard = ({ coin }: CardProps) => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.currency
  );
  return (
    <div className="bg-[#1E1932] py-10 px-14 flex flex-col gap-6 rounded-xl sm:w-[22.18rem] h-[333px]">
      <p className="font-bold text-4xl">
        $
        {Humanize.formatNumber(
          coin?.market_data.current_price[selectedCurrency] as number
        )}{" "}
        <span
          className={`font-medium text-xl ${
            (coin?.market_data.price_change_percentage_24h as number) < 0
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {coin?.market_data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
      <p>Profit: TBD</p>
      <div className="self-center">
        <Layers size={24} />
      </div>

      <div>
        <div className="flex gap-4">
          <Triangle fill="green" color="green" width={16} height={16} />
          <div>
            <p className="font-normal">
              All time high:{" "}
              <span className="font-medium text-xl">
                $
                {Humanize.formatNumber(
                  coin?.market_data.ath[selectedCurrency] as number
                )}
              </span>
            </p>
            <p className="text-[#B9B9BA] font-normal text-sm">
              {new Date(
                coin?.market_data.ath_date[selectedCurrency] as string
              ).toUTCString()}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <Triangle
            fill="red"
            color="red"
            width={16}
            height={16}
            transform="rotate(180)"
          />
          <div>
            <p>
              All time low:{" "}
              <span className=" font-medium text-xl ">
                $
                {Humanize.formatNumber(
                  coin?.market_data.atl[selectedCurrency] as number
                )}
              </span>
            </p>
            <p className="text-[#B9B9BA] font-normal text-sm">
              {new Date(
                coin?.market_data.atl_date[selectedCurrency] as string
              ).toUTCString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPriceCard;
