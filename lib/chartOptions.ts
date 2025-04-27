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
    yAxes: [
      {
        type: "logarithmic",
        beginAtZero: true,
      },
      {
        type: "logarithmic",
        beginAtZero: true,
      },
    ],
    x: {
      ticks: {
        display: false,
      },
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
  maintainAspectRatio: false,
};

export const labels = [
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
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];
