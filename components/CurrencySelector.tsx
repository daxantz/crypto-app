"use client";

import { Currency, setCurrency } from "@/lib/currencySlice";
import { RootState } from "@/lib/store";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const CurrencySelector = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.currency.currency);
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <select
      className="dark:bg-[#191925]"
      name="currencies"
      id="currencies"
      onChange={(e) => dispatch(setCurrency(e.target.value as Currency))}
    >
      <option value={"usd"}>USD</option>
      <option value={"gbp"}>GBP</option>
      <option value={"eur"}>EUR</option>
      <option value={"btc"}>BTC</option>
      <option value={"eth"}>ETH</option>
    </select>
  );
};

export default CurrencySelector;
