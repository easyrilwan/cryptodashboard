import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Tooltip,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register([
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
]);

import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";
import type { CoinMarketChart } from "./types/CoinChartData";

interface CoinChartProps {
  coinId: string | undefined;
}

type PricePoint = {
  x: number;
  y: number;
};

const API_URL = import.meta.env.VITE_COIN_API_URL;

export default function CoinChart({ coinId }: CoinChartProps) {
  const [chartData, setChartData] = useState<ChartData<
    "line",
    PricePoint[]
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPrices = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
          {
            signal: controller.signal,
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch prices");
        }

        const data: CoinMarketChart = await res.json();
        // console.log(data);

        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));

        // console.log(prices);

        setChartData({
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              fill: true,
              borderColor: "#22d3ee",
              backgroundColor: "rgba(0, 145, 255, 0.1)",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });

        // 1. Prevent updating coins after cancellation.
        if (controller.signal.aborted) return;
      } catch (err: unknown) {
        // 2. Prevent cancellation from being treated as an error.
        if (controller.signal.aborted) return;

        setChartData(null);

        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      } finally {
        // Don't update state after the request is aborted.
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchPrices();

    // Cleanup: cancel the request on unmount.
    return () => controller.abort();
  }, [coinId]);

  if (loading) return <p>Loading price chart...</p>;

  if (error) return <p role="alert">{error}</p>;

  if (!chartData || chartData.datasets[0]?.data.length === 0) {
    return <p>No price history available.</p>;
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
}
