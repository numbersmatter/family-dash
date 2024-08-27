import { useUser } from "@clerk/remix";
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
  familyStatus?: FamilyStatus;
  reg_id?: string;
}



export function SemesterCard({ semester }: { semester: Semester }) {
  const { user, } = useUser();

  const fname = user?.firstName ?? "Error";
  const lname = user?.lastName ?? "Error";
  const email = user?.emailAddresses[0].emailAddress ?? "Error";
  const phone = user?.phoneNumbers[0].phoneNumber ?? "Error";

  return (
    <Card className="max-w-md">
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
          semester.reg_id ? (
            <Link
              to={`/register/${semester.reg_id}`}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span className="text-lg font-semibold">
                {semester.familyStatus === "in-progress"
                  ? "Continue Registration"
                  : "Review"
                }
              </span>
            </Link>
          )
            : (
              <Form method="post">
                <input type="hidden" name="semesterId" value={semester.id} />
                <input type="hidden" name="fname" value={fname} />
                <input type="hidden" name="lname" value={lname} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="phone" value={phone} />
                <Button type="submit" name="type" value="register" size="sm" className="">
                  Register for Semester
                </Button>
              </Form>

            )
        }
      </CardContent>
    </Card>
  )
}