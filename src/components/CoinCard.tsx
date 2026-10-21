import type { Coin } from "./types/coinCardTypes";

interface CoinCardProps {
  coin: Coin;
}

export default function CoinCard({ coin }: CoinCardProps) {
  const change = coin.price_change_percentage_24h;

  return (
    <div className="coin-card">
      <div className="coin-header">
        <img src={coin.image} alt={coin.name} className="coin-image" />

        <div>
          <h2>{coin.name}</h2>

          <p className="symbol">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <p>Price: ${coin.current_price.toLocaleString()}</p>

      <p
        className={
          change == null ? "neutral" : change >= 0 ? "positive" : "negative"
        }
      >
        {change == null ? "N/A" : `${change.toFixed(2)}%`}
      </p>

      <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
    </div>
  );
}
