import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import { SemesterGrid } from "./components/semester-grid";
import { getOpenSemesters } from "./data-fetchers.server";
import { register } from "./mutations.server";




export const loader = async (args: LoaderFunctionArgs) => {
  const user = await userInfo(args);

  const semesters = await getOpenSemesters();

  return json({ user, semesters });
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
  const { user } = useLoaderData<typeof loader>()
  return (
    <>
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-xl">
          Open Registrations
        </h2>
      </div>
      <SemesterGrid />
    </>
  )
}