import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";

import { Button } from "~/components/ui/button"
import { StatusCard } from "./components/status-card";


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

  return json({ enrollments });
};



export default function Dashboard() {
  const { enrollments } = useLoaderData<typeof loader>()
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Welcome to Family Dash
        </h1>
      </div>
      {enrollments.map((enrollment) => (
        <StatusCard key={enrollment.id} data={enrollment} />
      ))}
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
