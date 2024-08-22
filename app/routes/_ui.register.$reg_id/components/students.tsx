import { EllipsisVerticalIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"


type Student = {
  name: string
  family_role: string
  role: string
  initals: string
  id: string
  school: string | null
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


export function ContentStudents() {
  return (
    <ul className="divide-y divide-gray-100">
      {students.map((student) => (
        <li key={student.family_role} className="flex justify-between gap-x-6 py-5">
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
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
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
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </li>
      ))}
    </ul>
  )
}


export function FooterStudents() {
  return (
    <div className="flex w-full justify-end gap-x-4">
      <Button variant="outline">Add Student</Button>
    </div>
  )
}


