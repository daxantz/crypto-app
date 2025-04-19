import { coin } from "@/lib/conversionSlice";

import React from "react";

type convertorChartProps = {
  coin1: coin;
  coin2: coin;
};
const ConvertorChart = ({ coin1, coin2 }: convertorChartProps) => {
  return (
    <div className="bg-[#191932]">
      <p>
        <span>
          {coin1.name}({coin1.symbol})
        </span>{" "}
        to{" "}
        <span>
          {coin2.name}({coin2.symbol})
        </span>
      </p>
    </div>
  );
};

export default ConvertorChart;
