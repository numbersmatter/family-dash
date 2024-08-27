import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import OpenOpportunities from "./components/open-opportunities";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import { getOpportunities } from "./data-fetchers.server";
import { handleRequest } from "./mutations.server";

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
  const data = await getOpportunities({ appUserId });

  return json({ ...data, locale: "en" });
};


export const action = async (args: ActionFunctionArgs) => {
  const { appUserId } = await userInfo(args);
  const formInput = await args.request.formData();
  const options: { id: string }[] = [];


  return await handleRequest({ appUserId, formInput });
};





export default function OpportunitiesPage() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <OpenOpportunities />

    </>
  )
}