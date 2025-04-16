import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchCoins } from "./types/searchCoin";

type state = {
  selectedCoin: searchCoins | null;
  compareCoins: searchCoins[];
  isComparing: boolean;
};
const initialState: state = {
  selectedCoin: null,
  compareCoins: [],
  isComparing: false,
};
const coinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setSelectedCoin(state, action) {
      const coin = action.payload;
      if (state.selectedCoin?.id === coin.id) return;
      state.selectedCoin = coin;
    },
    setSelectedCoins(state, action: PayloadAction<searchCoins | null>) {
      const coin = action.payload;
      if (state.isComparing && coin === null) {
        state.compareCoins = [state.selectedCoin!];
        // console.log(state.compareCoins);
        return;
      }

      state.compareCoins = [state.selectedCoin!, coin!];
      // console.log("setting this to the compare coins array", coin);
    },

    setIsComparing(state) {
      state.isComparing = !state.isComparing;
      // console.log(state.isComparing);
    },
  },
});
export const {
  setSelectedCoin,
  setSelectedCoins,

  setIsComparing,
} = coinSlice.actions;

export default coinSlice.reducer;
