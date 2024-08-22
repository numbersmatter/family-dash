import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import { SemesterGrid } from "./components/semester-grid";




export const loader = async (args: LoaderFunctionArgs) => {
  const user = await userInfo();
  return json({ user });
};



export default function RegisterIndexPage() {
  const { user } = useLoaderData<typeof loader>()
  return (
    <>
      <h1>Register</h1>
      <p>User: {user.userId}</p>
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-xl">
          Open Registrations
        </h2>
      </div>
      <SemesterGrid />
    </>
  )
}