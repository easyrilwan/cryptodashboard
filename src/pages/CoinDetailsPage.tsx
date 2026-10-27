import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function CoinDetailsPage() {
  const { id } = useParams();
  console.log(id);

  const [coins, setCoins] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = import.meta.env.VITE_COIN_API_URL;

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

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
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCoins();

    // Cleanup: cancel the request on unmount.
    return () => controller.abort();
  }, [id]);

  return (
    <div>
      <p>
        Coin Details {id} {coins.symbol}
      </p>

      {loading && <p>Loading..</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
