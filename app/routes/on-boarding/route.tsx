import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Outlet, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { db } from "~/db/db.server";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod";
import { useUser } from "@clerk/remix";
import Greeting from "./componets/greeting";
import { checkRegistration, isRegistered } from "~/lib/business-logic/registration.server";
import { requireAuth } from "~/lib/business-logic/signed-in.server";
import { getActiveSemester } from "~/lib/business-logic/active-semester.server";

const OnBoardingSchema = z.object({
  type: z.literal("onboard"),
  language: z.enum(["en", "es"]),

});


export const loader = async (args: LoaderFunctionArgs) => {
  const { appUserId, appUserProfile } = await requireAuth(args);

  const { semesterId } = await getActiveSemester();

  const { registered, applicationStatus } = await checkRegistration({ semesterId, appUserId });

  if (applicationStatus === "pending") {
    return redirect("/reviewing")
  }

  const hasProfile = appUserProfile !== null;

  if (registered) {
    throw redirect("/");
  }

  const locale = appUserProfile?.language ?? "en";




  return json({ appUserId, hasProfile, locale });
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
      email: "",
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
    return redirect("/on-boarding")
  }


  return json(submission.reply());
};




export default function OnBoardingPage() {
  const {
    appUserId,
    hasProfile,
  } = useLoaderData<typeof loader>();


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



