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

  const type = formInput.get("type");

  if (type === "adults") {
    // create 4 second delay
    const test = await setTimeout(() => {
      return "test"
    }, 2000);

    return json({ success: true, test });

  }

  return json({ success: false });
};





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
        footer={<FooterMinors />}
      >
        <ContentMinors />
      </FormCard>
      <SubmitCard />
    </>
  )
} 