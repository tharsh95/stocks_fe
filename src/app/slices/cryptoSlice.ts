import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  symbol: 'BTC',
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
  },
});

export const { setData, setSymbol } = cryptoSlice.actions;
export default cryptoSlice.reducer;
