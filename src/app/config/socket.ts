import { io, Socket } from 'socket.io-client';
import { setCount, setData, setSymbol } from '../redux/slices/cryptoSlice';
import { store } from '../redux/store';
import { NewDataPayload } from '../types';


const socket: Socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

socket.on('new-data', ({ data, symbol, count }: NewDataPayload) => {
  store.dispatch(setData(data));
  store.dispatch(setSymbol(symbol));
  store.dispatch(setCount(count));
});

export const startPolling = (): void => {
  socket.emit('start-polling');
};

export const stopPolling = (): void => {
  socket.emit('stop-polling');
};

export default socket;
