import { useFetcher, useLoaderData, useRouteLoaderData } from "@remix-run/react"
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
import { loader as rootloader } from "~/root"
import { FormCard } from "./form-card"
import { AddStudentDialog } from "./add-student-dialog"


type Student = {
  name: string
  family_role: string
  role: string
  initals: string
  id: string
  school: string | null
}

type Lang = {
  add: string
  edit: string
  remove: string
}


const students: Student[] = [
  {
    name: 'Julie Foster',
    family_role: 'student',
    role: '9th Grade',
    initals: 'MF',
    id: 'mf1',
    school: 'THS',
  },
  {
    name: 'James Foster',
    family_role: 'student',
    role: '6th Grade',
    initals: 'DV',
    id: 'dv1',
    school: 'TMS',
  },
]

export function StudentsCard() {
  const rootData = useRouteLoaderData<typeof rootloader>("root");
  const english = {
    title: "Students",
    description: "Enter Students",
  }

  const spanish = {
    title: "Estudiantes",
    description: "Ingrese estudiantes",
  }

  const lang = rootData?.locale === "es" ? spanish : english

  return (
    <FormCard
      title={lang.title}
      description={lang.description}
      footer={<AddStudentDialog />}
    >
      <ContentStudents />
    </FormCard>
  )
}

function ContentStudents() {
  const rootData = useRouteLoaderData<typeof rootloader>("root");
  const { students } = useLoaderData<typeof loader>()




  const english = {
    add: "Add Student",
    edit: "Edit",
    remove: "Remove",
  }

  const spanish = {
    add: "Agregar estudiante",
    edit: "Editar",
    remove: "Eliminar",
  }

  const lang = rootData?.locale === "es" ? spanish : english


  return (
    <ul className="divide-y divide-gray-100">
      {students.map((student) => (
        <StudentRowCard key={student.id} student={student} lang={lang} />
      )
      )}
    </ul>
  )
}




function StudentRowCard({ student, lang }: {
  student: Student,
  lang: Lang
}) {
  const fetcher = useFetcher();

  const handleRemove = async () => {
    return fetcher.submit({ type: "removeStudent", studentId: student.id }, { method: "post" });
  }


  return <li key={student.id} className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <div className="h-12 w-12 pt-3 flex place-content-center flex-none rounded-full bg-gray-50">
        {student.initals}
      </div>
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          <a href={student.id} className="hover:underline">
            {student.name}
          </a>
        </p>
        <p className="mt-1 flex text-xs leading-5 text-gray-500">
          <a href={`mailto:${student.family_role}`} className="truncate hover:underline">
            {student.school}
          </a>
        </p>
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-x-6">
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{student.role}</p>
        {student.school ? (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            School: {student.school}
          </p>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500"></p>
          </div>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
          <span className="sr-only">
            {lang.edit}
          </span>
          <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
        >
          <DropdownMenuLabel>

          </DropdownMenuLabel>
          {/* <DropdownMenuItem>{lang.edit}</DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleRemove}>{lang.remove}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </li>
}

