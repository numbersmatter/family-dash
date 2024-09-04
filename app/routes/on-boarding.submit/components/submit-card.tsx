import { Form, useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { loader } from "../route";
import { Button } from "~/components/ui/button";
import { Link } from "lucide-react";




export default function SubmitCard() {
  const { locale, addressCheck, studentsCheck } = useLoaderData<typeof loader>();
  const english = {
    title: "Submit",
    fixStudents: "Fix Students",
    fixAddress: "Fix Address",
    description: "Submit your application.",
    button: "Submit",
  }
  const spanish = {
    title: "Enviar",
    fixStudents: "Ir a Estudiantes",
    fixAddress: "Ir a Dirección",
    description: "Envíe su solicitud.",
    button: "Enviar",
  }

  const success = addressCheck.success && studentsCheck.success;


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

        {!studentsCheck.success &&
          <div className="flex flex-col gap-4">
            <Link to={"/on-boarding/students"} className="underline">
              <Button>
                {lang.fixStudents}
              </Button>
            </Link>
          </div>
        }

        {!addressCheck.success &&
          <div className="flex flex-col gap-4">
            <Link to={"/on-boarding"} className="underline">
              <Button>
                {lang.fixAddress}
              </Button>
            </Link>
          </div>
        }


        {
          success &&
          <Form method="post" >
            <input type="hidden" name="type" value="submit" />
            <Button type="submit">
              Submit
            </Button>
          </Form>
        }

      </CardContent>
    </Card>
  )
}

function SubmitForm() {
  return (
    <Form method="post" >
      <input type="hidden" name="type" value="submit" />
      <Button type="submit">
        Submit
      </Button>
    </Form>
  )
}