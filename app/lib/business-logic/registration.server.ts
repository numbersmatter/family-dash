import { redirect } from "@remix-run/node";
import { db } from "~/db/db.server";

export const isRegistered = async (userId: string) => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

  // check to see if user is registered for the semester
  const registeredUserDoc = await db
    .registrations({ semesterId: activeSemester.semester_id })
    .read(userId);
  if (registeredUserDoc) {
    return {
      status: "registered",
      semesterId: activeSemester.semester_id,
      semesterName: activeSemester.name,
      registeredDate: registeredUserDoc.createdDate.toDate(),
    };
  }

  // check to see if user has application for the semester
  const applicationDoc = await db
    .applications({ semesterId: activeSemester.semester_id })
    .read(userId);
  if (applicationDoc) {
    return {
      status: "application",
      semesterId: activeSemester.semester_id,
      semesterName: activeSemester.name,
      applicationDate: applicationDoc.createdDate.toDate(),
    };
  }

  return {
    status: "onboarding",
    semesterId: activeSemester.semester_id,
    semesterName: activeSemester.name,
  };
};

export const requireRegistration = async (userId: string) => {
  const registrationDoc = await isRegistered(userId);
  if (registrationDoc.status === "registered") {
    return {
      status: "registered",
      semesterId: registrationDoc.semesterId,
      semesterName: registrationDoc.semesterName,
      registeredDate: registrationDoc.registeredDate,
    };
  }

  return redirect("/on-boarding");
};
