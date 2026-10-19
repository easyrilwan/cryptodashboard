import { useEffect, useState } from "react";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
  market_cap_rank_with_rehypothecated: number;
  sparkline_in_7d: {
    price: number[];
  };
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_14d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_200d_in_currency: number;
  price_change_percentage_1y_in_currency: number;
}

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

export default function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch data");

        const data: Coin[] = await res.json();
        console.log(data);
        setCoins(data);

        // 1. Prevent updating coins after cancellation.
        if (controller.signal.aborted) return;
      } catch (err: unknown) {
        // 2. Prevent cancellation from being treated as an error.
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      } finally {
        // Don't update state after the request is aborted.
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCoins();

    // Cleanup: cancel the request on unmount.
    return () => controller.abort();
  }, []);

  // Then Method to Fetch API
  /*
  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data: Coin[]) => {
        console.log(data);
        setCoins(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        // Ignore expected cancellation errors.
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      })
      .finally(() => {
        // Don't update state after the request is aborted.
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    // Cleanup: cancel the request on unmount.
    return () => controller.abort();
  }, []);
  */

  return (
    <div>
      <h1>🚀 Crypto Dashboard</h1>
    </div>
  );
}
