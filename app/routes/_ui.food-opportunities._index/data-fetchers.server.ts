import { db } from "~/db/db.server";

interface FoodOpportunity {
  id: string;
  name: string;
  status: string;
  type: string;
  date: string;
  applied: boolean;
  confirm?: string;
  timeSlots: { id: string; label: string }[];
}

export const getOpportunities = async ({
  appUserId,
}: {
  appUserId: string;
}) => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

  const openOpportunities = await db.food_opportunities.getOpen({
    semesterId: activeSemester.semester_id,
  });

  // check if user has applied for that opportunity
  // do this by checking if they have a request for that opportunity

  const readRequestsPromises = openOpportunities.map((opp) =>
    db.opportunity_requests({ opportunityId: opp.id }).read(appUserId)
  );

  const readRequests = await Promise.all(readRequestsPromises);

  const nonAppliedOpportunities = openOpportunities.filter(
    (opp) => !readRequests.find((req) => req?.opportunityId === opp.id)
  );

  // const matchingOpportunities = await Promise.all(
  //   matchingOpportunitiesPromises
  // );

  // const opportunities = matchingOpportunities.map((oppStatus) => {
  //   const opp = opportunitiesFromDb.find(
  //     (opp) => opp.id === oppStatus.opportunityId
  //   );

  //   return {
  //     ...opp,
  //     ...oppStatus,
  //   } as FoodOpportunity;
  // });

  const opportunities = nonAppliedOpportunities;

  return {
    opportunities,
  };
};

export const getFoodRequests = async ({ appUserId }: { appUserId: string }) => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

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

  return foodRequests;
};
