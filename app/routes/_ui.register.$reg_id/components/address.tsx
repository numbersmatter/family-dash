import { useFetcher, useLoaderData } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { action, loader } from "../route"
import { useEffect, useState } from "react"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { addressSchema } from "../schemas"
import { FormCard } from "./form-card"


export function AddressCard() {
  const { locale } = useLoaderData<typeof loader>()
  const english = {
    title: "Address",
    description: "Contact Information",
  }

  const spanish = {
    title: "Dirección",
    description: "Información de contacto",
  }

  const lang = locale === "es" ? spanish : english

  return (
    <FormCard
      title={lang.title}
      description={lang.description}
      footer={<AddressFormDialog />}
    >
      <AddressContent />
    </FormCard>
  )
}


export function AddressContent() {
  const { address, locale } = useLoaderData<typeof loader>()

  const english = {
    title: "Address",
    description: "Update your address.",
    street: "Street",
    unit: "Unit",
    city: "City",
    state: "State",
    zip: "Zip",
    submit: "Submit",
  }

  const spanish = {
    title: "Dirección",
    description: "Actualiza tu dirección.",
    street: "Calle",
    unit: "Unidad",
    city: "Ciudad",
    state: "Estado",
    zip: "Código Postal",
    submit: "Enviar",
  }

  const lang = locale === "es" ? spanish : english;

  return (
    <div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.street}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.street}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.unit}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.unit}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.city}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.city}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.state}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.state}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.zip}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.zip}
            </dd>
          </div>

        </dl>
      </div>
    </div>
  )
}

function AddressFormDialog() {
  const { address, locale } = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher<typeof action>();
  const [form, fields] = useForm({
    // Sync the result of last submission


    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: addressSchema });
    },

    defaultValue: {
      street: address.street,
      unit: address.unit,
      city: address.city,
      state: "NC",
      zip: address.zip,
    },
    shouldRevalidate: 'onBlur',
  })

  const isFetching = fetcher.state !== "idle";
  const success = fetcher.data?.status === "success" ? true : false;

  useEffect(() => {
    if (success && !isFetching) {
      setOpen(false)
    }
  }, [success, isFetching])

  const english = {
    button: "Update",
    title: "Address",
    description: "Update your address.",
    street: "Street",
    unit: "Unit",
    city: "City",
    state: "State",
    zip: "Zip",
    submit: "Submit",
  }

  const spanish = {
    button: "Actualizar",
    title: "Dirección",
    description: "Actualiza tu dirección.",
    street: "Calle",
    unit: "Unidad",
    city: "Ciudad",
    state: "Estado",
    zip: "Código Postal",
    submit: "Enviar",
  }

  const lang = locale === "es" ? spanish : english;



  const fieldIds = ["street", "unit", "city", "state", "zip"]


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button >
          {lang.button}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {lang.title}
          </DialogTitle>
          <DialogDescription>
            {lang.description}
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form method="post" {...getFormProps(form)}>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.street.id} className="text-right">
                {lang.street}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.street, { type: "text" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.street.errors}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.unit.id} className="text-right">
                {lang.unit}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.unit, { type: "text" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.unit.errors}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.city.id} className="text-right">
                {lang.city}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.city, { type: "text" })}
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.city.errors}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={fields.state.id} className="text-right">
                {lang.state}
              </Label>
              <Input
                className="col-span-3"
                {...getInputProps(fields.state, { type: "text" })}
                readOnly
              />
              <div className="text-red-500 col-start-2 col-span-3">
                {fields.state.errors}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button name="type" value="updateAddress" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  )
}
