import { EllipsisVerticalIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
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
import { Link, useLoaderData } from "@remix-run/react"
import { loader } from "../route"

export function CaretakerContent() {
  return (
    <p>Please fill out the form below to enroll in the Primary Caretaker Program.</p>
  )
}
type Person = {
  name: string
  family_role: string
  role: string
  imageUrl: string
  id: string
}

const people: Person[] = [
  {
    name: 'Leslie Foster',
    family_role: 'caretaker',
    role: 'Parent',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    id: 'abc',
  },
];

export function ContentCaretakers() {
  const { primary_caretaker, usage } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Contact Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              First Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {primary_caretaker.fname}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Last Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {primary_caretaker.lname}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {primary_caretaker.email}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Cell Phone Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {primary_caretaker.phone}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Data Usage
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {usage.caretaker}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}


export function CaretakerFormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
