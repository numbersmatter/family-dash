import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { StudentsCard } from "./components/student-card";
import { getAuth } from "@clerk/remix/ssr.server";
import { db } from "~/db/db.server";
import InstructionCard from "./components/instruction-card";
import { addStudent, removeStudent } from "./mutation.server";
import { parseWithZod } from "@conform-to/zod";
import { ValidActionTypes } from "./schema";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];

  const appUser = await db.appUser.read(appUserId);
  if (!appUser) {
    throw new Error("No user data found");
  }

  const students = appUser.students
  const locale = appUser.language


  return json({ students, locale });
};



export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }

  const appUserId = userId.split("_", 2)[1];

  const formInput = await args.request.formData();

  const type = formInput.get("type");

  if (type === "addStudent") {
    return addStudent({ formInput, appUserId });
  }

  if (type === "removeStudent") {
    return removeStudent({ formInput, appUserId });
  }

  const submission = parseWithZod(formInput, { schema: ValidActionTypes });

  return json(submission.reply());
};



export default function StudentsPage() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">
        <main className="flex flex-1 flex-col overflow-y-auto gap-4 p-4 lg:gap-6 lg:p-6">
          <InstructionCard />
          <StudentsCard />
        </main>
      </div>
    </div>
  )
}





