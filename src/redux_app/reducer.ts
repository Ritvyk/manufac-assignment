import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Wine } from "../global/interfaces/interface";

interface IntialState {
  wineData: Wine[] | [];
}

// Defines the initial state of the store
const initialState: IntialState = {
  wineData: [],
};

export const Root = createSlice({
  name: "root",
  initialState,
  reducers: {
    setInitialWineData: (state, action: PayloadAction<{ data: Wine[] }>) => {
      state.wineData = action.payload.data;
    },
  },
});

export const { setInitialWineData } = Root.actions;

export default Root.reducer;
