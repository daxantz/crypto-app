import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "@/lib/coinSlice";
import currencyReducer from "@/lib/currencySlice";
import { cryptoApi } from "./cryptoApi";
import portfolioReducer from "@/lib/portfolioSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinReducer,
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      currency: currencyReducer,
      portfolio: portfolioReducer,
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
