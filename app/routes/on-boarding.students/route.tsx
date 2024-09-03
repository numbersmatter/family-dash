import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { StudentsCard } from "./components/student-card";
import { getAuth } from "@clerk/remix/ssr.server";
import { db } from "~/db/db.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];

  const appUser = await db.appUser.read(appUserId);

  const students = appUser?.students
  const locale = appUser?.language


  return json({ students, locale });
};



export const action = async (args: ActionFunctionArgs) => {
  return null;
};



export default function StudentsPage() {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <StudentsCard />
        </main>
      </div>
    </div>
  )
}





