import { createSlice } from "@reduxjs/toolkit";
type Coin = {
  id: number;
  name: string;
  value: number;
};
const initialState: Coin[] = [{ id: 22, name: "bit", value: 444 }];
const coinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    addCoin(state, action) {
      state.push(action.payload);
    },
  },
});
export const { addCoin } = coinSlice.actions;

export default coinSlice.reducer;
