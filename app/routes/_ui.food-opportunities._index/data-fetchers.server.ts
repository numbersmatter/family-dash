import { db } from "~/db/db.server";

interface FoodOpportunity {
  id: string;
  name: string;
  status: string;
  code: string;
  totalSales: number;
  date: string;
  applied: boolean;
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

  // if (!userSemesterDoc) {
  //   return {
  //     opportunities: [],
  //   };
  // }

  const opportunities = await db.food_opportunities.getFromSemester({
    semesterId,
  });

  const testopportunities: FoodOpportunity[] = [
    {
      id: "1",
      name: "Food Pickup - Sept 4th",
      status: "Confirmed",
      code: "pickup",
      totalSales: 25,
      date: "Sept. 4, 2024",
      applied: true,
    },
    {
      id: "2",
      name: "Drive-Thru - Sept 18",
      status: "Open",
      code: "drive-thru",
      totalSales: 100,
      date: "September 18, 2024",
      applied: false,
    },
  ];

  return {
    opportunities,
    activeSemesters,
    semesterId,
  };
};
