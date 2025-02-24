"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Humanize from "humanize-plus";
import { format } from "date-fns";
import { chartCoin } from "@/lib/types/chartCoin";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hide X-axis grid lines
      },
    },
    y: {
      ticks: { display: false },
      grid: {
        display: false, // Hide Y-axis grid lines
      },
    },
  },
};

const labels = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];

const Barchart = ({
  coinData,
  isLoading,
  error,
}: {
  coinData: chartCoin;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}) => {
  const volumePrices = coinData?.prices.map((array) => array[1]);
  const latestPrice = coinData?.prices[coinData.prices.length - 1][1];
  const latestTime =
    coinData?.total_volumes[coinData.total_volumes.length - 1][0];
  const date = format(new Date(latestTime || Date.now()), "MMM d, yyyy");

  const [gradient, setGradient] = useState<CanvasGradient | null>(null);
  const chartRef = useRef<ChartJS<"bar", number[], string> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;

      const gradient = ctx.createLinearGradient(0, 400, 0, 0);
      gradient.addColorStop(0, "#56218a");
      setGradient(gradient);
    }
  }, [chartRef]);

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
    datasets: [
      {
        label: "Volume 24h",
        data: volumePrices,
        backgroundColor: gradient || "rgba(0, 0, 0, 0.2)", // Apply gradient or fallback to a default color
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="bg-[#1E1932] w-[50%] flex flex-col gap-6 p-6 rounded-xl">
      <p className="text-[20px] text-[#D1D1D1]">Volume 24h</p>
      <p className="font-bold text-2xl">
        ${Humanize.compactInteger(latestPrice || 0, 2)}
      </p>
      <p className="text-[#B9B9BA] ">{date}</p>
      <Bar ref={chartRef} options={options} data={data} />
    </div>
  );
};

export default Barchart;
