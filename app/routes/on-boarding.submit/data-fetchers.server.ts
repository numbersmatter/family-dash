import { db } from "~/db/db.server";
import { z } from "zod";

const ValidAddress = z.object({
  street: z.string(),
  unit: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const reviewData = async (appUserId: string) => {
  const appUserDoc = await db.appUser.read(appUserId);
  if (!appUserDoc) {
    throw new Error("AppUser not found");
  }

  const locale = appUserDoc.language;

  const address = appUserDoc.address;
  const addressParse = ValidAddress.safeParse(address);

  const definedAddress = addressParse.success
    ? addressParse.data
    : {
        street: "",
        unit: "",
        city: "",
        state: "",
        zip: "",
      };

  const addressCheck = {
    success: addressParse.success,
    address: definedAddress,
  };

  const students = appUserDoc.students;

  const studentsCheck = {
    students,
    success: students.length > 0,
  };

  return {
    locale,
    addressCheck,
    studentsCheck,
    adults: appUserDoc.household_adults,
    minors: appUserDoc.minors,
  };
};
