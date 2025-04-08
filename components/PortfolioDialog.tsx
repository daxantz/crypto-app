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
import { useState } from "react";
import ModalForm from "./ModalForm";

export type selectedCoin = {
  label?: string;
  value?: string;
  large?: string;
  id?: string;
  symbol?: string;
  name?: string;
  amount?: string;
  purchasedDate?: Date;
};

export type selectedOptions = {
  coinId?: string;
  amount?: number;
  purchasedDate?: Date | null;
};

const PortfolioDialog = () => {
  const [selectedCoin, setSelectedCoin] = useState<selectedCoin | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | undefined | null>(null);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="btn  dark:bg-[#6161D680] w-[244px]"
          variant="outline"
        >
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[886px] p-12  ">
        <DialogHeader className="mb-5">
          <DialogTitle>Select Coins</DialogTitle>
        </DialogHeader>
        {error && <p className="text-red-500 text-end">{error}</p>}
        <div className="flex gap-8">
          <div className="w-1/2">
            <CoinImageBox
              image={selectedCoin?.large}
              title={selectedCoin?.value}
              symbol={selectedCoin?.symbol}
            />
          </div>
          <ModalForm
            selectedCoin={selectedCoin}
            setSelectedCoin={setSelectedCoin}
            setIsOpen={setIsOpen}
            setError={setError}
            error={error}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioDialog;
