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
import Image from "next/image";

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
          className="btn hidden sm:block  dark:bg-[#6161D680] w-[244px]"
          variant="outline"
        >
          Add Asset
        </Button>
      </DialogTrigger>
      <DialogTrigger className="sm:hidden">
        <button className="bg-[#4F4FA0] rounded-full btn p-4 fixed z-10 bottom-24 right-5 sm:hidden">
          <Image
            src={"/icons/plus.png"}
            width={24}
            height={24}
            alt="plus icon"
          />
        </button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[886px] p-12  ">
        <DialogHeader className="mb-5">
          <DialogTitle>Select Coins</DialogTitle>
        </DialogHeader>
        {error && <p className="text-red-500 text-end">{error}</p>}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
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
