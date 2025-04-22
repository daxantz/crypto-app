export type searchCoins = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  total_volume: number;
  price_change_percentage_24h: number;
  total_supply: number;
};

export type queryCoin = {
  id: string;
  name: string;
  symbol: string;
  api_symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};
