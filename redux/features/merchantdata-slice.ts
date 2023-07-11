import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const mdataSlice = createSlice({
  name: "merchantdata",
  initialState: {
    merchantdata: [],
  },
  reducers: {
    setMerchantData: (state, action: PayloadAction<any>) => {
      //state.push(action.payload);
      state.merchantdata = action.payload;
    },
  },
});

export const { setMerchantData } = mdataSlice.actions;

export default mdataSlice.reducer;
