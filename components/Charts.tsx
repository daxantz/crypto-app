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
const Charts = ({ coinData, isLoading, error, coinData2 }: ChartsProps) => {
  const selectedCoin = useSelector(
    (state: RootState) => state.coins.selectedCoin
  );
  const isComparing = useSelector(
    (state: RootState) => state.coins.isComparing
  );

  const { gradient, lineRef, chartRef } = useGradient();

  //coin 1 bar data
  const latestPrice = coinData?.prices[coinData.prices.length - 1][1];
  const prices = coinData?.prices.map((p) => Math.floor(p[1]));
  const latestTime =
    coinData?.total_volumes[coinData.total_volumes.length - 1][0];
  //coin 1 line data
  const volume = coinData?.total_volumes.map((array) => array[1]);
  const latestVolume =
    coinData?.total_volumes[coinData.total_volumes.length - 1][1];

  //coin 2 bar data
  const prices2 = coinData2?.prices.map((p) => Math.floor(p[1]));
  //coin 2 line data
  const volume2 = coinData2?.total_volumes.map((array) => array[1]);

  const date = format(new Date(latestTime || Date.now()), "MMM d, yyyy");

  if (error) {
    if ("status" in error) {
      return <p>Error: {JSON.stringify(error.data)}</p>; // Handles API errors
    } else {
      return <p>Error: {error.message}</p>; // Handles non-API errors
    }
  }

  if (isLoading) return <p>Loading...</p>;

  const data = {
    labels,
    datasets: isComparing
      ? [
          {
            label: "Main Coin",
            data: volume,
            backgroundColor: gradient.barMain || "#7878FA",
            borderRadius: 10,
            barPercentage: 0.5,
            categoryPercentage: 1,
            order: 1,
          },
          {
            label: "Second Coin",
            data: volume2,
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
            data: volume,
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
            data: prices,
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
            data: prices2,
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
            data: prices,
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
    <div className="flex gap-8 w-full">
      <div className="bg-[#191932] w-[50%] flex flex-col gap-6 p-6 rounded-xl">
        <p className="text-[20px] text-[#D1D1D1]">
          {selectedCoin?.name} ({selectedCoin?.symbol.toLocaleUpperCase()})
        </p>
        <p className="font-bold text-2xl">
          ${Humanize.compactInteger(latestPrice || 0, 2)}
        </p>
        <p className="text-[#B9B9BA] ">{date}</p>
        <Line ref={lineRef} options={options} data={lineData} />
      </div>
      <div className="bg-[#1E1932] w-[50%] flex flex-col gap-6 p-6 rounded-xl">
        <p className="text-[20px] text-[#D1D1D1]">Volume 24h</p>
        <p className="font-bold text-2xl">
          ${Humanize.compactInteger(latestVolume || 0, 2)}
        </p>
        <p className="text-[#B9B9BA] ">{date}</p>
        <Bar ref={chartRef} options={options} data={data} />
      </div>
    </div>
  );
};

export default Charts;
