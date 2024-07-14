import { ColumnDef } from "@tanstack/react-table"
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }


export const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "rate",
      header: "Price",
    },
    {
      accessorKey: "createdAt",
      header: "DateTime",
      cell: ({ row }) => {
        const formatted = new Date(row.getValue("createdAt")).toLocaleString()
   
        return <div>{formatted}</div>
      },
    },
  ]