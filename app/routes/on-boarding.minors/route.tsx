import { json, redirect, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";
import { getAuth } from "@clerk/remix/ssr.server";
import { ValidActionTypes } from "./schemas";
import { parseWithZod } from "@conform-to/zod";
import { addMinor, removeMinor } from "./mutations.server";
import InstructionCard from "./components/instruction-card";
import { Minor } from "~/db/registrations/registration-types";
import MinorsCard from "./components/minors-card";



export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];

  const appUser = await db.appUser.read(appUserId);

  const locale = appUser?.language
  const minors = appUser?.minors ?? [] as Minor[]


  return json({ minors, locale });
};

export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }
  const appUserId = userId.split("_", 2)[1];

  const formInput = await args.request.formData();

  const type = formInput.get("type");

  if (type === "addMinor") {
    return addMinor({ formInput, appUserId });
  }

  if (type === "removeMinor") {
    return removeMinor({ formInput, appUserId });
  }

  const submission = parseWithZod(formInput, { schema: ValidActionTypes });

  return json(submission.reply());
};

export default function MinorsPage() {
  const { minors, locale } = useLoaderData<typeof loader>();

  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">
        <main className="flex flex-1 flex-col overflow-y-auto gap-4 p-4 lg:gap-6 lg:p-6">
          <InstructionCard />
          <MinorsCard />
        </main>
      </div>
    </div>

  )
}