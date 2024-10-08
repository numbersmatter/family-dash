import { useFetcher, useLoaderData } from "@remix-run/react"
import { EllipsisVerticalIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import { loader } from "../route"
import { FormCard } from "./form-card"
import { AddMinorDialog } from "./add-minor-dialog"
import { action } from "~/root"

type Minor = {
  name: string
  family_role: string
  role: string
  initals: string
  id: string
  school: string | null
}

const minors: Minor[] = [
  {
    name: 'Lisa Foster',
    family_role: 'Toddler',
    role: 'Pre-School',
    id: 'abc',
    initals: 'LS',
    school: 'none',
  },
];

export function MinorsCard() {
  const { locale } = useLoaderData<typeof loader>()
  const english = {
    title: "Unenrolled Minors",
    description: "Enter those under 18 who are not enrolled in Thomasville City Schools",
  }

  const spanish = {
    title: "Menores no inscriptos",
    description: "Ingrese a los menores de 18 años que no están inscriptos en las escuelas de Thomasville",
  }

  const lang = locale === "es" ? spanish : english

  return (
    <div className="mx-auto max-w-7xl py-2 sm:py-4 sm:px-6 lg:px-8">
      <FormCard
        title={lang.title}
        description={lang.description}
        footer={<AddMinorDialog />}
      >
        <ContentMinors />
      </FormCard>
    </div>
  )
}


function ContentMinors() {
  const { minors } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>();


  const removeStudent = async (id: string) => {

    const formInput = new FormData();
    formInput.append("type", "removeMinor");
    formInput.append("minorId", id);

    const result = await fetcher.submit(formInput, { method: "post" });
    return result;
  }


  return (
    <ul className="divide-y divide-gray-100">
      {minors.map((minor) => (
        <li key={minor.family_role} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="h-12 w-12 pt-3 flex place-content-center flex-none rounded-full bg-gray-50">
              {minor.initals}
            </div>
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <a href={minor.id} className="hover:underline">
                  {minor.name}
                </a>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                <a href={`mailto:${minor.family_role}`} className="truncate hover:underline">
                  {minor.birthyear}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
            </div>
            <DropdownMenu  >
              <DropdownMenuTrigger className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
              // className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <DropdownMenuLabel>
                  Options
                </DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() => removeStudent(minor.id)}
                >
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function FooterMinors() {
  return (
    <div className="flex w-full justify-end gap-x-4">
      <Button variant="outline">Add Minor</Button>
    </div>
  )
}
