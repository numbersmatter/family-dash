import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { LoaderFunction, redirect } from "@remix-run/node";
import { FormCard } from "./components/form-card";
import {
  CaretakerFormDialog,
  ContentCaretakers
} from "./components/caretaker";
import { AddressContent, AddressFormDialog } from "./components/address";
import {
  ContentMinors,
  FooterMinors
} from "./components/minor";
import { ContentStudents, FooterStudents } from "./components/students";
import { Header } from "./components/header";
import { ContentAdults, FooterAdults, } from "./components/adults";
import { SubmitCard } from "./components/submit-card";
import { NumberAdults } from "./components/number-adults";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import { AddStudentDialog } from "./components/add-student-dialog";
import i18nServer from "~/modules/i18n.server";
import { AddMinorDialog } from "./components/add-minor-dialog";
import { parseWithZod } from "@conform-to/zod";
import { addressSchema, adultsSchema, studentsSchema } from "./schemas";
import { mutateAddress } from "./mutations/mutate-address.server";
import { mutateStudents } from "./mutations/mutate-students.server";



export const loader = async (args: LoaderFunctionArgs) => {
  const { reg_id } = args.params;
  const { userId } = await userInfo(args);
  let locale = await i18nServer.getLocale(args.request);

  const address = {
    street: "123 Main St",
    unit: "Apt 1",
    city: "Thomasville",
    state: "NC",
    zip: "10001",
  }
  const primary_caretaker = {
    fname: "Leslie",
    lname: "Foster",
    email: "leslie@example.com",
    phone: "(919) 555-1234",
  }
  const usage = {
    caretaker: "This data will only be used by the nonprofits program director to provide food services to participatants.",
  }
  const adults = 1;

  return json({ address, primary_caretaker, usage, adults, locale });
};



export const action = async (args: ActionFunctionArgs) => {
  const formInput = await args.request.formData();
  const { userId } = await userInfo(args);

  const type = formInput.get("type");

  if (type === "adults") {
    // create 4 second delay
    const submission = parseWithZod(formInput, { schema: adultsSchema });
    if (submission.status === "success") {
      const test = { id: "test", name: "test" }

      return json({ success: true, data: test });
    }
    return json({ success: false, status: "error", error: submission.error, payload: submission.payload });
  }

  if (type === "address") {
    const submission = parseWithZod(formInput, { schema: addressSchema });
    if (submission.status === "success") {
      const write = await mutateAddress({ address: submission.value, userId });
      return json({ success: true, data: write });
    }
    return json({ success: false, status: "error", error: submission.error, payload: submission.payload });
  }

  if (type === "students") {
    const submission = parseWithZod(formInput, { schema: studentsSchema });
    if (submission.status === "success") {
      const write = await mutateStudents({ students: submission.value, userId });
      return json({ success: true, data: write });
    }
    return json({ success: false, status: "error", error: submission.error, payload: submission.payload });
  }


  return json({ success: false, status: "error", error: { type: ["Unknown type"] } });
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
        footer={<AddressFormDialog />}
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