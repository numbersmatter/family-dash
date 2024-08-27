import { parseWithZod } from "@conform-to/zod";
import {
  AddMinorSchema,
  RemoveMinorSchema,
  UpdateMinorSchema,
} from "../schemas";
import { json } from "@remix-run/node";
import { db } from "~/db/db.server";

interface Minor {
  fname: string;
  lname: string;
  birthyear: number;
}

const addMinorMutation = async ({
  minor,
  appUserId,
  semesterId,
}: {
  minor: Minor;
  appUserId: string;
  semesterId: string;
}) => {
  // make random id
  const minorId = Math.floor(Math.random() * 10000).toLocaleString();
  const write = await db.applications({ semesterId }).addMinor({
    appUserId,
    data: { ...minor, id: minorId },
  });
  return write;
};

export const addMinor = async ({
  formInput,
  appUserId,
  semesterId,
}: {
  formInput: FormData;
  appUserId: string;
  semesterId: string;
}) => {
  const submission = parseWithZod(formInput, { schema: AddMinorSchema });
  if (submission.status === "success") {
    const write = await addMinorMutation({
      minor: submission.value,
      appUserId,
      semesterId,
    });
    return json(submission.reply());
  }
  return json(submission.reply());
};

const removeMinorMutation = async ({
  minorId,
  appUserId,
  semesterId,
}: {
  minorId: string;
  appUserId: string;
  semesterId: string;
}) => {
  const write = await db.applications({ semesterId }).removeMinor({
    appUserId,
    minorId,
  });
  return write;
};

export const removeMinor = async ({
  formInput,
  appUserId,
  semesterId,
}: {
  formInput: FormData;
  appUserId: string;
  semesterId: string;
}) => {
  const submission = parseWithZod(formInput, { schema: RemoveMinorSchema });
  if (submission.status === "success") {
    const write = await removeMinorMutation({
      minorId: submission.value.minorId,
      appUserId,
      semesterId,
    });
    return json(submission.reply());
  }
  return json(submission.reply());
};

const updateMinorMutation = async ({
  userId,
  minor,
  reg_id,
}: {
  userId: string;
  minor: Minor;
  reg_id: string;
}) => {
  const id = "234";
  return id;
};

export const updateMinor = async ({
  formInput,
  userId,
  reg_id,
}: {
  formInput: FormData;
  userId: string;
  reg_id: string;
}) => {
  const submission = parseWithZod(formInput, { schema: UpdateMinorSchema });
  if (submission.status === "success") {
    const write = await updateMinorMutation({
      minor: submission.value,
      userId,
      reg_id,
    });
    return json(submission.reply());
  }
  return json(submission.reply());
};
