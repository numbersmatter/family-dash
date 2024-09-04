import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";
import { Student } from "~/db/registrations/registration-types";




export default function StudentCheckCard() {
  const { locale, studentsCheck } = useLoaderData<typeof loader>();

  const english = {
    title: "Students",
    description: "Enter the students enrolled in  Thomasville City Schools.",
    button: "Enter Students",
    successTitle: "Students",
    failureTitle: "You must have at least one student enrolled in Thomasville City Schools.",
  }


  const spanish = {
    title: "Estudiantes",
    description: "Ingrese los estudiantes inscriptos en la Escuela de Thomasville.",
    successTitle: "Estudiantes",
    failureTitle: "Debe tener al menos un estudiante inscripto en la Escuela de Thomasville.",
    button: "Ingrese Estudiantes",
  }

  const lang = locale === "es" ? spanish : english;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {lang.title}
        </CardTitle>
        <CardDescription>
          {lang.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
          studentsCheck.students.length > 0 ?
            studentsCheck.students.map((student: Student) => {

              return (
                <div key={student.id} className="flex flex-col gap-2">
                  <div className="text-lg font-bold">
                    {student.fname} {student.lname}
                  </div>
                </div>
              )
            })
            :
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-lg font-bold">
                  {lang.failureTitle}
                </div>
              </div>
            </div>
        }
      </CardContent>
    </Card>
  )
}