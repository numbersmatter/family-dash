import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import { SemesterGrid } from "./components/semester-grid";
import { getOpenSemesters } from "./data-fetchers.server";
import { register } from "./mutations.server";
import { db } from "~/db/db.server";
import { semesterDb } from "~/db/semesters/crud.server";
import { Button } from "~/components/ui/button";
import { useUser } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";




export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await userInfo(args);

  const semesters = await getOpenSemesters();
  const activeSemesters = await semesterDb().getActive();

  return json({ userId, semesters, activeSemesters });
};




export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await userInfo(args);
  const formData = await args.request.formData();
  const type = formData.get("type");


  if (type === "register") {
    const semesterId = formData.get("semester") as string;
    const applicationId = await register({ userId, semesterId });
    return redirect(`/register/${applicationId}`);
  }

  return json({
    success: false,
    message: "Invalid type",
  });
};







export default function RegisterIndexPage() {
  const { userId, semesters, activeSemesters } = useLoaderData<typeof loader>()

  const user = useUser();

  return (
    <>
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-xl">
          Open Registrations
        </h2>
      </div>
      <SemesterGrid />
      <Form method="post">
        <Button type="submit" name="type" value="update-semesters">
          update semesters
        </Button>
      </Form>
      <pre>{JSON.stringify({ userId, user, activeSemesters }, null, 2)}</pre>
    </>
  )
}