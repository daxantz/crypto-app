"use client";
import { CoinDetails } from "@/lib/types/coinDetails";
import React, { useState } from "react";

const CoinDesciptionBox = ({ coin }: { coin: CoinDetails | undefined }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const splicedWords = coin?.description?.en.slice(0, 884);

  return (
    <div className="bg-[#1E1932] sm:bg-transparent">
      <h2 className="font-medium text-xl mb-5">Description</h2>
      <div>
        <p className="text-sm font-normal">
          {isCollapsed ? splicedWords : coin?.description.en}
        </p>
      </div>
      <button
        className="text-[#6060FF]"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        {isCollapsed ? "...Read More" : "Hide"}
      </button>
    </div>
  );
};

export default CoinDesciptionBox;
