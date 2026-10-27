export interface Coindata {
    coindata: Coindatum[];
}

export interface Coindatum {
    id:                                  string;
    symbol:                              string;
    name:                                string;
    web_slug:                            string;
    asset_platform_id:                   null;
    platforms:                           Platforms;
    detail_platforms:                    DetailPlatforms;
    block_time_in_minutes:               number;
    hashing_algorithm:                   string;
    categories:                          string[];
    preview_listing:                     boolean;
    public_notice:                       null;
    additional_notices:                  any[];
    has_supply_breakdown:                boolean;
    description:                         Description;
    links:                               Links;
    image:                               Image;
    country_origin:                      string;
    genesis_date:                        Date;
    sentiment_votes_up_percentage:       number;
    sentiment_votes_down_percentage:     number;
    watchlist_portfolio_users:           number;
    market_cap_rank:                     number;
    market_cap_rank_with_rehypothecated: number;
    status_updates:                      any[];
    last_updated:                        Date;
    market_data:                         MarketData;
    tickers:                             Ticker[];
}

export interface Description {
    en: string;
}

export interface DetailPlatforms {
    "": Empty;
}

export interface Empty {
    decimal_place:    null;
    contract_address: string;
}

export interface Image {
    thumb: string;
    small: string;
    large: string;
}

export interface Links {
    homepage:                      string[];
    whitepaper:                    string;
    blockchain_site:               string[];
    official_forum_url:            string[];
    chat_url:                      string[];
    announcement_url:              string[];
    snapshot_url:                  null;
    twitter_screen_name:           string;
    facebook_username:             string;
    bitcointalk_thread_identifier: null;
    telegram_channel_identifier:   string;
    subreddit_url:                 string;
    repos_url:                     ReposURL;
}

export interface ReposURL {
    github:    string[];
    bitbucket: any[];
}

export interface MarketData {
    current_price:                                { [key: string]: number };
    total_value_locked:                           null;
    mcap_to_tvl_ratio:                            null;
    fdv_to_tvl_ratio:                             null;
    roi:                                          null;
    ath:                                          { [key: string]: number };
    ath_change_percentage:                        { [key: string]: number };
    ath_date:                                     AthDateClass;
    atl:                                          { [key: string]: number };
    atl_change_percentage:                        { [key: string]: number };
    atl_date:                                     AthDateClass;
    market_cap:                                   { [key: string]: number };
    fully_diluted_valuation:                      { [key: string]: number };
    market_cap_fdv_ratio:                         number;
    market_cap_rank:                              number;
    outstanding_token_value_usd:                  null;
    market_cap_rank_with_rehypothecated:          number;
    total_volume:                                 { [key: string]: number };
    high_24h:                                     { [key: string]: number };
    low_24h:                                      { [key: string]: number };
    price_change_24h:                             number;
    price_change_percentage_24h:                  number;
    price_change_percentage_7d:                   number;
    price_change_percentage_14d:                  number;
    price_change_percentage_30d:                  number;
    price_change_percentage_60d:                  number;
    price_change_percentage_200d:                 number;
    price_change_percentage_1y:                   number;
    market_cap_change_24h:                        number;
    market_cap_change_percentage_24h:             number;
    price_change_24h_in_currency:                 { [key: string]: number };
    price_change_percentage_1h_in_currency:       { [key: string]: number };
    price_change_percentage_24h_in_currency:      { [key: string]: number };
    price_change_percentage_7d_in_currency:       { [key: string]: number };
    price_change_percentage_14d_in_currency:      { [key: string]: number };
    price_change_percentage_30d_in_currency:      { [key: string]: number };
    price_change_percentage_60d_in_currency:      { [key: string]: number };
    price_change_percentage_200d_in_currency:     { [key: string]: number };
    price_change_percentage_1y_in_currency:       { [key: string]: number };
    market_cap_change_24h_in_currency:            { [key: string]: number };
    market_cap_change_percentage_24h_in_currency: { [key: string]: number };
    total_supply:                                 number;
    max_supply:                                   number;
    max_supply_infinite:                          boolean;
    circulating_supply:                           number;
    outstanding_supply:                           null;
    last_updated:                                 Date;
}

export interface AthDateClass {
    btc: Date;
    eur: Date;
    usd: Date;
}

export interface Platforms {
    "": string;
}

export interface Ticker {
    base:                      string;
    target:                    string;
    market:                    Market;
    last:                      number;
    volume:                    number;
    converted_last:            { [key: string]: number };
    converted_volume:          { [key: string]: number };
    trust_score:               null;
    bid_ask_spread_percentage: number;
    timestamp:                 Date;
    last_traded_at:            Date;
    last_fetch_at:             Date;
    is_anomaly:                boolean;
    is_stale:                  boolean;
    trade_url:                 string;
    token_info_url:            null;
    coin_id:                   string;
    target_coin_id:            string;
    coin_mcap_usd:             number;
}

export interface Market {
    name:                  string;
    identifier:            string;
    has_trading_incentive: boolean;
}
