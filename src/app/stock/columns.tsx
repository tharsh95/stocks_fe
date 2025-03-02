import { ColumnDef } from "@tanstack/react-table"
export type Coin = {

    name: string
    rate: number
    createdAt: string
  }


export const columns: ColumnDef<Coin>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "rate",
      header: "Price",
      cell: ({ row }) => {
        // let preciseNumber = row.getValue("createdAt").toFixed(4);
        const fixed = (row.getValue("rate") as number).toFixed(4)
   
        return <div>{fixed}</div>
      },
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