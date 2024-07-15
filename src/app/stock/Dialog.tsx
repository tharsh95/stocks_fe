import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setSymbol, togglePolling } from "../redux/slices/cryptoSlice";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import socket, { startPolling } from "../config/socket";


const Modal = () => {

    const dispatch = useDispatch();
    const { symbol, isPolling } = useSelector(
        (state: RootState) => state.crypto
      );
  const symbols = [
    { name: "Bitcoin", value: "BTC" },
    { name: "Ethereum", value: "ETH" },
    { name: "Tether", value: "USDT" },
    { name: "BNB", value: "BNB" },
    { name: "Solana", value: "SOL" },
  ];
  const handleSymbolChange = async (val: string) => {
    dispatch(setSymbol(val));
    if(!isPolling){
        dispatch(togglePolling())
        startPolling()
    }
    socket.emit("change-symbol", val);

  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Change Crypto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change the crypto</DialogTitle>
          <DialogDescription>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <p className="capitalize">{symbol}</p>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {symbols.map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.value}
                      className="capitalize"
                      checked={column.value===symbol} 
                      onCheckedChange={() => handleSymbolChange(column.value)}
                    >
                      {column.name}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
