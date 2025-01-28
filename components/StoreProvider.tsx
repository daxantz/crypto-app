"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

type StoreProviderProps = {
  children: ReactNode;
};

const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={makeStore()}>{children}</Provider>;
};

export default StoreProvider;
