import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./reducer";

export const store = configureStore({
  reducer: {
    root: RootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
