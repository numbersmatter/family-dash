import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { AddressCard } from "./components/address";
import { getAuth } from "@clerk/remix/ssr.server";
import { updateAddress } from "./mutations.server";
import { getAddressData } from "./data-fetcher.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in?redirect_url=/on-boarding");
  }

  const appUserId = userId.split("_", 2)[1];
  const { address, locale } = await getAddressData({ appUserId });



  return json({ locale, address });
};


export const action = async (args: ActionFunctionArgs) => {
  const formInput = await args.request.formData();
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];
  const semesterId = args.params.semesterId ?? "no-id";

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