import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "lucide-react";
export type Currency = "usd" | "gbp" | "eur" | "btc" | "eth";
const initialState = { currency: "usd" as Currency };
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
