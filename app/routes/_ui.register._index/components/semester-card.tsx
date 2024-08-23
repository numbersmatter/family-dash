import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";

export type FamilyStatus = "open" | "applied" | "enrolled";

export interface Semester {
  id: string;
  name: string;
  description: string;
  helpText: string;
  enrollement: boolean;
  familyStatus: FamilyStatus;
}



export function SemesterCard({ semester }: { semester: Semester }) {


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {semester.name}
        </CardTitle>
        <CardDescription>
          {semester.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {
          semester.familyStatus === "open" && (
            <Form method="post">
              <input type="hidden" name="semester" value={semester.id} />
              <Button type="submit" name="type" value="register" size="sm" className="w-full">
                Register for Semester
              </Button>
            </Form>
          )
        }
        {
          semester.familyStatus === "applied" && (
            <p>Applied</p>
          )
        }
        {
          semester.familyStatus === "enrolled" && (
            <p>Enrolled</p>
          )
        }
      </CardContent>
    </Card>
  )
}