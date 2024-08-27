import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import OpenOpportunities from "./components/opportunities-table";
import { useTranslation } from "react-i18next";
import { getDashboardData } from "./data-fetchers";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import i18nServer from "~/modules/i18n.server";
import { getAuth } from "@clerk/remix/ssr.server";


export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.meta.title },
    { name: "description", content: data?.meta.description },
  ];
};

export type Enrollment = {
  id: string,
  title: string,
  description: string,
  helpText: string,
  enrollement: boolean
}




export const loader = async (args: LoaderFunctionArgs) => {

  const { appUserId } = await userInfo(args);
  const t = await i18nServer.getFixedT(args.request);
  const meta = {
    title: t("welcome"),
    description: t("welcomeDescription"),
  };

  const pageData = await getDashboardData({ appUserId });
  let locale = await i18nServer.getLocale(args.request);



  return json({ ...pageData, meta });
};



export default function Dashboard() {
  // const { } = useLoaderData<typeof loader>()
  const { t } = useTranslation();


  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          {t("welcome")}
        </h1>
      </div>

      <OpenOpportunities />
      <div className="flex items-center">
        <h2 className="text-lg font-semibold md:text-xl">
          Upcoming Events
        </h2>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="flex flex-col items-center gap-1 text-center p-4">
          <h3 className="text-2xl font-bold tracking-tight">
            No events
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling events to register for once you are enrolled in the Fall 2024 Semester.

          </p>

        </div>
      </div>
    </>
  )
}
