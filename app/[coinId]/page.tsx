"use client";

import CoinImageBox from "@/components/CoinImageBox";
import CopyLink from "@/components/CopyLink";
import { useGetCoinByIdQuery } from "@/lib/cryptoApi";
import { RootState } from "@/lib/store";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import CoinPriceCard from "@/components/CoinPriceCard";
import MarketDataCard from "@/components/MarketDataCard";
import CoinDesciptionBox from "@/components/CoinDesciptionBox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
const CoinDetails = () => {
  const params = useParams();
  const id = params.coinId as string;
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.currency
  );

  const { coin, isLoading, isError } = useGetCoinByIdQuery(id, {
    selectFromResult: ({ data, isError, isLoading }) => ({
      coin: data,
      isLoading,
      isError,
    }),
  });
  const blockchainLink = coin?.links.blockchain_site[2];
  const btcLink = coin?.links.blockchain_site[3];
  const tokenLink = coin?.links.blockchain_site[4];
  const orgLink = coin?.links.homepage[0];

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p>Sorry! There was a problem getting the data for this coin</p>;
  return (
    <>
      <div className="flex gap-4 items-center my-12">
        <Link href="/portfolio">
          <ArrowLeft className="" />
        </Link>
        <p className="font-medium text-xl">
          Portfolio / Your <span>{coin?.name}</span> summary
        </p>
      </div>
      <div className="flex h-full gap-10  ">
        <div className="flex flex-col  w-[60%] justify-between">
          <div className="flex gap-8   ">
            <div className="w-[19.06rem] h-[333px] flex flex-col justify-between ">
              <div className="h-[75%]">
                <CoinImageBox
                  image={coin?.image.large}
                  title={coin?.name}
                  symbol={coin?.symbol}
                />{" "}
              </div>

              <CopyLink url={orgLink} />
            </div>

            <CoinPriceCard coin={coin} selectedCurrency={selectedCurrency} />
          </div>
          <CoinDesciptionBox coin={coin} />
        </div>
        <div className="flex flex-1 flex-col justify-between h-full gap-16  ">
          <MarketDataCard coin={coin} selectedCurrency={selectedCurrency} />
          <div className="flex flex-col gap-6 ">
            {coin && (
              <>
                <CopyLink url={blockchainLink} />
                <CopyLink url={btcLink} />
                <CopyLink url={tokenLink} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinDetails;
