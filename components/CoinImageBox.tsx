import React from "react";

const CoinImageBox = ({
  image,
  title,
  symbol,
}: {
  image: string;
  title: string;
  symbol: string;
}) => {
  return (
    <div className="bg-[#1E1932] rounded-xl py-10 px-14  flex flex-col items-center w-[25%] gap-2">
      <div className="bg-[#2C2C4A] rounded-md p-4 text-center w-16 h-16 ">
        {image}
      </div>
      <p className="text-2xl">
        {title} <span>({symbol})</span>
      </p>
    </div>
  );
};

export default CoinImageBox;
