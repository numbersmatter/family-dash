import { appUserDb } from "./appUser/crud.server";
import { regDb } from "./registrations/crud.server";
import { semesterDb } from "./semesters/crud.server";

export const db = {
  semesters: semesterDb(),
  registrations: regDb(),
  appUser: appUserDb(),
};
