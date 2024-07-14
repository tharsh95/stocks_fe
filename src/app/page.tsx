"use client";
import { Payment, columns } from "./stock/columns"
import { DataTable } from "./stock/data-table"

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { setSymbol } from "./slices/cryptoSlice";
import socket from "./socket";

export default function Home() {
  const dispatch = useDispatch();
  const { data, symbol } = useSelector((state: RootState) => state.crypto);
console.log(symbol,"symbol")
  const handleSymbolChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSymbol = e.target.value;
    dispatch(setSymbol(newSymbol));
    socket.emit("change-symbol", newSymbol); // Ensure your backend handles this
    // await axios.post("http://localhost:8000/api/change-code",{
    //   code:newSymbol
    // })
  };

  return (
    <div>
      <h1>Real-Time Crypto Prices</h1>
      <select value={symbol} onChange={handleSymbolChange}>
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="USDT">Tether (USDT)</option>
        {/* Add more options as needed */}
      </select>
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
      {/* <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Name</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
          

              <tr key={item.id}>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{item.name}</td>
                <td>{item.rate}</td>
              </tr>
            
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
