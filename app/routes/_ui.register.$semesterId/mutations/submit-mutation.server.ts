import { parseWithZod } from "@conform-to/zod";
import { db } from "~/db/db.server";
import { addressSchema, primaryContactSchema } from "../schemas";
import { json, redirect } from "@remix-run/node";

const submitMutation = async ({
  semesterId,
  appUserId,
}: {
  semesterId: string;
  appUserId: string;
}) => {
  const write = await db.applications({ semesterId }).update({
    id: appUserId,
    data: {
      status: "pending",
    },
  });
  return write;
};

export const submit = async ({
  semesterId,
  appUserId,
  formInput,
}: {
  semesterId: string;
  appUserId: string;
  formInput: FormData;
}) => {
  const application = await db.applications({ semesterId }).read(appUserId);
  if (!application) {
    throw new Error("Application not found");
  }

  const appData = {
    primaryContact: application.primaryContact,
    adults: application.adults,
    address: application.address,
    minors: application.minors,
    students: application.students,
  };

  const submissionContact = primaryContactSchema.safeParse(
    appData.primaryContact
  );
  if (!submissionContact.success) {
    return json({
      status: "error",
      error: { primaryContact: ["Invalid primary contact"] },
      zodError: submissionContact.error,
    });
  }

  const submissionAddress = addressSchema.safeParse(appData.address);
  if (!submissionAddress.success) {
    return json({
      status: "error",
      error: { address: ["Invalid address. Please update address."] },
      zodError: submissionAddress.error,
    });
  }

  const submissionStudents = application.students.length > 0;

  if (!submissionStudents) {
    return json({
      status: "error",
      error: {
        students: [
          "Must have at least one student in Thomasville City Schools",
        ],
      },
    });
  }

  await submitMutation({
    semesterId,
    appUserId,
  });

  return redirect("/register");
};
