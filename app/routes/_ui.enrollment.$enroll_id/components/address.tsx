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
import { loader } from "../route"
import { useState } from "react"

export function AddressContent() {
  const { address } = useLoaderData<typeof loader>()
  return (
    <div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Street
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.street}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Unit
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.unit}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              City
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.city}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              State
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {address.state}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Zip
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

export function AddressFormDialog() {
  const { address } = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();



  const fields = [
    { id: "street", label: "Street", type: "text", value: address.street, errors: [] },
    { id: "unit", label: "Unit", type: "text", value: address.unit, errors: [] },
    { id: "city", label: "City", type: "text", value: address.city, errors: [] },
    { id: "state", label: "State", type: "select", value: address.state, errors: [{ id: "city", message: "Please select your state" }] },
    { id: "zip", label: "Zip", type: "text", value: address.zip, errors: [] },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Address</DialogTitle>
          <DialogDescription>
            Make changes to your address. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {
            fields.map((field) => {
              return (
                <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.id} className="text-right">
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    defaultValue={field.value}
                    className="col-span-3"
                  />
                  <div className="col-start-2 col-span-3 ">
                    {field.errors.map((error) => (
                      <p className={"pb-3 text-red-600"} key={error.id}>
                        {error.message}
                      </p>
                    ))}
                  </div>
                </div>
              )
            }
            )}

        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
