import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { FormCard } from "./components/form-card";
import {
  CaretakerFormDialog,
  ContentCaretakers
} from "./components/caretaker";
import { AddressContent, AddressFormDialog } from "./components/address";
import {
  ContentMinors,
} from "./components/minor";
import { ContentStudents, FooterStudents } from "./components/students";
import { Header } from "./components/header";
import { SubmitCard } from "./components/submit-card";
import { NumberAdults } from "./components/number-adults";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import { AddStudentDialog } from "./components/add-student-dialog";
import i18nServer from "~/modules/i18n.server";
import { AddMinorDialog } from "./components/add-minor-dialog";
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
  const reg_id = args.params.reg_id ?? "no-id";
  const { userId } = await userInfo(args);
  let locale = await i18nServer.getLocale(args.request);

  const data = await getRegisterData({ reg_id, userId });

  return json({ ...data, locale });
};



export const action = async (args: ActionFunctionArgs) => {
  const formInput = await args.request.formData();
  const { userId } = await userInfo(args);
  const reg_id = args.params.reg_id ?? "no-id";

  const type = formInput.get("type");

  const checkType = parseWithZod(formInput, { schema: actionTypesSchema });

  if (checkType.status !== "success") {
    return json(checkType.reply());
  }

  if (type === "addStudent") {
    return addStudent({ formInput, userId, reg_id });
  }
  if (type === "removeStudent") {
    return removeStudent({ formInput, userId, reg_id });
  }
  if (type === "editStudent") {
    return removeStudent({ formInput, userId, reg_id });
  }
  if (type === "updateAddress") {
    return updateAddress({ formInput, userId, reg_id });
  }
  if (type === "updateAdults") {
    return updateAdults({ formInput, userId, reg_id });
  }
  if (type === "addMinor") {
    return addMinor({ formInput, userId, reg_id });
  }
  if (type === "removeMinor") {
    return removeMinor({ formInput, userId, reg_id });
  }
  if (type === "updateMinor") {
    return updateMinor({ formInput, userId, reg_id });
  }


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
  const { locale } = useLoaderData<typeof loader>();
  return (
    <>
      <Header />
      <FormCard
        title="Primary Caretaker"
        description="Contact Information"
        footer={<CaretakerFormDialog />}
      >
        <ContentCaretakers />
      </FormCard>
      <FormCard
        title="Address"
        description="Contact Information"
        footer={<AddressFormDialog locale={locale} />}
      >
        <AddressContent />
      </FormCard>
      <NumberAdults />
      <FormCard
        title="Students"
        description="Enter Students"
        footer={<AddStudentDialog lng={locale} />}
      >
        <pre>{JSON.stringify(locale, null, 2)}</pre>
        <ContentStudents />
      </FormCard>
      <FormCard
        title="Unenrolled Minors"
        description="Enter those under 18 who are not enrolled in Thomasville City Schools"
        footer={<AddMinorDialog lng={locale} />}
      >
        <ContentMinors />
      </FormCard>
      <SubmitCard />
    </>
  )
}