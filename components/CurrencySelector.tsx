"use client";

import { Currency, setCurrency } from "@/lib/currencySlice";
import { RootState } from "@/lib/store";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const CurrencySelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const dispatch = useDispatch();

  const currency = useSelector((state: RootState) => state.currency.currency);
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    dispatch(setCurrency(e.target.value as Currency));
    params.set("currency", newCurrency);
    router.push(`?${params.toString()}`);
  };
  return (
    <select
      className="dark:bg-[#191925]"
      name="currencies"
      id="currencies"
      onChange={handleChange}
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
