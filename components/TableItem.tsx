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
        fill: true,
        pointRadius: 0,
        pointBorderRadius: 50,
        lineTension: 0.4,
      },
    ],
  };

  return (
    <tr className="flex  items-center gap-5  justify-around bg-[#191925] rounded-xl p-5">
      <td>{index + 1}</td>
      <td className="flex gap-2 items-center">
        <Image width={32} height={32} src={coin.image} alt="" />
        <span>
          {coin.name}({coin.symbol.toUpperCase()})
        </span>
      </td>

      <td className="">${Humanize.formatNumber(coin.current_price, 0)}</td>
      <td
        className={` ${
          coin.price_change_percentage_1h_in_currency < 0
            ? "text-[#FE2264]"
            : "text-[#01F1E3]"
        }`}
      >
        {Math.abs(
          Number(
            Humanize.toFixed(coin.price_change_percentage_1h_in_currency, 2)
          )
        )}
        %
      </td>
      <td
        className={` ${
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
      </td>
      <td
        className={` ${
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
      </td>
      <td className="flex gap-8 w-[470px]">
        <progress
          className="[&::-webkit-progress-bar]:rounded-sm [&::-webkit-progress-value]:rounded-sm [&::-webkit-progress-value]:bg-blue-400 h-2 w-[50%]"
          value={coin.market_cap_change_24h}
          max={coin.market_cap}
        />
        <progress
          className="[&::-webkit-progress-bar]:rounded-sm [&::-webkit-progress-value]:rounded-sm [&::-webkit-progress-value]:bg-blue-400 h-2 w-[50%]"
          value={coin.circulating_supply}
          max={coin.total_supply}
        />
      </td>

      <td>
        <div className="w-[9.37rem]">
          <Line data={data} options={options} />
        </div>
      </td>
    </tr>
  );
};

export default TableItem;
