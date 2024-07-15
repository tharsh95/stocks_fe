"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import socket, { startPolling, stopPolling } from "../config/socket";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setSymbol, togglePolling } from "../redux/slices/cryptoSlice";
import { columns } from "./columns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Modal from "./Dialog";

export function DataTable() {
  const dispatch = useDispatch();
  const { data, symbol, count, isPolling } = useSelector(
    (state: RootState) => state.crypto
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const symbols = [
    { name: "Bitcoin", value: "BTC" },
    { name: "Ethereum", value: "ETH" },
    { name: "Tether", value: "USDT" },
    { name: "BNB", value: "BNB" },
    { name: "Solana", value: "SOL" },
  ];
  const handleSymbolChange = async (val: string) => {
    dispatch(setSymbol(val));
    if (!isPolling) {
      dispatch(togglePolling());
      startPolling();
    }
    socket.emit("change-symbol", val);
  };
  const handleTogglePolling = () => {
    dispatch(togglePolling());
    if (!isPolling) {
      startPolling();
    } else {
      stopPolling();
    }
  };
  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <img src={data[0]?.symbol} alt={"alt"} height={40} width={40} />
        </div>
        <div>
          <Button
            onClick={handleTogglePolling}
            variant={isPolling ? "destructive" : "default"}
          >
            {isPolling ? "Stop Polling" : "Start Polling"}
          </Button>
        </div>
        <div>
          <Modal />
        </div>
        <div>
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
        </div>
        <div>
          <Button>{count}</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : Array.from({ length: 10 })?.map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
