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
  // const activeSemesters = await db.semesters.getActive();
  // const semesterId = activeSemesters.length > 0 ? activeSemesters[0].id : "1";

  // const userSemesterDoc = await db
  //   .userSemesters({ appUserId })
  //   .read({ semesterId });

  // if (!userSemesterDoc) {
  //   const opportunities: FoodOpportunity[] = [];
  //   return {
  //     opportunities,
  //   };
  // }

  //  get active semester
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester");
  }

  // get opportunities
  const opportunitiesFromDb = await db.food_opportunities.getFromSemester({
    semesterId: activeSemester.semester_id,
  });

  // const opportunities: FoodOpportunity[] = [
  //   {
  //     id: "1",
  //     name: "Food Pickup - Sept 4th",
  //     status: "Confirmed",
  //     code: "H5GVB",
  //     totalSales: 25,
  //     date: "Sept. 4, 2024",
  //     applied: true,
  //   },
  //   {
  //     id: "2",
  //     name: "Drive-Thru - Sept 18",
  //     status: "Open",
  //     code: "DF6R",
  //     totalSales: 100,
  //     date: "September 18, 2024",
  //     applied: false,
  //   },
  // ];

  const opportunities = opportunitiesFromDb.map((opp) => {
    return {
      id: opp.id,
      name: opp.name,
      status: opp.status,
      type: opp.type,
      date: opp.date,
    } as FoodOpportunity;
  });

  const registeredSemesters: Semester[] = [
    // {
    //   id: "1",
    //   name: "Fall 2024",
    //   code: "F24",
    // },
  ];

  return {
    opportunities,
    registeredSemesters,
  };
};
