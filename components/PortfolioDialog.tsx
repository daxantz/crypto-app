"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

import CoinImageBox from "./CoinImageBox";
import CoinSelect from "./CoinDropdown";
import { useState } from "react";
export type selectedCoin = {
  label: string;
  value: string;
  large: string;
  id: string;
  symbol: string;
  name: string;
};
const PortfolioDialog = () => {
  const [selectedCoin, setSelectedCoin] = useState<selectedCoin | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Asset</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[886px] p-12  ">
        <DialogHeader className="mb-5">
          <DialogTitle>Select Coins</DialogTitle>
        </DialogHeader>
        <div className="flex gap-8">
          <div className="w-1/2">
            <CoinImageBox
              image={selectedCoin?.large}
              title={selectedCoin?.value}
              symbol={selectedCoin?.symbol}
            />
          </div>

          <div className="grid gap-4 py-4   w-[461px]">
            <div className="grid grid-cols-4 items-center gap-4 w-[420px]">
              <CoinSelect setSelectedCoin={setSelectedCoin} />
            </div>
            <div className="w-full">
              <select
                className="w-full bg-[#191925] p-4 rounded-sm"
                name=""
                id=""
              >
                <option value="" disabled selected hidden>
                  Purchased Amount
                </option>
                <option value="100">$100</option>
                <option value="250">$250</option>
                <option value="500">$500</option>
                <option value="1000">$1000</option>
                <option value="1500">$1500</option>
                <option value="5000">$5000</option>
                <option value="10000">$10000</option>
              </select>
            </div>
            <div className="w-full">
              <input
                className="bg-[#191925] p-4 w-full rounded-sm"
                placeholder="Purchased Date"
                type="date"
              />
            </div>
            <div className="flex gap-4">
              <DialogTrigger
                onClick={() => setSelectedCoin(null)}
                className="rounded-lg  bg-[#232336] flex-1 py-3 px-4"
              >
                <button>Cancel</button>
              </DialogTrigger>

              <button className="rounded-lg flex-1 btn bg-[#6161D680] py-3 px-4">
                Save and Continue{" "}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioDialog;
