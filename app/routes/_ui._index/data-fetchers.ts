import { LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";
import i18nServer from "~/modules/i18n.server";

interface FoodOpportunity {
  id: string;
  name: string;
  status: string;
  type: string;
  totalSales: number;
  date: string;
  applied: boolean;
}

interface Semester {
  id: string;
  name: string;
  code: string;
}

export const getDashboardData = async ({
  appUserId,
}: {
  appUserId: string;
}) => {
  //  get active semester
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

  // get opportunities
  // const opportunitiesFromDb = await db.food_opportunities.getFromSemester({
  //   semesterId: activeSemester.semester_id,
  // });

  // const opportunities = opportunitiesFromDb.map((opp) => {
  //   return {
  //     id: opp.id,
  //     name: opp.name,
  //     status: opp.status,
  //     type: opp.type,
  //     date: opp.date,
  //   } as FoodOpportunity;
  // });

  const activeOpportunities = await db.food_opportunities.activeOpportunities({
    semesterId: activeSemester.semester_id,
  });

  const readRequestsPromises = activeOpportunities.map((opp) =>
    db.opportunity_requests({ opportunityId: opp.id }).read(appUserId)
  );

  const readRequests = await Promise.all(readRequestsPromises);

  const foodRequests = readRequests
    .filter((req) => req)
    .map((req) => {
      const opp = activeOpportunities.find(
        (opp) => opp.id === req?.opportunityId
      );
      const oppTimeSlots = opp ? opp.timeSlots : [];

      const timeSlots = oppTimeSlots.filter(
        (slot) => slot.id === req?.requestData?.timeSlot
      );

      const timeSlotLabel = timeSlots.length > 0 ? timeSlots[0].label : "error";

      return {
        id: req?.id ?? "error",
        name: opp?.name ?? "error",
        status: req?.status as string,
        code: req?.confirm as string,
        type: opp?.type ?? "error",
        date: opp?.date ?? "error",
        slot: timeSlotLabel,
      };
    });

  const openOpportunities = activeOpportunities.filter(
    (opp) => opp.status === "open"
  );

  const nonAppliedOpportunities = openOpportunities.filter(
    (opp) => !readRequests.find((req) => req?.opportunityId === opp.id)
  );
  const registeredSemesters: Semester[] = [
    // {
    //   id: "1",
    //   name: "Fall 2024",
    //   code: "F24",
    // },
  ];

  return {
    opportunities: nonAppliedOpportunities,
    foodRequests,
    registeredSemesters,
  };
};
