import { useLoaderData } from "@remix-run/react"
import { loader } from "../route"
import { ProgramCard } from "./program-card"


export function ProgramGrid() {
  const { programs } = useLoaderData<typeof loader>()
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {programs.map((program) => (
        <ProgramCard key={program.title} program={program} />
      ))}
    </div>
  )
}