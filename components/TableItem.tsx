"use client";
import React from "react";
import { CoinMarketData } from "./CoinTable";
import Image from "next/image";
import Humanize from "humanize-plus";
import { Line } from "react-chartjs-2";
import { options } from "./Graphchart";
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
import Link from "next/link";
import { TableRow, TableCell } from "@/components/ui/table";
import { Progress } from "./ui/progress";

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

const TableItem = ({
  coin,
  index,
}: {
  coin: CoinMarketData;
  index: number;
}) => {
  const data = {
    labels: coin.sparkline_in_7d.price.map((_, index) => index),
    datasets: [
      {
        label: "Volume 24h",
        data: coin.sparkline_in_7d.price,
        backgroundcolor: "green",
        borderWidth: 5,
        borderColor: "#6374C3",

        pointRadius: 0,
        pointBorderRadius: 50,
        lineTension: 0.4,
        pointHoverRadius: 0,
      },
    ],
  };

  return (
    <TableRow className=" sm:table-row  sm:gap-0 justify-between bg-white border dark:border-none dark:bg-[#191925]  px-4 py-6 dark:hover:bg-[#2A2A3B]/50 text-lg">
      <TableCell className="hidden sm:table-cell font-medium rounded-s-xl">
        {index + 1}
      </TableCell>

      <TableCell className="w-[100px]">
        <Link className="flex items-center gap-2" href={coin.id}>
          <Image width={32} height={32} src={coin.image} alt={coin.name} />
          <span className="hidden sm:inline">{coin.name}</span>
          <span className="ml-1">({coin.symbol.toUpperCase()})</span>
        </Link>
      </TableCell>

      <TableCell>${Humanize.formatNumber(coin.current_price, 0)}</TableCell>

      <TableCell
        className={`${
          coin.price_change_percentage_1h_in_currency < 0
            ? "text-[#FE2264]"
            : "text-[#01F1E3]"
        } `}
      >
        {Math.abs(
          Number(
            Humanize.toFixed(coin.price_change_percentage_1h_in_currency, 2)
          )
        )}
        %
      </TableCell>

      <TableCell
        className={`hidden sm:table-cell ${
          coin.price_change_percentage_24h_in_currency < 0
            ? "text-[#FE2264]"
            : "text-[#01F1E3]"
        }`}
      >
        {Math.abs(
          Number(
            Humanize.toFixed(coin.price_change_percentage_24h_in_currency, 2)
          )
        )}
        %
      </TableCell>

      <TableCell
        className={`hidden sm:table-cell ${
          coin.price_change_percentage_7d_in_currency < 0
            ? "text-[#FE2264]"
            : "text-[#01F1E3]"
        }`}
      >
        {Math.abs(
          Number(
            Humanize.toFixed(coin.price_change_percentage_7d_in_currency, 2)
          )
        )}
        %
      </TableCell>

      <TableCell className="hidden lg:table-cell w-[20rem]">
        {/* <progress
          className="progress-bar h-4 w-full rounded-full [&::-webkit-progress-value]:bg-blue-400"
          value={coin.market_cap_change_24h}
          max={coin.market_cap}
        /> */}
        <Progress
          className="h-3"
          value={(coin.market_cap_change_24h / coin.market_cap) * 100}
        />
      </TableCell>

      <TableCell className="hidden lg:table-cell w-[20rem] ">
        {/* <progress
          className="progress-bar h-4 w-full rounded-full rounded-s-full [&::-webkit-progress-value]:bg-blue-400"
          value={coin.circulating_supply}
          max={coin.total_supply}
        >
          000
        </progress> */}
        <Progress
          className="h-3"
          value={(coin.circulating_supply / coin.total_supply) * 100}
        />
      </TableCell>

      <TableCell className="hidden md:table-cell rounded-e-xl  w-32">
        <div className="w-[9.37rem] ">
          <Line className="bg-transparent" data={data} options={options} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
