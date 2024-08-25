import { parseWithZod } from "@conform-to/zod";
import {
  AddMinorSchema,
  RemoveMinorSchema,
  UpdateMinorSchema,
} from "../schemas";
import { json } from "@remix-run/node";

interface Minor {
  fname: string;
  lname: string;
  birthyear: string;
}

const addMinorMutation = async ({
  minor,
  userId,
  reg_id,
}: {
  minor: Minor;
  userId: string;
  reg_id: string;
}) => {
  const id = "234";
  return id;
};

export const addMinor = async ({
  formInput,
  userId,
  reg_id,
}: {
  formInput: FormData;
  userId: string;
  reg_id: string;
}) => {
  const submission = parseWithZod(formInput, { schema: AddMinorSchema });
  if (submission.status === "success") {
    const write = await addMinorMutation({
      minor: submission.value,
      userId,
      reg_id,
    });
    return json(submission.reply());
  }
  return json(submission.reply());
};

const removeMinorMutation = async ({
  userId,
  minorId,
  reg_id,
}: {
  userId: string;
  minorId: string;
  reg_id: string;
}) => {
  const id = minorId;
  return id;
};

export const removeMinor = async ({
  formInput,
  userId,
  reg_id,
}: {
  formInput: FormData;
  userId: string;
  reg_id: string;
}) => {
  const submission = parseWithZod(formInput, { schema: RemoveMinorSchema });
  if (submission.status === "success") {
    const write = await removeMinorMutation({
      minorId: submission.value.minorId,
      userId,
      reg_id,
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
