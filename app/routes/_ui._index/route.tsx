import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";

import { Button } from "~/components/ui/button"
import { StatusCard } from "./components/status-card";
import OpenOpportunities from "./components/opportunities-table";
import { useTranslation } from "react-i18next";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export type Enrollment = {
  id: string,
  title: string,
  description: string,
  helpText: string,
  enrollement: boolean
}
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

  const enrollments = [
    {
      id: "1",
      title: "Fall 2024 Semester",
      description: "August - December 2024",
      helpText: "In Order to receive services you must register for the Fall 2024 Semester. You can register for the Fall 2024 Semester which runs from September 1st to December 31st.",
      enrollement: false,
    }
  ]
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


  return json({ enrollments, opportunities });
};



export default function Dashboard() {
  const { enrollments } = useLoaderData<typeof loader>()
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          {t("welcome")}
        </h1>
      </div>
      {enrollments.map((enrollment) => (
        <StatusCard key={enrollment.id} data={enrollment} />
      ))}
      <OpenOpportunities />
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-xl">
          Upcoming Events
        </h2>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="flex flex-col items-center gap-1 text-center p-4">
          <h3 className="text-2xl font-bold tracking-tight">
            No events
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling events to register for once you are enrolled in the Fall 2024 Semester.

          </p>

        </div>
      </div>
    </>
  )
}
