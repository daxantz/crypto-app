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
import React, { useState } from "react";

type coinConvertorProps = {
  color: string;
  sellOrBuy: "buy" | "sell";
  coins: searchCoins[];
};
const CoinConvertor = ({ color, sellOrBuy, coins }: coinConvertorProps) => {
  const [selectedItem, setSelectedItem] = useState<searchCoins | null>(() => {
    return sellOrBuy === "sell" ? coins[0] : coins[1];
  });
  const currentPrice = selectedItem?.current_price.toFixed(2);

  return (
    <div className={`bg-[${color}] p-6 flex flex-col gap-10 rounded-2xl w-1/2`}>
      <p>You {sellOrBuy}</p>
      <div className="flex justify-between ">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-2">
              <Image
                src={selectedItem?.image || ""}
                alt="coin icon"
                width={20}
                height={20}
              />{" "}
              <span>
                {selectedItem?.name} ({selectedItem?.symbol.toUpperCase()})
              </span>
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 flex flex-col gap-2 h-56">
            {coins.map((coin) => (
              <DropdownMenuItem
                defaultValue={"yea"}
                onClick={() => setSelectedItem(coin)}
                className="flex gap-2"
                key={coin.id}
              >
                <span> {coin.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <input className="bg-[#191932]" type="number" name="" id="" />
      </div>
      <hr />
      <p>
        1 {selectedItem?.symbol.toUpperCase()} = ${currentPrice}
      </p>
    </div>
  );
};

export default CoinConvertor;
