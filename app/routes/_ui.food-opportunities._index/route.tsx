import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import OpenOpportunities from "./components/open-opportunities";


interface FoodOpportunity {
  id: string;
  name: string;
  status: string;
  code: string;
  totalSales: number;
  date: string;
  applied: boolean;
}



export const loader = async (args: LoaderFunctionArgs) => {

  const opportunities: FoodOpportunity[] = [
    {
      id: "1",
      name: "Food Pickup - Sept 4th",
      status: "Confirmed",
      code: "H5GVB",
      totalSales: 25,
      date: "Sept. 4, 2024",
      applied: true
    },
    {
      id: "2",
      name: "Drive-Thru - Sept 18",
      status: "Open",
      code: "DF6R",
      totalSales: 100,
      date: "September 18, 2024",
      applied: false

    },
  ]
  return json({ opportunities });
};


export default function OpportunitiesPage() {

  return (
    <>
      <OpenOpportunities />
    </>
  )
}