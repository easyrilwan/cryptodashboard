type ChartDataPoint = [timestamp: number, value: number];

export interface CoinMarketChart {
  prices: ChartDataPoint[];
  market_caps: ChartDataPoint[];
  total_volumes: ChartDataPoint[];
}
