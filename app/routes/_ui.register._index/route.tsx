import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import { SemesterGrid } from "./components/semester-grid";
import { getOpenSemesters } from "./data-fetchers.server";
import { register } from "./mutations.server";




export const loader = async (args: LoaderFunctionArgs) => {
  const { userId, appUserId } = await userInfo(args);

  const { semesters, applications } = await getOpenSemesters({ appUserId });

  return json({ userId, semesters, applications });
};




export const action = async (args: ActionFunctionArgs) => {
  const { appUserId } = await userInfo(args);
  const formInput = await args.request.formData();
  const type = formInput.get("type");


  if (type === "register") {
    return register({ appUserId, formInput });
  }

  return json({
    success: false,
    message: "Invalid type",
  });
};







export default function RegisterIndexPage() {
  const { semesters, applications } = useLoaderData<typeof loader>()


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