import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { useLoaderData } from "@remix-run/react";
import { loader } from "../route";
import { useUser } from "@clerk/remix";

export default function AppliedCard() {
  const { locale, applicationDate } = useLoaderData<typeof loader>();
  const { user } = useUser();

  const english = {
    title: "Applied",
    description: `Hello ${user?.firstName ?? "user"}, your application has been submitted. You will receive an email with your application status.`,
    applicationInfo: `Application was submitted on ${applicationDate}`,

  }

  const spanish = {
    title: "Aplicación enviada",
    description: `Hola ${user?.firstName ?? "usuario"}, tu aplicación ha sido enviada. Recibirás un correo electrónico con el estado de tu aplicación.`,
    applicationInfo: `La aplicación fue enviada el ${applicationDate}`,
  }


  const lang = locale === "es" ? spanish : english
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
      <CardContent className="grid grid-cols-1 gap-8 items-center">
        <div>
          <p className="text-lg text-primary font-medium">
            {lang.applicationInfo}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}