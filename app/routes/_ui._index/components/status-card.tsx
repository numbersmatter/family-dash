import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Enrollment } from "../route";
import { Link } from "@remix-run/react";



export function StatusCard({ data }: { data: Enrollment }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Register For {data.title}
        </CardTitle>
        <CardDescription>
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {data.helpText}
        </p>

      </CardContent>
      <CardFooter>
        <Link to={`/enrollment/${data.id}`} >
          <Button variant="default" size="lg">

            Register
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}