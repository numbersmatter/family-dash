import { redirect } from "@remix-run/node";
import { db } from "~/db/db.server";

export const getRegisterData = async ({
  semesterId,
  appUserId,
}: {
  semesterId: string;
  appUserId: string;
}) => {
  const application = await db.applications({ semesterId }).read(appUserId);
  if (!application) {
    throw redirect("/register");
  }

  const address = application.address;
  const usage = {
    caretaker:
      "This data will only be used by the nonprofits program director to provide food services to participatants.",
  };
  const adults = application.adults;
  const students = application.students.map((student) => {
    const initals =
      student.fname[0].toUpperCase() + student.lname[0].toUpperCase();
    return {
      name: `${student.fname} ${student.lname}`,
      family_role: "student",
      role: "student",
      initals,
      id: student.id,
      school: student.school,
    };
  });
  const minors = application.minors.map((minor) => {
    const initals = minor.fname[0].toUpperCase() + minor.lname[0].toUpperCase();
    return {
      name: `${minor.fname} ${minor.lname}`,
      family_role: "minor",
      role: "minor",
      initals,
      id: minor.id,
      birthyear: minor.birthyear,
    };
  });

  return { address, usage, adults, students, minors };
};
