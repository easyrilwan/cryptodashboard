import { useState } from "react";

import CoinCard from "../components/CoinCard";
import FilterInput from "../components/FilterInput";
import LimitSelector from "../components/LimitSelector";
import SortSelector from "../components/SortSelector";
import Spinner from "../components/Spinner";
import { useCoins } from "../hooks/useCoins";

export default function HomePage() {
  const [filter, setFilter] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState("market_cap_desc");

  const { coins, loading, error } = useCoins(limit);

  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        coin.symbol.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;

        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;

        case "change_desc":
          return (
            (b.price_change_percentage_24h ?? 0) -
            (a.price_change_percentage_24h ?? 0)
          );

        case "change_asc":
          return (
            (a.price_change_percentage_24h ?? 0) -
            (b.price_change_percentage_24h ?? 0)
          );

        default:
          return 0;
      }
    });
  return (
    <div>
      <h1>🪙 Crypto Dashboard 🏦</h1>

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />

        <LimitSelector limit={limit} onLimitChange={setLimit} />

        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading && <Spinner color="white" />}

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
