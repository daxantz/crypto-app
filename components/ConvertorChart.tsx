import { coin } from "@/lib/conversionSlice";
import { useGetGraphExhangeRatesQuery } from "@/lib/cryptoApi";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

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
const options = {
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
      display: true,
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

type convertorChartProps = {
  coin1: coin;
  coin2: coin;
};
const ConvertorChart = ({ coin1, coin2 }: convertorChartProps) => {
  //fetch data for chart here
  const { data, error } = useGetGraphExhangeRatesQuery({
    coin1Id: coin1.id,
    coin2Id: coin2.id,
  });
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const labels = data?.map(([month, price]) => {
    return month;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const setData = data?.map(([month, price]) => price);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Volume 24h",
        data: setData,
        backgroundColor: gradient || "#7878FA", // Apply gradient or fallback to a default color
        borderWidth: 5,
        borderColor: "#7878FA",
        fill: true,
        pointRadius: 0,
        pointBorderRadius: 50,
        lineTension: 0.4,
      },
    ],
  };

  if (error != null && "error" in error) {
    return <p>{error.error}</p>;
  }
  return (
    <div className="bg-white dark:bg-[#191932] flex flex-col gap-6 p-6    mt-10 rounded-xl ">
      <p className="text-xl">
        <span>
          {coin1.name} ({coin1.symbol})
        </span>{" "}
        <span className="text-[#D1D1D1CC]">to</span>{" "}
        <span>
          {coin2.name} ({coin2.symbol})
        </span>
      </p>
      <div className="h-[250px] sm:flex sm:h-[500px]">
        <Line
          className="flex-1 "
          ref={chartRef}
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
};

export default ConvertorChart;
