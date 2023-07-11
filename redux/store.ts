import { configureStore } from "@reduxjs/toolkit";

import mdataSlice from "./features/merchantdata-slice";
import { type } from "os";
import { TypedUseSelectorHook } from "react-redux";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

export const store = configureStore({
  reducer: {
    merchantdata: mdataSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
