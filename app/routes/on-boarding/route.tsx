import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Outlet, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { db } from "~/db/db.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { useUser } from "@clerk/remix";
import Greeting from "./componets/greeting";
import { isRegistered } from "~/lib/business-logic/registration.server";

const OnBoardingSchema = z.object({
  type: z.literal("onboard"),
  language: z.enum(["en", "es"]),
  email: z.string(),
});


export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];
  const appUserProfile = await db.appUser.read(appUserId);

  const registrationStatus = await isRegistered(appUserId);

  const status = registrationStatus.status;




  const hasProfile = appUserProfile !== null;




  return json({ appUserId, hasProfile });
};


export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];
  const formInput = await args.request.formData();
  const type = formInput.get("type");

  const submission = parseWithZod(formInput, { schema: OnBoardingSchema });

  if (submission.status === "success") {
    const defaultAppUserData = {
      email: submission.value.email,
      language: submission.value.language,
      address: {
        street: "",
        unit: "",
        city: "",
        state: "",
        zip: "",
      },
      household_adults: 1,
      minors: [],
      students: [],
    };

    await db.appUser.create({
      appUserId,
      data: defaultAppUserData,
    })
    return redirect("/")
  }


  return json(submission.reply());
};




export default function OnBoardingPage() {
  const { appUserId, hasProfile } = useLoaderData<typeof loader>();
  const { user } = useUser();

  const email = user?.emailAddresses[0]?.emailAddress ?? "no-email";

  if (!hasProfile) {
    return (
      <div className="grid min-h-screen w-full">
        <div className="flex flex-col place-content-center">
          <main className="flex flex-1 flex-col content-center items-center  gap-4 p-4 lg:gap-6 lg:p-6">
            {/* <AddressCard /> */}
            <h1>{appUserId} {hasProfile ? "hasProfile" : "noProfile"}</h1>
            <p>Welcome to the on boarding page</p>
            <Greeting />

          </main>
        </div>
      </div>

    )
  }



  return (
    <Outlet />


  )
}



