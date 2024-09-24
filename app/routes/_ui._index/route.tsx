import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import OpenOpportunities from "./components/opportunities-table";
import { useTranslation } from "react-i18next";
import { getDashboardData } from "./data-fetchers";
import i18nServer from "~/modules/i18n.server";
import { getAuth } from "@clerk/remix/ssr.server";
import { RedirectToSignIn, SignedOut } from "@clerk/remix";
import { requireRegistration } from "~/lib/business-logic/registration.server";
import ActiveRequests from "./components/active-requests";
import WelcomeUser from "./components/welcome-user";


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
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }

  const appUserStart = userId ?? "user_12345";
  const appUserId = appUserStart.split("_", 2)[1];

  const registrationDoc = await requireRegistration(appUserId);


  const t = await i18nServer.getFixedT(args.request);
  const meta = {
    title: t("welcome"),
    description: t("welcomeDescription"),
  };

  const pageData = await getDashboardData({ appUserId });
  let locale = await i18nServer.getLocale(args.request);



  return json({ ...pageData, meta, registrationDoc });
};



export default function Dashboard() {
  const { registrationDoc } = useLoaderData<typeof loader>()
  const { t } = useTranslation();


  return (
    <>

      <WelcomeUser />
      <ActiveRequests />
      <OpenOpportunities />

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
