import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { ProgramCard } from "./components/program-card";
import { ProgramGrid } from "./components/program-grid";
import { RedirectToSignIn, SignedOut } from "@clerk/remix";



export const loader = async (args: LoaderFunctionArgs) => {
  const programs = [
    {
      title: "Food Backpack Delivery Program",
      description: "This program replaces the food backpack program.",
      type: "pickup",
    },
  ];
  return json({ programs });
};



export default function UIEnrollmentRoute() {

  return (
    <>
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-xl">
          Programs in Open Enrollment
        </h2>
      </div>
      <ProgramGrid />
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}