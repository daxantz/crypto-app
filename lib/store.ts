import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import coinReducer from "@/lib/coinSlice";
import currencyReducer from "@/lib/currencySlice";
import { cryptoApi } from "./cryptoApi";
import portfolioReducer, { addCoin } from "@/lib/portfolioSlice";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  matcher: isAnyOf(addCoin),

  effect: (action, listenerApi) => {
    const state = listenerApi.getState().portfolio;

    const portfolioExists = localStorage.getItem("portfolio");

    if (portfolioExists) {
      const parsedPortfolio = JSON.parse(portfolioExists);
      parsedPortfolio.coins.push(state.coins[state.coins.length - 1]);
      localStorage.setItem("portfolio", JSON.stringify(parsedPortfolio));
    } else {
      localStorage.setItem("portfolio", JSON.stringify(state));
    }
  },
});

export const makeStore = () => {
  return configureStore({
    reducer: {
      coins: coinReducer,
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      currency: currencyReducer,
      portfolio: portfolioReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(cryptoApi.middleware),
  });
};

export const store = makeStore();
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
