import { useLoaderData } from "@remix-run/react"
import { loader } from "../route"
import { SemesterCard } from "./semester-card"

export function SemesterGrid() {
  const loaderData = useLoaderData<typeof loader>()


  return (
    <div className="grid grid-cols-2 gap-4">
      {loaderData.semesters.map((semester) => (
        <SemesterCard semester={semester} key={semester.id} />
      ))}
    </div>
  )
}

