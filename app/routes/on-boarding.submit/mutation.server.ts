import { db } from "~/db/db.server";
import { reviewData } from "./data-fetchers.server";
import { json } from "@remix-run/node";
import { ApplicationStatus } from "~/db/applications/app-types";

export const submitApplication = async ({
  primaryContact,
  appUserId,
}: {
  appUserId: string;
  primaryContact: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
}) => {
  const { addressCheck, studentsCheck, adults, minors } = await reviewData(
    appUserId
  );

  if (addressCheck.success === false) {
    return json({ status: "error", message: "address-check-failed" });
  }

  if (studentsCheck.success === false) {
    return json({ status: "error", message: "student-check-failed" });
  }

  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

  const semesterId = activeSemester.semester_id;

  const applicationData = {
    status: "pending" as ApplicationStatus,
    semesterId,
    address: addressCheck.address,
    students: studentsCheck.students,
    minors,
    userId: appUserId,
    adults,
    primaryContact,
  };

  const applicationWrite = await db.applications({ semesterId }).create({
    appUserId,
    data: applicationData,
  });

  return json(applicationWrite);
};
