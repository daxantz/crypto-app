import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "@/lib/coinSlice";
import currencyReducer from "@/lib/currencySlice";
import { cryptoApi } from "./cryptoApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinReducer,
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      currency: currencyReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cryptoApi.middleware),
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
