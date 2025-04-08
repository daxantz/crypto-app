import { coin } from "@/lib/portfolioSlice";
import { BatchedCoin } from "@/lib/types/batchedCoin";
import Image from "next/image";
import React from "react";

type portfolioItemProps = {
  currency: string;
  coin: coin;
  data: BatchedCoin[];
};

const PortfolioItem = ({ currency, coin, data }: portfolioItemProps) => {
  const foundCoin = data.find((c) => c.id === coin.id);

  const marketcapVsVolume =
    foundCoin && (foundCoin?.total_volume / foundCoin?.market_cap) * 100;
  const circSupplyVsMaxSupply = foundCoin?.max_supply
    ? (foundCoin?.circulating_supply / foundCoin.max_supply) * 100
    : null;
  const totalValue = foundCoin?.current_price;
  const athChangePercentage = foundCoin?.ath_change_percentage;
  const hrChangePercentage = foundCoin?.price_change_percentage_24h;

  return (
    <div className="flex rounded-lg">
      <div className="bg-[#191932] w-[23.7rem] py-6 px-4 flex flex-col gap-8 rounded-l-lg">
        <div className="flex gap-2">
          <Image width={32} height={32} src={coin.image} alt="coin image" />

          <h2 className="font-bold text-2xl">
            {coin.name} ({coin.symbol.toUpperCase()})
          </h2>
        </div>
        <div className=" flex flex-col gap-2">
          <p>Total Value</p>
          <p className="font-bold text-3xl">
            ${totalValue && totalValue.toFixed(2)} {currency.toUpperCase()}
            <span
              className={`text-base ${
                athChangePercentage && athChangePercentage < 0
                  ? "text-red-400"
                  : "text-[#01F1E3]"
              } ml-2`}
            >
              {athChangePercentage && athChangePercentage.toFixed(2)}%
            </span>
          </p>
          <p className="text-[#D1D1D1] text-sm">
            Recent purchase {coin.datePurchased.toString()}
          </p>
        </div>
      </div>
      <div className="bg-[#2D2D51] grid grid-cols-2 flex-1 py-6 px-4 gap-5 rounded-r-xl">
        <div className=" border border-[#191932] rounded-lg px-2 py-3">
          <p>${coin.amountPurchased}</p>
          <p className="text-[#D1D1D1] text-sm">Amount purchased</p>
        </div>
        <div
          className={` border border-[#191932] rounded-lg px-2 py-3 ${
            hrChangePercentage && hrChangePercentage < 0
              ? "text-red-400"
              : "text-[#01F1E3]"
          }`}
        >
          <p> {hrChangePercentage && hrChangePercentage.toFixed(2)}%</p>
          <p className="text-[#D1D1D1] text-sm">24h%</p>
        </div>
        <div className="border border-[#191932] rounded-lg px-2 py-3">
          <div className="flex items-end gap-5">
            <span
              className={`${
                marketcapVsVolume && marketcapVsVolume < 0
                  ? "text-red-400"
                  : "text-[#01F1E3]"
              }`}
            >
              {marketcapVsVolume?.toFixed(0)}%
            </span>{" "}
            <progress
              className="progress-bar success flex-1   "
              max={100}
              value={marketcapVsVolume}
            />
          </div>
          <p className="text-[#D1D1D1] text-sm">Market cap vs volume</p>
        </div>
        <div className=" border border-[#191932] rounded-lg px-2 py-3">
          <p
            className={`${
              circSupplyVsMaxSupply && circSupplyVsMaxSupply < 0
                ? "text-red-400"
                : "text-[#01F1E3]"
            }`}
          >
            {circSupplyVsMaxSupply === null
              ? "N/A"
              : circSupplyVsMaxSupply.toFixed(2) + "%"}
          </p>
          <p className="text-[#D1D1D1] text-sm">Circ supply vs max supply</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
