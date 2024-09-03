import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { getAuth } from "@clerk/remix/ssr.server";
import { db } from "~/db/db.server";
import InstructionCard from "./components/instructions-card";
import AdultsCard from "./components/adults-card";
import { saveAdult } from "./mutations.server";


export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args)
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];
  const appUser = await db.appUser.read(appUserId);

  const locale = appUser?.language
  const adults = appUser?.household_adults as number


  return json({ locale, adults });
};


export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];

  const formData = await args.request.formData();

  return saveAdult({ appUserId, formData });

};





export default function AdultsPage() {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">
        <main className="flex flex-1 flex-col overflow-y-auto gap-4 p-4 lg:gap-6 lg:p-6">
          <InstructionCard />
          <AdultsCard />
        </main>
      </div>
    </div>
  );
}



