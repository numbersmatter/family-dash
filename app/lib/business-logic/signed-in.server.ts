import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { isRegistered } from "./registration.server";
import i18nServer from "~/modules/i18n.server";
import { getAuth } from "@clerk/remix/ssr.server";
import { db } from "~/db/db.server";

export const userInfo = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in");
  }

  const appUserId = userId.split("_", 2)[1];

  const userProfile = await db.appUser.read(appUserId);
  // if (!userProfile) {
  //   throw redirect("/on-boarding");
  // }

  const registered = await isRegistered(userId);

  return {
    userId: appUserId,
    appUserId,
    registered,
  };
};
