import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useLoaderData } from "@remix-run/react";
import { loader } from "../route";
import { useUser } from "@clerk/remix";

export default function AppliedCard() {
  const { status, applicationDate, locale } = useLoaderData<typeof loader>();
  const { user } = useUser();

  const english = {
    title: "Applied",
    description: `Hello ${user?.firstName ?? "user"}, your application has been submitted. You will receive an email with your application status.`,

  }

  const spanish = {
    title: "Aplicación enviada",
    description: `Hola ${user?.firstName ?? "usuario"}, tu aplicación ha sido enviada. Recibirás un correo electrónico con el estado de tu aplicación.`,
  }


  const lang = locale === "es" ? spanish : english
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {lang.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 items-center">
        <CardDescription>
          {lang.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}