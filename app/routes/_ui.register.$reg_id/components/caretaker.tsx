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
import { FormCard } from "./form-card"
import { useUser } from "@clerk/remix"

type Person = {
  name: string
  family_role: string
  role: string
  imageUrl: string
  id: string
}

export function CaretakerCard() {
  const { locale } = useLoaderData<typeof loader>()

  const english = {
    title: "Primary Caregiver",
    description: "Contact Information",
    edit: "Edit Profile",
  }

  const spanish = {
    title: "Contacto principal",
    description: "Información de contacto",
    edit: "Editar perfil",
  }

  const lang = locale === "es" ? spanish : english

  return (

    <FormCard
      title={lang.title}
      description={lang.description}
      footer={<Link to="/profile"><Button variant="outline">{lang.edit}</Button></Link>}
    >
      <ContentCaretakers />
    </FormCard>
  )
}



function ContentCaretakers() {
  const { primary_caretaker, usage, locale } = useLoaderData<typeof loader>();
  const { user } = useUser();

  const english = {
    title: "Contact Information",
    description: "Personal details and application.",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email address",
    cellPhone: "Cell Phone Number",
    dataUsage: "Data Usage",
    caretaker: "Caretaker",
  }

  const spanish = {
    title: "Información de contacto",
    description: "Datos personales y solicitud.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Dirección de correo electrónico",
    cellPhone: "Número de teléfono celular",
    dataUsage: "Uso de datos",
    caretaker: "Carpintero",
  }

  const lang = locale === "es" ? spanish : english

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          {lang.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {lang.description}
        </p>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.firstName}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {user?.firstName}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.lastName}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {user?.lastName}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.email}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {user?.emailAddresses[0].emailAddress}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.cellPhone}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {user?.phoneNumbers[0].phoneNumber}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {lang.dataUsage}
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


function CaretakerFormDialog() {
  const { locale } = useLoaderData<typeof loader>();
  const english = {
    title: "Edit Profile",
    description: "Make changes to your profile here. Click save when you're done.",
    save: "Save changes",
  }

  const spanish = {
    title: "Editar perfil",
    description: "Haga cambios en su perfil aquí. Haga clic en guardar cuando haya terminado.",
    save: "Guardar cambios",
  }

  const lang = locale === "es" ? spanish : english

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{lang.title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{lang.title}</DialogTitle>
          <DialogDescription>
            {lang.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
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
