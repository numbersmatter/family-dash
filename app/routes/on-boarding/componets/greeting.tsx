import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";


export default function Greeting() {

  return <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <Card className="">
      <CardHeader>
        <CardTitle>
          Register for the Fall 2024 Semester
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 items-center">
        <Form method="post" className="mx-auto">
          <Button name="language" value="en">
            Continue in English
          </Button>
        </Form>
        <Form method="post" className="mx-auto">
          <Button name="language" value="es">
            Continuar en español
          </Button>
        </Form>
      </CardContent>

    </Card>
  </div>


}