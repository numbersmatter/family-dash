import { getAuth } from "@clerk/remix/ssr.server";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db/db.server";
import InstructionCard from "./components/instruction-card";
import { reviewData } from "./data-fetchers.server";
import StudentCheckCard from "./components/student-check-card";
import AddressCheckCard from "./components/address-check-card";
import SubmitCard from "./components/submit-card";
import { createClerkClient } from "@clerk/remix/api.server";
import { submitApplication } from "./mutation.server";


export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args)
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];
  const { locale, addressCheck, studentsCheck } = await reviewData(appUserId);



  return json({ locale, addressCheck, studentsCheck })
}



export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect(`/sign-in?redirect_url=${args.request.url}`);
  }

  const clientUser = await createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users.getUser(userId)



  const primaryContact = {
    fname: clientUser.firstName ?? "error",
    lname: clientUser.lastName ?? "error",
    email: clientUser.primaryEmailAddress?.emailAddress ?? "error",
    phone: clientUser.primaryPhoneNumber?.phoneNumber ?? "error",
  };

  const appUserId = userId.split("_", 2)[1];
  const formInput = await args.request.formData();
  const type = formInput.get("type");

  if (type !== "onboard") {
    throw new Error("Invalid type");
  }

  const applicationId = await submitApplication({
    primaryContact,
    appUserId,
  })

  redirect(`/on-boarding`)

}


export default function SubmitPage() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">
        <main className="flex flex-1 flex-col overflow-y-auto gap-4 p-4 lg:gap-6 lg:p-6">
          <InstructionCard />
          <StudentCheckCard />
          <AddressCheckCard />
          <SubmitCard />
          <pre>{JSON.stringify(loaderData, null, 2)}</pre>
        </main>
      </div>
    </div>
  )
}