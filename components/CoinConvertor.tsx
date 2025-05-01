"use client";

import { searchCoins } from "@/lib/types/searchCoin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import { coin, setCoin1, setCoin2 } from "@/lib/conversionSlice";
import { useDispatch } from "react-redux";

type coinConvertorProps = {
  color: string;
  sellOrBuy: "buy" | "sell";
  coins: searchCoins[];
  selectedCoin: coin;
  convertQuantity?: number;
  setConvertQuantity?: React.Dispatch<React.SetStateAction<number>>;
  price?: number;
};
const CoinConvertor = ({
  color,
  sellOrBuy,
  coins,
  convertQuantity,
  setConvertQuantity,
  selectedCoin,
  price,
}: coinConvertorProps) => {
  const dispatch = useDispatch();
  const currentPrice = selectedCoin?.currentPrice?.toFixed(2);
  const value = sellOrBuy === "sell" ? convertQuantity : price?.toFixed(10);
  function handleCoinChange(coin: searchCoins) {
    if (sellOrBuy === "sell") {
      dispatch(
        setCoin1({
          name: coin.name,
          id: coin.id,
          symbol: coin.symbol,
          image: coin.image,
          currentPrice: coin.current_price,
        })
      );
    } else {
      dispatch(
        setCoin2({
          name: coin.name,
          id: coin.id,
          symbol: coin.symbol,
          image: coin.image,
          currentPrice: coin.current_price,
        })
      );
    }
  }

  return (
    <div
      className={`bg-[${color}] p-6 flex flex-col gap-10 rounded-2xl sm:w-1/2`}
    >
      <p>You {sellOrBuy}</p>
      <div className="flex justify-between ">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-2">
              <Image
                src={selectedCoin.image || ""}
                alt="coin icon"
                width={20}
                height={20}
              />{" "}
              <span>
                {selectedCoin?.name} ({selectedCoin?.symbol.toUpperCase()})
              </span>
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 flex flex-col gap-2 h-56">
            {coins.map((coin) => (
              <DropdownMenuItem
                defaultValue={"yea"}
                onClick={() => handleCoinChange(coin)}
                className="flex gap-2"
                key={coin.id}
              >
                <span> {coin.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <input
          className="bg-[#191932] w-1/4"
          type="number"
          name=""
          id=""
          value={value}
          onChange={(e) =>
            setConvertQuantity != null &&
            setConvertQuantity(Number(e.target.value))
          }
          readOnly={sellOrBuy === "buy"}
        />
      </div>
      <hr />
      <p>
        1 {selectedCoin?.symbol.toUpperCase()} = ${currentPrice}
      </p>
    </div>
  );
};

export default CoinConvertor;
