import { parseWithZod } from "@conform-to/zod";
import { db } from "~/db/db.server";
import { registerSchema } from "./schemas";
import { json, redirect } from "@remix-run/node";

export const register = async ({
  appUserId,
  formInput,
}: {
  appUserId: string;
  formInput: FormData;
}) => {
  const submission = parseWithZod(formInput, { schema: registerSchema });
  if (submission.status === "success") {
    const { semesterId, fname, lname, email, phone } = submission.value;
    const applicationId = await db.applications({ semesterId }).create({
      appUserId,
      data: {
        userId: appUserId,
        semesterId: semesterId,
        status: "in-progress",
        primaryContact: {
          fname: fname,
          lname: lname,
          email: email,
          phone: phone,
        },
        adults: 1,
        students: [],
        minors: [],
      },
    });
    return redirect(`/register/${applicationId}`);
  }
  return json(submission.reply());
};
