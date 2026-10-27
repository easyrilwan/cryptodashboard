// import { useEffect, useState } from "react";

// // import type { Coin } from "./components/types/coinCardTypes";
// import useCoins from "./hooks/useCoins";
// import HomePage from "./pages/HomePage";

// const API_URL = import.meta.env.VITE_COINS_API_URL;

// export default function App() {
//   // const [coins, setCoins] = useState<Coin[]>([]);
//   // const [loading, setLoading] = useState<boolean>(true);
//   // const [error, setError] = useState<string | null>(null);
//   const [limit, setLimit] = useState<number>(10);
//   const [filter, setFilter] = useState<string>("");
//   const [sortBy, setSortBy] = useState<string>("market_cap_desc");

//   // useEffect(() => {
//   //   const controller = new AbortController();

//   //   const fetchCoins = async () => {
//   //     try {
//   //       const res = await fetch(
//   //         `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
//   //         { signal: controller.signal },
//   //       );

//   //       if (!res.ok) throw new Error("Failed to fetch data");

//   //       const data: Coin[] = await res.json();

//   //       // 1. Prevent updating coins after cancellation.
//   //       if (controller.signal.aborted) return;

//   //       console.log(data);
//   //       setCoins(data);
//   //     } catch (err: unknown) {
//   //       // 2. Prevent cancellation from being treated as an error.
//   //       if (controller.signal.aborted) return;

//   //       setError(
//   //         err instanceof Error ? err.message : "An unexpected error occurred",
//   //       );
//   //     } finally {
//   //       // Don't update state after the request is aborted.
//   //       if (!controller.signal.aborted) {
//   //         setLoading(false);
//   //       }
//   //     }
//   //   };

//   //   fetchCoins();

//   //   // Cleanup: cancel the request on unmount.
//   //   return () => controller.abort();
//   // }, [limit]);

//   const { coins, loading, error } = useCoins(limit);

//   return (
//     <HomePage
//       coins={coins}
//       filter={filter}
//       setFilter={setFilter}
//       limit={limit}
//       setLimit={setLimit}
//       sortBy={sortBy}
//       setSortBy={setSortBy}
//       loading={loading}
//       error={error}
//     />
//   );
// }
