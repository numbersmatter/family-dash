import { parseWithZod } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { UpdateAdultsSchema, updatePhoneSchema } from "../schemas";
import { db } from "~/db/db.server";

interface PhoneNumber {
  phone: string;
}

const mutatePhoneNumber = async ({
  phone,
  appUserId,
  semesterId,
}: {
  phone: string;
  appUserId: string;
  semesterId: string;
}) => {
  return await db.applications({ semesterId }).update({
    id: appUserId,
    data: {
      // @ts-expect-error -phone is subfield in dot notation
      [`primaryContact.phone`]: phone,
    },
  });
};

export const updatePhone = async ({
  formInput,
  appUserId,
  semesterId,
}: {
  formInput: FormData;
  appUserId: string;
  semesterId: string;
}) => {
  const submission = parseWithZod(formInput, { schema: updatePhoneSchema });
  if (submission.status === "success") {
    const write = await mutatePhoneNumber({
      phone: submission.value.phone,
      appUserId,
      semesterId,
    });
    return json(submission.reply());
  }

  return json(submission.reply());
};
