import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";




export default function InstructionCard() {
  const { locale } = useLoaderData<typeof loader>();
  const english = {
    title: "Number of adults in household",
    description: "Enter number of adults over 18 in your household",
  }
  const spanish = {
    title: "Número de adultos en la casa",
    description: "Ingrese el número de adultos mayores de 18 en su casa.",
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