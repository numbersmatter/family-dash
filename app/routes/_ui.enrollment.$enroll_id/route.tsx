import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { LoaderFunction, redirect } from "@remix-run/node";
import { FormCard } from "./components/form-card";
import { Button } from "~/components/ui/button";
import {
  CaretakerFormDialog,
  ContentCaretakers
} from "./components/caretaker";
import { AddressContent, AddressFormDialog } from "./components/address";
import {
  ContentStudents,
  FooterStudents,
  ContentMinors,
  FooterMinors
} from "./components/family";
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
    </>
  )
} 