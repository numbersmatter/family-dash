import { json, redirect, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { SignIn } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";



export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (userId) {
    return redirect("/")
  }
  return json({});
};




export default function SignInPage() {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">

        <main className="flex flex-1 flex-col content-center items-center  gap-4 p-4 lg:gap-6 lg:p-6">
          <SignIn />
        </main>
      </div>
    </div>
  )
}