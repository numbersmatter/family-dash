import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { action, loader } from "../route";

export function SubmitCard() {
  const { status } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const errors = actionData?.error ?? {
    students: [],
    address: [],
    primaryContact: [],
  }

  const studentError = errors?.students ?? [];
  const addressError = errors?.address ?? [];
  const primaryContactError = errors?.primaryContact ?? [];

  const isSubmitted = status === "pending";


  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          Submit Registration
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          {
            studentError.length > 0 &&
            <p className="text-red-500">
              {studentError[0]}
            </p>
          }
          {
            addressError.length > 0 &&
            <p className="text-red-500">
              {addressError[0]}
            </p>
          }
          {
            primaryContactError.length > 0 &&
            <p className="text-red-500">
              {primaryContactError[0]}
            </p>
          }

        </div>
      </CardContent>
      <CardFooter>
        {
          isSubmitted
            ?
            <p className="text-center text-xl font-semibold">
              We are reviewing your application. Please check back later.
            </p>
            :
            <Form method="post">
              <input type="hidden" name="type" value="submit" />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </Form>
        }
      </CardFooter>
    </Card>
  )
}
