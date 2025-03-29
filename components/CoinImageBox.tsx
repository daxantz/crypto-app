import Image from "next/image";
import React from "react";

const CoinImageBox = ({
  image,
  title,
  symbol,
}: {
  image: string | undefined;
  title: string | undefined;
  symbol: string | undefined;
}) => {
  if (!image || !title || !symbol)
    return (
      <div className="bg-[#1E1932] rounded-xl py-10 px-14  flex flex-col items-center justify-center h-[265px]  gap-6">
        <p className="text-3xl">Select a coin</p>
      </div>
    );
  if (!image)
    return (
      <div className="bg-[#1E1932] rounded-xl py-10 px-14  flex flex-col items-center justify-center h-[265px]  gap-6">
        <p className="text-3xl">
          {title} <span>({symbol.toUpperCase()})</span>
        </p>
      </div>
    );
  return (
    <div className="bg-[#1E1932] rounded-xl py-10 px-14  flex flex-col items-center justify-center h-[265px]  gap-6">
      <div className="bg-[#2C2C4A] rounded-md p-4 text-center w-16 h-16 ">
        <Image src={image} alt="coin logo" width={32} height={32} />
      </div>
      <p className="text-3xl">
        {title} <span>({symbol.toUpperCase()})</span>
      </p>
    </div>
  );
};

export default CoinImageBox;
