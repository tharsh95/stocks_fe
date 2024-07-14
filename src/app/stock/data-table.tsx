"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import socket from "../socket";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setSymbol } from "../slices/cryptoSlice";

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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}


export function DataTable<TData, TValue>({
  columns,
  data,
}: Readonly<DataTableProps<TData, TValue>>) {
  const dispatch = useDispatch();
  const { symbol, count } = useSelector((state: RootState) => state.crypto);
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
    const newSymbol = val;
    dispatch(setSymbol(newSymbol));
    socket.emit("change-symbol", newSymbol);
  };
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="">
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
