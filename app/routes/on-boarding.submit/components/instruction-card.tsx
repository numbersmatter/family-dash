import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";




export default function InstructionCard() {
  const { locale } = useLoaderData<typeof loader>();
  const english = {
    title: "Review and Submit",
    description: "Review and submit your application.",
    button: "Submit",
  }
  const spanish = {
    title: "Revisar y Enviar",
    description: "Revise y envíe su solicitud.",
    button: "Enviar",
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