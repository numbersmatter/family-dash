import { parseWithZod } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { UpdateAdultsSchema } from "../schemas";
import { s } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

interface MutateAdults {
  adults: number;
}

const mutateAdults = async ({
  adults,
  userId,
  reg_id,
}: {
  adults: MutateAdults;
  userId: string;
  reg_id: string;
}) => {
  return { success: true, adults, userId };
};

export const updateAdults = async ({
  formInput,
  userId,
  reg_id,
}: {
  formInput: FormData;
  userId: string;
  reg_id: string;
}) => {
  const submission = parseWithZod(formInput, { schema: UpdateAdultsSchema });
  if (submission.status === "success") {
    const write = await mutateAdults({
      adults: submission.value,
      userId,
      reg_id,
    });
    return json(submission.reply());
  }

  return json(submission.reply());
};
