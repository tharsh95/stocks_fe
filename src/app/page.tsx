"use client";
import { columns } from "./stock/columns";
import { DataTable } from "./stock/data-table";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default function Home() {
  const { data } = useSelector((state: RootState) => state.crypto);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
