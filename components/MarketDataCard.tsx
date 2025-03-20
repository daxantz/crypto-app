import React from "react";
import Humanize from "humanize-plus";
import PlusButton from "@/components/PlusButton";
import { CardProps } from "./CoinPriceCard";
const MarketDataCard = ({ coin, selectedCurrency }: CardProps) => {
  const volumeMarket =
    coin &&
    coin?.market_data.total_volume[selectedCurrency] /
      coin?.market_data.market_cap[selectedCurrency];
  return (
    <div className="py-10 px-14 flex flex-col gap-8 rounded-xl  bg-[#1E1932]   h-[26.26rem]">
      <div className="upper flex flex-col gap-4">
        <div className="flex justify-between ">
          <p className="flex gap-3">
            <PlusButton /> Market cap{" "}
          </p>
          <p>
            $
            {Humanize.formatNumber(
              coin?.market_data.market_cap[selectedCurrency] as number
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="flex gap-3">
            <PlusButton />
            Fully Diluted Valuation{" "}
          </p>
          <p>
            $
            {Humanize.formatNumber(
              coin?.market_data.fully_diluted_valuation[
                selectedCurrency
              ] as number
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="flex gap-3 ">
            {" "}
            <PlusButton /> Volume 24h{" "}
          </p>
          <p>
            $
            {Humanize.formatNumber(
              coin?.market_data.total_volume[selectedCurrency] as number
            )}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="flex gap-3">
            <PlusButton />
            Volume/Market
          </p>
          <p>{volumeMarket?.toFixed(5)}</p>
        </div>
      </div>
      <div className="lower flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="flex gap-3">
            <PlusButton />
            Total Volume{" "}
          </p>
          <p>
            {Humanize.formatNumber(
              coin?.market_data.total_volume[selectedCurrency] as number
            )}{" "}
            {coin?.symbol.toUpperCase()}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="flex gap-3">
            {" "}
            <PlusButton />
            Circulating Supply{" "}
          </p>
          <p>
            {Humanize.formatNumber(
              coin?.market_data.circulating_supply as number
            )}{" "}
            {coin?.symbol.toUpperCase()}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="flex gap-3">
            {" "}
            <PlusButton />
            Max Supply{" "}
          </p>
          <p>
            {Humanize.formatNumber(coin?.market_data.max_supply as number)}{" "}
            {coin?.symbol.toUpperCase()}
          </p>
        </div>
      </div>
      <progress
        className="w-full progress-bar btc"
        value={coin?.market_data.circulating_supply}
        max={coin?.market_data.total_supply}
      />
    </div>
  );
};

export default MarketDataCard;
