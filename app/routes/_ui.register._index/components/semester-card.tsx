import { Form, Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";

export type FamilyStatus = "open" | "in-progress" | "accepted" | "declined";

export interface Semester {
  id: string;
  name: string;
  description: string;
  helpText: string;
  enrollement: boolean;
  familyStatus: FamilyStatus;
  reg_id: string;
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
          semester.familyStatus !== "open" && (
            <Link
              to={`/register/${semester.reg_id}`}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span className="text-lg font-semibold">
                {semester.familyStatus === "in-progress" && "Continue"}
                {semester.familyStatus === "accepted" && "Review"}
                {semester.familyStatus === "declined" && "Review"}
              </span>
            </Link>
          )
        }
      </CardContent>
    </Card>
  )
}