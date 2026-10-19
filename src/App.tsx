import { useEffect, useState } from "react";

import CoinCard from "./components/CoinCard";
import type { Coin } from "./components/coinCardTypes";

interface CoinTypes {
  coin: Coin;
}

const API_URL = import.meta.env.VITE_API_URL;
// "&order=market_cap_desc&per_page=10&page=1&sparkline=false";

export default function App() {
  const [coins, setCoins] = useState<CoinTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data: CoinTypes[] = await res.json();
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
      <h1>🪙 Crypto Dashboard 🏦</h1>

      {loading && <p>Loading..</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
}
