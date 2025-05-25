"use client";

import React from "react";
import CoinSelect from "./CoinDropdown";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { selectedCoin } from "./PortfolioDialog";
import { addCoin } from "@/lib/portfolioSlice";

type formProps = {
  selectedCoin: selectedCoin | null;
  setSelectedCoin: React.Dispatch<React.SetStateAction<selectedCoin | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  error: string | null | undefined;
};

const ModalForm = ({
  selectedCoin,
  setSelectedCoin,
  setIsOpen,
  setError,
  error,
}: formProps) => {
  const [dateInput, setDateInput] = useState<string | undefined>("mm/dd/yyyy");

  const dispatch = useDispatch();
  const isInFuture =
    new Date(selectedCoin?.purchasedDate as Date).getTime() > Date.now();

  function handleChange(
    option: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    if (
      (Number(selectedCoin?.amount) > 0 ||
        selectedCoin?.purchasedDate instanceof Date) &&
      selectedCoin
    ) {
      setError(null);
    }
    if (option.target.id === "purchasedDate") {
      setDateInput(option.target.value);
      setSelectedCoin((selectedCoin: selectedCoin | null) => {
        return {
          ...selectedCoin,
          purchasedDate: new Date(option.target.value),
        };
      });
    }

    setSelectedCoin((selectedCoin: selectedCoin | null) => {
      return { ...selectedCoin, [option.target.id]: option.target.value };
    });
  }

  function clearSelectedCoin(): void {
    setSelectedCoin(null);
    setDateInput("mm/dd/yyyy");
    setError(null);
  }

  function saveCoin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    try {
      e.preventDefault();
      if (isInFuture) {
        throw new Error("Purchased date cannot be in the future");
      }
      if (
        !selectedCoin ||
        !selectedCoin.purchasedDate ||
        !selectedCoin.amount
      ) {
        throw new Error("All fields must be filled out");
      }
      dispatch(addCoin(selectedCoin));

      setIsOpen((isOpen) => !isOpen);
      clearSelectedCoin();
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }
  return (
    <form className="grid gap-4 py-4   md:w-[28.81rem]">
      <div className="  max-w-full">
        <CoinSelect setSelectedCoin={setSelectedCoin} />
      </div>
      <div className="w-full">
        <select
          className="w-full bg-[#191925] p-4 rounded-sm"
          name=""
          id="amount"
          onChange={handleChange}
          required
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
          value={dateInput}
          className="bg-[#191925]  py-4 pl-4 pr-0 w-full rounded-sm"
          placeholder="Purchased Date"
          type="date"
          onChange={handleChange}
          id="purchasedDate"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <DialogTrigger
          onClick={clearSelectedCoin}
          className="rounded-lg  bg-[#232336] flex-1 py-3 px-4 order-2"
        >
          <button>Cancel</button>
        </DialogTrigger>

        <button
          className={`rounded-lg flex-1  ${
            error != null && "bg-gray-500"
          } bg-[#6161D680] btn py-3 px-4`}
          onClick={saveCoin}
          disabled={
            error === "All fields must be filled out" ||
            error === "Purchased date cannot be in the future"
          }
        >
          Save and Continue
        </button>
      </div>
    </form>
  );
};

export default ModalForm;
