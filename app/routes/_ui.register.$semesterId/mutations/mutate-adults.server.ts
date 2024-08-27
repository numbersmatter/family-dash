import { parseWithZod } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { UpdateAdultsSchema } from "../schemas";
import { db } from "~/db/db.server";

interface MutateAdults {
  adults: number;
}

const mutateAdults = async ({
  adults,
  appUserId,
  semesterId,
}: {
  adults: number;
  appUserId: string;
  semesterId: string;
}) => {
  return await db.applications({ semesterId }).update({
    id: appUserId,
    data: {
      adults: adults,
    },
  });
};

export const updateAdults = async ({
  formInput,
  appUserId,
  semesterId,
}: {
  formInput: FormData;
  appUserId: string;
  semesterId: string;
}) => {
  const submission = parseWithZod(formInput, { schema: UpdateAdultsSchema });
  if (submission.status === "success") {
    const write = await mutateAdults({
      adults: submission.value.adults,
      appUserId,
      semesterId,
    });
    return json(submission.reply());
  }

  return json(submission.reply());
};
