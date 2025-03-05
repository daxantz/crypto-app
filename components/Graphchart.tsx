"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { chartCoin } from "@/lib/types/chartCoin";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import Humanize from "humanize-plus";
import { format } from "date-fns";
import { searchCoins } from "@/lib/types/searchCoin";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
      display: false,
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
const labels = ["06", "07", "08", "09", "10", "11", "12", "13"];
const Graphchart = ({
  coinData,
  isLoading,
  error,
  selectedCoin,
}: {
  coinData: chartCoin;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  selectedCoin: searchCoins;
}) => {
  const volume = coinData?.total_volumes.map((array) => array[1]);

  const latestVolume =
    coinData?.total_volumes[coinData.total_volumes.length - 1][1];
  const latestTime =
    coinData?.total_volumes[coinData.total_volumes.length - 1][0];

  const date = format(new Date(latestTime || Date.now()), "MMM d, yyyy");
  const [gradient, setGradient] = useState<CanvasGradient | null>(null);
  const chartRef = useRef<ChartJS<"line", number[], string> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;

      const gradient = ctx.createLinearGradient(
        0,
        400,
        0,
        chartRef.current.height
      );

      gradient.addColorStop(1, "rgba(116, 116, 242, 0.6)");
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
        data: volume,
        backgroundColor: gradient || "rgba(0, 0, 0, 0.2)", // Apply gradient or fallback to a default color
        borderWidth: 5,
        borderColor: "#7878FA",
        fill: true,
        pointRadius: 0,
        pointBorderRadius: 50,
        lineTension: 0.4,
      },
    ],
  };
  return (
    <div className="bg-[#191932] w-[50%] flex flex-col gap-6 p-6 rounded-xl">
      <p className="text-[20px] text-[#D1D1D1]">
        {selectedCoin.name} ({selectedCoin.symbol.toLocaleUpperCase()})
      </p>
      <p className="font-bold text-2xl">
        ${Humanize.compactInteger(latestVolume || 0, 2)}
      </p>
      <p className="text-[#B9B9BA] ">{date}</p>
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
};

export default Graphchart;
