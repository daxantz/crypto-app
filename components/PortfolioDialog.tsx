"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
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
import { X } from "lucide-react";

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
      <DialogContent className=" sm:max-w-[886px] p-12 [&>button]:hidden ">
        <div className="flex justify-between">
          <DialogHeader className="mb-5 flex flex-col items-center">
            <DialogTitle>Select Coins</DialogTitle>
          </DialogHeader>
          <DialogClose asChild>
            <button
              className=" flex flex-col text-gray-500 hover:text-gray-900 dark:hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </div>
        {error && <p className="text-red-500 text-end">{error}</p>}
        <div className="flex flex-col md:flex-row gap-8 items-center">
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
