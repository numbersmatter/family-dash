import { getAuth } from "@clerk/remix/ssr.server";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { db } from "~/db/db.server";
import { requireAuth } from "./signed-in.server";

type RegistrationStatus = "onboarding" | "registered" | "applied" | "error";

type RegistrationStatusDoc = {
  status: RegistrationStatus;
  semesterId: string;
  semesterName: string;
  registeredDate?: Date;
  applicationDate?: Date;
};

export const isRegistered = async (userId: string) => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

  // // check to see if user is registered for the semester
  // const registeredUserDoc = await db
  //   .registrations({ semesterId: activeSemester.semester_id })
  //   .read(userId);
  // if (registeredUserDoc) {
  //   return {
  //     status: "registered",
  //     semesterId: activeSemester.semester_id,
  //     semesterName: activeSemester.name,
  //     registeredDate: registeredUserDoc.createdDate.toDate(),
  //   } as RegistrationStatusDoc;
  // }

  // check to see if user has application for the semester
  const applicationDoc = await db
    .applications({ semesterId: activeSemester.semester_id })
    .read(userId);

  if (!applicationDoc) {
    return {
      status: "onboarding",
      semesterId: activeSemester.semester_id,
      semesterName: activeSemester.name,
    } as RegistrationStatusDoc;
  }

  if (applicationDoc.status === "pending") {
    return {
      status: "applied",
      semesterId: activeSemester.semester_id,
      semesterName: activeSemester.name,
      applicationDate: applicationDoc.createdDate.toDate(),
    } as RegistrationStatusDoc;
  }

  if (applicationDoc.status === "accepted") {
    return {
      status: "registered",
      semesterId: activeSemester.semester_id,
      semesterName: activeSemester.name,
      registeredDate: applicationDoc.createdDate.toDate(),
    } as RegistrationStatusDoc;
  }

  if (applicationDoc.status === "declined") {
    return {
      status: "declined",
      semesterId: activeSemester.semester_id,
      semesterName: activeSemester.name,
      registeredDate: applicationDoc.createdDate.toDate(),
    };
  }

  return {
    status: "onboarding",
    semesterId: activeSemester.semester_id,
    semesterName: activeSemester.name,
  } as RegistrationStatusDoc;
};

export const requireRegistration = async (userId: string) => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

  const applicationDoc = await db
    .applications({ semesterId: activeSemester.semester_id })
    .read(userId);

  if (!applicationDoc) {
    throw redirect("/on-boarding");
  }

  const status =
    applicationDoc.status === "accepted" ? "registered" : applicationDoc.status;

  return {
    status,
    semesterId: activeSemester.semester_id,
    semesterName: activeSemester.name,
    registeredDate: applicationDoc.createdDate.toDate(),
  };
};

export const confirmRegistration = async (args: LoaderFunctionArgs) => {
  // check if user is signed in, if not redirect to sign in page
  const { appUserId } = await requireAuth(args);

  // confirm user is registered for active semester
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

  // check for registration document for semester
  const registeredUserDoc = await db
    .registrations({ semesterId: activeSemester.semester_id })
    .read(appUserId);

  if (!registeredUserDoc) {
    throw redirect("/on-boarding");
  }

  return {
    status: "registered",
    semesterId: activeSemester.semester_id,
    semesterName: activeSemester.name,
    registeredDate: registeredUserDoc.createdDate.toDate(),
  };
};

export const checkRegistration = async ({
  semesterId,
  appUserId,
}: {
  semesterId: string;
  appUserId: string;
}) => {
  const registeredUserDoc = await db
    .registrations({ semesterId })
    .read(appUserId);

  // read application status
  const applicationDoc = await db.applications({ semesterId }).read(appUserId);

  const applicationStatus = applicationDoc ? applicationDoc.status : "error";

  const registered = registeredUserDoc
    ? registeredUserDoc.status === "registered"
    : false;

  return {
    registered,
    applicationStatus,
    semesterId,
  };
};
