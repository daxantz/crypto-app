import { useGetCoinChartDataQuery } from "@/lib/cryptoApi";
import { RootState } from "@/lib/store";

import React from "react";
import { useSelector } from "react-redux";

import Charts from "@/components/Charts";

const ChartContainer = ({ days }: { days: string }) => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.currency
  );
  const selectedCoin = useSelector(
    (state: RootState) => state.coins.selectedCoin
  );
  const selectedCoin2 = useSelector(
    (state: RootState) => state.coins.compareCoins[1]
  );

  const {
    currentData: coinData,
    error: chartError,
    isLoading: isCoinDataLoading,
  } = useGetCoinChartDataQuery(
    {
      coinId: selectedCoin?.id || "bitcoin",
      currency: selectedCurrency,
      days: days,
    },
    { skip: !selectedCoin?.id, refetchOnMountOrArgChange: false }
  );

  const { currentData: coinData2 } = useGetCoinChartDataQuery(
    {
      coinId: selectedCoin2?.id || "ethereum",
      currency: selectedCurrency,
      days: days,
    },
    { skip: !selectedCoin2?.id, refetchOnMountOrArgChange: false }
  );
  return (
    <div className="flex gap-8">
      <Charts
        coinData={coinData}
        coinData2={coinData2}
        error={chartError}
        isLoading={isCoinDataLoading}
      />
    </div>
  );
};

export default ChartContainer;
