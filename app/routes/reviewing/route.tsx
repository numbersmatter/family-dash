import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { requireAuth } from "~/lib/business-logic/signed-in.server";
import { getReviewData } from "./data-fetcher.server";
import { getActiveSemester } from "~/lib/business-logic/active-semester.server";
import AppliedCard from "./components/applied-card";

export const loader = async (args: LoaderFunctionArgs) => {
  const { appUserId, appUserProfile } = await requireAuth(args);
  const { semesterId } = await getActiveSemester();
  const { applicationDate, status } = await getReviewData({ appUserId, semesterId });



  const locale = appUserProfile?.language ?? "en";

  return json({ locale, applicationDate, status });
};



export default function ReviewingPage() {


  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">
        <main className="flex flex-1 flex-col content-center items-center  gap-4 p-4 lg:gap-6 lg:p-6">
          <h1>Reviewing Page</h1>
          <AppliedCard />
        </main>
      </div>
    </div>
  )
}