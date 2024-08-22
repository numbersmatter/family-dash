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
} from "./components/family";
import { ContentStudents, FooterStudents } from "./components/students";
import { Header } from "./components/header";
import { ContentAdults, FooterAdults, } from "./components/adults";
import { SubmitCard } from "./components/submit-card";



export const loader = async (args: LoaderFunctionArgs) => {

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

  return json({ address, primary_caretaker, usage });
};







export default function ServicePeriodEnrollment() {

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
      <FormCard
        title="Household Adults"
        description="Include only those over 18 who are not enrolled in Thomasville City Schools"
        footer={<FooterAdults />}
      >
        <ContentAdults />
      </FormCard>
      <FormCard
        title="Students"
        description="Enter Students"
        footer={<FooterAdults />}
      >
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