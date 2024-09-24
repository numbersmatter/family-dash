import { useLoaderData } from "@remix-run/react"
import { CarIcon, MoreHorizontal } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { loader } from "../route"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "~/components/ui/data-table"


type FoodRequest = {
  id: string;
  name: string;
  status: string;
  code: string;
  date: string;
  slot: string;
  type: string;
}


const requestColumns: ColumnDef<FoodRequest>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "slot",
    header: "Slot",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
]

// const foodRequests: FoodRequest[] = [
//   {
//     id: "1",
//     name: "Food Pickup Sept 5",
//     status: "pending",
//     code: "WBJP",
//     date: "2024-09-05",
//     slot: "4:00pm",
//     type: "pickup",
//   },
// ]



export default function ActiveRequests() {
  const { foodRequests } = useLoaderData<typeof loader>()


  return (
    <div className="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8 ">
      {/* Content goes here */}

      <Card className={""}>
        <CardHeader>
          <CardTitle>Active Requests</CardTitle>
          <CardDescription>
            Here you can see all the active requests you have made.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={requestColumns} data={foodRequests} />
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>

    </div>
  )
}
