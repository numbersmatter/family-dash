import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import UIShell, { NavId, NavNotification } from "./componets/shell";
import { Outlet } from "@remix-run/react";
import { userInfo } from "~/lib/business-logic/signed-in.server";
import i18nServer from "~/modules/i18n.server";


export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await userInfo(args);
  const t = await i18nServer.getFixedT(args.request);

  return json({});
};




export default function UIRoute() {

  const pantry_name = "Family Dash"
  const main_notification = {
    dashboard: {
      id: "dashboard",
      number: 0,
      type: "high"
    },
    enrollment: {
      id: "enrollment",
      number: 2,
      type: "medium"
    },
    opportunities: {
      id: "opportunities",
      number: 0,
      type: "low"
    },
    history: {
      id: "history",
      number: 0,
      type: "low"
    },
    register: {
      id: "register",
      number: 0,
      type: "low",
    }
  } as Record<NavId, NavNotification>
  return (
    <UIShell
      pantry_name={pantry_name}
      main_notification={main_notification}
    >
      <Outlet />
    </UIShell>
  )

}