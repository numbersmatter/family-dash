import { redirect } from "@remix-run/node";
import { db } from "~/db/db.server";

export const getReviewData = async ({
  appUserId,
  semesterId,
}: {
  appUserId: string;
  semesterId: string;
}) => {
  const applicationDoc = await db.applications({ semesterId }).read(appUserId);
  if (!applicationDoc) {
    throw redirect("/on-boarding");
  }

  const registrationDoc = await db
    .registrations({ semesterId })
    .read(appUserId);

  if (registrationDoc?.status === "registered") {
    throw redirect("/");
  }

  const status = applicationDoc ? applicationDoc.status : "error";
  const applicationDate = applicationDoc.createdDate
    .toDate()
    .toLocaleDateString();

  return { status, applicationDate };
};
