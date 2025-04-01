"use client";

import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";
import PortfolioItem from "./PortfolioItem";

const PortfolioContainer = () => {
  const portfolio = useSelector((state: RootState) => state.portfolio);

  if (portfolio.coins.length === 0)
    return (
      <div className="mt-10 flex flex-col gap-6 justify-center">
        <p className="text-center text-3xl">
          Click the{" "}
          <span className="text-[#6161D680]">&ldquo;Add Asset&rdquo; </span>
          button to begin
        </p>
      </div>
    );
  return (
    <div className="mt-10 flex flex-col gap-6">
      {portfolio.coins.map((coin) => (
        <PortfolioItem key={coin.id} {...coin} />
      ))}
    </div>
  );
};

export default PortfolioContainer;
