"use client";

import { useGetMarketDataQuery } from "@/lib/cryptoApi";
import Image from "next/image";
import circle from "@/public/icons/flash-circle.svg";
import exchangeIcon from "@/public/icons/recovery-convert.svg";
import greenArrow from "@/public/icons/green-arrow.svg";
import btc from "@/public/icons/bitcoin-icon.svg";
import eth from "@/public/icons/eth-icon.svg";
import Humanize from "humanize-plus";
const MarketData = () => {
  const { data, isLoading } = useGetMarketDataQuery();
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex gap-8 bg-[#353570] text-white  py-4 px-[72px] justify-center text-xs items-center">
      <div className="flex gap-2">
        <Image src={circle} alt="circle-icon" />
        <span>Coins {data?.data.active_cryptocurrencies}</span>
      </div>
      <div className="flex gap-2">
        <Image src={exchangeIcon} alt="exchange-icon" />
        <span>Exchange {data?.data.markets}</span>
      </div>
      <div className="flex gap-2">
        <Image src={greenArrow} alt="green-arrow-icon" width={20} height={20} />
        <span>
          {Humanize.compactInteger(data?.data.total_market_cap["usd"] ?? 0, 2)}
        </span>
      </div>
      <div className="flex gap-2">
        <span>
          ${Humanize.compactInteger(data?.data.total_volume["usd"] ?? 0, 2)}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <Image src={btc} alt="bitcoin-icon" />
        <span>{Math.trunc(data?.data.market_cap_percentage["btc"] ?? 0)}%</span>
        <progress
          className="progress-bar btc"
          max={100}
          value={data?.data.market_cap_percentage["btc"]}
        />
      </div>
      <div className="flex gap-2 items-center">
        <Image src={eth} alt="ethereum-icon" />
        <span>{Math.trunc(data?.data.market_cap_percentage["eth"] ?? 0)}%</span>
        <progress
          className="progress-bar eth "
          max={100}
          value={data?.data.market_cap_percentage["eth"]}
        />
      </div>
    </div>
  );
};

export default MarketData;
