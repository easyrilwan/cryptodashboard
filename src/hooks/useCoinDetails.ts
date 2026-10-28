import { useEffect, useState } from "react";

import type { CoinDetails } from "../components/types/CoinDetailsTypes";

const API_URL = import.meta.env.VITE_COIN_API_URL;

interface UseCoinsResult {
  coin: CoinDetails | null;
  loading: boolean;
  error: string | null;
}

export function useCoinDetails(id: string | undefined): UseCoinsResult {
  const [coin, setCoin] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setCoin(null);
      setError("Coin ID is missing");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchCoin = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/${id}`, {
          signal: controller.signal,
        });

        if (res.status === 429) {
          throw new Error("Too many API requests. Please wait and try again.");
        }

        if (!res.ok) {
          throw new Error("Failed to fetch coins");
        }

        const data: CoinDetails = await res.json();
        // console.log(data);

        // 1. Prevent updating coins after cancellation.
        if (controller.signal.aborted) return;

        setCoin(data);
      } catch (err: unknown) {
        // 2. Prevent cancellation from being treated as an error.
        if (controller.signal.aborted) return;

        setCoin(null);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      } finally {
        // Don't update state after the request is aborted.
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchCoin();

    // Cleanup: cancel the request on unmount.
    return () => controller.abort();
  }, [id]);

  return { coin, loading, error };
}
