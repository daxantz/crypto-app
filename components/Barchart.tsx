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
import { Bar } from "react-chartjs-2";
import { useGetCoinChartDataQuery } from "@/lib/cryptoApi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

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
    },
    title: {
      display: true,
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
const Barchart = ({ coinId }: { coinId: string }) => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const {
    data: coinData,
    error,
    isLoading,
  } = useGetCoinChartDataQuery({
    coinId: coinId,
    currency: currency,
  });

  const volumePrices = coinData?.total_volumes.map((array) => array[1]);

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
        label: "Dataset 1",
        data: volumePrices,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderRadius: 10,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default Barchart;
