"use client";

import { useGetMarketDataQuery } from "@/lib/cryptoApi";
import Image from "next/image";
import circle from "@/public/icons/flash-circle.svg";
import exchangeIcon from "@/public/icons/recovery-convert.svg";
import greenArrow from "@/public/icons/green-arrow.svg";
import btc from "@/public/icons/bitcoin-icon.svg";
import eth from "@/public/icons/eth-icon.svg";
import Humanize from "humanize-plus";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
const MarketData = () => {
  const { data, isLoading } = useGetMarketDataQuery();
  const currency = useSelector((state: RootState) => state.currency.currency);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex gap-8 bg-[#353570] text-white p-4 justify-center text-xs items-center border-y border-[#FFFFFF1A]">
      <div className="hidden sm:flex gap-2">
        <Image src={circle} alt="circle-icon" />
        <span>Coins {data?.data.active_cryptocurrencies}</span>
      </div>
      <div className="hidden sm:flex gap-2">
        <Image src={exchangeIcon} alt="exchange-icon" />
        <span>Exchange {data?.data.markets}</span>
      </div>
      <div className="hidden md:flex items-center">
        <Image src={greenArrow} alt="green-arrow-icon" width={20} height={20} />
        <span>
          {Humanize.compactInteger(
            data?.data.total_market_cap[currency] ?? 0,
            2
          )}
        </span>
      </div>
      <div>
        <span>
          ${Humanize.compactInteger(data?.data.total_volume[currency] ?? 0, 2)}
        </span>
      </div>
      <div className="flex items-center gap-[5px]">
        <Image src={btc} alt="bitcoin-icon" width={16} height={16} />
        <span>{Math.trunc(data?.data.market_cap_percentage["btc"] ?? 0)}%</span>
        <progress
          className="progress-bar btc w-[48px] sm:w-32"
          max={100}
          value={data?.data.market_cap_percentage["btc"]}
        />
      </div>
      <div className="flex items-center gap-[5px]">
        <Image src={eth} alt="ethereum-icon" width={16} height={16} />
        <span>{Math.trunc(data?.data.market_cap_percentage["eth"] ?? 0)}%</span>
        <progress
          className="progress-bar eth w-[48px] sm:w-32"
          max={100}
          value={data?.data.market_cap_percentage["eth"]}
        />
      </div>
    </div>
  );
};

export default MarketData;
