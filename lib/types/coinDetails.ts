export type CoinDetails = {
  id: string;
  name: string;
  symbol: string;
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    subreddit_url: string;
  };
  description: {
    en: string;
  };
  market_data: {
    market_cap: {
      [currency: string]: number;
    };
    total_volume: {
      [currency: string]: number;
    };
    circulating_supply: number;
    max_supply: number | null;
    ath_date: {
      [currency: string]: string;
    };
    ath: {
      [currency: string]: number;
    };
    atl_date: {
      [currency: string]: string;
    };
    atl: {
      [currency: string]: number;
    };
    fdv_to_tvl_ratio: number | null;
    volume_24h: {
      [currency: string]: number;
    };
    volume_market: {
      [currency: string]: number;
    };
    current_price: {
      [currency: string]: number;
    };
    fully_diluted_valuation: {
      [currency: string]: number;
    };
    total_supply: number;

    price_change_percentage_24h: number;
  };
  image: { small: string; thumb: string; large: string };
  last_updated: string;
};
