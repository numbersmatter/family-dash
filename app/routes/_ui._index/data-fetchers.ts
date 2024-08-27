import { LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";
import i18nServer from "~/modules/i18n.server";

interface FoodOpportunity {
  id: string;
  name: string;
  status: string;
  code: string;
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
  const activeSemesters = await db.semesters.getActive();
  const semesterId = activeSemesters.length > 0 ? activeSemesters[0].id : "1";

  const userSemesterDoc = await db
    .userSemesters({ appUserId })
    .read({ semesterId });

  if (!userSemesterDoc) {
    const opportunities: FoodOpportunity[] = [];
    return {
      opportunities,
    };
  }

  const openSemesters = [
    {
      id: "1",
      title: "Fall 2024 Semester",
      description: "August - December 2024",
      helpText:
        "In Order to receive services you must register for the Fall 2024 Semester. You can register for the Fall 2024 Semester which runs from September 1st to December 31st.",
      enrollement: false,
    },
  ];
  const opportunities: FoodOpportunity[] = [
    {
      id: "1",
      name: "Food Pickup - Sept 4th",
      status: "Confirmed",
      code: "H5GVB",
      totalSales: 25,
      date: "Sept. 4, 2024",
      applied: true,
    },
    {
      id: "2",
      name: "Drive-Thru - Sept 18",
      status: "Open",
      code: "DF6R",
      totalSales: 100,
      date: "September 18, 2024",
      applied: false,
    },
  ];

  const registeredSemesters: Semester[] = [
    // {
    //   id: "1",
    //   name: "Fall 2024",
    //   code: "F24",
    // },
  ];

  return {
    openSemesters,
    opportunities,
    registeredSemesters,
  };
};
