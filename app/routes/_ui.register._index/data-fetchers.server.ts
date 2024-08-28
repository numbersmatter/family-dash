import { db } from "~/db/db.server";
import { Semester } from "./components/semester-card";

interface SemesterEnglish {
  name: string;
  description: string;
  helpText: string;
}
type FamilyStatus = "open" | "in-progress" | "accepted" | "declined";
export interface SemesterCard {
  id: string;
  name: string;
  description: string;
  helpText: string;
  familyStatus?: FamilyStatus;
  reg_id?: string;
}
interface SemesterSpanish {
  name: string;
  description: string;
  helpText: string;
}

interface OpenSemesters {
  id: string;
  english: SemesterEnglish;
  spanish: SemesterSpanish;
  enrollement: boolean;
  familyStatus: "open" | "in-progress" | "accepted" | "declined";
  reg_id: string;
}

export const getOpenSemesters = async ({
  appUserId,
}: {
  appUserId: string;
}) => {
  const semesters = await db.semesters.getActive();
  const semesterIds = semesters.map((semester) => semester.id);
  const userDoc = await db.appUser.read(appUserId);

  const defaultDocData = {
    language: "en",
  };

  const userDocData = userDoc ?? defaultDocData;

  const language = userDocData.language === "es" ? "es" : "en";

  const applicationPromises = semesterIds.map((semesterId) =>
    db.applications({ semesterId }).read(appUserId)
  );

  const applications = await Promise.all(applicationPromises);

  const semesters_applications = semesters.map((semester) => {
    const application = applications.find(
      (application) => application?.semesterId === semester.id
    );

    if (!application) {
      return {
        ...semester,
        familyStatus: "open",
      };
    }
    const lang = language === "es" ? semester.spanish : semester.english;

    const testSemester = {
      ...semester,
      name: lang.name,
      description: lang.description,
      helpText: lang.helpText,
      familyStatus: application.status,
      reg_id: application.id,
    } as SemesterCard;

    return {
      ...semester,
      familyStatus: application.status,
      reg_id: application.id,
      name: lang.name,
      description: lang.description,
      helpText: lang.helpText,
    };
  });

  return {
    semesters: semesters_applications,
    applications,
  };
  // return [
  //   {
  //     id: "1",
  //     reg_id: "157",
  //     english: {
  //       name: "Fall 2024 Semester",
  //       description: "August - December 2024",
  //       helpText:
  //         "In Order to receive services you must register for the Fall 2024 Semester. You can register for the Fall 2024 Semester which runs from September 1st to December 31st.",
  //     },
  //     spanish: {
  //       name: "Fall 2024 Semestre",
  //       description: "Agosto - Diciembre 2024",
  //       helpText:
  //         "Para recibir servicios debes registrarte para el Fall 2024 Semestre. Puedes registrarte para el Fall 2024 Semestre que corre desde el 1 de septiembre al 31 de diciembre.",
  //     },
  //     enrollement: false,
  //     familyStatus: "in-progress",
  //   },
  // ] as OpenSemesters[];
};
