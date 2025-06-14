"use client";

import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";
import PortfolioItem from "./PortfolioItem";
import { useState } from "react";
import { coin } from "@/lib/portfolioSlice";
import { useEffect } from "react";
import { useGetCoinsByIdsQuery } from "@/lib/cryptoApi";

const PortfolioContainer = () => {
  const portfolio = useSelector((state: RootState) => state.portfolio);
  const [savedPortfolio, setSavedPortfolio] = useState(portfolio);
  const currency = useSelector((state: RootState) => state.currency.currency);
  const coinIds = savedPortfolio.coins.map((coin: coin) => coin.id);
  const idString = coinIds.join(",");
  const { data } = useGetCoinsByIdsQuery({
    idString: idString,
    currency: currency,
  });

  useEffect(() => {
    const storage = localStorage.getItem("portfolio");
    if (storage) setSavedPortfolio(JSON.parse(storage));
  }, [portfolio]);

  if (savedPortfolio.coins.length === 0)
    return (
      <div className="mt-10 flex flex-col gap-6 justify-center">
        <p className="text-center text-3xl">
          Click the &ldquo;Add Asset&rdquo; button to begin
        </p>
      </div>
    );

  return (
    <div className="mt-10 flex flex-col gap-6">
      {savedPortfolio.coins.map((coin: coin) => (
        <PortfolioItem
          key={coin.id}
          coin={coin}
          currency={currency}
          data={data ? data : []}
        />
      ))}
    </div>
  );
};

export default PortfolioContainer;
