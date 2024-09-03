import { parseWithZod } from "@conform-to/zod";
import { json, redirect } from "@remix-run/node";
import { addressSchema } from "./schema";
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
  const write = await db.appUser.update(appUserId, {
    address: {
      street: address.street,
      unit: address.unit,
      city: address.city,
      state: address.state,
      zip: address.zip,
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
    return redirect("/on-boarding/students");
  }

  return json(submission.reply());
};
