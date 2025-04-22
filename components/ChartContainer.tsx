import { useGetCoinChartDataQuery } from "@/lib/cryptoApi";
import { RootState } from "@/lib/store";

import React from "react";
import { useSelector } from "react-redux";

import Charts from "@/components/Charts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
    error: chart1Error,
    isLoading: isCoinDataLoading,
    isError: coin1IsError,
  } = useGetCoinChartDataQuery(
    {
      coinId: selectedCoin?.id || "bitcoin",
      currency: selectedCurrency,
      days: days,
    },
    { skip: !selectedCoin?.id, refetchOnMountOrArgChange: false }
  );

  const {
    currentData: coinData2,
    // isError,
    // error: chart2Error,
  } = useGetCoinChartDataQuery(
    {
      coinId: selectedCoin2?.id || "ethereum",
      currency: selectedCurrency,
      days: days,
    },
    { skip: !selectedCoin2?.id, refetchOnMountOrArgChange: false }
  );
  if (
    coin1IsError &&
    typeof chart1Error === "object" &&
    "status" in chart1Error
  ) {
    const err = chart1Error as FetchBaseQueryError;

    if (
      typeof err.data === "object" &&
      err.data !== null &&
      "error" in err.data
    ) {
      const message = (err.data as { error: string }).error;
      return <p>{message}</p>;
    } else {
      return <p>{String(err.status)}</p>; // convert status to string just in case
    }
  }

  return (
    <div className="flex gap-8">
      <Charts
        coinData={coinData}
        coinData2={coinData2}
        error={chart1Error}
        isLoading={isCoinDataLoading}
      />
    </div>
  );
};

export default ChartContainer;
