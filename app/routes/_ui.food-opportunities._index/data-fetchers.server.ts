import { db } from "~/db/db.server";

interface FoodOpportunity {
  id: string;
  name: string;
  status: string;
  code: string;
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
  const activeSemesters = await db.semesters.getActive();
  const semesterId = activeSemesters.length > 0 ? activeSemesters[0].id : "1";

  const userSemesterDoc = await db
    .userSemesters({ appUserId })
    .read({ semesterId });

  if (!userSemesterDoc) {
    return {
      opportunities: [],
    };
  }

  const opportunitiesFromDb = await db.food_opportunities.getFromSemester({
    semesterId,
  });

  const matchingOpportunitiesPromises = opportunitiesFromDb.map(async (opp) => {
    return db
      .opportunity_requests({ opportunityId: opp.id })
      .read(appUserId)
      .then((doc) => {
        const applied = doc ? true : false;
        return {
          confirm: doc?.confirm ?? null,
          opportunityId: opp.id,
          status: doc?.status ?? "open",
          applied,
        };
      });
  });

  const matchingOpportunities = await Promise.all(
    matchingOpportunitiesPromises
  );

  const opportunities = matchingOpportunities.map((oppStatus) => {
    const opp = opportunitiesFromDb.find(
      (opp) => opp.id === oppStatus.opportunityId
    );

    return {
      ...opp,
      ...oppStatus,
    } as FoodOpportunity;
  });

  return {
    opportunities,
    activeSemesters,
    semesterId,
    matchingOpportunities,
    opportunitiesFromDb,
  };
};
