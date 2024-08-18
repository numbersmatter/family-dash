import { Button } from "~/components/ui/button";
import UIShell, { NavId, NavNotification } from "./componets/shell";
import { Outlet } from "@remix-run/react";




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