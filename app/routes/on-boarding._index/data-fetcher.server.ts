import { db } from "~/db/db.server";

export const getAddressData = async ({ appUserId }: { appUserId: string }) => {
  const appUser = await db.appUser.read(appUserId);
  if (!appUser) {
    return {};
  }

  const address = appUser.address;
  const locale = appUser.language;

  return { address, locale };
};
