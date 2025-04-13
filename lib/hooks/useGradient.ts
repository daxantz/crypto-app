import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Chart as ChartJS } from "chart.js";
export default function useGradient() {
  const [gradient, setGradient] = useState<{
    barMain: CanvasGradient | null;
    barSecondary: CanvasGradient | null;
    lineMain: CanvasGradient | null;
    lineSecondary: CanvasGradient | null;
  }>({
    barMain: null,
    barSecondary: null,
    lineMain: null,
    lineSecondary: null,
  });
  const chartRef = useRef<ChartJS<"bar", number[], string> | null>(null);
  const lineRef = useRef<ChartJS<"line", number[], string> | null>(null);

  useEffect(() => {
    if (chartRef.current && lineRef.current) {
      const barCtx = chartRef.current.ctx;
      const lineCtx = lineRef.current.ctx;

      // Purple gradient for main datasets
      const purpleGradientBar = barCtx.createLinearGradient(0, 400, 0, 0);
      purpleGradientBar.addColorStop(1, "rgba(120, 120, 250, 1)");
      purpleGradientBar.addColorStop(0, "rgba(120, 120, 250, 0)");

      const purpleGradientLine = lineCtx.createLinearGradient(0, 400, 0, 0);
      purpleGradientLine.addColorStop(1, "rgba(120, 120, 250, 1)");
      purpleGradientLine.addColorStop(0, "rgba(120, 120, 250, 0)");

      // Pink gradient for secondary datasets
      const pinkGradientBar = barCtx.createLinearGradient(0, 400, 0, 0);
      pinkGradientBar.addColorStop(1, "rgba(216, 120, 250, 1)");
      pinkGradientBar.addColorStop(0, "rgba(216, 120, 250, 0)");

      const pinkGradientLine = lineCtx.createLinearGradient(0, 400, 0, 0);
      pinkGradientLine.addColorStop(1, "rgba(216, 120, 250, 1)");
      pinkGradientLine.addColorStop(0, "rgba(216, 120, 250, 0)");

      setGradient({
        barMain: purpleGradientBar,
        barSecondary: pinkGradientBar,
        lineMain: purpleGradientLine,
        lineSecondary: pinkGradientLine,
      });
    }
  }, []);

  return { gradient, lineRef, chartRef };
}
