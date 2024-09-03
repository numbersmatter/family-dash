import { getAuth } from "@clerk/remix/ssr.server";
import { db } from "~/db/db.server";
import { adultSchema } from "./schemas";
import { parseWithZod } from "@conform-to/zod";
import { json, redirect } from "@remix-run/node";

async function saveAdultsMutation(args: { appUserId: string; adults: number }) {
  const write = await db.appUser.update(args.appUserId, {
    household_adults: args.adults,
  });
  return write;
}

export async function saveAdult({
  appUserId,
  formData,
}: {
  appUserId: string;
  formData: FormData;
}) {
  const submission = parseWithZod(formData, { schema: adultSchema });
  if (submission.status === "success") {
    const write = await saveAdultsMutation({
      appUserId,
      adults: submission.value.adults,
    });

    return redirect("/on-boarding/submit");
  }

  return json(submission.reply());
}
