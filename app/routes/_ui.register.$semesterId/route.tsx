import { json, redirect, useLoaderData, useRouteLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { FormCard } from "./components/form-card";
import {
  CaretakerCard,
} from "./components/caretaker";
import { AddressCard } from "./components/address";
import {
  MinorsCard,
} from "./components/minor";
import { StudentsCard } from "./components/students";
import { Header } from "./components/header";
import { SubmitCard } from "./components/submit-card";
import { NumberAdults } from "./components/number-adults";
import { userInfo } from "~/lib/business-logic/signed-in.server";
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


export const loader = async (args: LoaderFunctionArgs) => {
  const semesterId = args.params.semesterId ?? "no-id";
  const { appUserId } = await userInfo(args);
  let locale = await i18nServer.getLocale(args.request);
  const data = await getRegisterData({ semesterId, appUserId });

  return json({ ...data, locale });
};



export const action = async (args: ActionFunctionArgs) => {
  const formInput = await args.request.formData();
  const { appUserId } = await userInfo(args);
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
  // if (type === "updateMinor") {
  //   return updateMinor({ formInput, userId, reg_id });
  // }


  // if (type === "adults") {
  //   // create 4 second delay
  //   const submission = parseWithZod(formInput, { schema: adultsSchema });
  //   if (submission.status === "success") {
  //     const test = { id: "test", name: "test" }

  //     return json({ success: true, data: test, errors: {} });
  //   }
  //   return json({ success: false, status: "error", error: submission.error, payload: submission.payload });
  // }

  // if (type === "address") {
  //   const submission = parseWithZod(formInput, { schema: addressSchema });
  //   if (submission.status === "success") {
  //     const write = await mutateAddress({ address: submission.value, userId });
  //     return json({ success: true, data: write, errors: {} });
  //   }
  //   return json({ success: false, status: "error", error: submission.error, payload: submission.payload });
  // }


  return json({ ...checkType.reply(), "status": "error", "error": { "type": ["No action provided"] } }, { status: 500 });
  // return json({ success: false, status: "error", error: { type: ["Unknown type"] } });
}




export default function ServicePeriodEnrollment() {

  return (
    <>
      <Header />
      <CaretakerCard />
      <AddressCard />
      <NumberAdults />
      <StudentsCard />
      <MinorsCard />
      <SubmitCard />
    </>
  )
}