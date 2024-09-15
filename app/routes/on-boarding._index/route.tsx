import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { AddressCard } from "./components/address";
import { getAuth } from "@clerk/remix/ssr.server";
import { updateAddress } from "./mutations.server";
import { getAddressData } from "./data-fetcher.server";
import { checkRegistration } from "~/lib/business-logic/registration.server";
import { requireAuth } from "~/lib/business-logic/signed-in.server";
import { getActiveSemester } from "~/lib/business-logic/active-semester.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { appUserId } = await requireAuth(args);
  const { semesterId } = await getActiveSemester();
  await checkRegistration({ semesterId, appUserId });

  const { address, locale } = await getAddressData({ appUserId });



  return json({ locale, address, appUserId });
};


export const action = async (args: ActionFunctionArgs) => {
  const formInput = await args.request.formData();
  const { appUserId } = await requireAuth(args);
  const { semesterId } = await getActiveSemester();


  return updateAddress({ formInput, appUserId, semesterId });
};





export default function OnBoardingPage() {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <AddressCard />
        </main>
      </div>
    </div>
  )
}