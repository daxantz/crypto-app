"use client";

import { Currency, setCurrency } from "@/lib/currencySlice";

import React from "react";
import { useDispatch } from "react-redux";
const CurrencySelector = () => {
  const dispatch = useDispatch();

  return (
    <select
      className="dark:bg-[#191925]"
      name="currencies"
      id="currencies"
      onChange={(e) => dispatch(setCurrency(e.target.value as Currency))}
    >
      <option value={"USD"}>USD</option>
      <option value={"GBP"}>GBP</option>
      <option value={"EUR"}>EUR</option>
      <option value={"BTC"}>BTC</option>
      <option value={"ETH"}>ETH</option>
    </select>
  );
};

export default CurrencySelector;
