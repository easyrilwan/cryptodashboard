import { useEffect, useState } from "react";

import type { Coin } from "../components/types/coinCardTypes";

const API_URL = import.meta.env.VITE_COINS_API_URL;

interface UseCoinsResult {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}

export function useCoins(limit: number): UseCoinsResult {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
          { signal: controller.signal },
        );

        if (res.status === 429) {
          throw new Error("Too many API requests. Please wait and try again.");
        }

        if (!res.ok) {
          throw new Error("Failed to fetch coins");
        }

        const data: Coin[] = await res.json();

        // 1. Prevent updating coins after cancellation.
        if (controller.signal.aborted) return;

        console.log(data);

        setCoins(data);
      } catch (err: unknown) {
        // 2. Prevent cancellation from being treated as an error.
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      } finally {
        // Don't update state after the request is aborted.
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCoins();

    // Cleanup: cancel the request on unmount.
    return () => controller.abort();
  }, [limit]);

  return { coins, loading, error };
}
