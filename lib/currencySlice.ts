import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "lucide-react";
export type Currency = "USD" | "GBP" | "EUR" | "BTC" | "ETH";
const initialState = { currency: "USD" as Currency };
const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: {
      reducer(state, action: PayloadAction<{ selectedCurrency: Currency }>) {
        state.currency = action.payload.selectedCurrency;
      },
      prepare(selectedCurrency: Currency) {
        return {
          payload: { selectedCurrency },
        };
      },
    },
  },
});
export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
