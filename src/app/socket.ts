import { io } from 'socket.io-client';
import { setCount, setData, setSymbol } from './slices/cryptoSlice';
import { store } from './store';

const socket = io('http://localhost:8000');

socket.on('new-data', ({data,symbol,count}) => {
  console.log(symbol,'sty')
  store.dispatch(setData(data));
  store.dispatch(setSymbol(symbol));
  store.dispatch(setCount(count));
});

export default socket;
