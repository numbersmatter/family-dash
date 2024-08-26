import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { UserProfile } from "@clerk/remix";



export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in")
  }
  return json({});
};





export default function ProfilePage() {
  return (
    <div>
      <UserProfile />
    </div>
  );
}