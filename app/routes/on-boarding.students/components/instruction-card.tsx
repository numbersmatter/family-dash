import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";




export default function InstructionCard() {
  const { locale } = useLoaderData<typeof loader>();
  const english = {
    title: "Enter Students",
    description: "Enter the students enrolled in  Thomasville City Schools.",
    button: "Enter Students",
  }
  const spanish = {
    title: "Escibir Estudiantes",
    description: "Ingrese los estudiantes inscriptos en la Escuela de Thomasville.",
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

      </CardContent>
    </Card>
  )
}