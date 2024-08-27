import { parseWithZod } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { addressSchema } from "../schemas";
import { db } from "~/db/db.server";

interface MutateAddress {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
}

const mutateAddress = async ({
  address,
  appUserId,
  semesterId,
}: {
  address: MutateAddress;
  appUserId: string;
  semesterId: string;
}) => {
  const write = await db.applications({ semesterId }).update({
    id: appUserId,
    data: {
      address: {
        street: address.street,
        unit: address.unit,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
    },
  });
  return write;
};

export const updateAddress = async ({
  formInput,
  appUserId,
  semesterId,
}: {
  formInput: FormData;
  appUserId: string;
  semesterId: string;
}) => {
  const submission = parseWithZod(formInput, { schema: addressSchema });
  if (submission.status === "success") {
    const write = await mutateAddress({
      address: submission.value,
      appUserId,
      semesterId,
    });
    return json(submission.reply());
  }

  return json(submission.reply());
};
