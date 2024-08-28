import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import OpenOpportunities from "./components/open-opportunities";
import { userInfo } from "~/lib/business-logic/signed-in.server";
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
  const { appUserId } = await userInfo(args);
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const data = await getOpportunities({ appUserId });

  return json({ ...data, locale: "en" });
};


export const action = async (args: ActionFunctionArgs) => {
  const { appUserId } = await userInfo(args);
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }

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