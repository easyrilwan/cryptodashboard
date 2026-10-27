import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import type { CoinDetails } from "../components/types/CoinDetailsTypes";

export default function CoinDetailsPage() {
  const { id } = useParams();
  console.log(id);

  const [coin, setCoin] = useState<CoinDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = import.meta.env.VITE_COIN_API_URL;

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch data");

        const data: CoinDetails = await res.json();

        // 1. Prevent updating coin after cancellation.
        if (controller.signal.aborted) return;

        console.log(data);
        setCoin(data);
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

    fetchCoin();

    // Cleanup: cancel the request on unmount.
    return () => controller.abort();
  }, [id]);

  return (
    <div className="coin-details-container">
      <Link to="/">← Back To Home</Link>

      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>

      {loading && <p>Loading..</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            className="coin-details-image"
          />

          <p>{coin?.description.en.split(". ")[0] + "."}</p>

          <div className="coin-details-info">
            <h3>Rank: #{coin?.market_cap_rank}</h3>

            <h3>
              Current Price: $
              {coin?.market_data.current_price.usd.toLocaleString()}
            </h3>

            <h4>
              Market Cap: ${coin?.market_data.market_cap.usd.toLocaleString()}
            </h4>

            <h4>
              24h High: ${coin?.market_data.high_24h.usd.toLocaleString()}
            </h4>
            <h4>24h Low: ${coin?.market_data.low_24h.usd.toLocaleString()}</h4>

            <h4>
              24h Price Change: $
              {coin?.market_data.price_change_24h?.toFixed(2)} ({" "}
              {coin?.market_data.price_change_percentage_24h?.toFixed(2)}%)
            </h4>

            <h4>
              Circulating Supply:{" "}
              {coin?.market_data.circulating_supply?.toLocaleString()}
            </h4>

            <h4>
              Total Supply:{" "}
              {coin?.market_data.total_supply?.toLocaleString() || "N/A"}
            </h4>

            <h4>
              All-Time High: ${coin?.market_data.ath.usd.toLocaleString()} on{" "}
              {coin?.market_data.ath_date.usd
                ? new Date(coin.market_data.ath_date.usd).toLocaleDateString()
                : "N/A"}
            </h4>
            <h4>
              All-Time Low: ${coin?.market_data.atl.usd.toLocaleString()} on{" "}
              {coin?.market_data.atl_date.usd
                ? new Date(coin.market_data.atl_date.usd).toLocaleDateString()
                : "N/A"}
            </h4>

            <h4>
              Last Updated:{" "}
              {coin?.last_updated
                ? new Date(coin?.last_updated).toLocaleDateString()
                : ""}
            </h4>
          </div>

          <div className="coin-details-links">
            {coin?.links.homepage[0] && (
              <p>
                🌐{" "}
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            )}

            {coin?.links.blockchain_site[0] && (
              <p>
                🧩{" "}
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}

            {coin?.categories.length
              ? coin?.categories.length > 0 && (
                  <p>Categories: {coin?.categories.join(", ")} </p>
                )
              : "N/A"}
          </div>
        </>
      )}

      {!loading && !error && !coin && <p>NO Data Found!</p>}
    </div>
  );
}
