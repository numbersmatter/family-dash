import { json, redirect, useLoaderData, useRouteLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { FormCard } from "./components/form-card";
import {
  CaretakerCard,
} from "./components/caretaker";
// import { AddressCard } from "../on-boarding/componets/address";
import {
  MinorsCard,
} from "./components/minor";
import { StudentsCard } from "./components/students";
import { Header } from "./components/header";
import { SubmitCard } from "./components/submit-card";
import { NumberAdults } from "./components/number-adults";
import i18nServer from "~/modules/i18n.server";
import { parseWithZod } from "@conform-to/zod";
import { actionTypesSchema } from "./schemas";
import { addStudent, removeStudent } from "./mutations/mutate-students.server";
import { getRegisterData } from "./data-fetchers.server";
import { updateAddress } from "./mutations/mutate-address.server";
import { updateAdults } from "./mutations/mutate-adults.server";
import {
  addMinor,
  removeMinor,
  updateMinor
} from "./mutations/mutate-minor.server";
import { submit } from "./mutations/submit-mutation.server";
import { UnderReviewCard } from "./components/under-review-card";
import { getAuth, } from "@clerk/remix/ssr.server";
import { createClerkClient } from "@clerk/remix/api.server";
import { SubmissionResult } from "@conform-to/react";
import { updatePhone } from "./mutations/mutate-phone.server";




export const loader = async (args: LoaderFunctionArgs) => {
  const semesterId = args.params.semesterId ?? "no-id";
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }

  // Initialize clerkClient and perform an operation
  const clerkClient = await createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users.getUser(userId)

  const clerkUser = {
    fname: clerkClient.firstName,
    lname: clerkClient.lastName,
    email: clerkClient.primaryEmailAddress?.emailAddress ?? "",
    phone: clerkClient.primaryPhoneNumber?.phoneNumber ?? "",
  }

  const appUserId = userId.split("_", 2)[1];
  let locale = await i18nServer.getLocale(args.request);
  const data = await getRegisterData({ semesterId, appUserId });

  return json({ ...data, clerkUser, locale });
};



export const action = async (args: ActionFunctionArgs) => {
  const formInput = await args.request.formData();
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];
  const semesterId = args.params.semesterId ?? "no-id";

  const type = formInput.get("type");

  const checkType = parseWithZod(formInput, { schema: actionTypesSchema });

  if (checkType.status !== "success") {
    return json(checkType.reply());
  }

  if (type === "addStudent") {
    return addStudent({ formInput, appUserId, semesterId });
  }
  if (type === "removeStudent") {
    return removeStudent({ formInput, appUserId, semesterId });
  }
  // if (type === "editStudent") {
  //   return removeStudent({ formInput, userId, reg_id });
  // }
  if (type === "updateAddress") {
    return updateAddress({ formInput, appUserId, semesterId });
  }
  if (type === "updateAdults") {
    return updateAdults({ formInput, appUserId, semesterId });
  }
  if (type === "addMinor") {
    return addMinor({ formInput, appUserId, semesterId });
  }
  if (type === "removeMinor") {
    return removeMinor({ formInput, appUserId, semesterId });
  }
  if (type === "updatePhone") {
    return updatePhone({ formInput, appUserId, semesterId });
  }

  // if (type === "updateMinor") {
  //   return updateMinor({ formInput, userId, reg_id });
  // }

  if (type === "submit") {
    return submit({ formInput, appUserId, semesterId });
  }


  return json({ ...checkType.reply(), "status": "error", "error": { "type": ["No action provided"] } });
  // return json({ success: false, status: "error", error: { type: ["Unknown type"] } });
}




export default function ServicePeriodEnrollment() {
  const { status } = useLoaderData<typeof loader>();

  const isSubmitted = status === "pending";

  if (isSubmitted) {
    return <UnderReviewCard />
  }

  // if (status === "accepted") {
  //   return <div>Accepted</div>
  // }


  return (
    <>
      <Header />
      <CaretakerCard />
      {/* <AddressCard /> */}
      <NumberAdults />
      <StudentsCard />
      <MinorsCard />
      <SubmitCard />
    </>
  )
}