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

export default function OpenOpportunities() {
  const { opportunities } = useLoaderData<typeof loader>()
  const totalOpportunities = opportunities.length;


  return (
    <div className="mx-auto max-w-7xl py-4 sm:px-6 lg:px-8 ">
      {/* Content goes here */}

      <Card>
        <CardHeader>
          <CardTitle>Open Opportunities</CardTitle>
          <CardDescription>
            View open opportunities and apply for them. After applying you will receive a code you can use to check status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Icon</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>
                  <span className="sr-only">Apply or Code</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opportunity) => {
                return (
                  <TableRow key={opportunity.id}>
                    <TableCell className="hidden sm:table-cell">
                      <CarIcon
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {opportunity.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{opportunity.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {opportunity.date}
                    </TableCell>
                    {/* <TableCell>
                    {
                      !opportunity.applied ?
                        <Button variant={"default"} size={"sm"}>
                          Request
                        </Button>
                        :
                        <span className="text-lg font-semibold">
                          {opportunity.type}
                        </span>
                    }
                  </TableCell> */}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>{totalOpportunities}</strong> opportunities
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
