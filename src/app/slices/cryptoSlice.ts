"use client"
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  symbol: 'BNB',
  count:20
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setData, setSymbol,setCount } = cryptoSlice.actions;
export default cryptoSlice.reducer;
