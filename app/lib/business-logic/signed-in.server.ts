import { LoaderFunctionArgs } from "@remix-run/node";
import { isRegistered } from "./registration.server";
import i18nServer from "~/modules/i18n.server";

export const userInfo = async (args: LoaderFunctionArgs) => {
  const userId = "1234";
  const registered = await isRegistered(userId);

  const semestersActive = [
    {
      id: "1",
      name: "Fall 2024 Semester",
      startDate: "August 1st, 2024",
      endDate: "December 31st, 2024",
      status: "applied",
    },
    {
      id: "2",
      name: "Spring 2025 Semester",
      startDate: "January 1st, 2025",
      endDate: "May 31st, 2025",
      status: "",
    },
  ];

  return {
    userId,
    registered,
    semestersActive,
  };
};
