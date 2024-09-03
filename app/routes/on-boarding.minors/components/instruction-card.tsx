import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";




export default function InstructionCard() {
  const { locale } = useLoaderData<typeof loader>();
  const english = {
    title: "Enter Children and Minors",
    description: "Enter children and minors not enrolled in school",
  }
  const spanish = {
    title: "Escibir Menors",
    description: "Ingrese los menores y hijos no inscriptos en la Escuela de Thomasville.",
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