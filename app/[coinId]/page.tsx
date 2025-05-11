import CoinImageBox from "@/components/CoinImageBox";
import CopyLink from "@/components/CopyLink";

import CoinPriceCard from "@/components/CoinPriceCard";
import MarketDataCard from "@/components/MarketDataCard";
import CoinDesciptionBox from "@/components/CoinDesciptionBox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { CoinDetails } from "@/lib/types/coinDetails";
const CoinDetails = async ({ params }: { params: { coinId: string } }) => {
  const searchParams = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_CRYPTO_URL}coins/${searchParams.coinId}`,
    { method: "GET", next: { revalidate: 3600 }, cache: "force-cache" }
  );
  const coin: CoinDetails = await res.json();
  const blockchainLink = coin?.links?.blockchain_site[2];
  const btcLink = coin?.links?.blockchain_site[3];
  const tokenLink = coin?.links?.blockchain_site[4];
  const orgLink = coin?.links?.homepage[0];

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
      <div className="flex flex-col md:flex-row h-full gap-2 sm:gap-10  ">
        <div className="flex flex-col  sm:w-[60%] justify-between">
          <div className="flex flex-col sm:flex-row gap-2  sm:gap-8   ">
            <div className="w-full sm:w-[19.06rem] sm:h-[333px] flex flex-col justify-between ">
              <div className="h-[75%]">
                <CoinImageBox
                  image={coin?.image?.large}
                  title={coin?.name}
                  symbol={coin?.symbol}
                />{" "}
              </div>
              <div className="hidden sm:block">
                <CopyLink url={orgLink} />
              </div>
            </div>

            <CoinPriceCard coin={coin} />
          </div>
          <CoinDesciptionBox coin={coin} />
        </div>
        <div className="flex flex-1 flex-col justify-between h-full gap-2 sm:gap-16  ">
          <MarketDataCard coin={coin} />
          <div className="flex flex-col gap-2 sm:gap-6 ">
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
