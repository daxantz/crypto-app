import { createSlice } from "@reduxjs/toolkit";

export type coin = {
  symbol: string;
  id: string;
  name: string;
  image: string;
  currentPrice: number | null;
};
const initialState = {
  coin1: {
    name: "Bitcoin",
    id: "bitcoin",
    symbol: "btc",
    image:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    currentPrice: null,
  },
  coin2: {
    name: "Ethereum",
    id: "ethereum",
    symbol: "eth",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    currentPrice: null,
  },
};
const conversionSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setCoin1(state, action) {
      state.coin1 = action.payload;
    },
    setCoin2(state, action) {
      state.coin2 = action.payload;
    },
  },
});
export const { setCoin1, setCoin2 } = conversionSlice.actions;

export default conversionSlice.reducer;
