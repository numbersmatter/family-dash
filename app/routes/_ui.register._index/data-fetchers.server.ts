import { Semester } from "./components/semester-card";

export const getOpenSemesters = async () => {
  return [
    {
      id: "1",
      name: "Fall 2024 Semester",
      description: "August - December 2024",
      helpText:
        "In Order to receive services you must register for the Fall 2024 Semester. You can register for the Fall 2024 Semester which runs from September 1st to December 31st.",
      enrollement: false,
      familyStatus: "open",
    },
  ] as Semester[];
};
