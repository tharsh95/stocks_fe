// "use client"
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   data: [],
//   symbol: '',
//   count:0,
//   isPolling:false
  

// };

// const cryptoSlice = createSlice({
//   name: 'crypto',
//   initialState,
//   reducers: {
//     setData: (state, action) => {
//       state.data = action.payload;
//     },
//     setSymbol: (state, action) => {
//       state.symbol = action.payload;
//     },
//     setCount: (state, action) => {
//       state.count = action.payload;
//     },
//     togglePolling:(state)=>{
//       state.isPolling=!state.isPolling
//     }
//   },
// });

// export const { setData, setSymbol,setCount,togglePolling } = cryptoSlice.actions;
// export default cryptoSlice.reducer;
import { CryptoData } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state interface
interface CryptoState {
  data: CryptoData[]; // Replace `any` with a more specific type if you have a specific structure for data
  symbol: string;
  count: number;
  isPolling: boolean;
}

// Define initial state
const initialState: CryptoState = {
  data: [],
  symbol: 'BTC',
  count: 0,
  isPolling: false,
};

// Define the slice
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) { // Replace `any[]` with a more specific type if possible
      state.data = action.payload;
    },
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    togglePolling(state) {
      state.isPolling = !state.isPolling;
    },
  },
});


export const { setData, setSymbol, setCount, togglePolling } = cryptoSlice.actions;
export default cryptoSlice.reducer;
