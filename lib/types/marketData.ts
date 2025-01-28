// ./types/marketData.ts
export type marketData = {
  data: {
    active_cryptocurrencies: number;
    market_cap_percentage: {
      [key: string]: number;
    };
    total_volume: {
      [key: string]: number;
    };
    total_market_cap: {
      [key: string]: number;
    };
    markets: number;
  };
};
