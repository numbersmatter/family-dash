import { Semester } from "./components/semester-card";

interface SemesterEnglish {
  name: string;
  description: string;
  helpText: string;
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

export const getOpenSemesters = async () => {
  return [
    {
      id: "1",
      reg_id: "157",
      english: {
        name: "Fall 2024 Semester",
        description: "August - December 2024",
        helpText:
          "In Order to receive services you must register for the Fall 2024 Semester. You can register for the Fall 2024 Semester which runs from September 1st to December 31st.",
      },
      spanish: {
        name: "Fall 2024 Semestre",
        description: "Agosto - Diciembre 2024",
        helpText:
          "Para recibir servicios debes registrarte para el Fall 2024 Semestre. Puedes registrarte para el Fall 2024 Semestre que corre desde el 1 de septiembre al 31 de diciembre.",
      },
      enrollement: false,
      familyStatus: "in-progress",
    },
  ] as OpenSemesters[];
};
