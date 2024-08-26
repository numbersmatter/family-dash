import { useLoaderData, useRouteLoaderData } from "@remix-run/react"
import { loader } from "../route"
import { loader as rootLoader } from "~/root";
import { SemesterCard } from "./semester-card"

export function SemesterGrid() {
  const { semesters } = useLoaderData<typeof loader>()
  const rootData = useRouteLoaderData<typeof rootLoader>("root");

  const locale = rootData?.locale ?? "en";

  const translatedSemesters = semesters.map((semester) => {
    const lang = locale === "es" ? semester.spanish : semester.english;
    return {
      ...semester,
      name: lang.name,
      description: lang.description,
      helpText: lang.helpText,
    }
  })

  return (
    <div className="grid grid-cols-2 gap-4">
      {translatedSemesters.map((semester) => (
        <SemesterCard semester={semester} key={semester.id} />
      ))}
    </div>
  )
}

