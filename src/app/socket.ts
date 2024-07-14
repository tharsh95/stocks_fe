import { io } from 'socket.io-client';
import { setData } from './slices/cryptoSlice';
import { store } from './store';

const socket = io('http://localhost:8000');

socket.on('new-data', (data) => {
  store.dispatch(setData(data));
});

export default socket;
