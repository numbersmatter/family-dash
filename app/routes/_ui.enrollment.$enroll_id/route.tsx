import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { LoaderFunction, redirect } from "@remix-run/node";
import { FormCard } from "./components/form-card";
import { Button } from "~/components/ui/button";
import { CaretakerContent, CaretakerFormDialog } from "./components/caretaker";
import { AddressContent, AddressFormDialog } from "./components/address";
import { FamilyContent, FamilyFooter } from "./components/family";



export const loader = async (args: LoaderFunctionArgs) => {

  const address = {
    street: "123 Main St",
    unit: "Apt 1",
    city: "Thomasville",
    state: "NC",
    zip: "10001",
  }

  return json({ address });
};







export default function ServicePeriodEnrollment() {

  return (
    <>
      <FormCard
        title="Primary Caretaker"
        description="Contact Information"
        footer={<CaretakerFormDialog />}
      >
        <CaretakerContent />
      </FormCard>
      <FormCard
        title="Address"
        description="Contact Information"
        footer={<AddressFormDialog />}
      >
        <AddressContent />
      </FormCard>
      <FormCard
        title="Family Members"
        description="Family Members"
        footer={<FamilyFooter />}
      >
        <FamilyContent />
      </FormCard>

    </>
  )
} 