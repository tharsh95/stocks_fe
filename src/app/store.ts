import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './slices/cryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  // Optionally, you can add middleware or devTools configurations here
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
