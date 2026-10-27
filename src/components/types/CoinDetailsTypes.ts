export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<
    string,
    {
      decimal_place: number | null;
      contract_address: string;
    }
  >;
  block_time_in_minutes: number;
  hashing_algorithm: string | null;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: string[];
  has_supply_breakdown: boolean;
  description: Record<string, string>;
  links: CoinLinks;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string | null;
  sentiment_votes_up_percentage: number | null;
  sentiment_votes_down_percentage: number | null;
  watchlist_portfolio_users: number;
  market_cap_rank: number | null;
  market_cap_rank_with_rehypothecated: number | null;
  status_updates: unknown[];
  last_updated: string;
  market_data: MarketData;
  tickers: Ticker[];
}

 interface CoinLinks {
  homepage: string[];
  whitepaper: string;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  snapshot_url: string | null;
  twitter_screen_name: string | null;
  facebook_username: string | null;
  bitcointalk_thread_identifier: number | null;
  telegram_channel_identifier: string | null;
  subreddit_url: string | null;
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
}

 type CurrencyValues = Record<string, number>;

 interface MarketData {
  current_price: CurrencyValues;
  total_value_locked: number | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  ath: CurrencyValues;
  ath_change_percentage: CurrencyValues;
  ath_date: Record<string, string>;
  atl: CurrencyValues;
  atl_change_percentage: CurrencyValues;
  atl_date: Record<string, string>;
  market_cap: CurrencyValues;
  fully_diluted_valuation: CurrencyValues;
  market_cap_fdv_ratio: number | null;
  market_cap_rank: number | null;
  outstanding_token_value_usd: number | null;
  market_cap_rank_with_rehypothecated: number | null;
  total_volume: CurrencyValues;
  high_24h: CurrencyValues;
  low_24h: CurrencyValues;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d: number | null;
  price_change_percentage_14d: number | null;
  price_change_percentage_30d: number | null;
  price_change_percentage_60d: number | null;
  price_change_percentage_200d: number | null;
  price_change_percentage_1y: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  price_change_24h_in_currency: CurrencyValues;
  price_change_percentage_1h_in_currency: CurrencyValues;
  price_change_percentage_24h_in_currency: CurrencyValues;
  price_change_percentage_7d_in_currency: CurrencyValues;
  price_change_percentage_14d_in_currency: CurrencyValues;
  price_change_percentage_30d_in_currency: CurrencyValues;
  price_change_percentage_60d_in_currency: CurrencyValues;
  price_change_percentage_200d_in_currency: CurrencyValues;
  price_change_percentage_1y_in_currency: CurrencyValues;
  market_cap_change_24h_in_currency: CurrencyValues;
  market_cap_change_percentage_24h_in_currency: CurrencyValues;
  total_supply: number | null;
  max_supply: number | null;
  max_supply_infinite: boolean;
  circulating_supply: number | null;
  outstanding_supply: number | null;
  last_updated: string;
}

 interface Ticker {
  base: string;
  target: string;
  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
  };
  last: number;
  volume: number;
  converted_last: CurrencyValues;
  converted_volume: CurrencyValues;
  trust_score: string | null;
  bid_ask_spread_percentage: number | null;
  timestamp: string;
  last_traded_at: string | null;
  last_fetch_at: string | null;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string | null;
  token_info_url: string | null;
  coin_id: string;
  target_coin_id: string;
  coin_mcap_usd: number | null;
}
