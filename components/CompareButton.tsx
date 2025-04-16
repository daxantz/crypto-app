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
      className="bg-[#232336] py-3 px-6 rounded-md flex gap-2"
    >
      {" "}
      {isComparing && <span>X Exit Comparison</span>}
      <Image
        className={`${isComparing && "hidden"}`}
        src={comparsion}
        alt="comparison icon"
      />{" "}
      <span className={`${isComparing && "hidden"}`}>Compare</span>
    </button>
  );
};

export default CompareButton;
