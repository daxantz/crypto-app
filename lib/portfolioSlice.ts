import { createSlice } from "@reduxjs/toolkit";

export type coin = {
  id: string;
  amountPurchased: number;
  datePurchased: Date;
  image: string;
  symbol: string;
  name: string;
};
export type portfolio = {
  coins: coin[];
};

const initialState: portfolio = {
  coins: [],
};
const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addCoin(state, action) {
      let coin;
      const coinExists = state.coins.find(
        (coin) => coin.id === action.payload.id
      );
      if (coinExists) {
        state.coins = state.coins.filter((coin) => coin.id !== coinExists.id);
        coin = {
          ...coinExists,
          amountPurchased:
            Number(action.payload.amount) + Number(coinExists.amountPurchased),
          datePurchased: action.payload.purchasedDate,
        };
        state.coins.push(coin);
      } else {
        coin = {
          id: action.payload.id,
          amountPurchased: Number(action.payload.amount),
          datePurchased: action.payload.purchasedDate,
          image: action.payload.large,
          symbol: action.payload.symbol,
          name: action.payload.value,
        };
        state.coins.push(coin);
      }
    },
  },
});
export const { addCoin } = portfolioSlice.actions;

export default portfolioSlice.reducer;
