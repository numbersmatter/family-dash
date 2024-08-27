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
  const students = application.students;

  return { address, usage, adults, students };
};
