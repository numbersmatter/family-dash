import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { SemesterGrid } from "./components/semester-grid";
import { getOpenSemesters } from "./data-fetchers.server";
import { register } from "./mutations.server";
import { getAuth } from "@clerk/remix/ssr.server";




export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];

  const { semesters, applications } = await getOpenSemesters({ appUserId });

  return json({ userId, semesters, applications });
};




export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];
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