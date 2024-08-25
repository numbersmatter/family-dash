import { parseWithZod } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { addressSchema } from "../schemas";

interface MutateAddress {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
}

const mutateAddress = async ({
  address,
  userId,
  reg_id,
}: {
  address: MutateAddress;
  userId: string;
  reg_id: string;
}) => {
  return { success: true, address, userId };
};

export const updateAddress = async ({
  formInput,
  userId,
  reg_id,
}: {
  formInput: FormData;
  userId: string;
  reg_id: string;
}) => {
  const submission = parseWithZod(formInput, { schema: addressSchema });
  if (submission.status === "success") {
    const write = await mutateAddress({
      address: submission.value,
      userId,
      reg_id,
    });
    return json(submission.reply());
  }

  return json(submission.reply());
};
