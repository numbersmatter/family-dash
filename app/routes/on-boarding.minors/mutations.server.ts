import { parseWithZod } from "@conform-to/zod";
import { AddMinorSchema, RemoveMinorSchema } from "./schemas";
import { json } from "@remix-run/node";
import { db } from "~/db/db.server";
import { FieldValue } from "firebase-admin/firestore";

interface MinorAdd {
  fname: string;
  lname: string;
  birthyear: number;
}

const addMinorMutation = async ({
  minor,
  appUserId,
}: {
  minor: MinorAdd;
  appUserId: string;
}) => {
  // make random id
  const minorId = Math.floor(Math.random() * 10000).toLocaleString();

  const minorInfor = {
    ...minor,
    id: minorId,
  };

  const write = await db.appUser.addMinor({ appUserId, minor: minorInfor });

  return write;
};

const removeMinorMutation = async ({
  appUserId,
  minorId,
}: {
  minorId: string;
  appUserId: string;
}) => {
  const write = await db.appUser.removeMinor({
    appUserId,
    minorId,
  });
  return write;
};

export const addMinor = async ({
  formInput,
  appUserId,
}: {
  formInput: FormData;
  appUserId: string;
}) => {
  const submission = parseWithZod(formInput, { schema: AddMinorSchema });
  if (submission.status === "success") {
    const write = await addMinorMutation({
      minor: submission.value,
      appUserId,
    });
    return json(submission.reply());
  }
  return json(submission.reply());
};

export const removeMinor = async ({
  formInput,
  appUserId,
}: {
  formInput: FormData;
  appUserId: string;
}) => {
  const submission = parseWithZod(formInput, { schema: RemoveMinorSchema });
  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const write = await removeMinorMutation({
    minorId: submission.value.minorId,

    appUserId,
  });
  return json(submission.reply());
};
