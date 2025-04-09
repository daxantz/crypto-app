import React from "react";
import Image from "next/image";
import comparsion from "@/public/icons/comparison.svg";
import { searchCoins } from "@/lib/types/searchCoin";
type CompareButtonProps = {
  isComparing: boolean;
  setIsComparing: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCoins: React.Dispatch<
    React.SetStateAction<searchCoins[] | undefined>
  >;
};
const CompareButton = ({
  isComparing,
  setIsComparing,
  setSelectedCoins,
}: CompareButtonProps) => {
  function toggleComparisonMode() {
    if (isComparing) {
      setSelectedCoins([]);
    }
    setIsComparing((isComparing) => !isComparing);
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
