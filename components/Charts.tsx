"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

import Humanize from "humanize-plus";
import { format } from "date-fns";
import { chartCoin } from "@/lib/types/chartCoin";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { options } from "./Graphchart";
import useGradient from "@/lib/hooks/useGradient";
import { labels } from "@/lib/chartOptions";
import { useMemo } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartsProps = {
  coinData: chartCoin | undefined;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  coinData2: chartCoin | undefined;
};
const Charts = ({ coinData, isLoading, coinData2 }: ChartsProps) => {
  const selectedCoin = useSelector(
    (state: RootState) => state.coins.selectedCoin
  );
  const comparisonCoin = useSelector(
    (state: RootState) => state.coins.compareCoins[1]
  );
  const isComparing = useSelector(
    (state: RootState) => state.coins.isComparing
  );

  const { gradient, lineRef, chartRef } = useGradient();

  const derivedValues = useMemo(() => {
    return {
      latestPrice: coinData?.prices?.at(-1)?.[1],
      prices: coinData?.prices?.map((p) => Math.floor(p[1])),
      latestTime: coinData?.total_volumes?.at(-1)?.[0],
      latestVolume: coinData?.total_volumes?.at(-1)?.[1],
      prices2: coinData2?.prices?.map((p) => Math.floor(p[1])),
      latestPrice2: coinData2?.prices?.at(-1)?.[1],
      volume2: coinData2?.total_volumes?.map((array) => array[1]),
      latestVolume2: coinData2?.total_volumes?.at(-1)?.[1],
      volume: coinData?.total_volumes?.map((array) => array[1]),
    };
  }, [
    coinData?.prices,
    coinData?.total_volumes,
    coinData2?.prices,
    coinData2?.total_volumes,
  ]);
  const date = format(
    new Date(derivedValues.latestTime || Date.now()),
    "MMM d, yyyy"
  );

  if (isLoading || !coinData?.prices?.length) return <p>Loading...</p>;

  const data = {
    labels,
    datasets: isComparing
      ? [
          {
            label: "Main Coin",
            data: derivedValues.volume,
            backgroundColor: gradient.barMain || "#7878FA",
            borderRadius: 10,
            barPercentage: 0.5,
            categoryPercentage: 1,
            order: 1,
          },
          {
            label: "Second Coin",
            data: derivedValues.volume2,
            backgroundColor: gradient.barSecondary || "#D878FA",
            borderRadius: 10,
            barPercentage: 0.5,
            categoryPercentage: 1,
            order: 2,
          },
        ]
      : [
          {
            label: "Main Coin",
            data: derivedValues.volume,
            backgroundColor: gradient.barMain || "#7878FA",
            borderRadius: 10,
            barPercentage: 0.5,
            categoryPercentage: 1,
            order: 1,
          },
        ],
  };

  const lineData = {
    labels,
    datasets: isComparing
      ? [
          {
            label: "Main Coin Volume",
            data: derivedValues.prices,
            borderColor: "#7878FA",
            backgroundColor: gradient.lineMain || "#7878FA",
            borderWidth: 5,
            fill: true,
            pointRadius: 0,
            tension: 0.4,
            order: 1,
          },
          {
            label: "Second Coin Volume",
            data: derivedValues.prices2,
            borderColor: "#D878FA",
            backgroundColor: gradient.lineSecondary || "#D878FA",
            borderWidth: 5,
            fill: true,
            pointRadius: 0,
            tension: 0.4,
            order: 2,
          },
        ]
      : [
          {
            label: "Main Coin Volume",
            data: derivedValues.prices,
            borderColor: "#7878FA",
            backgroundColor: gradient.lineMain || "#7878FA",
            borderWidth: 5,
            fill: true,
            pointRadius: 0,
            tension: 0.4,
            order: 1,
          },
        ],
  };

  return (
    <div className="flex-col flex gap-4 sm:flex-row sm:gap-8 w-full">
      <div
        className={`bg-[#191932] sm:w-[50%] flex flex-col gap-6 p-6 rounded-xl ${
          isComparing ? "justify-between" : ""
        }`}
      >
        <p
          className={`text-sm sm:text-[20px] text-[#D1D1D1] ${
            isComparing ? "hidden" : ""
          }`}
        >
          {selectedCoin?.name} ({selectedCoin?.symbol.toLocaleUpperCase()})
        </p>
        <p
          className={`font-bold text-[20px] sm:text-2xl ${
            isComparing ? "hidden" : ""
          }`}
        >
          ${Humanize.compactInteger(derivedValues.latestPrice || 0, 2)}
        </p>
        <p
          className={`text-[#B9B9BA] text-xs sm:text-base ${
            isComparing ? "text-[#FFFFFF] text-3xl" : ""
          }`}
        >
          {date}
        </p>
        <Line ref={lineRef} options={options} data={lineData} />
        <div className={`flex gap-6 ${isComparing ? "" : "hidden"}`}>
          <div className="flex gap-6">
            <div className="w-6 h-6 rounded-sm bg-[#7878FA]"></div>
            <span className="text-[#D1D1D1] text-xl font-normal">
              {selectedCoin?.name} $
              {Humanize.compactInteger(derivedValues.latestPrice || 0, 2)}
            </span>
          </div>
          <div className="flex gap-6">
            <div className="w-6 h-6 rounded-sm bg-[#D878FA]"></div>
            <span className="text-[#D1D1D1] text-xl font-normal">
              {comparisonCoin?.name} $
              {Humanize.compactInteger(derivedValues.latestPrice2 || 0, 2)}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#1E1932] sm:w-[50%] flex flex-col gap-6 p-6 rounded-xl">
        <p
          className={` text-sm sm:text-[20px] text-[#D1D1D1] ${
            isComparing ? "text-3xl font-bold" : ""
          }`}
        >
          Volume 24h
        </p>
        <p
          className={`font-bold  text-[20px] sm:text-2xl ${
            isComparing ? "hidden" : ""
          }`}
        >
          ${Humanize.compactInteger(derivedValues.latestVolume || 0, 2)}
        </p>
        <p className="text-[#B9B9BA] text-xs sm:text-base">{date}</p>
        <Bar ref={chartRef} options={options} data={data} />
        <div className={`flex gap-6 ${isComparing ? "" : "hidden"}`}>
          <div className="flex gap-6">
            <div className="w-6 h-6 rounded-sm bg-[#7878FA]"></div>
            <span className="text-[#D1D1D1] text-xl font-normal">
              {selectedCoin?.name} $
              {Humanize.compactInteger(derivedValues.latestVolume || 0, 2)}
            </span>
          </div>
          <div className="flex gap-6">
            <div className="w-6 h-6 rounded-sm bg-[#D878FA]"></div>
            <span className="text-[#D1D1D1] text-xl font-normal">
              {comparisonCoin?.name} $
              {Humanize.compactInteger(derivedValues.latestVolume2 || 0, 2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
