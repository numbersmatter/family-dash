import { applicationsDb } from "./applications/crud.server";
import { appUserDb } from "./appUser/crud.server";
import { regDb } from "./registrations/crud.server";
import { semesterDb } from "./semesters/crud.server";
import { userSemestersDb } from "./user-semesters/crud.server";
import { foodOpportunityDb } from "./food-opportunities/crud.server";
import { opportunityRequestDb } from "./opportunity-request/crud.server";

export const db = {
  semesters: semesterDb(),
  registrations: regDb(),
  appUser: appUserDb(),
  applications: ({ semesterId }: { semesterId: string }) =>
    applicationsDb({ semesterId }),
  userSemesters: ({ appUserId }: { appUserId: string }) =>
    userSemestersDb({ appUserId }),
  food_opportunities: foodOpportunityDb(),
  opportunity_requests: ({ opportunityId }: { opportunityId: string }) =>
    opportunityRequestDb({ opportunityId }),
};
