import { useEffect, useState } from "react";

import type { Coin } from "./components/types/coinCardTypes";
import CoinCard from "./components/CoinCard";
import FilterInput from "./components/FilterInput";
import LimitSelector from "./components/LimitSelector";

const API_URL = import.meta.env.VITE_API_URL;
// "&order=market_cap_desc&per_page=10&page=1&sparkline=false";

export default function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
          { signal: controller.signal },
        );

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
  }, [limit]);

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

  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
      coin.symbol.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  });

  return (
    <div>
      <h1>🪙 Crypto Dashboard 🏦</h1>

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />

        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      {loading && <p>Loading..</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <p>There are no coin name matches found</p>
          )}
        </main>
      )}
    </div>
  );
}
