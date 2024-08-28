import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import OpenOpportunities from "./components/open-opportunities";
import { getOpportunities } from "./data-fetchers.server";
import { handleRequest } from "./mutations.server";
import { RedirectToSignIn, SignedOut } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";

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
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }

  const appUserId = userId.split("_", 2)[1];

  const data = await getOpportunities({ appUserId });

  return json({ ...data, locale: "en" });
};


export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];

  const formInput = await args.request.formData();
  const options: { id: string }[] = [];


  return await handleRequest({ appUserId, formInput });
};





export default function OpportunitiesPage() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <OpenOpportunities />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
      </div>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

    </>
  )
}