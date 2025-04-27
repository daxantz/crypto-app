"use client";
import React from "react";
import Image from "next/image";
import comparsion from "@/public/icons/comparison.svg";

import { setIsComparing, setSelectedCoins } from "@/lib/coinSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const CompareButton = () => {
  const disptach = useDispatch();
  const isComparing = useSelector(
    (state: RootState) => state.coins.isComparing
  );

  function toggleComparisonMode() {
    if (isComparing) {
      disptach(setSelectedCoins(null));
    }
    disptach(setIsComparing());
  }
  return (
    <button
      onClick={toggleComparisonMode}
      className="bg-[#232336] py-[8px] px-2 sm:py-3 sm:px-6 rounded-md flex gap-2"
    >
      {" "}
      {isComparing && (
        <span className="text-xs sm:text-sm self-center">
          X Exit Comparison
        </span>
      )}
      <Image
        className={`${isComparing && "hidden"} w-[13px] h-[13px] sm:size-auto`}
        src={comparsion}
        alt="comparison icon"
      />{" "}
      <span
        className={`${isComparing && "hidden"} text-xs sm:text-sm self-center`}
      >
        Compare
      </span>
    </button>
  );
};

export default CompareButton;
